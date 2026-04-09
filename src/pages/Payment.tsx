import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle2, IndianRupee, ArrowRight, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Payment = () => {
  const { user, payMembership } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (user) {
        payMembership(user.id);
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 bg-zinc-900 p-12 rounded-3xl border border-white/10">
          <div className="bg-green-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Payment Successful!</h2>
          <p className="text-zinc-400">Your trainer profile is now active and visible to all clients on MuscleMentor.</p>
          <button 
            onClick={() => navigate('/trainer-dashboard')}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Trainer Membership</h1>
          <p className="text-zinc-500">Activate your profile to start connecting with clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plan Details */}
          <div className="space-y-8">
            <div className="bg-zinc-900 p-10 rounded-3xl border-2 border-red-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-6 py-2 rounded-bl-2xl font-black uppercase text-xs tracking-widest">
                Monthly Plan
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Pro Trainer Access</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black text-white flex items-center">
                  <IndianRupee className="w-10 h-10" /> 250
                </span>
                <span className="text-zinc-500 font-medium">/ month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Public Profile Visibility",
                  "Advanced Search Ranking",
                  "Direct Client Contact",
                  "Profile Analytics",
                  "Priority Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your payment is secure. We use industry-standard encryption to protect your financial data. Membership can be cancelled at any time.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-zinc-900 p-10 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-red-600" /> Payment Details
            </h3>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Cardholder Name</label>
                <input 
                  type="text" required
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                  <input 
                    type="text" required
                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Expiry Date</label>
                  <input 
                    type="text" required
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input 
                      type="text" required
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-600"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-8"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Pay ₹250 Now <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
