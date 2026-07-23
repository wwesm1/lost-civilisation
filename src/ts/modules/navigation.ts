// ============================================================
// MODULE / NAVIGATION
// Scroll-aware nav, progress indicator, mobile menu
// ============================================================

import { $, $$ } from '../utils/dom';

export function initNavigation(): void {
  const nav = $('#nav');
  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  const progressBar = $('#progressBar');
  const progressLabel = $('#progressLabel');
  const progressDots = $$('.progress-dots__dot');

  const sections = $$<HTMLElement>('section[id]');
  const sectionNames: Record<string, string> = {
    hero: '01 — Hero',
    desert: '02 — The Desert',
    gates: '03 — The Ancient Gates',
    hall: '04 — Hall of Kings',
    library: '05 — The Forgotten Library',
    chamber: '06 — The Hidden Chamber',
    sanctuary: '07 — The Final Sanctuary',
  };

  // Nav background on scroll
  function onScroll(): void {
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    // Progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    if (progressBar) progressBar.style.height = `${progress}%`;
  }

  // Active section detection
  function detectActiveSection(): void {
    const mid = window.innerHeight / 2;
    let activeId = 'hero';

    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom >= mid) {
        activeId = sec.id;
        break;
      }
    }

    // Update label
    if (progressLabel && sectionNames[activeId]) {
      progressLabel.textContent = sectionNames[activeId];
    }

    // Update dots
    progressDots.forEach((dot: HTMLElement) => {
      dot.classList.toggle('is-active', dot.dataset.section === activeId);
    });

    // Update nav links
    $$('.nav__link').forEach((link: HTMLElement) => {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === `#${activeId}`);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        detectActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  onScroll();
  detectActiveSection();

  // Mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Progress dot clicks — smooth scroll
  progressDots.forEach((dot: HTMLElement) => {
    dot.addEventListener('click', () => {
      const id = dot.dataset.section;
      if (!id) return;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
