// ============================================================
// MODULE / LOADER
// Ancient symbol assembly + golden dust reveal
// ============================================================

import { $ } from '../utils/dom';

export function initLoader(onComplete: () => void): void {
  const loader = $('#loader');
  const bar = $('#loaderBar');
  const percent = $('#loaderPercent');

  if (!loader || !bar || !percent) {
    onComplete();
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    // Non-linear progress for cinematic feel
    progress += Math.random() * 8 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      percent.textContent = '100%';

      setTimeout(() => {
        loader.classList.add('is-exiting');
        setTimeout(() => {
          loader.style.display = 'none';
          onComplete();
        }, 1200);
      }, 500);
    } else {
      bar.style.width = `${progress}%`;
      percent.textContent = `${Math.floor(progress)}%`;
    }
  }, 80);
}
