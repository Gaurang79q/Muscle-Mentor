import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { Resend } from 'resend';

const DATA_FILE = path.join(process.cwd(), "data.json");
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Admin emails - should be set in environment variables
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "gaurangtewari24@gmail.com").split(",").map(e => e.trim().toLowerCase());

// Initial data if file doesn't exist
const initialData = {
  userCount: 1,
  trainerCount: 0,
  users: [],
  trainers: []
};

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      if (!content) return initialData;
      const data = JSON.parse(content);
      // Ensure arrays exist
      if (!data.users) data.users = [];
      if (!data.trainers) data.trainers = [];
      return data;
    }
  } catch (e) {
    console.error("Error reading data file", e);
  }
  return initialData;
}

function writeData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error writing data file", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Middleware to check if user is admin
  const isAdmin = (req: express.Request) => {
    const userEmail = req.headers['x-user-email'] as string;
    return userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase());
  };

  // API routes
  app.get("/api/stats", (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }
    const data = readData();
    res.json({
      userCount: data.userCount,
      trainerCount: data.trainerCount
    });
  });

  app.get("/api/admin/all-data", (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }
    const data = readData();
    res.json({
      success: true,
      users: data.users,
      trainers: data.trainers
    });
  });

  app.get("/api/trainers", (req, res) => {
    const data = readData();
    res.json(data.trainers);
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password, role } = req.body;
    const data = readData();
    
    const collection = role === 'trainer' ? data.trainers : data.users;
    const user = collection.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });

  app.post("/api/users/register", (req, res) => {
    const data = readData();
    const newUser = req.body;
    
    if (data.users.find((u: any) => u.email === newUser.email)) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    data.users.push(newUser);
    data.userCount = data.users.length;
    writeData(data);
    
    res.json({ success: true, userCount: data.userCount });
  });

  app.post("/api/trainers/register", (req, res) => {
    const data = readData();
    const newTrainer = req.body;
    
    if (data.trainers.find((t: any) => t.email === newTrainer.email)) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    data.trainers.push(newTrainer);
    data.trainerCount = data.trainers.length;
    writeData(data);
    
    res.json({ success: true, trainerCount: data.trainerCount });
  });

  app.post("/api/users/update", (req, res) => {
    const { userId, userData } = req.body;
    const data = readData();
    const index = data.users.findIndex((u: any) => u.id === userId);
    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...userData };
      writeData(data);
      res.json({ success: true, user: data.users[index] });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });

  app.post("/api/trainers/update", (req, res) => {
    const { trainerId, trainerData } = req.body;
    const data = readData();
    const index = data.trainers.findIndex((t: any) => t.id === trainerId);
    if (index !== -1) {
      data.trainers[index] = { ...data.trainers[index], ...trainerData };
      writeData(data);
      res.json({ success: true, trainer: data.trainers[index] });
    } else {
      res.status(404).json({ success: false, message: "Trainer not found" });
    }
  });

  app.post("/api/trainers/review", (req, res) => {
    const { trainerId, review } = req.body;
    const data = readData();
    const index = data.trainers.findIndex((t: any) => t.id === trainerId);
    if (index !== -1) {
      if (!data.trainers[index].reviews) data.trainers[index].reviews = [];
      data.trainers[index].reviews.push(review);
      const updatedReviews = data.trainers[index].reviews;
      const avgRating = updatedReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / updatedReviews.length;
      data.trainers[index].averageRating = parseFloat(avgRating.toFixed(1));
      writeData(data);
      res.json({ success: true, trainer: data.trainers[index] });
    } else {
      res.status(404).json({ success: false, message: "Trainer not found" });
    }
  });

  app.post("/api/users/interaction", (req, res) => {
    const { userId, trainerId } = req.body;
    const data = readData();
    const index = data.users.findIndex((u: any) => u.id === userId);
    if (index !== -1) {
      if (!data.users[index].interactions) data.users[index].interactions = [];
      if (!data.users[index].interactions.includes(trainerId)) {
        data.users[index].interactions.push(trainerId);
        writeData(data);
      }
      res.json({ success: true, user: data.users[index] });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });

  app.post("/api/trainers/membership", (req, res) => {
    const { trainerId, status } = req.body;
    const data = readData();
    const index = data.trainers.findIndex((t: any) => t.id === trainerId);
    if (index !== -1) {
      data.trainers[index].membershipStatus = status;
      data.trainers[index].isActive = status === 'active';
      writeData(data);
      res.json({ success: true, trainer: data.trainers[index] });
    } else {
      res.status(404).json({ success: false, message: "Trainer not found" });
    }
  });
  app.post("/api/stats/increment-user", (req, res) => {
    const data = readData();
    data.userCount += 1;
    writeData(data);
    res.json({ userCount: data.userCount, trainerCount: data.trainerCount });
  });

  app.post("/api/stats/increment-trainer", (req, res) => {
    const data = readData();
    data.trainerCount += 1;
    writeData(data);
    res.json({ userCount: data.userCount, trainerCount: data.trainerCount });
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    const { email, role, resetUrl } = req.body;

    if (!resend) {
      console.warn("RESEND_API_KEY not set. Email not sent.");
      return res.status(500).json({ success: false, message: "Email service not configured. Please set RESEND_API_KEY in environment variables." });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'MuscleMentor <onboarding@resend.dev>',
        to: [email],
        subject: 'Reset Your MuscleMentor Password',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #dc2626; text-transform: uppercase; letter-spacing: -0.05em;">MuscleMentor</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password for your <strong>${role}</strong> account.</p>
            <p>Click the button below to reset it:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">This is an automated message from MuscleMentor.</p>
          </div>
        `
      });

      if (error) {
        return res.status(400).json({ success: false, error });
      }

      res.json({ success: true, data });
    } catch (e) {
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
