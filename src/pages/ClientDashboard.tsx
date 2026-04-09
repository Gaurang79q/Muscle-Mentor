import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Clock, MessageSquare, Search, ArrowRight, X, Mail, Phone, Lock, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

const ClientDashboard = () => {
  const { user, updateUser } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '' // Mock password field
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">My Dashboard</h1>
            <p className="text-zinc-500">Welcome back, <span className="text-white font-bold">{user?.name}</span></p>
          </div>
          <Link to="/browse" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-colors flex items-center gap-2">
            <Search className="w-5 h-5" /> Find More Trainers
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Recently Contacted</h3>
              <div className="bg-zinc-900 rounded-3xl border border-white/5 p-12 text-center">
                <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-zinc-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">No conversations yet</h4>
                <p className="text-zinc-500 mb-8">Start your fitness journey by reaching out to a personal trainer.</p>
                <Link to="/browse" className="text-red-500 font-bold hover:underline flex items-center justify-center gap-2">
                  Browse Trainers <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Saved Trainers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Empty state or list of saved trainers */}
                <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center text-center h-64">
                  <Heart className="w-8 h-8 text-zinc-700 mb-4" />
                  <p className="text-zinc-500 text-sm">You haven't saved any trainers yet.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-black">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{user?.name}</div>
                  <div className="text-zinc-500 text-sm">{user?.email}</div>
                </div>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full flex items-center gap-3 p-4 bg-black rounded-2xl hover:bg-zinc-800 transition-colors group"
                >
                  <User className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-sm">Edit Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-black rounded-2xl hover:bg-zinc-800 transition-colors">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-white font-bold text-sm">Training History</span>
                </button>
              </div>
            </div>

            <div className="bg-red-600 p-8 rounded-3xl text-white">
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Goal Tracker</h4>
              <p className="text-white/80 text-sm mb-6">Set your fitness goals and track your progress with your mentor.</p>
              <button className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm">Set New Goal</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 rounded-[2.5rem] border border-white/10 p-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-zinc-500" />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Edit Profile</h2>
                <p className="text-zinc-500">Update your account information</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="text" 
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
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
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
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
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">New Password (Optional)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="password" 
                      value={editFormData.password}
                      onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                      placeholder="Leave blank to keep current"
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  <Save className="w-5 h-5" /> Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientDashboard;
