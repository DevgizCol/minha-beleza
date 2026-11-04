import React from 'react';
import { Sparkles, Award, Music, Coffee, Wind, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import type { StudioConfig } from '../types';
import { getAssetUrl } from '../utils/assets';

interface SanctuaryStoryProps {
  config: StudioConfig;
  onOpenBooking: () => void;
}

export const SanctuaryStory: React.FC<SanctuaryStoryProps> = ({
  config,
  onOpenBooking
}) => {
  return (
    <section
      id="santuario"
      style={{
        padding: '5.5rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(8, 7, 12, 0) 0%, rgba(37, 11, 59, 0.2) 50%, rgba(8, 7, 12, 0) 100%)'
      }}
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '820px', marginInline: 'auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Award size={13} color="var(--gold-warm)" />
            <span>Maestría Clínica & Filosofía del Santuario</span>
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
            La Esencia de <span className="text-gold-shimmer">{config.therapistName}</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Masoterapeuta clínica y cosmetóloga estética. Una visión holística donde la biomecánica corporal se fusiona con la desconexión mental absoluta en una suite privada en Santa Teresita, Laureles.
          </p>
        </div>

        {/* Dual Spotlight Bento */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Card 1: Rosangel Profile */}
          <div
            className="luxury-glass"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
              <img
                src={getAssetUrl(config.portraitImage || 'images/rosangel-portrait.jpg')}
                alt={config.therapistName}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.1) 0%, rgba(14, 12, 22, 0.95) 100%)'
                }}
              />
              <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem' }}>
                <span className="badge-gold">
                  <Award size={12} />
                  <span>Maestría Certificada</span>
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem', right: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {config.therapistName}
                </div>
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  {config.therapistTitle}
                </div>
              </div>
            </div>

            <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem'
                }}
              >
                {config.therapistBio}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '1.2rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.8rem',
                  textAlign: 'center'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    +8
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Años Trayectoria</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Atención Privada</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    4.98★
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Google Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: The Residence Sanctuary */}
          <div
            className="luxury-glass"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
              <img
                src={getAssetUrl(config.studioImage || 'images/studio-sanctuary.jpg')}
                alt={config.residenceTitle}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.1) 0%, rgba(14, 12, 22, 0.95) 100%)'
                }}
              />
              <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem' }}>
                <span className="badge-gold">
                  <Sparkles size={12} />
                  <span>Suite Residencial</span>
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem', right: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {config.residenceTitle}
                </div>
                <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  {config.residenceSubtitle}
                </div>
              </div>
            </div>

            <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem'
                }}
              >
                {config.residenceContext}
              </p>

              {/* Ritual Amenities Pills */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <Wind size={15} color="var(--gold-warm)" />
                  <span>Aromaterapia Botánica</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <Music size={15} color="var(--purple-soft)" />
                  <span>Neuroacústica 432Hz</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <Coffee size={15} color="var(--gold-warm)" />
                  <span>Infusión & Café de Origen</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <ShieldCheck size={15} color="#4ADE80" />
                  <span>Lencería de Hilo Egipcio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contrast Experience Comparison: Traditional vs Sanctuary */}
        <div
          className="luxury-glass"
          style={{
            borderRadius: '24px',
            padding: '2.2rem',
            border: '1px solid rgba(212, 175, 55, 0.22)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
              La Diferencia de un Santuario Privado
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Por qué nuestros clientes eligen la suite residencial en lugar de las salas ruidosas convencionales.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Salón Tradicional */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '1.5rem'
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.92rem' }}>
                SALÓN COMERCIAL CONVENCIONAL
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                <li>✕ Múltiples clientes y ruido cruzado de secadores</li>
                <li>✕ Esperas imprevistas en recepción</li>
                <li>✕ Terapeutas rotativos sin seguimiento personalizado</li>
                <li>✕ Prisas para desocupar la cabina para el siguiente turno</li>
              </ul>
            </div>

            {/* Minha Beleza Santuario */}
            <div
              style={{
                background: 'rgba(212, 175, 55, 0.06)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.08)'
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--gold-light)', marginBottom: '1rem', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} />
                <span>SANTUARIO PRIVADO MINHA BELEZA</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--gold-primary)" />
                  <span>Silencio absoluto y música neuroacústica curada</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--gold-primary)" />
                  <span>Puntualidad suiza: tu horario está reservado al 100%</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--gold-primary)" />
                  <span>Tratamiento impartido exclusivamente por Rosangel Benítez</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--gold-primary)" />
                  <span>Pausa de relajación con infusión botánica tras la sesión</span>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.2rem' }}>
            <button
              onClick={onOpenBooking}
              className="btn-gold"
              style={{
                padding: '0.85rem 2.2rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <Calendar size={16} />
              <span>Reservar mi Experiencia Privada</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
