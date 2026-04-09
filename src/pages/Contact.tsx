import React from 'react';
import { Mail, MapPin, Send, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">Get In <span className="text-red-600">Touch</span></h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Have questions about the platform? Our team is here to help you on your fitness journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Contact Information</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Whether you're a trainer looking to join or a client needing assistance, we're just a message away.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email Us</h4>
                  <p className="text-zinc-500">musclementor77@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Our Office</h4>
                  <p className="text-zinc-500">123 Fitness Plaza, HSR Layout</p>
                  <p className="text-zinc-500">Bangalore, Karnataka 560102</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h4 className="text-white font-bold mb-6">Follow Our Community</h4>
              <div className="flex gap-4">
                <a href="#" className="p-4 bg-zinc-900 rounded-2xl hover:text-red-500 transition-colors"><Instagram /></a>
                <a href="#" className="p-4 bg-zinc-900 rounded-2xl hover:text-red-500 transition-colors"><Twitter /></a>
                <a href="#" className="p-4 bg-zinc-900 rounded-2xl hover:text-red-500 transition-colors"><Facebook /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 p-10 md:p-12 rounded-3xl border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">First Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Last Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Subject</label>
                <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600">
                  <option>General Inquiry</option>
                  <option>Trainer Support</option>
                  <option>Billing Question</option>
                  <option>Report an Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Message</label>
                <textarea rows={5} className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600" placeholder="How can we help you?"></textarea>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
