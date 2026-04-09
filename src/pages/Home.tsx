import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Users, Trophy, Zap, Star, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const StatsSection = () => {
  const { stats, isAdmin } = useApp();
  
  if (!isAdmin) return null;
  
  return (
    <section className="bg-zinc-900 py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Our Growing <span className="text-red-600">Community</span>
          </h2>
          <p className="text-zinc-500">Real-time stats of people transforming their lives.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <Link to={isAdmin ? "/admin-dashboard" : "#"} className={isAdmin ? "cursor-pointer" : "cursor-default"}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`p-8 bg-black rounded-[2.5rem] border border-white/5 transition-all ${isAdmin ? 'hover:border-red-600/50' : ''}`}
            >
              <UserPlus className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <div className="text-6xl font-black text-white mb-2">{stats.userCount}</div>
              <div className="text-zinc-500 font-bold uppercase tracking-widest">Clients Joined</div>
            </motion.div>
          </Link>
          <Link to={isAdmin ? "/admin-dashboard" : "#"} className={isAdmin ? "cursor-pointer" : "cursor-default"}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`p-8 bg-black rounded-[2.5rem] border border-white/5 transition-all ${isAdmin ? 'hover:border-red-600/50' : ''}`}
            >
              <Trophy className="w-12 h-12 text-red-600 mx-auto mb-6" />
              <div className="text-6xl font-black text-white mb-2">{stats.trainerCount}</div>
              <div className="text-zinc-500 font-bold uppercase tracking-widest">Expert Trainers</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
              Find Your <span className="text-red-600">Mentor</span><br />
              Build Your <span className="text-red-600">Muscle</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-medium">
              Connect with verified personal trainers who will push you beyond your limits. Your transformation starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/browse" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                Find a Trainer <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/trainer-signup" 
                className="bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              >
                Join as a Trainer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Why Choose <span className="text-red-600">MuscleMentor?</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We provide the tools and connections you need to achieve your fitness goals with professional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-10 h-10 text-red-600" />,
                title: "Verified Professionals",
                desc: "Every trainer on our platform undergoes a rigorous document verification process to ensure authenticity."
              },
              {
                icon: <Zap className="w-10 h-10 text-red-600" />,
                title: "Flexible Training",
                desc: "Choose between online sessions, in-person training, or a hybrid model that fits your lifestyle."
              },
              {
                icon: <Trophy className="w-10 h-10 text-red-600" />,
                title: "Expert Guidance",
                desc: "Filter trainers by specialization, experience, and price to find the perfect match for your needs."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-zinc-900 p-10 rounded-3xl border border-white/5 hover:border-red-600/50 transition-colors"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <section className="py-24 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
            Join thousands of others who have found their perfect fitness partner.
          </p>
          <Link 
            to="/signup" 
            className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter hover:scale-105 transition-transform inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
