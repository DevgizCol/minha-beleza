import React, { useState } from 'react';
import { Clock, Calendar, Sparkles, Info, X, Search, CheckCircle2 } from 'lucide-react';
import type { ServiceItem } from '../types';
import { formatCurrency, type CurrencyCode } from '../utils/currency';
import { spaAudio } from '../utils/sound';

interface ServicesCatalogProps {
  services: ServiceItem[];
  currency?: CurrencyCode;
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  services,
  currency = 'COP',
  onSelectServiceToBook
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Cabello & Terapia Capilar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  const categories = [
    'Cabello & Terapia Capilar',
    'Color, Peinado & Extensiones',
    'Cejas & Pestañas',
    'Masoterapia & Corporal',
    'Depilación Íntima (Láser & Cera)',
    'Todos'
  ];

  const filteredServices = services.filter((s) => {
    if (!s.active) return false;
    const matchesCategory = selectedCategory === 'Todos' || s.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (cat: string) => {
    spaAudio.playSoftClick();
    setSelectedCategory(cat);
  };

  const handleOpenDetail = (service: ServiceItem) => {
    spaAudio.playSoftClick();
    setActiveDetailService(service);
  };

  const handleBookNow = (service: ServiceItem) => {
    spaAudio.playSoftClick();
    onSelectServiceToBook(service);
  };

  return (
    <section
      id="servicios"
      style={{
        padding: '5rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header Editorial */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '820px', marginInline: 'auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} color="var(--gold-warm)" />
            <span>Colección Signature de Protocolos</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '1rem',
              letterSpacing: '0.02em'
            }}
          >
            Tratamientos de <span className="text-gold-shimmer">Alta Precisión & Armonía</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Cada sesión se formula de manera individual en cabina privada. Desde alisados orgánicos de brillo espejo hasta masoterapia descontracturante y renovación dérmica con bioseguridad clínica.
          </p>
        </div>

        {/* Filter Pills & Live Search Bar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.28) 0%, rgba(121, 40, 202, 0.28) 100%)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div style={{ maxWidth: '440px', margin: '0 auto', position: 'relative' }}>
            <Search
              size={16}
              color="var(--gold-warm)"
              style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Buscar por tratamiento o beneficio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.68rem 1.2rem 0.68rem 2.8rem',
                background: 'rgba(14, 12, 22, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '9999px',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
              }}
            />
          </div>
        </div>

        {/* Bento Grid Presentation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="luxury-glass-interactive"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Card Image Banner with Subtle Gradient Overlay */}
              <div style={{ height: '190px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={service.image || '/images/massage-therapy.jpg'}
                  alt={service.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.1) 0%, rgba(8, 7, 12, 0.85) 100%)'
                  }}
                />

                {/* Badges Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(8, 7, 12, 0.82)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {service.category}
                  </span>

                  {service.featured && (
                    <span
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(157, 123, 28, 0.95) 100%)',
                        color: '#08070C',
                        padding: '3px 9px',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.35)'
                      }}
                    >
                      <Sparkles size={11} />
                      <span>SIGNATURE</span>
                    </span>
                  )}
                </div>

                {/* Duration Badge Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--gold-light)',
                    fontSize: '0.78rem',
                    fontWeight: 500
                  }}
                >
                  <Clock size={13} />
                  <span>{service.duration} minutos</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '0.6rem',
                    lineHeight: 1.3
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.2rem',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {service.description}
                </p>

                {/* Benefits Pill Snippet */}
                {service.benefits && service.benefits.length > 0 && (
                  <div style={{ marginBottom: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {service.benefits.slice(0, 2).map((benefit, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(168, 85, 247, 0.08)',
                          border: '1px solid rgba(168, 85, 247, 0.2)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle2 size={10} color="var(--gold-warm)" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                          {benefit}
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Price & Action Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    marginTop: 'auto'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                      INVERSIÓN
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--gold-light)'
                      }}
                    >
                      {formatCurrency(service.price, currency)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenDetail(service)}
                      aria-label="Detalles de tratamiento"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'var(--text-secondary)',
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold-primary)';
                        e.currentTarget.style.borderColor = 'var(--gold-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      }}
                      title="Ver beneficios completos"
                    >
                      <Info size={16} />
                    </button>

                    <button
                      onClick={() => handleBookNow(service)}
                      className="btn-gold"
                      style={{
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.82rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Calendar size={13} />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              background: 'rgba(14, 12, 22, 0.5)',
              borderRadius: '20px',
              border: '1px dashed rgba(212, 175, 55, 0.2)',
              marginTop: '2rem'
            }}
          >
            <Sparkles size={28} color="var(--gold-warm)" style={{ marginBottom: '0.8rem' }} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF' }}>
              No se encontraron tratamientos con ese criterio
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              Prueba buscando por palabras clave como "Keratina", "Masaje", "Cejas" o selecciona "Todos".
            </p>
          </div>
        )}
      </div>

      {/* Modal Inmersivo de Detalle del Servicio */}
      {activeDetailService && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(4, 3, 7, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease'
          }}
          onClick={() => setActiveDetailService(null)}
        >
          <div
            className="luxury-glass"
            style={{
              maxWidth: '620px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15)',
              animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div style={{ height: '220px', position: 'relative' }}>
              <img
                src={activeDetailService.image || '/images/massage-therapy.jpg'}
                alt={activeDetailService.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 7, 12, 0.2) 0%, rgba(14, 12, 22, 0.95) 100%)'
                }}
              />
              <button
                onClick={() => setActiveDetailService(null)}
                aria-label="Cerrar ventana"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(8, 7, 12, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Details */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                  {activeDetailService.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  <span>{activeDetailService.duration} min</span>
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '1rem'
                }}
              >
                {activeDetailService.name}
              </h3>

              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem'
                }}
              >
                {activeDetailService.description}
              </p>

              {activeDetailService.benefits && activeDetailService.benefits.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.08em',
                      color: 'var(--gold-warm)',
                      textTransform: 'uppercase',
                      marginBottom: '0.8rem'
                    }}
                  >
                    Beneficios & Protocolo Clínico
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {activeDetailService.benefits.map((b, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem' }}>
                        <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--text-primary)' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Reserve Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TARIFA TOTAL</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {formatCurrency(activeDetailService.price, currency)}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const s = activeDetailService;
                    setActiveDetailService(null);
                    onSelectServiceToBook(s);
                  }}
                  className="btn-gold"
                  style={{
                    padding: '0.85rem 1.8rem',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <Calendar size={16} />
                  <span>Agendar Este Tratamiento</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
