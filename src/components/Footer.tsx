import React from 'react';
import { MapPin, Shield, Sparkles, MessageCircle } from 'lucide-react';
import type { StudioConfig } from '../types';

interface FooterProps {
  config: StudioConfig;
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenBooking,
  onOpenClientPortal,
  onOpenAdmin
}) => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.95) 0%, #040307 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.16)',
        padding: '5rem 0 2.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Top Footer Bento */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Presentation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  padding: '2px',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.25)',
                  flexShrink: 0
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Minha Beleza"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#FFFFFF'
                  }}
                >
                  MINHA BELEZA
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
                  {config.therapistName}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Masoterapia clínica y cosmetología de autor en la intimidad de su suite residencial en Laureles, Medellín. Un oasis de serenidad para tu bienestar integral.
            </p>

            <div className="badge-gold" style={{ fontSize: '0.75rem' }}>
              <Sparkles size={12} />
              <span>Atención Exclusiva • Solo con Cita</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.92rem',
                letterSpacing: '0.08em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.2rem'
              }}
            >
              Navegación
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <button
                  onClick={() => scrollTo('inicio')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('santuario')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  El Santuario & Rosangel Benítez
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('servicios')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Carta de Tratamientos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ubicacion')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Ubicación & Acceso a la Suite
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenClientPortal}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-warm)', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                >
                  Portal de Huéspedes (Mis Citas)
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.92rem',
                letterSpacing: '0.08em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.2rem'
              }}
            >
              Contacto & Concierge
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={15} color="var(--gold-warm)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  Calle 34A #84-35, Santa Teresita, Laureles, Medellín
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MessageCircle size={15} color="#4ADE80" style={{ flexShrink: 0 }} />
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  WhatsApp: {config.phone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--purple-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <a
                  href="https://instagram.com/minhabelezaspa411"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  {config.instagram}
                </a>
              </div>

              <div style={{ marginTop: '0.8rem' }}>
                <button
                  onClick={onOpenBooking}
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  Agendar Cita Privada
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {currentYear} Minha Beleza por {config.therapistName}. Todos los derechos reservados.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span>Protocolos de Bioseguridad Clínica</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Acceso administrativo interno"
            >
              <Shield size={12} />
              <span>Suite Ejecutiva</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
