// ============================================================
// LOST CIVILIZATION — Main Entry
// ============================================================

import './scss/main.scss';
import 'lenis/dist/lenis.css';

// @ts-ignore - splitting has no types
import Splitting from 'splitting';

import { initLoader } from './ts/modules/loader';
import { initCursor } from './ts/modules/cursor';
import { initMagnetic } from './ts/modules/magnetic';
import { initAmbientCanvas } from './ts/modules/ambient';
import { initAudio } from './ts/modules/audio';
import { initSmoothScroll } from './ts/modules/smooth-scroll';
import { initNavigation } from './ts/modules/navigation';
import { initHero, playHeroEntrance } from './ts/sections/hero';
import { initScrollAnimations } from './ts/sections/scroll-animations';

// Initialize Splitting.js for word/char animations
Splitting();

// Initialize non-blocking modules immediately
initCursor();
initMagnetic();
initAmbientCanvas();
initAudio();
initNavigation();
initHero();

// Initialize smooth scroll
initSmoothScroll();

// Start loading sequence, then reveal hero
initLoader(() => {
  // After loader completes, play hero entrance
  playHeroEntrance();

  // Initialize scroll-driven animations after content is visible
  initScrollAnimations();
});
