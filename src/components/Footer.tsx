import React from 'react';
import { MapPin, Shield, Sparkles, MessageCircle, Scale, Lock, FileText, Cookie } from 'lucide-react';
import type { StudioConfig } from '../types';
import { getAssetUrl } from '../utils/assets';
import type { LegalDocType } from './LegalModals';

interface FooterProps {
  config: StudioConfig;
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  onOpenAdmin: () => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenBooking,
  onOpenClientPortal,
  onOpenAdmin,
  onOpenLegal
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('mb:open-cookie-settings'));
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
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
                  src={getAssetUrl('logo.jpeg')}
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
                  Menú de Tratamientos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ubicacion')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Ubicación & Acceso Privado
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenClientPortal}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                >
                  Gestionar Mi Cita (Portal Clientes)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Section */}
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
              Marco Legal & Privacidad
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem' }}>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <FileText size={14} color="var(--gold-primary)" />
                  <span>Términos del Servicio & Cancelación</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Lock size={14} color="var(--gold-primary)" />
                  <span>Tratamiento de Datos (Ley 1581)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('informed-consent')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Scale size={14} color="var(--gold-primary)" />
                  <span>Consentimiento Médico-Estético</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleOpenCookieSettings}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Cookie size={14} color="var(--gold-primary)" />
                  <span>Configuración de Cookies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
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
              Concierge Privado
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{config.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <a
                  href={`https://wa.me/${config.whatsapp}?text=Hola%20Rosangel,%20deseo%20consultar%20sobre%20tus%20servicios%20en%20Minha%20Beleza`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  {config.phone}
                </a>
              </div>
              <div>
                <a
                  href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 500 }}
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          {/* Desarrollado por DevGiz with link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>Desarrollado por</span>
            <a
              href="https://devgiz.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--gold-light)',
                fontWeight: 700,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(212, 175, 55, 0.5)',
                paddingBottom: '2px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderBottomColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--gold-light)';
                e.currentTarget.style.borderBottomColor = 'rgba(212, 175, 55, 0.5)';
              }}
            >
              DevGiz ↗
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <span>Protocolos de Bioseguridad Clínica Acreditada</span>
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
