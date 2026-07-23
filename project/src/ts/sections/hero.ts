// ============================================================
// SECTIONS / HERO
// Temple emergence, mouse parallax, title reveal
// ============================================================

import { gsap } from 'gsap';
import { $, $$, isTouchDevice } from '../utils/dom';

export function initHero(): void {
  const temple = $('#heroTemple');
  const layers = $$('[data-parallax]');

  // Mouse parallax
  if (!isTouchDevice()) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function parallaxLoop(): void {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.parallax || '0.1');
        const moveX = currentX * 30 * depth;
        const moveY = currentY * 20 * depth;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      // Temple rotation
      if (temple) {
        temple.style.transform = `translateX(calc(-50% + ${currentX * 15}px)) rotateY(${currentX * 5}deg) scale(${1 + Math.abs(currentY) * 0.02})`;
      }

      requestAnimationFrame(parallaxLoop);
    }

    requestAnimationFrame(parallaxLoop);
  }
}

export function playHeroEntrance(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Temple emerges
  tl.to('#heroTemple', {
    opacity: 1,
    duration: 2.5,
    ease: 'power2.out',
  });

  // Eyebrow
  tl.to('#heroEyebrow', {
    opacity: 1,
    y: 0,
    duration: 1,
  }, '-=1.5');

  // Title chars
  tl.to('.hero__title .char', {
    opacity: 1,
    y: 0,
    rotateX: 0,
    stagger: 0.04,
    duration: 1.2,
  }, '-=1');

  // Subtitle
  tl.to('#heroSubtitle', {
    opacity: 1,
    duration: 1,
  }, '-=0.5');

  // CTA
  tl.to('#heroCta', {
    opacity: 1,
    y: 0,
    duration: 1,
  }, '-=0.5');
}
