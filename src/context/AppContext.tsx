import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Trainer } from '../types';
import { MOCK_TRAINERS } from '../constants';

interface AppContextType {
  user: User | null;
  trainers: Trainer[];
  stats: { userCount: number; trainerCount: number };
  login: (email: string, password: string, role: 'client' | 'trainer') => Promise<{ success: boolean; message?: string }>;
  signup: (userData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  registerTrainer: (trainerData: Partial<Trainer>) => Promise<{ success: boolean; message?: string }>;
  updateTrainer: (trainerData: Partial<Trainer>) => void;
  payMembership: (trainerId: string) => void;
  addReview: (trainerId: string, rating: number, comment: string) => { success: boolean; message: string };
  recordInteraction: (trainerId: string) => void;
  requestPasswordReset: (email: string, role: 'client' | 'trainer') => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string, role: 'client' | 'trainer', newPassword: string) => { success: boolean; message: string };
  isAdmin: boolean;
  fetchAllData: () => Promise<{ users: User[]; trainers: Trainer[] } | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mm_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('mm_registered_users');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [trainers, setTrainers] = useState<Trainer[]>(MOCK_TRAINERS);

  const [stats, setStats] = useState({ userCount: 0, trainerCount: 0 });

  // Hardcoded admin emails for now as per user request "not through website"
  // In production, this would be checked against an environment variable on the server
  const ADMIN_EMAILS = ["gaurangtewari24@gmail.com"];
  const isAdmin = !!user && ADMIN_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, password: user.password, role: user.role })
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (e) {
        console.error("Error syncing user", e);
      }
    };
    syncUser();
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch('/api/trainers');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTrainers(data);
        } else {
          setTrainers(MOCK_TRAINERS);
        }
      } catch (e) {
        console.error("Error fetching trainers", e);
        setTrainers(MOCK_TRAINERS);
      }
    };
    fetchTrainers();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/stats', {
          headers: { 'x-user-email': user.email }
        });
        const data = await res.json();
        if (data.userCount !== undefined) {
          setStats(data);
        }
      } catch (e) {
        console.error("Error fetching stats", e);
      }
    };
    fetchStats();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mm_trainers', JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem('mm_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mm_user');
    }
  }, [user]);

  const incrementUserCount = async () => {
    try {
      const res = await fetch('/api/stats/increment-user', { method: 'POST' });
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Error incrementing user count", e);
    }
  };

  const incrementTrainerCount = async () => {
    try {
      const res = await fetch('/api/stats/increment-trainer', { method: 'POST' });
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Error incrementing trainer count", e);
    }
  };

  const login = async (email: string, password: string, role: 'client' | 'trainer') => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid email or password.' };
      }
    } catch (e) {
      console.error("Login error", e);
      // Fallback to local check if server is down (for dev convenience)
      const foundUser = registeredUsers.find(u => u.email === email && u.role === role);
      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
        return { success: true };
      }
      return { success: false, message: 'Server error. Please try again later.' };
    }
  };

  const signup = async (userData: Partial<User>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const exists = registeredUsers.some(u => u.email === userData.email && u.role === userData.role);
    if (exists) {
      return { success: false, message: 'Email already registered for this role.' };
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email || '',
      phone: userData.phone || '+91 00000 00000',
      password: userData.password || '',
      role: userData.role || 'client',
      interactions: []
    };

    // Persist to server
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      
      const data = await response.json();
      if (!data.success) {
        return { success: false, message: data.message || 'Registration failed on server.' };
      }

      setRegisteredUsers(prev => [...prev, newUser]);
      setUser(newUser);

      // Only fetch stats if admin
      if (isAdmin) {
        const statsRes = await fetch('/api/stats', {
          headers: { 'x-user-email': newUser.email }
        });
        const statsData = await statsRes.json();
        if (statsData.userCount !== undefined) {
          setStats(statsData);
        }
      }
      return { success: true };
    } catch (e) {
      console.error("Error persisting user to server", e);
      // Fallback to local only if server is unreachable
      setRegisteredUsers(prev => [...prev, newUser]);
      setUser(newUser);
      return { success: true, message: 'Saved locally. Server sync failed.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...userData };
    
    try {
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, userData })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        // If it's a trainer, also update in trainers list
        if (user.role === 'trainer') {
          setTrainers(prev => prev.map(t => t.id === user.id ? data.user as Trainer : t));
        }
      }
    } catch (e) {
      console.error("Error updating user on server", e);
      setUser(updatedUser);
    }
  };

  const registerTrainer = async (trainerData: Partial<Trainer>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trainerData.email || !emailRegex.test(trainerData.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const exists = registeredUsers.some(u => u.email === trainerData.email && u.role === 'trainer');
    if (exists) {
      return { success: false, message: 'Email already registered as a trainer.' };
    }

    const newTrainer: Trainer = {
      id: Math.random().toString(36).substr(2, 9),
      name: trainerData.name || 'New Trainer',
      email: trainerData.email || '',
      phone: trainerData.phone || '',
      password: trainerData.password || '',
      role: 'trainer',
      age: trainerData.age || 0,
      dob: trainerData.dob || '',
      gender: trainerData.gender || 'other',
      experience: trainerData.experience || 0,
      specialization: trainerData.specialization || [],
      mode: trainerData.mode || 'both',
      charges: trainerData.charges || 0,
      bio: trainerData.bio || '',
      isVerified: false,
      isActive: true, // Free for now
      membershipStatus: 'active', // Free for now
      documents: trainerData.documents || {},
      avatar: trainerData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${trainerData.name}`,
      reviews: [],
      averageRating: 0,
      interactions: []
    };
    // Persist to server
    try {
      const response = await fetch('/api/trainers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainer)
      });

      const data = await response.json();
      if (!data.success) {
        return { success: false, message: data.message || 'Registration failed on server.' };
      }

      setTrainers(prev => [...prev, newTrainer]);
      setRegisteredUsers(prev => [...prev, newTrainer]);
      setUser(newTrainer);

      // Only fetch stats if admin
      if (isAdmin) {
        const statsRes = await fetch('/api/stats', {
          headers: { 'x-user-email': newTrainer.email }
        });
        const statsData = await statsRes.json();
        if (statsData.trainerCount !== undefined) {
          setStats(statsData);
        }
      }
      return { success: true };
    } catch (e) {
      console.error("Error persisting trainer to server", e);
      // Fallback to local
      setTrainers(prev => [...prev, newTrainer]);
      setRegisteredUsers(prev => [...prev, newTrainer]);
      setUser(newTrainer);
      return { success: true, message: 'Saved locally. Server sync failed.' };
    }
  };

  const updateTrainer = async (trainerData: Partial<Trainer>) => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/trainers/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainerId: trainerData.id, trainerData })
      });
      const data = await response.json();
      if (data.success) {
        setTrainers(prev => prev.map(t => t.id === trainerData.id ? data.trainer as Trainer : t));
        if (user.id === trainerData.id) {
          setUser(data.trainer as any);
        }
      }
    } catch (e) {
      console.error("Error updating trainer on server", e);
      // Fallback
      setTrainers(prev => prev.map(t => t.id === trainerData.id ? { ...t, ...trainerData } as Trainer : t));
      if (user.id === trainerData.id) {
        setUser({ ...user, ...trainerData } as User);
      }
    }
  };

  const payMembership = async (trainerId: string) => {
    try {
      const response = await fetch('/api/trainers/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainerId, status: 'active' })
      });
      const data = await response.json();
      if (data.success) {
        setTrainers(prev => prev.map(t => t.id === trainerId ? data.trainer as Trainer : t));
        if (user?.id === trainerId) {
          setUser(data.trainer as any);
        }
      }
    } catch (e) {
      console.error("Error updating membership on server", e);
      // Fallback
      setTrainers(prev => prev.map(t => 
        t.id === trainerId 
          ? { ...t, membershipStatus: 'active', isActive: true } 
          : t
      ));
      if (user?.id === trainerId) {
        setUser({ ...user, membershipStatus: 'active', isActive: true } as User);
      }
    }
  };

  const recordInteraction = async (trainerId: string) => {
    if (!user || user.role !== 'client') return;
    
    const currentInteractions = user.interactions || [];
    if (currentInteractions.includes(trainerId)) return;
    
    try {
      const response = await fetch('/api/users/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, trainerId })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setRegisteredUsers(prev => prev.map(u => u.id === user.id ? data.user as User : u));
      }
    } catch (e) {
      console.error("Error recording interaction on server", e);
      // Fallback
      const updatedInteractions = [...currentInteractions, trainerId];
      const updatedUser = { ...user, interactions: updatedInteractions };
      setUser(updatedUser);
      setRegisteredUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const addReview = async (trainerId: string, rating: number, comment: string) => {
    if (!user) return { success: false, message: 'Please login to leave a review' };
    
    const hasInteracted = user.interactions?.includes(trainerId);
    if (!hasInteracted) {
      return { success: false, message: 'You must contact the trainer before leaving a review' };
    }
    
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      trainerId,
      clientId: user.id,
      clientName: user.name,
      rating,
      comment,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/trainers/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainerId, review: newReview })
      });
      const data = await response.json();
      if (data.success) {
        setTrainers(prev => prev.map(t => t.id === trainerId ? data.trainer as Trainer : t));
        return { success: true, message: 'Review submitted successfully' };
      }
      return { success: false, message: data.message || 'Failed to submit review' };
    } catch (e) {
      console.error("Error submitting review on server", e);
      return { success: false, message: 'Server error. Review not saved.' };
    }
  };

  const requestPasswordReset = async (email: string, role: 'client' | 'trainer') => {
    const foundUser = registeredUsers.find(u => u.email === email && u.role === role);
    if (!foundUser) {
      return { success: false, message: 'Account not found with this email.' };
    }

    const resetUrl = `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}&role=${role}`;

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, resetUrl })
      });

      const data = await response.json();
      
      if (data.success) {
        return { success: true, message: 'Password reset link has been sent to your email.' };
      } else {
        // Fallback for demo if API key is missing
        console.log(`Demo Reset Link: ${resetUrl}`);
        return { 
          success: true, 
          message: data.message || 'Password reset link has been sent to your email (Check console if email fails).' 
        };
      }
    } catch (e) {
      console.error("Error sending reset email", e);
      return { success: false, message: 'Failed to send reset email. Please try again later.' };
    }
  };

  const resetPassword = (email: string, role: 'client' | 'trainer', newPassword: string) => {
    const userIndex = registeredUsers.findIndex(u => u.email === email && u.role === role);
    if (userIndex === -1) {
      return { success: false, message: 'Account not found.' };
    }

    const updatedUsers = [...registeredUsers];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], password: newPassword };
    setRegisteredUsers(updatedUsers);

    // If it's a trainer, also update in trainers list
    if (role === 'trainer') {
      setTrainers(prev => prev.map(t => t.email === email ? { ...t, password: newPassword } : t));
    }

    return { success: true, message: 'Password has been reset successfully.' };
  };

  const fetchAllData = async () => {
    if (!user || !isAdmin) return null;
    try {
      const res = await fetch('/api/admin/all-data', {
        headers: { 'x-user-email': user.email }
      });
      const data = await res.json();
      if (data.success) {
        return { users: data.users, trainers: data.trainers };
      }
    } catch (e) {
      console.error("Error fetching all data", e);
    }
    return null;
  };

  useEffect(() => {
    const syncAllData = async () => {
      if (!user || !isAdmin) return;
      const allData = await fetchAllData();
      if (allData) {
        setRegisteredUsers(allData.users);
        setTrainers(allData.trainers);
      }
    };
    syncAllData();
  }, [user, isAdmin]);

  return (
    <AppContext.Provider value={{ user, trainers, stats, login, signup, logout, updateUser, registerTrainer, updateTrainer, payMembership, addReview, recordInteraction, requestPasswordReset, resetPassword, isAdmin, fetchAllData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
