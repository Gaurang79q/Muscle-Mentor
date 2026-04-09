import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Clock, IndianRupee, ShieldCheck, 
  Mail, Phone, Calendar, Award, CheckCircle2, 
  ArrowLeft, MessageSquare, Instagram, Twitter,
  Send, User as UserIcon, Lock, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const TrainerProfile = () => {
  const { id } = useParams();
  const { trainers, user, addReview, recordInteraction } = useApp();
  const trainer = trainers.find(t => t.id === id);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center px-4 overflow-hidden">
        {/* Blurred Background Content */}
        <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none">
          <div className="max-w-7xl mx-auto py-24 px-4">
            <div className="h-40 bg-zinc-800 rounded-3xl mb-12" />
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 h-[600px] bg-zinc-800 rounded-3xl" />
              <div className="h-[400px] bg-zinc-800 rounded-3xl" />
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center">
          <div className="w-20 h-20 bg-red-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
            Members Only <span className="text-red-600">Access</span>
          </h2>
          <p className="text-zinc-400 mb-10 leading-relaxed">
            Join the MuscleMentor community to view trainer profiles, read reviews, and start your fitness journey.
          </p>
          <div className="space-y-4">
            <Link 
              to="/signup" 
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
            >
              Create Account <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="flex items-center justify-center w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black text-white uppercase mb-4">Trainer Not Found</h2>
        <Link to="/browse" className="text-red-600 font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Browse
        </Link>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage({ type: 'error', text: 'Please login to leave a review' });
      return;
    }
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setMessage(null);
    
    // Simulate API delay
    setTimeout(() => {
      const result = addReview(trainer.id, rating, comment);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setComment('');
        setRating(5);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Hero Header */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src={trainer.avatar} 
          alt={trainer.name} 
          className="w-full h-full object-cover opacity-50 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-12">
          <Link to="/browse" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Trainers
          </Link>
          <div className="flex flex-col md:flex-row items-end gap-8">
            <div className="relative">
              <img 
                src={trainer.avatar} 
                alt={trainer.name} 
                className="w-48 h-48 rounded-3xl object-cover border-4 border-black shadow-2xl"
              />
              {trainer.isVerified && (
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-full shadow-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  {trainer.name}
                </h1>
                <div className="bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-white font-bold">{trainer.averageRating > 0 ? trainer.averageRating : 'New'}</span>
                  <span className="text-zinc-500 text-sm">({trainer.reviews.length} reviews)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 text-zinc-300 font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-600" />
                  <span>{trainer.experience} Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="capitalize">{trainer.mode} Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <span>{trainer.age} Years Old</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Bio & Details */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-red-600 pl-6">Professional Bio</h2>
              <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                {trainer.bio}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-red-600 pl-6">Specializations</h2>
              <div className="flex flex-wrap gap-4">
                {trainer.specialization.map((spec, i) => (
                  <div key={i} className="bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-3 group hover:border-red-600 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-red-600" />
                    <span className="text-white font-bold text-lg">{spec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-l-4 border-red-600 pl-6">Client Reviews</h2>
                <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-white font-bold text-xl">{trainer.averageRating}</span>
                  <span className="text-zinc-500 text-sm">/ 5.0</span>
                </div>
              </div>

              {/* Review Form */}
              {user && user.role === 'client' && (
                <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-6">Leave a Review</h3>
                  
                  {!user.interactions?.includes(trainer.id) ? (
                    <div className="bg-red-600/10 border border-red-600/20 p-6 rounded-2xl text-center">
                      <Lock className="w-8 h-8 text-red-600 mx-auto mb-4" />
                      <p className="text-zinc-400 font-medium">
                        You must contact this trainer before you can leave a review.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-6">
                      {message && (
                        <div className={`p-4 rounded-xl text-sm font-bold ${
                          message.type === 'success' ? 'bg-green-600/10 text-green-500 border border-green-600/20' : 'bg-red-600/10 text-red-500 border border-red-600/20'
                        }`}>
                          {message.text}
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-400 font-bold">Rating:</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setRating(s)}
                              className={`p-1 transition-colors ${s <= rating ? 'text-yellow-500' : 'text-zinc-700'}`}
                            >
                              <Star className={`w-8 h-8 ${s <= rating ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience with this trainer..."
                          className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white focus:border-red-600 transition-colors min-h-[150px] outline-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all"
                      >
                        {isSubmitting ? 'Posting...' : 'Post Review'}
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {trainer.reviews.length > 0 ? (
                  trainer.reviews.map((review) => (
                    <div key={review.id} className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-zinc-500" />
                          </div>
                          <div>
                            <div className="text-white font-bold">{review.clientName}</div>
                            <div className="text-zinc-500 text-xs">{new Date(review.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-zinc-800'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-400 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
                    <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 font-medium">No reviews yet. Be the first to leave one!</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Contact & Pricing */}
          <div className="space-y-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-white/10 sticky top-24">
              <div className="mb-8">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2">Training Charges</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white flex items-center">
                    <IndianRupee className="w-8 h-8" /> {trainer.charges}
                  </span>
                  <span className="text-zinc-500 font-medium">/ session</span>
                </div>
                <p className="text-zinc-500 text-sm mt-2">Monthly packages available on request.</p>
              </div>

              <div className="space-y-4 mb-8">
                <a 
                  href={`tel:${trainer.phone}`}
                  onClick={() => recordInteraction(trainer.id)}
                  className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  <Phone className="w-5 h-5" /> Call Trainer
                </a>
                <a 
                  href={`mailto:${trainer.email}`}
                  onClick={() => recordInteraction(trainer.id)}
                  className="flex items-center justify-center gap-3 w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold transition-colors"
                >
                  <Mail className="w-5 h-5" /> Email Trainer
                </a>
                <button 
                  onClick={() => recordInteraction(trainer.id)}
                  className="flex items-center justify-center gap-3 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  <MessageSquare className="w-5 h-5" /> WhatsApp Chat
                </button>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h4 className="text-white font-bold mb-4">Social Profiles</h4>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-zinc-800 rounded-xl hover:text-red-500 transition-colors"><Instagram /></a>
                  <a href="#" className="p-3 bg-zinc-800 rounded-xl hover:text-red-500 transition-colors"><Twitter /></a>
                </div>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 p-8 rounded-3xl">
              <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> MuscleMentor Verified
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This trainer has provided valid government identification and fitness certifications. We recommend discussing goals and terms before making payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
