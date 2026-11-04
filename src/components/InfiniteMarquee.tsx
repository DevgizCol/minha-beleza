import React from 'react';
import { Sparkles } from 'lucide-react';

interface MarqueeProps {
  items?: string[];
}

export const InfiniteMarquee: React.FC<MarqueeProps> = ({
  items = [
    'Masoterapia Biomecánica',
    'Suite Residencial Privada',
    'Rosangel Benítez Atelier',
    'Santa Teresita • Laureles',
    'Alineación Dérmica & Bioseguridad',
    'Neuroacústica 432Hz & Aromaterapia',
    'Atención 1-a-1 Sin Esperas',
    'Lencería de Hilo Egipcio'
  ]
}) => {
  // Duplicar elementos para scroll continuo sin saltos
  const trackItems = [...items, ...items];

  return (
    <div className="marquee-band" aria-label="Especialidades y credenciales de Minha Beleza">
      <div className="marquee-track">
        {trackItems.map((text, idx) => (
          <div key={idx} className="marquee-item">
            <Sparkles size={13} className="marquee-separator" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
