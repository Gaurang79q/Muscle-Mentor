import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Trainer } from '../types';
import { Shield, Users, Trophy, Mail, Phone, Calendar, MapPin, ArrowLeft, Search, Filter, X } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const AdminDashboard = () => {
  const { user, isAdmin, fetchAllData } = useApp();
  const [data, setData] = useState<{ users: User[]; trainers: Trainer[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'trainers'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<User | Trainer | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (isAdmin) {
        const result = await fetchAllData();
        setData(result);
      }
      setLoading(false);
    };
    loadData();
  }, [isAdmin, fetchAllData]);

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredUsers = data?.users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredTrainers = data?.trainers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Admin Dashboard</h1>
            </div>
            <p className="text-zinc-500">Restricted access for authorized personnel only.</p>
          </div>
          <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <button 
            onClick={() => setActiveTab('users')}
            className={`p-8 rounded-[2.5rem] border transition-all text-left ${
              activeTab === 'users' ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-white/5 hover:border-white/20'
            }`}
          >
            <Users className={`w-10 h-10 mb-4 ${activeTab === 'users' ? 'text-white' : 'text-red-600'}`} />
            <div className="text-4xl font-black text-white mb-1">{data?.users.length || 0}</div>
            <div className={`font-bold uppercase tracking-widest text-sm ${activeTab === 'users' ? 'text-white/80' : 'text-zinc-500'}`}>Clients Joined</div>
          </button>
          <button 
            onClick={() => setActiveTab('trainers')}
            className={`p-8 rounded-[2.5rem] border transition-all text-left ${
              activeTab === 'trainers' ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-white/5 hover:border-white/20'
            }`}
          >
            <Trophy className={`w-10 h-10 mb-4 ${activeTab === 'trainers' ? 'text-white' : 'text-red-600'}`} />
            <div className="text-4xl font-black text-white mb-1">{data?.trainers.length || 0}</div>
            <div className={`font-bold uppercase tracking-widest text-sm ${activeTab === 'trainers' ? 'text-white/80' : 'text-zinc-500'}`}>Expert Trainers</div>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-red-600 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/50">
                  <th className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">Name</th>
                  <th className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">Email</th>
                  <th className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">Phone</th>
                  {activeTab === 'trainers' && <th className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">Specialization</th>}
                  <th className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'users' ? filteredUsers : filteredTrainers).map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
                          {item.name[0]}
                        </div>
                        <span className="text-white font-bold">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-zinc-400">{item.email}</td>
                    <td className="p-6 text-zinc-400">{item.phone}</td>
                    {activeTab === 'trainers' && (
                      <td className="p-6">
                        <div className="flex flex-wrap gap-1">
                          {(item as Trainer).specialization.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[10px] bg-red-600/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                              {s}
                            </span>
                          ))}
                          {(item as Trainer).specialization.length > 2 && (
                            <span className="text-[10px] text-zinc-600 font-bold">+{(item as Trainer).specialization.length - 2}</span>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className="bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(activeTab === 'users' ? filteredUsers : filteredTrainers).length === 0 && (
            <div className="p-20 text-center">
              <Search className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 font-bold uppercase tracking-widest">No results found</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setSelectedItem(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Details</h2>
                <button onClick={() => setSelectedItem(null)} className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-zinc-800 flex items-center justify-center text-4xl font-black text-white">
                    {selectedItem.name[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{selectedItem.name}</h3>
                    <p className="text-red-500 font-bold uppercase tracking-widest text-sm">{selectedItem.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black p-6 rounded-2xl border border-white/5">
                    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Email Address</div>
                    <div className="text-white font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-red-600" /> {selectedItem.email}
                    </div>
                  </div>
                  <div className="bg-black p-6 rounded-2xl border border-white/5">
                    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Phone Number</div>
                    <div className="text-white font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-600" /> {selectedItem.phone}
                    </div>
                  </div>
                  {selectedItem.role === 'trainer' && (
                    <>
                      <div className="bg-black p-6 rounded-2xl border border-white/5">
                        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Experience</div>
                        <div className="text-white font-bold flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-red-600" /> {(selectedItem as Trainer).experience} Years
                        </div>
                      </div>
                      <div className="bg-black p-6 rounded-2xl border border-white/5">
                        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Charges</div>
                        <div className="text-white font-bold flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" /> ₹{(selectedItem as Trainer).charges} / session
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {selectedItem.role === 'trainer' && (
                  <div className="space-y-4">
                    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Specializations</div>
                    <div className="flex flex-wrap gap-2">
                      {(selectedItem as Trainer).specialization.map((s, i) => (
                        <span key={i} className="bg-red-600/10 text-red-500 border border-red-600/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Internal ID</div>
                  <div className="text-zinc-600 font-mono text-xs bg-black p-4 rounded-xl border border-white/5">
                    {selectedItem.id}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
