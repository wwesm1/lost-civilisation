// ============================================================
// UTIL / DOM helpers
// ============================================================

export const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T | null =>
  ctx.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T[] =>
  Array.from(ctx.querySelectorAll<T>(sel));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v));

export const map = (v: number, inMin: number, inMax: number, outMin: number, outMax: number): number =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouchDevice = (): boolean =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;
