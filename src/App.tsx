import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SanctuaryStory } from './components/SanctuaryStory';
import { ServicesCatalog } from './components/ServicesCatalog';
import { LocationSection } from './components/LocationSection';
import { BookingModal } from './components/BookingModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ToastContainer, type ToastMessage } from './components/Toast';
import { api } from './services/api';
import type { StudioConfig, ServiceItem, AppointmentItem } from './types';
import type { CurrencyCode } from './utils/currency';
import { spaAudio } from './utils/sound';
import { MessageCircle, Calendar } from 'lucide-react';

export const App: React.FC = () => {
  const [config, setConfig] = useState<StudioConfig | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Currency & Sound State
  const [currency, setCurrency] = useState<CurrencyCode>('COP');
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(spaAudio.enabled);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const [loadedConfig, loadedServices] = await Promise.all([
          api.getConfig(),
          api.getServices()
        ]);
        setConfig(loadedConfig);
        setServices(loadedServices);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleOpenBooking = (service?: ServiceItem) => {
    spaAudio.playSoftClick();
    if (service) {
      setPreselectedService(service);
    } else {
      setPreselectedService(null);
    }
    setIsBookingOpen(true);
  };

  const handleExploreServices = () => {
    spaAudio.playSoftClick();
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextState = spaAudio.toggleSound();
    setIsSoundEnabled(nextState);
    addToast('info', nextState ? 'Atmósfera Zen Activada' : 'Sonido Silenciado');
  };

  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    spaAudio.playSoftClick();
    setCurrency(newCurr);
    addToast('info', `Moneda ajustada a ${newCurr}`);
  };

  const handleAppointmentCreated = (app: AppointmentItem) => {
    addToast(
      'success',
      '¡Reserva Registrada en Suite!',
      `Tu código es ${app.id}. Te esperamos el ${app.date} a las ${app.time}.`
    );
  };

  if (loading || !config) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg-deep)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem'
        }}
      >
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--gold-primary)',
            boxShadow: '0 0 35px rgba(212, 175, 55, 0.35)',
            background: '#FFFFFF',
            padding: '3px',
            animation: 'pulseGlowRing 2.5s infinite'
          }}
        >
          <img
            src="/logo.jpeg"
            alt="Minha Beleza"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            color: 'var(--gold-light)'
          }}
        >
          MINHA BELEZA
        </div>
        <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Preparando tu santuario privado...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-deep)' }}>
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Haute Navigation Bar */}
      <Navbar
        config={config}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        onOpenBooking={() => handleOpenBooking()}
        onOpenClientPortal={() => {
          spaAudio.playSoftClick();
          setIsClientPortalOpen(true);
        }}
        onOpenAdmin={() => {
          spaAudio.playSoftClick();
          setIsAdminOpen(true);
        }}
      />

      {/* Main Sanctuary Experience */}
      <main style={{ flexGrow: 1 }}>
        <Hero
          config={config}
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        <SanctuaryStory
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        <ServicesCatalog
          services={services}
          currency={currency}
          onSelectServiceToBook={(srv) => handleOpenBooking(srv)}
        />

        <LocationSection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenBooking={() => handleOpenBooking()}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Concierge Action Buttons */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 850,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          alignItems: 'flex-end'
        }}
      >
        {/* Floating WhatsApp Concierge */}
        <a
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
            '¡Hola Rosangel! Deseo solicitar información o coordinar una atención en Minha Beleza.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.45)',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          title="Concierge WhatsApp Directo"
        >
          <MessageCircle size={26} />
        </a>

        {/* Floating Quick Book Button */}
        <button
          onClick={() => handleOpenBooking()}
          className="btn-gold"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.5rem',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer'
          }}
        >
          <Calendar size={16} />
          <span>Agendar Cita</span>
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        preselectedService={preselectedService}
        config={config}
        currency={currency}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {/* Client Portal Modal */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        config={config}
        currency={currency}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onConfigUpdated={(newCfg) => {
          setConfig(newCfg);
          addToast('success', 'Configuración de suite actualizada');
        }}
        services={services}
        onServicesUpdated={(newSrvs) => {
          setServices(newSrvs);
          addToast('success', 'Catálogo de tratamientos actualizado');
        }}
      />
    </div>
  );
};

export default App;
