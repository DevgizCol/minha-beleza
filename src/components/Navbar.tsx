import React, { useState, useEffect } from 'react';
import { Calendar, Search, Shield, Menu, X, MapPin, Volume2, VolumeX, Globe } from 'lucide-react';
import type { StudioConfig } from '../types';
import type { CurrencyCode } from '../utils/currency';
import { getAssetUrl } from '../utils/assets';

interface NavbarProps {
  config: StudioConfig;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  currency = 'COP',
  onCurrencyChange,
  isSoundEnabled = true,
  onToggleSound,
  onOpenBooking,
  onOpenClientPortal,
  onOpenAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currencies: CurrencyCode[] = ['COP', 'USD', 'EUR'];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled
            ? 'rgba(8, 7, 12, 0.88)'
            : 'linear-gradient(180deg, rgba(8, 7, 12, 0.92) 0%, rgba(8, 7, 12, 0.4) 60%, transparent 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.18)' : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled ? '0 16px 36px rgba(0, 0, 0, 0.65)' : 'none'
        }}
      >
        {/* Top Luxury Announcement Bar */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'linear-gradient(90deg, rgba(37, 11, 59, 0.6) 0%, rgba(14, 12, 22, 0.8) 50%, rgba(37, 11, 59, 0.6) 100%)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            padding: '0.35rem 0',
            letterSpacing: '0.02em'
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={12} color="var(--gold-primary)" />
                <span>Laureles • Santa Teresita, Medellín</span>
              </span>
              <span className="badge-live-available" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                <span className="pulse-dot" />
                <span>Atención Exclusiva 1-a-1 • Solo con Cita</span>
              </span>
            </div>

            {/* Quick Controls: Currency Selector & Zen Audio */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              {onCurrencyChange && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '8px' }}>
                  <Globe size={11} color="var(--gold-warm)" />
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => onCurrencyChange(curr)}
                      style={{
                        background: currency === curr ? 'var(--gold-primary)' : 'transparent',
                        color: currency === curr ? '#08070C' : 'var(--text-muted)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '1px 5px',
                        fontSize: '0.68rem',
                        fontWeight: currency === curr ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      title={`Cambiar moneda a ${curr}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}

              {onToggleSound && (
                <button
                  onClick={onToggleSound}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isSoundEnabled ? 'var(--gold-light)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.7rem'
                  }}
                  title={isSoundEnabled ? 'Silenciar atmósfera zen' : 'Activar atmósfera zen'}
                >
                  {isSoundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span style={{ display: 'none' }}>Audio</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Nav Row */}
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Brand Identity / Haute Logo */}
          <div
            onClick={() => scrollTo('inicio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                background: '#FFFFFF',
                padding: '2px',
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={getAssetUrl('logo.jpeg')}
                alt="Minha Beleza"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  lineHeight: 1.1,
                  color: 'var(--text-pure)'
                }}
              >
                MINHA BELEZA
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.82rem',
                  fontStyle: 'italic',
                  color: 'var(--gold-light)',
                  letterSpacing: '0.04em'
                }}
              >
                {config.therapistName || 'Rosangel Benítez'} • Alta Estética
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.8rem'
            }}
            className="nav-desktop-links"
          >
            {[
              { label: 'El Santuario', id: 'santuario' },
              { label: 'Carta de Tratamientos', id: 'servicios' },
              { label: 'Ubicación & Suite', id: 'ubicacion' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  transition: 'color 0.25s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Client Portal Button */}
            <button
              onClick={onOpenClientPortal}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                color: 'var(--text-primary)',
                padding: '0.5rem 0.95rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              className="client-portal-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.22)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              title="Consultar o gestionar mi reserva"
            >
              <Search size={14} color="var(--gold-warm)" />
              <span className="btn-label-desktop">Mis Citas</span>
            </button>

            {/* Primary Booking Trigger */}
            <button
              onClick={onOpenBooking}
              className="btn-gold"
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <Calendar size={14} />
              <span>Agendar Sesión</span>
            </button>

            {/* Admin Key Button (Discreet) */}
            <button
              onClick={onOpenAdmin}
              aria-label="Panel Privado de Administración"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-muted)',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--gold-primary)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <Shield size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Menú principal"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'rgba(8, 7, 12, 0.98)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              animation: 'slideUpToast 0.25s ease forwards'
            }}
          >
            <button
              onClick={() => scrollTo('santuario')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '0.5rem 0'
              }}
            >
              El Santuario Residencial
            </button>
            <button
              onClick={() => scrollTo('servicios')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '0.5rem 0'
              }}
            >
              Carta de Tratamientos
            </button>
            <button
              onClick={() => scrollTo('ubicacion')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '0.5rem 0'
              }}
            >
              Ubicación & Contacto
            </button>
            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '0.5rem 0' }} />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClientPortal();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--text-primary)',
                padding: '0.75rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <Search size={16} color="var(--gold-warm)" />
              <span>Consultar Mis Citas</span>
            </button>
          </div>
        )}
      </header>

      {/* Global CSS media query override for desktop/mobile nav */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .client-portal-btn .btn-label-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
