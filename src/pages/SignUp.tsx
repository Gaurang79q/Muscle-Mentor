import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, User, Mail, Phone, Lock, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { signup } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) {
      setError('You must agree to the Terms and Conditions to create an account.');
      return;
    }
    
    const result = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'client'
    });

    if (result.success) {
      navigate('/browse');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-20">
      <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-3xl border border-white/10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">MuscleMentor</span>
          </Link>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Create Account</h2>
          <p className="text-zinc-500 mt-2">Join the community and find your mentor</p>
        </div>

        {error && (
          <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl text-red-500 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="name@example.com"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <input 
              type="checkbox" 
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-white/10 bg-black text-red-600 focus:ring-red-600"
            />
            <label htmlFor="terms" className="text-sm text-zinc-400">
              I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-red-500 hover:underline font-bold">Terms and Conditions</button>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!agreedToTerms}
          >
            Create Account <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {showTerms && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border border-white/10 flex flex-col">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Terms and Conditions</h3>
                <button onClick={() => setShowTerms(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <Shield className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto text-zinc-400 space-y-6 text-sm leading-relaxed">
                <p>Welcome to Muscle Mentor ("Platform", "we", "our", or "us"). These Terms and Conditions ("Terms") govern your access to and use of the Muscle Mentor website. By accessing or using the Platform, whether as a browsing user or a listed professional, you agree to be bound by these Terms.</p>
                
                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">1. Intermediary Status & Scope of Service</h4>
                  <p>1.1. Strict Intermediary Role: Muscle Mentor operates exclusively as an "Intermediary" as defined under Section 2(1)(w) and Section 79 of the Information Technology Act, 2000. The Platform provides a digital directory and matchmaking service designed to facilitate connections between individuals seeking fitness services ("Users") and independent fitness professionals ("Trainers").</p>
                  <p>1.2. No Agency: Muscle Mentor does not employ, recommend, endorse, or act as an agent for any Trainer. The Platform is not a party to any agreement, contract, or transaction entered into directly between a User and a Trainer.</p>
                  <p>1.3. Scope Limitation: Muscle Mentor does not provide fitness instruction, medical advice, workout regimens, dietary plans, or supplement prescriptions.</p>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">2. Accounts & Platform Usage</h4>
                  <p>2.1. User Accounts: Users may register and browse the Platform free of charge utilizing available search filters to identify Trainers that meet their preferences.</p>
                  <p>2.2 Eligibility: The Platform is strictly intended for use by individuals who are competent to contract under the Indian Contract Act, 1872. By accessing, browsing, or registering on the Platform, you represent and warrant that you are at least 18 years of age. If you are under 18 years of age, you are expressly prohibited from using the Platform or engaging the services of any Trainer listed herein.</p>
                  <p>2.3. No Guarantee of Credentials: Muscle Mentor does not independently warrant, guarantee, or endorse the authenticity of any certifications, qualifications, or identities provided by Trainers. Users are solely responsible for conducting their own due diligence before engaging a Trainer's services.</p>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">3. Absolute Disclaimer of Liability</h4>
                  <p>3.1. Third-Party Services: Muscle Mentor, including its directors, employees, and affiliates, shall not be held liable for any advice, guidance, physical training, diet plans, supplement recommendations, or any other services or products provided by a Trainer.</p>
                  <p>3.2. User-Trainer Interactions: The Platform does not monitor and is not responsible for the online or offline interactions, communications, or conduct between Users and Trainers.</p>
                  <p>3.3. Assumption of Risk: Users acknowledge that physical exercise and dietary changes involve inherent risks. Any injury, health complication, adverse physical outcome, or financial loss resulting from a Trainer's guidance, negligence, omissions, or misconduct is the sole responsibility of the respective Trainer and the User.</p>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">4. Prohibited Conduct</h4>
                  <p>Users and Trainers agree not to use the Platform to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Transmit any false, misleading, or deceptive information.</li>
                    <li>Engage in any unlawful, fraudulent, or malicious activity.</li>
                    <li>Harass, abuse, or harm other individuals on the Platform.</li>
                    <li>Interfere with or disrupt the technical operations or security of the Platform.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">5. Indemnification</h4>
                  <p>You agree to indemnify, defend, and hold harmless Muscle Mentor from and against any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or related to your use of the Platform, your violation of these Terms, or any dispute arising between you and another user of the Platform.</p>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">6. Governing Law and Jurisdiction</h4>
                  <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms or the use of the Platform shall be subject to the exclusive jurisdiction of the competent courts located in New Delhi, India.</p>
                </section>

                <section className="space-y-3">
                  <h4 className="text-white font-bold uppercase tracking-wider text-xs">7. Grievance Redressal</h4>
                  <p>In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Email ID of the platform are provided below. Any complaints regarding the Platform may be directed to: musclementor77@gmail.com</p>
                </section>
              </div>
              <div className="p-6 border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => {
                    setAgreedToTerms(true);
                    setShowTerms(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
                >
                  I Accept
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-white/5">
          <Link 
            to="/trainer-signup" 
            className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors"
          >
            <Shield className="w-5 h-5 text-red-500" /> Sign Up as a Trainer
          </Link>
        </div>

        <div className="text-center pt-4">
          <p className="text-zinc-500 text-sm">
            Already have an account? {' '}
            <Link to="/login" className="text-red-500 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
