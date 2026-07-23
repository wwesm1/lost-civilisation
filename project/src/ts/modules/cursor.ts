// ============================================================
// MODULE / CUSTOM CURSOR
// Smooth interpolation, magnetic hover, expand + glow
// ============================================================

import { $, lerp, isTouchDevice } from '../utils/dom';

export function initCursor(): void {
  if (isTouchDevice()) return;

  const cursor = $('#cursor');
  const dot = $('#cursorDot') as HTMLElement;
  const ring = $('#cursorRing') as HTMLElement;

  if (!cursor || !dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Click state
  window.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));

  // Hover targets
  const hoverSelector = 'a, button, [data-cursor]';
  document.addEventListener('mouseover', (e) => {
    const target = e.target as Element;
    if (target.closest(hoverSelector)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target as Element;
    if (target.closest(hoverSelector)) cursor.classList.remove('is-hovering');
  });

  // Render loop
  function render(): void {
    dotX = lerp(dotX, mouseX, 0.35);
    dotY = lerp(dotY, mouseY, 0.35);
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);

    dot!.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    ring!.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }

  render();
}
