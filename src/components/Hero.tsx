import React from 'react';
import { Calendar, Sparkles, ShieldCheck, ArrowRight, Star, Clock, UserCheck } from 'lucide-react';
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
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Volumetric Glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(121, 40, 202, 0.18) 0%, rgba(67, 20, 117, 0.08) 45%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1080px' }}>
        {/* Emblem & Exclusivity Badge */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div
            style={{
              padding: '4px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.45) 0%, rgba(121, 40, 202, 0.3) 100%)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.22)',
              marginBottom: '1rem',
              transition: 'transform 0.4s ease'
            }}
          >
            <div
              style={{
                width: '105px',
                height: '105px',
                borderRadius: '20px',
                background: '#FFFFFF',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={getAssetUrl('logo.jpeg')}
                alt="Minha Beleza - Rosangel Benítez"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>

          <div
            className="badge-gold"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <Sparkles size={13} color="var(--gold-warm)" />
            <span>Santuario Privado • Laureles, Medellín</span>
          </div>
        </div>

        {/* Monumental Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5.2vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            marginBottom: '1.4rem'
          }}
        >
          El Arte de Restaurar tu <br />
          <span className="text-gold-shimmer">Bienestar & Esplendor Natural</span>
        </h1>

        {/* Editorial Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.15rem, 2.2vw, 1.48rem)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '780px',
            margin: '0 auto 2.2rem auto'
          }}
        >
          Una experiencia estética y terapéutica de atmósfera íntima concebida por <strong style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{config.therapistName}</strong>. 
          Masoterapia clínica, drenaje linfático y cosmetología regenerativa donde cada minuto está dedicado exclusivamente a ti.
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          <button
            onClick={onOpenBooking}
            className="btn-gold"
            style={{
              padding: '0.95rem 2.2rem',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <Calendar size={18} />
            <span>Reservar Cita Privada</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onExploreServices}
            className="btn-outline-gold"
            style={{
              padding: '0.95rem 1.9rem',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={16} />
            <span>Ver Carta de Tratamientos</span>
          </button>
        </div>

        {/* Social Proof & Trust Metrics Bar */}
        <div
          className="luxury-glass"
          style={{
            borderRadius: '20px',
            padding: '1.6rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', justifyContent: 'center' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(212, 175, 55, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Star size={20} color="var(--gold-primary)" fill="var(--gold-primary)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                4.98 / 5.0
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                140+ Reseñas Verificadas
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', justifyContent: 'center' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <UserCheck size={20} color="var(--purple-soft)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                1-a-1 Exclusivo
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sin esperas ni salas ruidosas
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', justifyContent: 'center' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(212, 175, 55, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Clock size={20} color="var(--gold-warm)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                +8 Años
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Cosmetóloga & Masoterapeuta
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', justifyContent: 'center' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={20} color="#4ADE80" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                Bioseguridad
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Esterilización de grado médico
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
