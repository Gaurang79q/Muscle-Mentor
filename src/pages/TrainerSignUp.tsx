import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, User, Mail, Phone, Lock, 
  Calendar, Award, MapPin, IndianRupee, 
  FileText, Upload, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Trainer } from '../types';
import { SPECIALIZATIONS } from '../constants';

const TrainerSignUp = () => {
  const { registerTrainer } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<Trainer>>({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: 25,
    dob: '',
    gender: 'male',
    experience: 2,
    specialization: [],
    mode: 'both',
    charges: 1000,
    bio: '',
    avatar: '',
    documents: {}
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'avatar') {
          setFormData(prev => ({ ...prev, avatar: reader.result as string }));
        } else {
          setFormData(prev => ({
            ...prev,
            documents: {
              ...prev.documents,
              [field]: reader.result as string
            }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization?.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...(prev.specialization || []), spec]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      if (!formData.documents?.govId) {
        setError('Government ID Proof is required for verification.');
        return;
      }
      const result = await registerTrainer(formData);
      if (result?.success) {
        navigate('/trainer-dashboard');
      } else {
        setError(result?.message || 'Registration failed');
      }
    }
  };

  const specs = SPECIALIZATIONS;

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">MuscleMentor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Join as a Trainer</h1>
          <p className="text-zinc-500">Share your expertise and grow your fitness business</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-red-600 text-white scale-110' : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-600/10 border border-red-600/20 p-6 rounded-3xl text-red-500 font-bold text-center mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-white/10 space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center justify-center mb-8 p-6 bg-black border border-white/10 rounded-2xl">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-zinc-600" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                    <Upload className="w-6 h-6 text-white" />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'avatar')}
                      className="hidden" 
                    />
                  </label>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-white font-bold text-sm">Profile Picture</div>
                  <div className="text-zinc-500 text-xs">Upload a professional photo of yourself</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="date" required
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Age</label>
                  <input 
                    type="number" required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="password" required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Professional Details</h2>
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {specs.map(s => (
                    <button
                      key={s} type="button"
                      onClick={() => handleSpecToggle(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                        formData.specialization?.includes(s) ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-zinc-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Years of Experience</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="number" required
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Training Mode</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <select 
                      value={formData.mode}
                      onChange={(e) => setFormData({...formData, mode: e.target.value as any})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    >
                      <option value="online">Online Only</option>
                      <option value="offline">Offline Only</option>
                      <option value="both">Both Online & Offline</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Charges per Session (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="number" required
                      value={formData.charges}
                      onChange={(e) => setFormData({...formData, charges: parseInt(e.target.value)})}
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Professional Bio</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell potential clients about your training style and philosophy..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Verification Documents</h2>
              <p className="text-zinc-500 text-sm mb-8">Please upload clear copies of the following documents to verify your profile.</p>
              
              {[
                { label: "Government ID Proof", key: "govId", required: true },
                { label: "Certification Proof (Optional)", key: "certification", required: false }
              ].map((doc) => (
                <div key={doc.key} className="p-6 bg-black border border-white/10 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{doc.label}</div>
                      <div className="text-zinc-500 text-xs">
                        {doc.required ? 'Required • PDF, JPG or PNG (Max 5MB)' : 'Optional • PDF, JPG or PNG (Max 5MB)'}
                      </div>
                    </div>
                  </div>
                  <label className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    formData.documents?.[doc.key as keyof typeof formData.documents] 
                      ? 'bg-green-600/20 text-green-500 border border-green-500/50' 
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}>
                    {formData.documents?.[doc.key as keyof typeof formData.documents] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Upload
                      </>
                    )}
                    <input 
                      type="file" 
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileChange(e, doc.key)}
                      className="hidden" 
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-8">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all"
              >
                Back
              </button>
            )}
            <button 
              type="submit"
              className="flex-[2] bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              {step === 3 ? "Complete Registration" : "Next Step"} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerSignUp;
