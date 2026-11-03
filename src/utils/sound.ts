/**
 * Audio Feedback Sutil con Web Audio API Nativo
 * Principio Ponytail YAGNI: 0 dependencias externas, cero latencia, 100% ligero.
 * Tonos suaves armónicos (frecuencias curativas y campana de cristal para experiencia de spa).
 */

class SpaAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Lectura de preferencia previa
    try {
      const stored = localStorage.getItem('minha_beleza_sound');
      if (stored !== null) {
        this.enabled = stored === 'true';
      }
    } catch {
      this.enabled = true;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('minha_beleza_sound', String(this.enabled));
    } catch {
      // Ignorar en sandbox
    }
    if (this.enabled) {
      this.playChime();
    }
    return this.enabled;
  }

  /**
   * Campana sutil de cristal (click suave / apertura de modal)
   */
  public playSoftClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // Frecuencia 528 Hz (armonía y serenidad)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio seguro
    }
  }

  /**
   * Acorde armónico de confirmación (reserva exitosa / acción confirmada)
   */
  public playChime() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [432, 540, 648]; // Tríada armónica basada en afinación 432Hz
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6 + idx * 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + 0.65 + idx * 0.05);
      });
    } catch {
      // Audio seguro
    }
  }
}

export const spaAudio = new SpaAudioEngine();
