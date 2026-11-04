import React, { useState, useEffect } from 'react';
import { 
  X, Shield, Calendar, CheckCircle, 
  Trash2, Plus, Edit, Save, MessageSquare, Home, Layers, BarChart3, RefreshCw, Phone, ShieldCheck
} from 'lucide-react';

import { api } from '../services/api';
import type { AppointmentItem, ServiceItem, StudioConfig, StatsOverview, AppointmentStatus } from '../types';
import { getAssetUrl } from '../utils/assets';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: StudioConfig;
  onConfigUpdated: (newConfig: StudioConfig) => void;
  services: ServiceItem[];
  onServicesUpdated: (services: ServiceItem[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
  services,
  onServicesUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'residence' | 'stats'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter for appointments
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Editing studio context
  const [editConfig, setEditConfig] = useState<StudioConfig>(config);

  // New/Edit Service Modal State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({
    name: '',
    category: 'Masoterapia',
    duration: 60,
    price: 130000,
    image: getAssetUrl('images/massage-therapy.jpg'),
    description: '',
    benefits: ['Relajación integral', 'Alivio de tensiones']
  });

  // Reschedule state
  const [reschedulingApp, setReschedulingApp] = useState<AppointmentItem | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleTime, setRescheduleTime] = useState<string>('');

  useEffect(() => {
    setEditConfig(config);
  }, [config]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAdminData();
    }
  }, [isOpen, isAuthenticated]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [apps, st] = await Promise.all([
        api.getAppointments(),
        api.getStats()
      ]);
      setAppointments(apps);
      setStats(st);
    } catch {
      showFeedback('error', 'Error al sincronizar datos');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: "minha2026" or "1234"
    if (pinInput === 'minha2026' || pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN incorrecto. (PIN por defecto: minha2026)');
    }
  };

  // Appointment Status update
  const handleUpdateStatus = async (appId: string, newStatus: AppointmentStatus) => {
    try {
      const updated = await api.updateAppointment(appId, { status: newStatus });
      setAppointments(prev => prev.map(a => a.id === appId ? updated : a));
      showFeedback('success', `Cita ${appId} actualizada a estado: ${newStatus}`);
      const st = await api.getStats();
      setStats(st);
    } catch {
      showFeedback('error', 'No se pudo actualizar el estado');
    }
  };

  // Save clinical note / modification for client
  const handleSaveAdminNote = async (appId: string, note: string) => {
    try {
      const updated = await api.updateAppointment(appId, { adminNotes: note });
      setAppointments(prev => prev.map(a => a.id === appId ? updated : a));
      showFeedback('success', 'Nota guardada. El cliente podrá verla al consultar su cita.');
    } catch {
      showFeedback('error', 'Error al guardar la nota');
    }
  };

  // Reschedule
  const handleConfirmReschedule = async () => {
    if (!reschedulingApp || !rescheduleDate || !rescheduleTime) return;
    try {
      const updated = await api.updateAppointment(reschedulingApp.id, {
        date: rescheduleDate,
        time: rescheduleTime
      });
      setAppointments(prev => prev.map(a => a.id === reschedulingApp.id ? updated : a));
      setReschedulingApp(null);
      showFeedback('success', `Cita reprogramada para el ${rescheduleDate} a las ${rescheduleTime}`);
    } catch (err: any) {
      showFeedback('error', err.message || 'Error al reprogramar');
    }
  };

  // Save Residence Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.updateConfig(editConfig);
      onConfigUpdated(updated);
      showFeedback('success', '¡Información del santuario e imágenes actualizadas exitosamente!');
    } catch {
      showFeedback('error', 'Error al guardar configuración');
    }
  };

  // Services Management
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewService) {
        const created = await api.createService({
          name: serviceFormData.name || 'Nuevo Servicio',
          category: serviceFormData.category || 'Masoterapia',
          duration: Number(serviceFormData.duration) || 60,
          price: Number(serviceFormData.price) || 120000,
          active: true,
          featured: false,
          image: serviceFormData.image || getAssetUrl('images/massage-therapy.jpg'),
          description: serviceFormData.description || '',
          benefits: Array.isArray(serviceFormData.benefits) ? serviceFormData.benefits : []
        });
        const updatedList = [...services, created];
        onServicesUpdated(updatedList);
        showFeedback('success', 'Servicio creado con éxito');
      } else if (editingService) {
        const updated = await api.updateService(editingService.id, serviceFormData);
        const updatedList = services.map(s => s.id === editingService.id ? updated : s);
        onServicesUpdated(updatedList);
        showFeedback('success', 'Servicio actualizado');
      }
      setEditingService(null);
      setIsNewService(false);
    } catch {
      showFeedback('error', 'Error al guardar el servicio');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('¿Seguro(a) de eliminar este servicio?')) return;
    try {
      await api.deleteService(id);
      const updatedList = services.filter(s => s.id !== id);
      onServicesUpdated(updatedList);
      showFeedback('success', 'Servicio eliminado');
    } catch {
      showFeedback('error', 'Error al eliminar');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '980px',
          width: '95%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(37, 11, 59, 0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-light)'
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF' }}>
                Panel Profesional • Rosangel Benítez
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Gestión Integral de Agenda, Clientes, Servicios & Espacio Residencial
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* FEEDBACK TOAST IN MODAL */}
        {feedbackMsg && (
          <div
            style={{
              margin: '0.8rem 1.8rem 0',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: feedbackMsg.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${feedbackMsg.type === 'success' ? '#22C55E' : '#EF4444'}`,
              color: '#FFFFFF',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle size={16} />
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '420px', margin: '0 auto' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(121, 40, 202, 0.2)',
                border: '1px solid var(--purple-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--gold-primary)'
              }}
            >
              <Shield size={28} />
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Acceso Privado Rosangel
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Ingresa tu código de seguridad para administrar citas, ajustar disponibilidad o modificar el contexto de tu santuario.
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Ingresa tu PIN (ej: minha2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--gold-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  textAlign: 'center',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem'
                }}
                autoFocus
              />

              {pinError && (
                <p style={{ color: '#F87171', fontSize: '0.82rem', marginBottom: '1rem' }}>{pinError}</p>
              )}

              <button type="submit" className="btn-gold" style={{ width: '100%', padding: '0.85rem' }}>
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN AREA */
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
            {/* Tabs Header */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.8rem 1.8rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(14, 12, 22, 0.6)',
                overflowX: 'auto'
              }}
            >
              <button
                onClick={() => setActiveTab('appointments')}
                style={{
                  padding: '0.75rem 1.2rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'appointments' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  color: activeTab === 'appointments' ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontWeight: activeTab === 'appointments' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Calendar size={16} />
                <span>Gestión de Citas ({appointments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                style={{
                  padding: '0.75rem 1.2rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'services' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  color: activeTab === 'services' ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontWeight: activeTab === 'services' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Layers size={16} />
                <span>Servicios & Precios ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('residence')}
                style={{
                  padding: '0.75rem 1.2rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'residence' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  color: activeTab === 'residence' ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontWeight: activeTab === 'residence' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Home size={16} />
                <span>Santuario & Textos</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                style={{
                  padding: '0.75rem 1.2rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'stats' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  color: activeTab === 'stats' ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontWeight: activeTab === 'stats' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <BarChart3 size={16} />
                <span>Métricas</span>
              </button>
            </div>

            {/* Content Body */}
            <div style={{ padding: '1.8rem', overflowY: 'auto', flexGrow: 1 }}>
              {/* TAB 1: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div>
                  {/* Search and Filters */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['all', 'confirmed', 'completed', 'cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            border: statusFilter === st ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.08)',
                            background: statusFilter === st ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.02)',
                            color: statusFilter === st ? 'var(--gold-light)' : 'var(--text-secondary)',
                            cursor: 'pointer'
                          }}
                        >
                          {st === 'all' ? 'Todas' : st === 'confirmed' ? 'Confirmadas' : st === 'completed' ? 'Completadas' : 'Canceladas'}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <input
                        type="text"
                        placeholder="Buscar por cliente o código..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 'var(--radius-sm)',
                          color: '#FFFFFF',
                          fontSize: '0.85rem'
                        }}
                      />
                      <button
                        onClick={loadAdminData}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-secondary)',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer'
                        }}
                        title="Refrescar lista"
                      >
                        <RefreshCw size={14} className={loading ? 'ambient-aura' : ''} />
                      </button>
                    </div>
                  </div>

                  {/* Appointments Table / Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {appointments
                      .filter((a) => {
                        if (statusFilter !== 'all' && a.status !== statusFilter) return false;
                        if (searchFilter) {
                          const q = searchFilter.toLowerCase();
                          return (
                            a.clientName.toLowerCase().includes(q) ||
                            a.id.toLowerCase().includes(q) ||
                            a.clientPhone.includes(q)
                          );
                        }
                        return true;
                      })
                      .map((app) => (
                        <div
                          key={app.id}
                          style={{
                            background: 'rgba(26, 21, 40, 0.7)',
                            border: '1px solid rgba(212, 175, 55, 0.18)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.2rem 1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                              borderBottom: '1px solid rgba(255,255,255,0.06)',
                              paddingBottom: '0.6rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                              <span
                                style={{
                                  fontFamily: 'var(--font-serif)',
                                  fontSize: '1.1rem',
                                  fontWeight: 700,
                                  color: 'var(--gold-light)'
                                }}
                              >
                                {app.id}
                              </span>
                              <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
                                {app.clientName}
                              </span>
                              <a
                                href={`https://wa.me/57${app.clientPhone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#25D366',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.3rem',
                                  fontSize: '0.8rem',
                                  textDecoration: 'none'
                                }}
                              >
                                <Phone size={13} />
                                {app.clientPhone}
                              </a>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateStatus(app.id, e.target.value as AppointmentStatus)}
                                style={{
                                  background: 'rgba(8, 7, 12, 0.8)',
                                  border: '1px solid var(--gold-border)',
                                  color: 'var(--gold-light)',
                                  borderRadius: '6px',
                                  padding: '0.3rem 0.6rem',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <option value="confirmed">Confirmada</option>
                                <option value="completed">Completada</option>
                                <option value="cancelled">Cancelada</option>
                              </select>
                            </div>
                          </div>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                              gap: '0.8rem',
                              fontSize: '0.85rem'
                            }}
                          >
                            <div>
                              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Tratamiento:</span>
                              <strong style={{ color: '#FFFFFF' }}>{app.serviceName}</strong>
                            </div>

                            <div>
                              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Fecha y Hora:</span>
                              <strong style={{ color: 'var(--gold-light)' }}>
                                {app.date} • {app.time} ({app.duration} min)
                              </strong>
                            </div>

                            <div>
                              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Valor:</span>
                              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>
                                ${app.price.toLocaleString('es-CO')} COP
                              </span>
                            </div>
                          </div>

                          {/* Client special notes */}
                          {app.notes && (
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                              <strong style={{ color: 'var(--gold-primary)' }}>Condiciones del cliente:</strong> {app.notes}
                            </div>
                          )}

                          {/* Legal Compliance Audit Trail */}
                          {app.legalCompliance && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#4ade80' }}>
                              <ShieldCheck size={13} />
                              <span>
                                Auditoría Legal: Consentimiento Médico & Habeas Data Aprobado (Ref: {app.legalCompliance.consentId})
                              </span>
                            </div>
                          )}

                          {/* Rosangel's clinical / client modification notes */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              marginTop: '0.4rem',
                              background: 'rgba(255, 255, 255, 0.02)',
                              padding: '0.5rem 0.8rem',
                              borderRadius: '6px'
                            }}
                          >
                            <MessageSquare size={14} color="var(--purple-soft)" style={{ flexShrink: 0 }} />
                            <input
                              type="text"
                              defaultValue={app.adminNotes || ''}
                              placeholder="Escribe una nota o indicación para este cliente..."
                              onBlur={(e) => handleSaveAdminNote(app.id, e.target.value)}
                              style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '0.82rem',
                                outline: 'none'
                              }}
                            />
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              (Visible para el cliente)
                            </span>
                          </div>

                          {/* Quick Actions (Reprogramar) */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.4rem' }}>
                            <button
                              onClick={() => {
                                setReschedulingApp(app);
                                setRescheduleDate(app.date);
                                setRescheduleTime(app.time);
                              }}
                              style={{
                                background: 'rgba(212, 175, 55, 0.08)',
                                border: '1px solid var(--gold-border-subtle)',
                                color: 'var(--gold-light)',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '4px',
                                fontSize: '0.78rem',
                                cursor: 'pointer'
                              }}
                            >
                              Reprogramar Horario
                            </button>
                          </div>
                        </div>
                      ))}

                    {appointments.length === 0 && (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No hay citas agendadas aún.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES MANAGEMENT */}
              {activeTab === 'services' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF' }}>
                        Catálogo de Tratamientos
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem' }}>
                        Edita tarifas en COP, duraciones, fotos o crea nuevos rituales de bienestar.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsNewService(true);
                        setEditingService(null);
                        setServiceFormData({
                          name: '',
                          category: 'Masoterapia',
                          duration: 60,
                          price: 130000,
                          image: getAssetUrl('images/massage-therapy.jpg'),
                          description: '',
                          benefits: ['Relajación y alivio']
                        });
                      }}
                      className="btn-gold"
                      style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                    >
                      <Plus size={16} />
                      <span>Nuevo Servicio</span>
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '1.2rem'
                    }}
                  >
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        style={{
                          background: 'rgba(26, 21, 40, 0.7)',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ height: '120px', position: 'relative' }}>
                          <img
                            src={srv.image}
                            alt={srv.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <span
                            className="badge-purple"
                            style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontSize: '0.72rem' }}
                          >
                            {srv.category}
                          </span>
                        </div>

                        <div style={{ padding: '1rem' }}>
                          <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                            {srv.name}
                          </h5>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-light)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                            <span>{srv.duration} min</span>
                            <strong>${srv.price.toLocaleString('es-CO')} COP</strong>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setEditingService(srv);
                                setIsNewService(false);
                                setServiceFormData({ ...srv });
                              }}
                              style={{
                                flex: 1,
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#FFFFFF',
                                padding: '0.4rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.3rem'
                              }}
                            >
                              <Edit size={13} />
                              Editar
                            </button>

                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#F87171',
                                padding: '0.4rem 0.6rem',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              title="Eliminar servicio"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RESIDENCE CONTEXT & IMAGERY (As user requested) */}
              {activeTab === 'residence' && (
                <form onSubmit={handleSaveConfig}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFFFFF' }}>
                      Personalización del Santuario Residencial
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Modifica la narrativa, biografía de Rosangel, dirección y fotografías representativas de la suite privada.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>Nombre de la Profesional</label>
                      <input
                        type="text"
                        value={editConfig.therapistName}
                        onChange={(e) => setEditConfig({ ...editConfig, therapistName: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Título Profesional</label>
                      <input
                        type="text"
                        value={editConfig.therapistTitle}
                        onChange={(e) => setEditConfig({ ...editConfig, therapistTitle: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Título del Espacio Residencial</label>
                      <input
                        type="text"
                        value={editConfig.residenceTitle}
                        onChange={(e) => setEditConfig({ ...editConfig, residenceTitle: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Subtítulo del Espacio</label>
                      <input
                        type="text"
                        value={editConfig.residenceSubtitle}
                        onChange={(e) => setEditConfig({ ...editConfig, residenceSubtitle: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Contexto Residencial (Historia y Exclusividad del Espacio)</label>
                      <textarea
                        rows={3}
                        value={editConfig.residenceContext}
                        onChange={(e) => setEditConfig({ ...editConfig, residenceContext: e.target.value })}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Biografía & Filosofía de Rosangel</label>
                      <textarea
                        rows={3}
                        value={editConfig.therapistBio}
                        onChange={(e) => setEditConfig({ ...editConfig, therapistBio: e.target.value })}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Dirección Oficial</label>
                      <input
                        type="text"
                        value={editConfig.address}
                        onChange={(e) => setEditConfig({ ...editConfig, address: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Teléfono / WhatsApp (Ej: 573128904521)</label>
                      <input
                        type="text"
                        value={editConfig.whatsapp}
                        onChange={(e) => setEditConfig({ ...editConfig, whatsapp: e.target.value, phone: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Ruta o URL de Imagen de la Suite</label>
                      <input
                        type="text"
                        value={editConfig.studioImage}
                        onChange={(e) => setEditConfig({ ...editConfig, studioImage: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Ruta o URL de Foto de Rosangel</label>
                      <input
                        type="text"
                        value={editConfig.portraitImage}
                        onChange={(e) => setEditConfig({ ...editConfig, portraitImage: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-gold" style={{ padding: '0.85rem 2rem' }}>
                      <Save size={16} />
                      <span>Guardar Modificaciones</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: METRICS */}
              {activeTab === 'stats' && stats && (
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1.2rem',
                      marginBottom: '2rem'
                    }}
                  >
                    <div className="lux-card" style={{ padding: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Total Citas
                      </span>
                      <strong style={{ display: 'block', fontSize: '2rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                        {stats.totalAppointments}
                      </strong>
                    </div>

                    <div className="lux-card" style={{ padding: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Citas Activas
                      </span>
                      <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                        {stats.activeAppointments}
                      </strong>
                    </div>

                    <div className="lux-card" style={{ padding: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Citas Completadas
                      </span>
                      <strong style={{ display: 'block', fontSize: '2rem', color: '#86EFAC', fontFamily: 'var(--font-serif)' }}>
                        {stats.completedAppointments}
                      </strong>
                    </div>

                    <div className="lux-card" style={{ padding: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Ingresos Estimados
                      </span>
                      <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                        ${stats.estimatedRevenue.toLocaleString('es-CO')}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SERVICE CREATE/EDIT SUB-MODAL */}
        {(isNewService || editingService) && (
          <div className="modal-overlay" onClick={() => { setIsNewService(false); setEditingService(null); }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '1.8rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '1.2rem' }}>
                {isNewService ? 'Crear Nuevo Tratamiento' : 'Modificar Tratamiento'}
              </h4>

              <form onSubmit={handleSaveService}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Nombre del Servicio *</label>
                    <input
                      type="text"
                      required
                      value={serviceFormData.name || ''}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={labelStyle}>Categoría</label>
                      <select
                        value={serviceFormData.category || 'Cabello & Terapia Capilar'}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                        style={inputStyle}
                      >
                        <option value="Cabello & Terapia Capilar">Cabello & Terapia Capilar</option>
                        <option value="Color, Peinado & Extensiones">Color, Peinado & Extensiones</option>
                        <option value="Cejas & Pestañas">Cejas & Pestañas</option>
                        <option value="Masoterapia & Corporal">Masoterapia & Corporal</option>
                        <option value="Depilación Íntima (Láser & Cera)">Depilación Íntima (Láser & Cera)</option>
                      </select>

                    </div>

                    <div>
                      <label style={labelStyle}>Duración (minutos)</label>
                      <input
                        type="number"
                        min={15}
                        step={15}
                        value={serviceFormData.duration || 60}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, duration: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                    <div>
                      <label style={labelStyle}>Precio (COP) *</label>
                      <input
                        type="number"
                        min={10000}
                        step={5000}
                        value={serviceFormData.price || 120000}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, price: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Ruta de Imagen</label>
                      <input
                        type="text"
                        value={serviceFormData.image || ''}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Descripción del Tratamiento</label>
                    <textarea
                      rows={3}
                      value={serviceFormData.description || ''}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                  <button
                    type="button"
                    onClick={() => { setIsNewService(false); setEditingService(null); }}
                    className="btn-outline-gold"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-gold" style={{ fontSize: '0.85rem' }}>
                    Guardar Servicio
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* RESCHEDULE SUB-MODAL */}
        {reschedulingApp && (
          <div className="modal-overlay" onClick={() => setReschedulingApp(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '1.8rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Reprogramar Cita {reschedulingApp.id}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                Cliente: <strong>{reschedulingApp.clientName}</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Nueva Fecha</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Nueva Hora</label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    style={inputStyle}
                  >
                    {['08:30', '10:00', '11:30', '13:30', '15:00', '16:30', '18:00'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setReschedulingApp(null)}
                  className="btn-outline-gold"
                  style={{ fontSize: '0.85rem' }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  className="btn-gold"
                  style={{ fontSize: '0.85rem' }}
                >
                  Confirmar Reprogramación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  color: 'var(--text-secondary)',
  marginBottom: '0.35rem',
  fontWeight: 500
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--gold-border-subtle)',
  borderRadius: 'var(--radius-sm)',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none'
};
