import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock, ArrowRight, User, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'trainer'>('client');
  const { login } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password, role);
    
    if (result.success) {
      navigate(role === 'trainer' ? '/trainer-dashboard' : '/browse');
    } else {
      setError(result.message || 'Login failed');
    }
  };

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
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Welcome Back</h2>
          <p className="text-zinc-500 mt-2">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl text-red-500 text-sm font-bold text-center">
            {error}
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

          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" title="Reset your password" id="forgot-password-link" className="text-xs text-zinc-500 hover:text-red-500 transition-colors font-bold uppercase tracking-widest">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-zinc-500 text-sm">
            Don't have an account? {' '}
            <Link to="/signup" className="text-red-500 font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
