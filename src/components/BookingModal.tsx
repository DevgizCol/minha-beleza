import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, MessageCircle, Copy, Check, Calendar as CalendarIcon, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import type { ServiceItem, AppointmentItem, StudioConfig } from '../types';
import { formatCurrency, type CurrencyCode } from '../utils/currency';
import { spaAudio } from '../utils/sound';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preselectedService?: ServiceItem | null;
  config: StudioConfig;
  currency?: CurrencyCode;
  onAppointmentCreated?: (app: AppointmentItem) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedService,
  config,
  currency = 'COP',
  onAppointmentCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');

  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Available daily hours
  const standardSlots = ['08:30', '10:00', '11:30', '13:30', '15:00', '16:30', '18:00'];
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

  // Default date: tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      if (preselectedService) {
        setSelectedServiceId(preselectedService.id);
        setStep(2);
      } else if (services.length > 0) {
        setSelectedServiceId(services[0].id);
        setStep(1);
      }
      setSelectedDate(defaultDateStr);
      setSelectedTime('');
      setErrorMsg('');
      setConfirmedAppointment(null);
    }
  }, [isOpen, preselectedService, services]);

  useEffect(() => {
    if (selectedDate && isOpen) {
      setLoadingSlots(true);
      api
        .getAppointments(selectedDate)
        .then((existing) => {
          const occupied = existing.map((a) => a.time);
          setOccupiedSlots(occupied);
        })
        .catch(() => {
          setOccupiedSlots([]);
        })
        .finally(() => setLoadingSlots(false));
    }
  }, [selectedDate, isOpen]);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setErrorMsg('Por favor indica tu nombre completo y número de WhatsApp.');
      return;
    }
    if (!selectedTime) {
      setErrorMsg('Por favor selecciona un horario disponible.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const created = await api.createAppointment({
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim(),
        serviceId: currentService.id,
        serviceName: currentService.name,
        date: selectedDate,
        time: selectedTime,
        duration: currentService.duration,
        price: currentService.price,
        notes: clientNotes.trim()
      });

      setConfirmedAppointment(created);
      spaAudio.playChime();

      // Confetti dorado y amatista
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF7F2', '#A855F7', '#DFBE68']
      });

      if (onAppointmentCreated) {
        onAppointmentCreated(created);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'No fue posible registrar la reserva en este horario. Intenta con otro slot.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (confirmedAppointment) {
      navigator.clipboard.writeText(confirmedAppointment.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  // Google Calendar deep link
  const makeGoogleCalendarUrl = () => {
    if (!confirmedAppointment) return '#';
    const cleanTime = confirmedAppointment.time.replace(':', '');
    const startIso = `${confirmedAppointment.date.replace(/-/g, '')}T${cleanTime}00`;
    const details = encodeURIComponent(
      `Cita en Minha Beleza con ${config.therapistName}.\nTratamiento: ${confirmedAppointment.serviceName}\nCódigo de Reserva: ${confirmedAppointment.id}\nDirección: ${config.address}`
    );
    const location = encodeURIComponent(config.address);
    const title = encodeURIComponent(`Minha Beleza: ${confirmedAppointment.serviceName}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${startIso}&details=${details}&location=${location}`;
  };

  // WhatsApp concierge message
  const makeWhatsAppUrl = () => {
    if (!confirmedAppointment) return '#';
    const msg = encodeURIComponent(
      `Hola Rosangel, acabo de agendar mi cita en Minha Beleza.\n\nCódigo: *${confirmedAppointment.id}*\nTratamiento: *${confirmedAppointment.serviceName}*\nFecha: *${confirmedAppointment.date}*\nHora: *${confirmedAppointment.time}*\nNombre: *${confirmedAppointment.clientName}*\n\n¡Quedo atento a tus indicaciones de llegada a la suite!`
    );
    return `https://wa.me/${config.whatsapp}?text=${msg}`;
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
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          borderRadius: '24px',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.15)',
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
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={18} />
        </button>

        {/* --- CONFIRMED: LUXURY BOARDING PASS --- */}
        {confirmedAppointment ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(121, 40, 202, 0.3) 100%)',
                  border: '1px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
                }}
              >
                <CheckCircle2 size={32} color="var(--gold-light)" />
              </div>
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Sparkles size={12} />
                <span>Reserva Confirmada</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                Tu Santuario te Aguarda
              </h3>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                {confirmedAppointment.clientName}, tu cita ha sido agendada con éxito en la suite privada.
              </p>
            </div>

            {/* Boarding Pass Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(22, 18, 35, 0.95) 0%, rgba(14, 12, 22, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '18px',
                padding: '1.6rem',
                marginBottom: '1.8rem',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px dashed rgba(212, 175, 55, 0.3)',
                  paddingBottom: '1.2rem',
                  marginBottom: '1.2rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold-warm)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    MINHA BELEZA • SUITE PASS
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {confirmedAppointment.serviceName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CÓDIGO PRIVADO</div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--gold-light)',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {confirmedAppointment.id}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FECHA & HORA</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {confirmedAppointment.date} a las {confirmedAppointment.time}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DURACIÓN ESTIMADA</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {confirmedAppointment.duration} minutos de protocolo
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TERAPEUTA RESPONSABLE</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {config.therapistName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>VALOR A CANCELAR EN SUITE</div>
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)' }}>
                    {formatCurrency(confirmedAppointment.price, currency)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.2rem',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={14} color="var(--gold-warm)" />
                <span>Ubicación: {config.address} (Tocar citófono a nombre de Rosangel Benítez)</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={makeWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '0.85rem',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Notificar a Rosangel por WhatsApp</span>
                </a>

                <a
                  href={makeGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: 'var(--text-primary)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <CalendarIcon size={16} color="var(--gold-warm)" />
                  <span>Añadir a Google Calendar</span>
                </a>
              </div>

              <button
                onClick={copyToClipboard}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  padding: '0.4rem'
                }}
              >
                {copiedCode ? <Check size={14} color="#4ADE80" /> : <Copy size={14} />}
                <span>{copiedCode ? '¡Código copiado al portapapeles!' : 'Copiar código de reserva'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* --- WIZARD FLOW: 3 PASOS --- */
          <div>
            {/* Header Wizard */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Sparkles size={12} />
                <span>The Sanctuary Pathway • Reserva Privada</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '0.4rem'
                }}
              >
                {step === 1 && 'Selecciona tu Tratamiento'}
                {step === 2 && 'Elige Fecha & Horario Exclusivo'}
                {step === 3 && 'Datos del Huésped & Preferencias'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Paso {step} de 3 — Cada sesión cuenta con sanitización previa y camilla ergonómica reservada para ti.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.8rem' }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '9999px',
                    background:
                      s <= step
                        ? 'linear-gradient(90deg, var(--gold-primary), var(--purple-vibrant))'
                        : 'rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>

            {errorMsg && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#F87171',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
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

            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                  {services
                    .filter((s) => s.active)
                    .map((s) => {
                      const isSelected = s.id === selectedServiceId;
                      return (
                        <div
                          key={s.id}
                          onClick={() => {
                            spaAudio.playSoftClick();
                            setSelectedServiceId(s.id);
                          }}
                          style={{
                            background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.94rem' }}>{s.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {s.category} • {s.duration} min
                            </div>
                          </div>
                          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--gold-light)' }}>
                            {formatCurrency(s.price, currency)}
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      spaAudio.playSoftClick();
                      setStep(2);
                    }}
                    className="btn-gold"
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span>Continuar al Calendario</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time Slot */}
            {step === 2 && (
              <div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Selecciona el día de tu visita:
                  </label>
                  <input
                    type="date"
                    min={defaultDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(14, 12, 22, 0.9)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Horarios de Inicio Disponibles:
                  </label>
                  {loadingSlots ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Consultando disponibilidad de la suite...
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '8px' }}>
                      {standardSlots.map((time) => {
                        const isOccupied = occupiedSlots.includes(time);
                        const isSelected = selectedTime === time;

                        return (
                          <button
                            key={time}
                            disabled={isOccupied}
                            onClick={() => {
                              spaAudio.playSoftClick();
                              setSelectedTime(time);
                            }}
                            style={{
                              padding: '0.65rem',
                              borderRadius: '10px',
                              border: isSelected
                                ? '1px solid var(--gold-primary)'
                                : isOccupied
                                ? '1px solid rgba(255, 255, 255, 0.04)'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              background: isSelected
                                ? 'var(--gold-primary)'
                                : isOccupied
                                ? 'rgba(255, 255, 255, 0.02)'
                                : 'rgba(255, 255, 255, 0.05)',
                              color: isSelected ? '#08070C' : isOccupied ? 'rgba(255, 255, 255, 0.2)' : 'var(--text-primary)',
                              fontSize: '0.88rem',
                              fontWeight: isSelected ? 700 : 500,
                              cursor: isOccupied ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s',
                              textDecoration: isOccupied ? 'line-through' : 'none'
                            }}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem' }}
                  >
                    ← Cambiar Tratamiento
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedTime) {
                        setErrorMsg('Por favor selecciona una hora disponible.');
                        return;
                      }
                      spaAudio.playSoftClick();
                      setErrorMsg('');
                      setStep(3);
                    }}
                    className="btn-gold"
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span>Siguiente: Datos de Contacto</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Client Details */}
            {step === 3 && (
              <form onSubmit={handleBook}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Isabella Gómez"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(14, 12, 22, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      WhatsApp / Teléfono Móvil *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 300 123 4567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(14, 12, 22, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Correo Electrónico (Para recordatorio de cita)
                    </label>
                    <input
                      type="email"
                      placeholder="isabella@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(14, 12, 22, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Notas sensoriales / Preferencias especiales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Indícanos si tienes alergias, zonas de tensión muscular focalizadas o requerimientos específicos..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(14, 12, 22, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.92rem',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Summary Box */}
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '12px',
                    padding: '0.9rem 1.2rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-warm)' }}>RESUMEN DE SESIÓN</div>
                    <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem' }}>
                      {currentService.name} • {selectedDate} a las {selectedTime}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {formatCurrency(currentService.price, currency)}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem' }}
                  >
                    ← Modificar Horario
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold"
                    style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                  >
                    <Sparkles size={16} />
                    <span>{submitting ? 'Confirmando Cita...' : 'Confirmar Reserva en Suite'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
