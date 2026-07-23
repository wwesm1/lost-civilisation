// ============================================================
// MODULE / MAGNETIC BUTTONS
// Smooth magnetic attraction on hover
// ============================================================

import { $$, lerp, isTouchDevice } from '../utils/dom';

export function initMagnetic(): void {
  if (isTouchDevice()) return;

  const magnets = $$<HTMLElement>('.magnetic');

  magnets.forEach((el) => {
    const strength = 0.3;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let hovering = false;

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      targetX = relX * strength;
      targetY = relY * strength;
      hovering = true;
    });

    el.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      hovering = false;
    });

    function animate(): void {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;

      if (hovering || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
        requestAnimationFrame(animate);
      }
    }

    el.addEventListener('mouseenter', () => requestAnimationFrame(animate));
  });
}
