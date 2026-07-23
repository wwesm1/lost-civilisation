// ============================================================
// SECTIONS / SCROLL ANIMATIONS
// All section reveals via GSAP ScrollTrigger
// ============================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../utils/dom';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(): void {
  if (prefersReducedMotion()) {
    $$('[data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
    });
    return;
  }

  // --- Splitting.js title reveals ---
  const splitTitles = $$('[data-splitting]');
  splitTitles.forEach((title) => {
    const chars = $$('.char', title);
    if (chars.length === 0) return;

    gsap.set(chars, { opacity: 0, y: 60, rotateX: -45 });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power3.out',
        });
      },
    });
  });

  // --- Generic data-reveal elements ---
  $$('[data-reveal]').forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: 80, scale: 0.95 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: (i % 4) * 0.1,
        });
      },
    });
  });

  // --- Desert section parallax ---
  const desertStatues = $$('.desert__statue');
  desertStatues.forEach((statue) => {
    gsap.to(statue, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: statue,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

  // --- Ancient Gates: doors open on scroll ---
  const gateLeft = document.getElementById('gateLeft');
  const gateRight = document.getElementById('gateRight');
  const gateLight = document.getElementById('gateLight');

  if (gateLeft && gateRight) {
    gsap.to(gateLeft, {
      rotationY: -75,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#gates',
        start: 'top 60%',
        end: 'center center',
        scrub: 1.5,
      },
    });

    gsap.to(gateRight, {
      rotationY: 75,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#gates',
        start: 'top 60%',
        end: 'center center',
        scrub: 1.5,
      },
    });

    if (gateLight) {
      gsap.to(gateLight, {
        opacity: 1,
        width: 100,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#gates',
          start: 'top 60%',
          end: 'center center',
          scrub: 1.5,
        },
      });
    }
  }

  // --- Hall of Kings: parallax ---
  $$('.hall__statue-card').forEach((card) => {
    gsap.to(card, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

  // --- Library: floating books parallax ---
  $$('.library__book').forEach((book, i) => {
    gsap.to(book, {
      y: (i % 2 === 0 ? -20 : 20),
      ease: 'none',
      scrollTrigger: {
        trigger: book,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  });

  // --- Chamber: relic parallax ---
  $$('.chamber__relic').forEach((relic) => {
    gsap.to(relic, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: relic,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

  // --- Sanctuary: final reveal ---
  const sanctuaryMessage = $('.sanctuary__message');
  if (sanctuaryMessage) {
    const chars = $$('.char', sanctuaryMessage);
    if (chars.length > 0) {
      gsap.set(chars, { opacity: 0, y: 40, scale: 0.8 });
      ScrollTrigger.create({
        trigger: sanctuaryMessage,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: 'power3.out',
          });
        },
      });
    }
  }

  ['sanctuaryEyebrow', 'sanctuarySub', 'sanctuaryDivider', 'sanctuaryEnd'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, duration: 1.5, ease: 'power2.out' });
        },
      });
    }
  });

  // --- Section background parallax ---
  $$('section').forEach((section) => {
    gsap.to(section, {
      backgroundPositionY: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}
