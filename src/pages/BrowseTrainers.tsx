import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, ChevronDown, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TrainerCard from '../components/TrainerCard';
import { FilterOptions } from '../types';
import { SPECIALIZATIONS } from '../constants';

const BrowseTrainers = () => {
  const { trainers, user } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: 5000,
    gender: 'all',
    mode: 'all',
    minExperience: 0,
    minAge: 18,
    maxAge: 65,
    specializations: []
  });

  const filteredTrainers = useMemo(() => {
    return trainers.filter(trainer => {
      // Only show active trainers
      if (!trainer.isActive || trainer.membershipStatus !== 'active') return false;

      const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trainer.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesPrice = trainer.charges <= filters.maxPrice;
      const matchesGender = filters.gender === 'all' || trainer.gender === filters.gender;
      const matchesMode = filters.mode === 'all' || trainer.mode === filters.mode || trainer.mode === 'both';
      const matchesExp = trainer.experience >= filters.minExperience;
      const matchesAge = trainer.age >= filters.minAge && trainer.age <= filters.maxAge;
      const matchesSpec = filters.specializations.length === 0 || 
                         filters.specializations.some(s => trainer.specialization.includes(s));

      return matchesSearch && matchesPrice && matchesGender && matchesMode && matchesExp && matchesAge && matchesSpec;
    });
  }, [trainers, searchQuery, filters]);

  const allSpecializations = SPECIALIZATIONS;

  if (!user) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center px-4 overflow-hidden">
        {/* Blurred Background Content */}
        <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none">
          <div className="max-w-7xl mx-auto py-24 px-4">
            <div className="h-20 bg-zinc-800 rounded-3xl mb-12" />
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 bg-zinc-800 rounded-3xl" />
              ))}
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
            Join the MuscleMentor community to browse our elite trainers, view their profiles, and start your transformation.
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
          <p className="mt-8 text-zinc-500 text-sm">
            By joining, you agree to our <span className="text-zinc-400 hover:underline cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Browse <span className="text-red-600">Trainers</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Discover elite fitness professionals tailored to your goals. Use the filters to find your perfect match.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 space-y-8 sticky top-24 h-fit">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-black uppercase tracking-widest text-sm">Filters</h3>
                <button 
                  onClick={() => setFilters({
                    maxPrice: 5000,
                    gender: 'all',
                    mode: 'all',
                    minExperience: 0,
                    minAge: 18,
                    maxAge: 65,
                    specializations: []
                  })}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Max Price: ₹{filters.maxPrice}</label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full accent-red-600"
                />
              </div>

              {/* Gender */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFilters({...filters, gender: g})}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                        filters.gender === g ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Training Mode</label>
                <select 
                  value={filters.mode}
                  onChange={(e) => setFilters({...filters, mode: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
                >
                  <option value="all">All Modes</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Min Experience: {filters.minExperience}y</label>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={filters.minExperience}
                  onChange={(e) => setFilters({...filters, minExperience: parseInt(e.target.value)})}
                  className="w-full accent-red-600"
                />
              </div>

              {/* Specialization */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Specializations</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {allSpecializations.map(s => (
                    <label key={s} className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={filters.specializations.includes(s)}
                          onChange={(e) => {
                            const newSpecs = e.target.checked 
                              ? [...filters.specializations, s]
                              : filters.specializations.filter(item => item !== s);
                            setFilters({...filters, specializations: newSpecs});
                          }}
                          className="peer appearance-none w-5 h-5 border border-white/10 rounded-md bg-black checked:bg-red-600 checked:border-red-600 transition-all"
                        />
                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm transition-colors ${filters.specializations.includes(s) ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-bold"
              >
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </button>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-zinc-500 text-sm font-medium">
                Showing <span className="text-white font-bold">{filteredTrainers.length}</span> trainers
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                Sort by: <span className="text-white font-bold flex items-center gap-1 cursor-pointer">Featured <ChevronDown className="w-4 h-4" /></span>
              </div>
            </div>

            {/* Grid */}
            {filteredTrainers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTrainers.map(trainer => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-900/50 rounded-3xl border border-dashed border-white/10">
                <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No trainers found</h3>
                <p className="text-zinc-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-zinc-900 p-8 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-zinc-400"><X /></button>
            </div>
            
            <div className="space-y-8">
              {/* Reuse filter inputs here for mobile */}
              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Max Price: ₹{filters.maxPrice}</label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full accent-red-600"
                />
              </div>

              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFilters({...filters, gender: g})}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                        filters.gender === g ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Training Mode</label>
                <select 
                  value={filters.mode}
                  onChange={(e) => setFilters({...filters, mode: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
                >
                  <option value="all">All Modes</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Specializations</label>
                <div className="space-y-3">
                  {allSpecializations.map(s => (
                    <label key={s} className="flex items-center gap-3 cursor-pointer">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={filters.specializations.includes(s)}
                          onChange={(e) => {
                            const newSpecs = e.target.checked 
                              ? [...filters.specializations, s]
                              : filters.specializations.filter(item => item !== s);
                            setFilters({...filters, specializations: newSpecs});
                          }}
                          className="peer appearance-none w-6 h-6 border border-white/10 rounded-lg bg-black checked:bg-red-600 checked:border-red-600 transition-all"
                        />
                        <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-base ${filters.specializations.includes(s) ? 'text-white font-bold' : 'text-zinc-400'}`}>
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest mt-8"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseTrainers;
