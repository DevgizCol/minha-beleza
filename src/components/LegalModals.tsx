import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Lock, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'informed-consent' | null;

interface LegalModalsProps {
  initialDoc?: LegalDocType;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  initialDoc = 'terms',
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc || 'terms');

  useEffect(() => {
    if (initialDoc) setActiveTab(initialDoc);
  }, [initialDoc]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 4, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem'
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '840px',
          height: '85vh',
          maxHeight: '800px',
          background: 'linear-gradient(135deg, #0B0A12 0%, #141120 100%)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 45px rgba(212, 175, 55, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header with Navigation Tabs */}
        <div
          style={{
            padding: '1.5rem 2rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.01)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)'
                }}
              >
                <Scale size={18} />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    letterSpacing: '0.04em',
                    color: 'var(--text-pure)',
                    margin: 0
                  }}
                >
                  Marco Jurídico & Blindaje Normativo
                </h2>
                <span style={{ fontSize: '0.74rem', color: 'var(--gold-warm)' }}>
                  Santuario Minha Beleza • Medellín, Colombia
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Cerrar modal legal"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Pill Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('terms')}
              style={{
                background: activeTab === 'terms' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'terms' ? '#08070C' : 'var(--text-secondary)',
                fontWeight: activeTab === 'terms' ? 700 : 500,
                border: activeTab === 'terms' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={14} />
              <span>Términos del Servicio & Cancelación</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              style={{
                background: activeTab === 'privacy' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'privacy' ? '#08070C' : 'var(--text-secondary)',
                fontWeight: activeTab === 'privacy' ? 700 : 500,
                border: activeTab === 'privacy' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Lock size={14} />
              <span>Política de Tratamiento de Datos (Ley 1581)</span>
            </button>

            <button
              onClick={() => setActiveTab('informed-consent')}
              style={{
                background: activeTab === 'informed-consent' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'informed-consent' ? '#08070C' : 'var(--text-secondary)',
                fontWeight: activeTab === 'informed-consent' ? 700 : 500,
                border: activeTab === 'informed-consent' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Shield size={14} />
              <span>Consentimiento Médico-Estético</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7
          }}
        >
          {activeTab === 'terms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  color: 'var(--gold-light)',
                  fontSize: '0.82rem'
                }}
              >
                <strong>Vigencia y Ámbito Legal:</strong> Este contrato regula el acceso y la prestación de servicios en el santuario de estética y masoterapia de autor <em>Minha Beleza</em> por Rosangel Benítez, con sede en Santa Teresita, Laureles, Medellín, Colombia. Al reservar, el usuario consiente de manera vinculante estos términos.
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  1. Naturaleza Privada y Residencial del Santuario
                </h4>
                <p>
                  Minha Beleza opera bajo el formato de <strong>Santuario Residencial Privado</strong> con atención individualizada y exclusiva. Para salvaguardar la intimidad, serenidad y bioseguridad, se reserva el derecho de admisión. Solo se permite el ingreso con cita confirmada previa y sin acompañantes no autorizados.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  2. Política Estricta de Puntualidad & Tolerancia
                </h4>
                <p>
                  Los tiempos de atención están rigurosamente agendados para no afectar a los huéspedes subsiguientes. Se otorga una tolerancia máxima de <strong>15 minutos</strong>. Superado este lapso, el tiempo de retraso podrá deducirse de la duración de la sesión contratada o la cita podrá reprogramarse según disponibilidad, con el fin de proteger la agenda del santuario.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  3. Política de Cancelación, Reprogramación y No-Show
                </h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>
                    <strong>Aviso Previo:</strong> Toda reprogramación o cancelación debe notificarse con un mínimo de <strong>24 horas de antelación</strong> a través de los canales de contacto oficial de WhatsApp (+57 304 458 1959).
                  </li>
                  <li>
                    <strong>Inasistencia no Notificada (No-Show):</strong> La inasistencia injustificada sin el aviso de 24 horas inhabilitará el sistema de reservas directas para el usuario, requiriendo el pago anticipado íntegro para futuras sesiones.
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  4. Tarifas, Moneda & Formas de Pago
                </h4>
                <p>
                  Las tarifas mostradas en la plataforma digital corresponden al valor base en Pesos Colombianos (COP). Las equivalencias mostradas en Dólares (USD) y Euros (EUR) son referencias ilustrativas basadas en tipos de cambio representativos. El pago se efectúa directamente en el santuario o mediante transferencias electrónicas autorizadas (Bancolombia, Nequi o pasarela habilitada).
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  5. Bioseguridad y Salud
                </h4>
                <p>
                  Todo material e instrumental en contacto dérmico se somete a procesos de sanitización y esterilización de grado clínico o corresponde a insumos descartables de un solo uso. Si el cliente presenta síntomas de infecciones respiratorias activas, lesiones contagiosas o fiebre, deberá reprogramar su cita.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  6. Propiedad Intelectual
                </h4>
                <p>
                  La marca Minha Beleza, su arquitectura visual, diseño web e ingeniería de software han sido concebidos y desarrollados por <strong>DevGiz</strong> (<a href="https://devgiz.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)' }}>devgiz.vercel.app</a>). Queda prohibida la reproducción no autorizada de los contenidos o código fuente.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  7. Ley Aplicable y Jurisdicción
                </h4>
                <p>
                  Este contrato se rige íntegramente por la legislación de la República de Colombia. Cualquier diferendo será dirimido ante los jueces de la ciudad de Medellín, Antioquia.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#93c5fd',
                  fontSize: '0.82rem'
                }}
              >
                <strong>Cumplimiento Normativo Habeas Data:</strong> En conformidad con la Ley Estatutaria 1581 de 2012 y su Decreto Reglamentario 1377 de 2013 de Colombia, Minha Beleza adopta la presente Política de Tratamiento de Datos Personales.
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  1. Identificación del Responsable del Tratamiento
                </h4>
                <p>
                  <strong>Razón / Titular:</strong> Rosangel Benítez • Minha Beleza<br />
                  <strong>Domicilio:</strong> Calle 34A #84-35, Santa Teresita, Laureles, Medellín, Colombia.<br />
                  <strong>Línea Concierge:</strong> +57 304 458 1959<br />
                  <strong>Canal de Tratamiento de Datos:</strong> rosangelbenitez@gmail.com
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  2. Datos Personales Recolectados y Finalidad
                </h4>
                <p>
                  Minha Beleza únicamente recopila los datos estrictamente pertinentes para el servicio: nombre completo, número de teléfono WhatsApp, correo electrónico y notas de salud relevantes para el tratamiento estético o masoterapéutico.
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Confirmación, recordatorio y seguimiento de citas agendadas.</li>
                  <li>Envío del Boarding Pass digital y sincronización con calendarios.</li>
                  <li>Prevención de riesgos de salud o contraindicaciones estéticas.</li>
                  <li>Atención a solicitudes, felicitaciones o reclamos (PQRS).</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  3. Tratamiento de Datos Sensibles (Salud)
                </h4>
                <p>
                  La información de salud (alergias cosméticas, antecedentes dérmicos, embarazo o presencia de aparatología médica interna como marcapasos) es tratada con el máximo rigor de confidencialidad y secreto profesional. Su suministro es facultativo pero indispensable para no incurrir en riesgos contraindicados.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  4. Derechos de los Titulares (Derechos ARCO)
                </h4>
                <p>
                  Usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales, así como revocar la autorización otorgada en cualquier momento, enviando un mensaje directo a nuestra línea de WhatsApp o al correo designado. Su solicitud será atendida en un plazo máximo de 10 días hábiles.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  5. No Cesión a Terceros
                </h4>
                <p>
                  Minha Beleza <strong>jamás vende, arrienda ni transfiere</strong> sus bases de datos personales a empresas de publicidad, telemercadeo o terceras partes.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'informed-consent' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#fca5a5',
                  fontSize: '0.82rem',
                  display: 'flex',
                  gap: '10px'
                }}
              >
                <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Declaración Jurada y Exoneración de Responsabilidad Clínica:</strong> La cosmetología y masoterapia son disciplinas de bienestar corporal no invasivas. El cliente asume la responsabilidad de declarar verazmente su estado de salud antes de someterse a cualquier procedimiento.
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  1. Masoterapia Corporal & Descargas Musculares
                </h4>
                <p>
                  El cliente certifica que no padece trombosis venosa profunda, fracturas no consolidadas, heridas abiertas recientes, procesos oncológicos activos sin autorización médica expresa ni cuadros infecciosos. Las maniobras descontracturantes pueden generar una ligera sensibilidad muscular pasajera en las 24-48 horas posteriores, lo cual constituye una respuesta fisiológica normal.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  2. Aparatología Estética & Radiofrecuencia
                </h4>
                <p>
                  <strong>Contraindicaciones Absolutas:</strong> Está estrictamente prohibido someterse a radiofrecuencia o aparatología bioeléctrica si el usuario es portador de marcapasos cardíacos, desfibriladores internos, implantes metálicos en la zona a tratar, prótesis bioelectrónicas o se encuentra en estado de embarazo o lactancia temprana.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  3. Tratamientos Químicos Capilares (Keratinas, Tintes & Balayage)
                </h4>
                <p>
                  Aunque nuestras formulaciones de keratina son 100% orgánicas y libres de formaldehído, el cliente declara si posee antecedentes de hipersensibilidad en cuero cabelludo o alergias cutáneas. En procesos de decoloración o tintura, el cliente acepta que el resultado final depende de la memoria química previa de la hebra capilar.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  4. Depilación Láser Diodo & Cera Elástica
                </h4>
                <p>
                  El cliente declara no haber estado bajo tratamiento con isotretinoína (Roaccutan) en los últimos 6 meses, no padecer fotosensibilidad inducida por fármacos y no haberse expuesto a bronceado solar intenso 72 horas previas a la sesión.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-pure)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  5. Aceptación Criptográfica y Firma Trazable
                </h4>
                <p>
                  Al marcar la casilla de verificación en el flujo de reserva, se genera un sello de tiempo criptográfico inmutable con identificador único que certifica la plena lectura, comprensión y aceptación de esta declaración médica y exoneración legal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Acknowledgment */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={14} color="#4ade80" />
            <span>Documentación auditada conforme a la legislación civil y comercial de Colombia.</span>
          </div>

          <button
            onClick={onClose}
            className="btn-gold"
            style={{
              padding: '0.55rem 1.6rem',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Entendido y Conforme
          </button>
        </div>
      </div>
    </div>
  );
};
