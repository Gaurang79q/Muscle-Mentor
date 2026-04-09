export type UserRole = 'client' | 'trainer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  password?: string;
  interactions?: string[];
}

export interface Review {
  id: string;
  trainerId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Trainer extends User {
  role: 'trainer';
  age: number;
  dob: string;
  gender: 'male' | 'female' | 'other';
  experience: number;
  specialization: string[];
  mode: 'online' | 'offline' | 'both';
  charges: number;
  bio: string;
  isVerified: boolean;
  isActive: boolean;
  membershipStatus: 'active' | 'inactive';
  documents: {
    birthCertificate?: string;
    govId?: string;
    certification?: string;
  };
  reviews: Review[];
  averageRating: number;
}

export interface FilterOptions {
  maxPrice: number;
  gender: string;
  mode: string;
  minExperience: number;
  minAge: number;
  maxAge: number;
  specializations: string[];
}
