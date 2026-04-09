import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Settings, CreditCard, Eye, 
  MessageSquare, TrendingUp, AlertCircle, 
  CheckCircle2, Edit3, ExternalLink, X, Upload, Award, MapPin, IndianRupee
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Trainer } from '../types';
import { SPECIALIZATIONS } from '../constants';

const TrainerDashboard = () => {
  const { user, trainers, updateTrainer } = useApp();
  const trainer = trainers.find(t => t.id === user?.id) as Trainer;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Trainer>>({});

  if (!trainer) return null;

  const handleEditOpen = () => {
    setEditFormData({
      name: trainer.name,
      bio: trainer.bio,
      charges: trainer.charges,
      experience: trainer.experience,
      specialization: trainer.specialization,
      mode: trainer.mode,
      avatar: trainer.avatar
    });
    setIsEditModalOpen(true);
  };

  const handleSpecToggle = (spec: string) => {
    setEditFormData(prev => ({
      ...prev,
      specialization: prev.specialization?.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...(prev.specialization || []), spec]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTrainer({ ...editFormData, id: trainer.id });
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={trainer.avatar} 
                alt={trainer.name} 
                className="w-24 h-24 rounded-3xl object-cover border-2 border-white/10 shadow-2xl"
              />
              {trainer.isVerified && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Trainer Dashboard</h1>
              <p className="text-zinc-500">Welcome back, <span className="text-white font-bold">{trainer.name}</span></p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to={`/trainer/${trainer.id}`} className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-6 py-3 rounded-xl text-white font-bold hover:bg-zinc-800 transition-colors">
              <Eye className="w-4 h-4" /> View Public Profile
            </Link>
            <button 
              onClick={handleEditOpen}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-green-600/10 border border-green-600/20 p-6 rounded-3xl mb-12 flex items-center gap-4">
          <div className="bg-green-600 p-3 rounded-2xl">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Your profile is active</h3>
            <p className="text-zinc-400">You are visible in search results. Membership is currently free!</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Profile Views", value: "1,240", icon: <Eye className="text-blue-500" />, trend: "+12%" },
            { label: "Contact Requests", value: "48", icon: <MessageSquare className="text-red-500" />, trend: "+5%" },
            { label: "Conversion Rate", value: "3.8%", icon: <TrendingUp className="text-green-500" />, trend: "+2%" }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-black p-3 rounded-2xl">{stat.icon}</div>
                <span className="text-green-500 text-xs font-bold">{stat.trend}</span>
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Recent Inquiries</h3>
              <button className="text-red-500 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { name: "Amit Kumar", email: "amit@example.com", time: "2 hours ago", type: "Email" },
                { name: "Sneha Rao", email: "sneha@example.com", time: "5 hours ago", type: "WhatsApp" },
                { name: "Vikram Singh", email: "vikram@example.com", time: "1 day ago", type: "Call" }
              ].map((item, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-bold">{item.name}</div>
                      <div className="text-zinc-500 text-sm">{item.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-bold">{item.type}</div>
                    <div className="text-zinc-500 text-xs">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-black rounded-2xl hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-zinc-500 group-hover:text-red-500" />
                    <span className="text-white font-bold text-sm">Account Settings</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-700" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-black rounded-2xl hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-zinc-500 group-hover:text-red-500" />
                    <span className="text-white font-bold text-sm">Billing History</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-700" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-black rounded-2xl hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-zinc-500 group-hover:text-red-500" />
                    <span className="text-white font-bold text-sm">Update Documents</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-700" />
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">Support</h3>
              <p className="text-zinc-500 text-sm mb-6">Need help with your profile or membership? Our team is here for you.</p>
              <Link to="/contact" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-zinc-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Charges per Session (₹)</label>
                  <input 
                    type="number" 
                    value={editFormData.charges}
                    onChange={(e) => setEditFormData({...editFormData, charges: parseInt(e.target.value)})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Experience (Years)</label>
                  <input 
                    type="number" 
                    value={editFormData.experience}
                    onChange={(e) => setEditFormData({...editFormData, experience: parseInt(e.target.value)})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Training Mode</label>
                  <select 
                    value={editFormData.mode}
                    onChange={(e) => setEditFormData({...editFormData, mode: e.target.value as any})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map(s => (
                    <button
                      key={s} type="button"
                      onClick={() => handleSpecToggle(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                        editFormData.specialization?.includes(s) ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-zinc-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Professional Bio</label>
                <textarea 
                  rows={4}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
