import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 p-1.5 rounded-lg">
                <Dumbbell className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">MuscleMentor</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Connecting fitness enthusiasts with the best personal trainers. Transform your body, elevate your mind, and reach your peak potential.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Platform</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/browse" className="hover:text-white transition-colors">Browse Trainers</Link></li>
              <li><Link to="/trainer-signup" className="hover:text-white transition-colors">Join as Trainer</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500" />
                <span>musclementor77@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} MuscleMentor. All rights reserved. Built for champions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
