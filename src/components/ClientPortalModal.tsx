import React, { useState } from 'react';
import { Search, X, AlertCircle, CheckCircle2, MessageSquare, Ban, Calendar, Clock, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import type { AppointmentItem, StudioConfig } from '../types';
import { formatCurrency, type CurrencyCode } from '../utils/currency';
import { spaAudio } from '../utils/sound';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StudioConfig;
  currency?: CurrencyCode;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose, config, currency = 'COP' }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AppointmentItem[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string>('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setErrorMsg('Ingresa tu código de reserva (ej. MB-4819) o tu número de WhatsApp.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setActionSuccess('');

    try {
      const found = await api.searchAppointments(searchQuery.trim());
      if (found.length === 0) {
        setErrorMsg('No encontramos citas registradas con ese código o número. Verifica el dato e intenta nuevamente.');
        setResults(null);
      } else {
        spaAudio.playSoftClick();
        setResults(found);
      }
    } catch {
      setErrorMsg('No fue posible conectar con el servidor en este momento. Intenta de nuevo en unos instantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appId: string) => {
    const confirmCancel = window.confirm(
      '¿Deseas cancelar tu cita en la suite? El horario quedará liberado para otros huéspedes.'
    );
    if (!confirmCancel) return;

    try {
      await api.cancelAppointment(appId);
      setActionSuccess('Tu cita ha sido cancelada correctamente.');
      spaAudio.playSoftClick();
      // Refresh results
      const updated = await api.searchAppointments(searchQuery.trim());
      setResults(updated);
    } catch {
      setErrorMsg('No se pudo procesar la cancelación. Por favor contacta directamente con Rosangel por WhatsApp.');
    }
  };

  const getWhatsAppModificationLink = (app: AppointmentItem) => {
    const msg = encodeURIComponent(
      `Hola Rosangel, deseo coordinar una consulta sobre mi cita *${app.id}* (${app.serviceName} el ${app.date} a las ${app.time}).`
    );
    return `https://wa.me/${config.whatsapp}?text=${msg}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--gold-light)',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}
          >
            CONFIRMADA
          </span>
        );
      case 'completed':
        return (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#4ADE80',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}
          >
            COMPLETADA
          </span>
        );
      case 'cancelled':
        return (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#F87171',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}
          >
            CANCELADA
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5, 4, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        className="luxury-glass"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '24px',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.12)',
          animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--text-muted)',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.8rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={12} />
            <span>Private Suite Concierge</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '0.4rem'
            }}
          >
            Gestión de Citas & Huéspedes
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Consulta el estado de tu tratamiento, reprograma con antelación o comunícate directamente con la cabina privada.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '1.8rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={16}
                color="var(--gold-warm)"
                style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Ingresa tu código MB-XXXX o tu teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.2rem 0.75rem 2.8rem',
                  background: 'rgba(14, 12, 22, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                padding: '0.75rem 1.4rem',
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {loading ? 'Buscando...' : 'Consultar'}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.2rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {actionSuccess && (
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#4ADE80',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.2rem'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Results List */}
        {results && results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-warm)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Citas Encontradas ({results.length})
            </div>

            {results.map((app) => (
              <div
                key={app.id}
                style={{
                  background: 'rgba(22, 18, 35, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--gold-light)' }}>
                      {app.id}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {app.serviceName}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Titular: {app.clientName}
                    </div>
                  </div>

                  <div>{getStatusBadge(app.status)}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <Calendar size={14} color="var(--gold-warm)" />
                    <span>{app.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <Clock size={14} color="var(--gold-warm)" />
                    <span>{app.time} ({app.duration} min)</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    flexWrap: 'wrap',
                    gap: '0.6rem'
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '1.1rem' }}>
                    {formatCurrency(app.price, currency)}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={getWhatsAppModificationLink(app)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: 'var(--text-primary)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={13} color="var(--gold-warm)" />
                      <span>Coordinar</span>
                    </a>

                    {app.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#F87171',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <Ban size={13} />
                        <span>Cancelar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
