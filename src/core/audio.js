export class AudioManager {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sounds = new Map();
    this.enabled = false;
    this.masterGain = this.context.createGain();
    this.masterGain.connect(this.context.destination);
    
    // Default volume
    this.masterGain.gain.value = 0.5;
  }

  async loadSound(id, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.sounds.set(id, audioBuffer);
    } catch (e) {
      console.warn(`Failed to track sound: ${url}`, e);
    }
  }

  play(id, { volume = 1, loop = false, pitch = 1 } = {}) {
    if (!this.enabled || !this.sounds.has(id)) return null;

    const source = this.context.createBufferSource();
    source.buffer = this.sounds.get(id);
    source.loop = loop;
    source.playbackRate.value = pitch;

    const gainNode = this.context.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.masterGain);

    source.start();
    return { source, gainNode };
  }

  toggle(enable) {
    this.enabled = enable;
    if (this.enabled && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  createOscillatorPulse(freq = 440, duration = 0.5) {
    if (!this.enabled) return;
    
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.context.currentTime + duration);
    
    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.context.currentTime + duration);
  }
}

// Global instance
export const audioManager = new AudioManager();

export function initAudioUI() {
  const btn = document.createElement('button');
  btn.className = 'audio-toggle-btn magnetic';
  btn.innerHTML = `<span class="icon">🔇</span> Enable Sound`;
  document.body.appendChild(btn);

  let isEnabled = false;

  btn.addEventListener('click', () => {
    isEnabled = !isEnabled;
    audioManager.toggle(isEnabled);
    
    if (isEnabled) {
      btn.innerHTML = `<span class="icon">🔊</span> Sound On`;
      btn.classList.add('active');
      audioManager.createOscillatorPulse(300, 1); // Confirmation sound
    } else {
      btn.innerHTML = `<span class="icon">🔇</span> Sound Off`;
      btn.classList.remove('active');
    }
  });

  // Attach generic hover sound to buttons
  const interactables = document.querySelectorAll('button, a, .chapter-dot');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      audioManager.createOscillatorPulse(800, 0.1); 
    });
  });
}
