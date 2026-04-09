import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Get email and role from query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const role = queryParams.get('role') as 'client' | 'trainer' | null;

  useEffect(() => {
    if (!email || !role) {
      setError('Invalid reset link. Please request a new one.');
    }
  }, [email, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (email && role) {
      const result = resetPassword(email, role, password);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-3xl border border-white/10 text-center">
          <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Password Reset</h2>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <div className="pt-8">
            <Link 
              to="/login" 
              className="block w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
            >
              Go to Login
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
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Reset Password</h2>
          <p className="text-zinc-500 mt-2">Enter a new password for your account</p>
          {email && (
            <p className="text-zinc-400 text-sm mt-2">Account: <span className="text-white font-bold">{email}</span></p>
          )}
        </div>

        {error && (
          <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl text-red-500 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">New Password</label>
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
          </div>

          <div className="space-y-2">
            <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!!error && !email}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            Reset Password <ArrowRight className="w-5 h-5" />
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

export default ResetPassword;
