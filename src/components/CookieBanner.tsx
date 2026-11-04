import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, Settings, X } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean; // Always true
  preferences: boolean; // Audio haptic, currency persistence
  analytics: boolean; // Anonymous performance telemetry
  consentTimestamp: string;
  version: string;
}

const COOKIE_STORAGE_KEY = 'mb_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    preferences: true,
    analytics: false,
    consentTimestamp: '',
    version: '2026.1'
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!saved) {
      // Delay entrance for smooth luxury animation
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  // Listen to manual open requests from Footer
  useEffect(() => {
    const handleOpenCookies = () => {
      setShowConfigModal(true);
    };
    window.addEventListener('mb:open-cookie-settings', handleOpenCookies);
    return () => window.removeEventListener('mb:open-cookie-settings', handleOpenCookies);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const payload = {
      ...prefs,
      essential: true,
      consentTimestamp: new Date().toISOString(),
      version: '2026.1'
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(payload));
    setPreferences(payload);
    setIsVisible(false);
    setShowConfigModal(false);

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('mb:cookie-consent-updated', { detail: payload }));
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      preferences: true,
      analytics: true,
      consentTimestamp: '',
      version: '2026.1'
    });
  };

  const handleAcceptEssentialOnly = () => {
    saveConsent({
      essential: true,
      preferences: false,
      analytics: false,
      consentTimestamp: '',
      version: '2026.1'
    });
  };

  return (
    <>
      {/* Floating Bottom Luxury Cookie Banner */}
      {isVisible && !showConfigModal && (
        <aside
          role="region"
          aria-label="Consentimiento de Cookies y Privacidad"
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '20px',
            right: '20px',
            maxWidth: '960px',
            margin: '0 auto',
            zIndex: 8900,
            background: 'linear-gradient(135deg, rgba(14, 12, 22, 0.96) 0%, rgba(22, 19, 34, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem 1.6rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.12)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 500px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(67, 20, 117, 0.4))',
                border: '1px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-light)',
                flexShrink: 0
              }}
            >
              <Cookie size={20} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.92rem',
                  letterSpacing: '0.04em',
                  color: 'var(--text-pure)',
                  marginBottom: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Privacidad & Experiencia Sensorial</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    color: 'var(--gold-light)',
                    border: '1px solid rgba(212, 175, 55, 0.25)'
                  }}
                >
                  Ley 1581 / GDPR
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                En Minha Beleza preservamos la confidencialidad de tu estadía digital. Utilizamos cookies técnicas esenciales y opcionales para personalizar tu atmósfera acústica y divisa. Jamás comercializamos tus datos personales.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              flex: '1 1 auto'
            }}
          >
            <button
              onClick={() => setShowConfigModal(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-secondary)',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.color = 'var(--text-pure)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Settings size={14} />
              <span>Preferencias</span>
            </button>

            <button
              onClick={handleAcceptEssentialOnly}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                color: 'var(--gold-light)',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Solo Necesarias
            </button>

            <button
              onClick={handleAcceptAll}
              className="btn-gold"
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={14} />
              <span>Aceptar Todas</span>
            </button>
          </div>
        </aside>
      )}

      {/* Preferences Center Modal */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 4, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'linear-gradient(135deg, #0E0C16 0%, #161322 100%)',
              border: '1px solid var(--gold-border)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowConfigModal(false)}
              aria-label="Cerrar modal de preferencias"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: 'var(--text-secondary)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)'
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.04em',
                    color: 'var(--text-pure)'
                  }}
                >
                  Centro de Preferencias de Privacidad
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-warm)' }}>
                  Cumplimiento Ley 1581 de 2012 (Habeas Data) & GDPR
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Tú tienes el control total de tu navegación. Puedes habilitar o deshabilitar cada categoría de cookies a continuación:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
              {/* Category 1: Essential */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-pure)' }}>
                    1. Cookies Técnicas & Seguridad (Esenciales)
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: '#4ade80',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    Siempre Activas
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                  Indispensables para el funcionamiento del santuario digital: almacenamiento criptográfico de reservas, persistencia del carrito de tratamientos y navegación protegida.
                </p>
              </div>

              {/* Category 2: Preferences */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label
                    htmlFor="cookie-pref-customization"
                    style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-pure)', cursor: 'pointer' }}
                  >
                    2. Personalización Sensorial & Divisa
                  </label>
                  <input
                    id="cookie-pref-customization"
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--gold-primary)',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                  Permiten recordar tu divisa preferida (COP, USD, EUR) y habilitar la sutil retroalimentación háptica y sonora a 528Hz al interactuar con el catálogo.
                </p>
              </div>

              {/* Category 3: Telemetry */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label
                    htmlFor="cookie-pref-telemetry"
                    style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-pure)', cursor: 'pointer' }}
                  >
                    3. Analítica & Telemetría Anónima
                  </label>
                  <input
                    id="cookie-pref-telemetry"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--gold-primary)',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                  Métricas anónimas agregadas para evaluar tiempos de renderizado, optimizar el consumo de batería y garantizar 120 FPS en dispositivos móviles.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={handleAcceptEssentialOnly}
                style={{
                  padding: '0.65rem 1.2rem',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Rechazar Opcionales
              </button>

              <button
                onClick={() => saveConsent(preferences)}
                className="btn-gold"
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Guardar Mi Elección
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
