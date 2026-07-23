// ============================================================
// MODULE / AMBIENT CANVAS
// Sand particles, floating dust, drifting fog, embers
// Continuous subtle movement — never static
// ============================================================

import { $, prefersReducedMotion } from '../utils/dom';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  type: 'sand' | 'dust' | 'ember';
  life: number;
  maxLife: number;
}

export function initAmbientCanvas(): void {
  const canvas = $('#ambientCanvas') as HTMLCanvasElement | null;
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d')!;
  if (!ctx) return;

  let width = 0, height = 0;
  let particles: Particle[] = [];
  let mouseX = 0, mouseY = 0;
  let time = 0;

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas!.width = width * dpr;
    canvas!.height = height * dpr;
    canvas!.style.width = `${width}px`;
    canvas!.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }

  const COLORS = {
    sand: 'rgba(138, 110, 74,',
    dust: 'rgba(216, 181, 107,',
    ember: 'rgba(230, 165, 92,',
  };

  function createParticle(type: Particle['type']): Particle {
    const maxLife = type === 'ember' ? 300 + Math.random() * 200 : 600 + Math.random() * 600;
    return {
      x: Math.random() * width,
      y: type === 'ember' ? height + 10 : Math.random() * height,
      vx: type === 'sand' ? -0.3 - Math.random() * 0.5 : (Math.random() - 0.5) * 0.2,
      vy: type === 'ember' ? -0.5 - Math.random() * 0.8 : (Math.random() - 0.5) * 0.15,
      size: type === 'ember' ? 1 + Math.random() * 2 : 0.5 + Math.random() * 1.5,
      opacity: 0,
      baseOpacity: type === 'ember' ? 0.4 + Math.random() * 0.4 : 0.1 + Math.random() * 0.3,
      color: COLORS[type],
      type,
      life: 0,
      maxLife,
    };
  }

  function initParticles(): void {
    particles = [];
    const sandCount = Math.floor((width * height) / 25000);
    const dustCount = Math.floor((width * height) / 40000);
    const emberCount = Math.floor((width * height) / 80000);

    for (let i = 0; i < sandCount; i++) particles.push(createParticle('sand'));
    for (let i = 0; i < dustCount; i++) particles.push(createParticle('dust'));
    for (let i = 0; i < emberCount; i++) particles.push(createParticle('ember'));
  }

  function update(p: Particle): void {
    p.life++;
    p.x += p.vx;
    p.y += p.vy;

    // Fade in/out
    if (p.life < 60) {
      p.opacity = (p.life / 60) * p.baseOpacity;
    } else if (p.life > p.maxLife - 60) {
      p.opacity = ((p.maxLife - p.life) / 60) * p.baseOpacity;
    } else {
      p.opacity = p.baseOpacity;
    }

    // Mouse influence — subtle push
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (1 - dist / 150) * 0.5;
      p.vx += (dx / dist) * force * 0.02;
      p.vy += (dy / dist) * force * 0.02;
    }

    // Dampen velocity
    p.vx *= 0.99;
    p.vy *= 0.99;

    // Reset particle
    if (p.life >= p.maxLife || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
      Object.assign(p, createParticle(p.type));
    }
  }

  function draw(p: Particle): void {
    if (!ctx) return;

    if (p.type === 'ember') {
      // Glowing ember
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
      gradient.addColorStop(0, `${p.color}${p.opacity})`);
      gradient.addColorStop(0.5, `${p.color}${p.opacity * 0.3})`);
      gradient.addColorStop(1, `${p.color}0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Fog layer — slow drifting gradient
  function drawFog(): void {
    if (!ctx) return;
    const fogX = Math.sin(time * 0.0003) * 100 + width / 2;
    const fogY = Math.cos(time * 0.0002) * 50 + height / 2;
    const gradient = ctx.createRadialGradient(fogX, fogY, 0, fogX, fogY, width * 0.6);
    gradient.addColorStop(0, 'rgba(230, 165, 92, 0.015)');
    gradient.addColorStop(0.5, 'rgba(138, 110, 74, 0.008)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function animate(): void {
    if (!ctx) return;
    time++;
    ctx.clearRect(0, 0, width, height);

    drawFog();

    for (const p of particles) {
      update(p);
      draw(p);
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  resize();
  initParticles();
  animate();
}
