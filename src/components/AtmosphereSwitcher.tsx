import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { spaAudio } from '../utils/sound';

export const AtmosphereSwitcher: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(spaAudio.enabled);
  const [ambientActive, setAmbientActive] = useState<boolean>(false);

  const handleToggleSound = () => {
    const nextState = spaAudio.toggleSound();
    setSoundEnabled(nextState);
  };

  const handleTriggerChime = () => {
    spaAudio.playSingingBowl();
    setAmbientActive(true);
    setTimeout(() => setAmbientActive(false), 2800);
  };

  return (
    <aside
      className="atmosphere-pill"
      aria-label="Selector de Atmósfera Sensorial del Santuario"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <button
          onClick={handleTriggerChime}
          title="Tocar cuenco armónico 432Hz"
          aria-label="Tocar cuenco armónico 432Hz"
          style={{
            background: ambientActive ? 'var(--gold-wash-hover)' : 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ambientActive ? 'var(--gold-light)' : 'var(--gold-primary)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <Sparkles size={15} />
        </button>

        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            userSelect: 'none'
          }}
        >
          Atmósfera 432Hz
        </span>
      </div>

      <div style={{ width: '1px', height: '16px', background: 'var(--border-subtle)' }} />

      <button
        onClick={handleToggleSound}
        title={soundEnabled ? 'Silenciar retroalimentación de audio' : 'Activar audio suave de spa'}
        aria-label={soundEnabled ? 'Silenciar audio' : 'Activar audio'}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '4px',
          color: soundEnabled ? 'var(--gold-warm)' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
      >
        {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </aside>
  );
};
