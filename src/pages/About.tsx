import React from 'react';
import { Dumbbell, Target, Shield, Users, Trophy, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
            alt="About Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Empowering <span className="text-red-600">Champions</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-medium">
            MuscleMentor is more than a marketplace. It's a community dedicated to the pursuit of physical and mental excellence.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Our Mission</h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                We believe that everyone deserves access to high-quality, professional fitness guidance. Our mission is to bridge the gap between world-class trainers and individuals who are ready to transform their lives.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Target className="text-red-600" />, title: "Precision Matching", desc: "Finding the right trainer shouldn't be a guessing game." },
                  { icon: <Shield className="text-red-600" />, title: "Trust & Safety", desc: "We verify every professional to ensure you're in safe hands." },
                  { icon: <Heart className="text-red-600" />, title: "Community First", desc: "We celebrate every victory, no matter how small." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="bg-black p-3 rounded-2xl h-fit">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" 
                  alt="Mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-12 -left-12 bg-red-600 p-12 rounded-3xl hidden md:block">
                <Dumbbell className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Our Core Values</h2>
            <p className="text-zinc-400">The principles that drive everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Integrity", desc: "We maintain the highest standards of transparency and honesty in our trainer verification process." },
              { title: "Excellence", desc: "We strive for excellence in our platform's user experience and the quality of trainers we host." },
              { title: "Inclusivity", desc: "Fitness is for everyone. We welcome all backgrounds, body types, and fitness levels." }
            ].map((value, i) => (
              <div key={i} className="bg-zinc-900 p-10 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
