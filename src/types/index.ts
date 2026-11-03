export interface StudioConfig {
  therapistName: string;
  therapistTitle: string;
  residenceTitle: string;
  residenceSubtitle: string;
  residenceContext: string;
  therapistBio: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  openingHours: string;
  studioImage: string;
  portraitImage: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Masoterapia' | 'Estética Facial' | 'Cuidado Corporal' | 'Rituales Signature' | string;
  duration: number; // minutes
  price: number; // COP
  featured?: boolean;
  active: boolean;
  image: string;
  description: string;
  benefits: string[];
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface AppointmentItem {
  id: string; // e.g. MB-8419
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number;
  price: number;
  notes?: string;
  adminNotes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StatsOverview {
  totalAppointments: number;
  activeAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  estimatedRevenue: number;
  servicesCount: number;
}
