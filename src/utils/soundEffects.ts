// Synthesized child-friendly game sound effects using Web Audio API

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundEffectsEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

export function isSoundEffectsEnabled(): boolean {
  return soundEnabled;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  startTimeOffset = 0,
  volume = 0.16,
  endFrequency?: number
): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  if (endFrequency !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFrequency), now + duration);
  }

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/** Playful wooden-marimba pop on button click */
export function playClick(): void {
  playTone(540, 0.075, 'triangle', 0, 0.15, 720);
}

/** Cheerful ascending major arpeggio when answer is right */
export function playCorrect(): void {
  playTone(523.25, 0.14, 'triangle', 0, 0.18); // C5
  playTone(659.25, 0.14, 'triangle', 0.09, 0.18); // E5
  playTone(783.99, 0.16, 'triangle', 0.18, 0.18); // G5
  playTone(1046.5, 0.3, 'sine', 0.27, 0.2); // C6
}

/** Gentle encouraging "boing / try again" tone (never harsh) */
export function playWrong(): void {
  playTone(330, 0.16, 'sine', 0, 0.14, 240);
  playTone(250, 0.22, 'sine', 0.13, 0.14, 195);
}

/** Sparkly bell chime for earning a star / celebration */
export function playStar(): void {
  playTone(659.25, 0.12, 'sine', 0, 0.16);
  playTone(880, 0.12, 'sine', 0.08, 0.16);
  playTone(1174.66, 0.14, 'sine', 0.16, 0.18);
  playTone(1318.51, 0.35, 'triangle', 0.24, 0.18);
}

/** Crisp chime when microphone starts listening */
export function playStartMic(): void {
  playTone(587.33, 0.09, 'sine', 0, 0.14);
  playTone(880, 0.14, 'sine', 0.07, 0.14);
}
