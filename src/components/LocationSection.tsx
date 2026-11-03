import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Copy, Check, Clock, ShieldCheck, Car } from 'lucide-react';
import type { StudioConfig } from '../types';
import { spaAudio } from '../utils/sound';

interface LocationSectionProps {
  config: StudioConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const exactAddress = config.address || 'Calle 34A #84-35 Barrio Santa Teresita, Edificio Sagrado Corazón 2, Laureles, Medellín';

  const copyAddress = () => {
    navigator.clipboard.writeText(exactAddress);
    spaAudio.playSoftClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Calle 34A #84-35 Barrio Santa Teresita Edificio Sagrado Corazon 2 Laureles Medellin'
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    'Calle 34A #84-35 Laureles Medellin'
  )}`;

  return (
    <section
      id="ubicacion"
      style={{
        padding: '5rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(8, 7, 12, 0) 0%, rgba(22, 19, 34, 0.45) 50%, rgba(8, 7, 12, 0) 100%)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', marginInline: 'auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Compass size={13} color="var(--gold-warm)" />
            <span>Santuario en Laureles • Santa Teresita</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}
          >
            Encuéntranos en el Corazón de <span className="text-gold-shimmer">Medellín</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Un sector arborizado, residencial y seguro concebido para que tu experiencia de serenidad comience desde el momento en que inicias el trayecto.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}
        >
          {/* Card 1: Address Details & Navigation CTAs */}
          <div
            className="luxury-glass"
            style={{
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
                Edificio Sagrado Corazón 2
              </div>

              {/* Address Highlight Box */}
              <div
                style={{
                  background: 'rgba(14, 12, 22, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-warm)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      DIRECCIÓN PRIVADA
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.94rem', fontWeight: 500, lineHeight: 1.5 }}>
                      {exactAddress}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyAddress}
                  aria-label="Copiar dirección exacta"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    color: 'var(--text-secondary)',
                    padding: '0.55rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                  title="Copiar dirección"
                >
                  {copied ? <Check size={16} color="#4ADE80" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Protocol Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock size={16} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: '#FFFFFF' }}>Horario de Atención:</strong> Lunes a Sábado: 8:00 AM – 7:00 PM (Acceso exclusivamente bajo reserva previa confirmada).
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={16} color="#4ADE80" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: '#FFFFFF' }}>Protocolo de Entrada:</strong> Al llegar al edificio, tocar citófono anunciando cita privada con Rosangel Benítez.
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '0.8rem',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <Navigation size={15} />
                <span>Google Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '130px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'var(--text-primary)',
                  borderRadius: '12px',
                  padding: '0.8rem',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <Car size={15} color="var(--gold-warm)" />
                <span>Waze</span>
              </a>
            </div>
          </div>

          {/* Card 2: Visual Map / Sanctuary Atmosphere Preview */}
          <div
            className="luxury-glass"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '360px',
              position: 'relative'
            }}
          >
            <div style={{ height: '100%', minHeight: '320px', position: 'relative' }}>
              <img
                src="/images/studio-sanctuary.jpg"
                alt="Atmósfera de la Suite Privada en Laureles"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.2) 0%, rgba(14, 12, 22, 0.9) 100%)'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(8, 7, 12, 0.82)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '16px',
                  padding: '1.2rem'
                }}
              >
                <div style={{ fontSize: '0.74rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                  FACILIDAD DE PARQUEO & ACCESO
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  Zona residencial con bahías de parqueo tranquilo sobre la Calle 34A y fácil acceso desde la Avenida Nutibara y la Carrera 80.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
