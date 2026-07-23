// ============================================================
// MODULE / AMBIENT AUDIO
// Web Audio API generated ambient soundscape
// Desert wind, ancient echoes, temple ambience
// ============================================================

import { $ } from '../utils/dom';

export function initAudio(): void {
  const toggle = $('#audioToggle');
  if (!toggle) return;

  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let isPlaying = false;

  function createAudioContext(): AudioContext {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    return new AC();
  }

  // Build ambient soundscape with oscillators + noise
  function buildSoundscape(): void {
    if (!ctx || !masterGain) return;

    // --- Wind: filtered white noise ---
    const windBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const windData = windBuffer.getChannelData(0);
    for (let i = 0; i < windData.length; i++) {
      windData[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = windBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 400;
    windFilter.Q.value = 0.5;

    // LFO modulating wind filter for gusts
    const windLFO = ctx.createOscillator();
    windLFO.frequency.value = 0.08;
    const windLFOGain = ctx.createGain();
    windLFOGain.gain.value = 200;
    windLFO.connect(windLFOGain);
    windLFOGain.connect(windFilter.frequency);

    const windGain = ctx.createGain();
    windGain.gain.value = 0.15;

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    // --- Deep drone: low frequency oscillators ---
    const drone1 = ctx.createOscillator();
    drone1.type = 'sine';
    drone1.frequency.value = 55;

    const drone2 = ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 82.5;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.04;

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(masterGain);

    // --- Temple resonance: high shimmer ---
    const shimmer = ctx.createOscillator();
    shimmer.type = 'triangle';
    shimmer.frequency.value = 440;

    const shimmerLFO = ctx.createOscillator();
    shimmerLFO.frequency.value = 0.15;
    const shimmerLFOGain = ctx.createGain();
    shimmerLFOGain.gain.value = 30;
    shimmerLFO.connect(shimmerLFOGain);
    shimmerLFOGain.connect(shimmer.frequency);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.008;

    shimmer.connect(shimmerGain);
    shimmerGain.connect(masterGain);

    // Start everything
    windSource.start();
    windLFO.start();
    drone1.start();
    drone2.start();
    shimmer.start();
    shimmerLFO.start();

  }

  function start(): void {
    if (!ctx) {
      ctx = createAudioContext();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      buildSoundscape();
    }

    if (ctx.state === 'suspended') ctx.resume();

    isPlaying = true;
    toggle!.classList.add('is-playing');

    // Fade in
    if (masterGain && ctx) {
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);
    }
  }

  function stop(): void {
    isPlaying = false;
    toggle!.classList.remove('is-playing');

    if (masterGain && ctx) {
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }
  }

  toggle.addEventListener('click', () => {
    if (isPlaying) stop();
    else start();
  });
}
