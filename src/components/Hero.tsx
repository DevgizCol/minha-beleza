import React from 'react';
import { Calendar, Sparkles, ArrowRight, Star } from 'lucide-react';
import type { StudioConfig } from '../types';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  config: StudioConfig;
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenBooking, onExploreServices }) => {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '7.5rem',
        paddingBottom: '5.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Sutil halo orgánico cálido (No violeta, sin estridencias) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '580px',
          height: '580px',
          background: 'radial-gradient(circle, rgba(216, 178, 110, 0.05) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Asymmetric Editorial Grid (7:5) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.22fr) minmax(0, 0.98fr)',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-split-grid"
        >
          {/* Left Column: Author Manifesto & Typography */}
          <div style={{ textAlign: 'left' }}>
            {/* Studio Badge & Location Stamp */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                padding: '0.35rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(216, 178, 110, 0.08)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold-primary)',
                  display: 'inline-block'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-light)',
                  fontWeight: 600
                }}
              >
                Santuario Privado • Santa Teresita, Laureles
              </span>
            </div>

            {/* Monumental Editorial Headline with Masked Line Rise Animation */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 4.1rem)',
                fontWeight: 600,
                lineHeight: 1.14,
                letterSpacing: '-0.015em',
                color: 'var(--text-pure)',
                marginBottom: '1.4rem'
              }}
            >
              <span className="masked-line-wrap">
                <span className="masked-line-text">El Arte de Restaurar tu</span>
              </span>
              <span className="masked-line-wrap">
                <span className="masked-line-text masked-line-delay-1 text-gold-shimmer" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                  Bienestar & Esplendor Natural
                </span>
              </span>
            </h1>

            {/* Atelier Manifesto Description */}
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.38rem)',
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '620px',
                marginBottom: '2.4rem'
              }}
            >
              Una experiencia estética de atmósfera íntima y silencio terapéutico concebida por{' '}
              <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{config.therapistName}</strong>. 
              Biomecánica de masoterapia clínica, renovación dérmica y rituales capilares donde cada instante está consagrado a ti.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}
            >
              <button
                onClick={onOpenBooking}
                className="btn-gold"
              >
                <Calendar size={17} />
                <span>Reservar Cita Privada</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onExploreServices}
                className="btn-outline-gold"
              >
                <Sparkles size={16} />
                <span>Ver Carta de Tratamientos</span>
              </button>
            </div>

            {/* Trust Micro-Metrics Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-primary)' }}>
                  <Star size={14} fill="currentColor" />
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-pure)' }}>
                    4.98 / 5.0
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
                  140+ Reseñas de Pacientes
                </div>
              </div>

              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-pure)' }}>
                  1-a-1 Exclusivo
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
                  Privacidad y atención individual
                </div>
              </div>

              <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-pure)' }}>
                  +8 Años
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
                  Cosmetología Clínica Certificada
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Masterpiece Photographic Showcase (Neo-Kinpaku Frame) */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(216, 178, 110, 0.4) 0%, rgba(216, 178, 110, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
                boxShadow: 'var(--shadow-lux)'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'calc(var(--radius-lg) - 1px)',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  height: '520px'
                }}
              >
                <img
                  src={getAssetUrl('images/studio-sanctuary.jpg')}
                  alt="Minha Beleza Santuario Privado"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.03) brightness(0.95)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Viñeta sutil de calidez editorial */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(9, 8, 12, 0) 30%, rgba(9, 8, 12, 0.85) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Floating Seal & Identity Plate */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.4rem',
                    right: '1.4rem',
                    background: 'rgba(9, 8, 12, 0.82)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.65rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#FFFFFF',
                      overflow: 'hidden',
                      padding: '2px'
                    }}
                  >
                    <img
                      src={getAssetUrl('logo.jpeg')}
                      alt="Minha Beleza - Rosangel Benítez"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-pure)' }}>
                      Rosangel Benítez
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--gold-primary)', letterSpacing: '0.04em' }}>
                      Atelier de Masoterapia
                    </div>
                  </div>
                </div>

                {/* Bottom Signature Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    background: 'rgba(17, 15, 22, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.1rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', marginBottom: '0.2rem' }}>
                      Estándar Clínico
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: 'var(--text-pure)', fontWeight: 600 }}>
                      Bioseguridad & Aislamiento Total
                    </div>
                  </div>

                  <div className="badge-live-available">
                    <span className="pulse-dot" />
                    <span>Disponibilidad Hoy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center !important;
          }
          .hero-split-grid > div:first-child {
            text-align: center !important;
          }
          .hero-split-grid h1 {
            font-size: clamp(2.1rem, 6vw, 3.2rem) !important;
          }
          .hero-split-grid p {
            margin-inline: auto !important;
          }
          .hero-split-grid > div:first-child > div:nth-child(4) {
            justify-content: center !important;
          }
          .hero-split-grid > div:first-child > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
