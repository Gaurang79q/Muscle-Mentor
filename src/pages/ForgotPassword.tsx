import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, ArrowRight, User, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'client' | 'trainer'>('client');
  const { requestPasswordReset } = useApp();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    
    const result = await requestPasswordReset(email, role);
    
    if (result.success) {
      setIsSubmitted(true);
      setStatus({ type: 'success', message: result.message });
    } else {
      setStatus({ type: 'error', message: result.message });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-3xl border border-white/10 text-center">
          <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Check Your Email</h2>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            We've sent a password reset link to <span className="text-white font-bold">{email}</span>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <div className="pt-8 space-y-4">
            <Link 
              to={`/reset-password?email=${encodeURIComponent(email)}&role=${role}`}
              className="block w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
            >
              Go to Reset Page (Demo)
            </Link>
            <Link to="/login" className="block text-zinc-500 font-bold hover:text-white transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-3xl border border-white/10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">MuscleMentor</span>
          </Link>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Forgot Password?</h2>
          <p className="text-zinc-500 mt-2">Enter your email to receive a reset link</p>
        </div>

        {status && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center border ${
            status.type === 'success' 
              ? 'bg-green-600/10 border-green-600/20 text-green-500' 
              : 'bg-red-600/10 border-red-600/20 text-red-500'
          }`}>
            {status.message}
          </div>
        )}

        <div className="flex p-1 bg-black rounded-xl mb-8">
          <button 
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              role === 'client' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User className="w-4 h-4" /> Client
          </button>
          <button 
            onClick={() => setRole('trainer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              role === 'trainer' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Shield className="w-4 h-4" /> Trainer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            Send Reset Link <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center pt-4">
          <Link to="/login" className="text-zinc-500 text-sm font-bold hover:text-white transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
