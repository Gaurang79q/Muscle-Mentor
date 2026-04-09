import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, User, LogOut, Menu, X, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const Navbar = () => {
  const { user, logout, isAdmin } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">MuscleMentor</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {isAdmin && (
              <Link to="/admin-dashboard" className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
                <Shield className="w-4 h-4" /> Admin
              </Link>
            )}
            <Link to="/browse" className="text-sm font-medium hover:text-red-500 transition-colors">Browse Trainers</Link>
            <Link to="/about" className="text-sm font-medium hover:text-red-500 transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-red-500 transition-colors">Contact</Link>
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-white/20 pl-4">
                <Link to={user.role === 'trainer' ? '/trainer-dashboard' : '/dashboard'} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium hover:text-red-500 transition-colors">Login</Link>
                <Link to="/signup" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          {isAdmin && (
            <Link to="/admin-dashboard" className="block text-lg font-bold text-red-500" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
          )}
          <Link to="/browse" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Browse Trainers</Link>
          <Link to="/about" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <div className="pt-4 border-t border-white/10">
            {user ? (
              <div className="space-y-4">
                <Link to={user.role === 'trainer' ? '/trainer-dashboard' : '/dashboard'} className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/login" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="block bg-red-600 text-center py-3 rounded-lg font-bold" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Confirm Logout</h3>
            <p className="text-zinc-400 mb-8">Are you sure you want to log out of your account?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
