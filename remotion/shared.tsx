/**
 * Shared primitives for all Remotion compositions.
 * Colors are hardcoded (not CSS variables) so compositions also work
 * when rendered to video outside the browser.
 */

// Brand palette — mirrors the CSS tokens
export const C = {
  primary: "#2563EB",       // light-mode primary blue
  accent:  "#7C3AED",       // light-mode violet
  bg:      "#FFFFFF",
  fg:      "#0F172A",
  muted:   "#64748B",
  card:    "#F8FAFC",
  border:  "#E2E8F0",
  // dark variants (used for dark-overlay panels)
  darkBg:  "#0A0614",
  darkFg:  "#EDE9FE",
  darkMuted:"#9CA3AF",
  red:     "#EF4444",
  green:   "#22C55E",
  white:   "#FFFFFF",
};

// Reusable helpers
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Clamp a value between two boundaries */
export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/** Map a frame range to 0→1 progress, clamped */
export function prog(frame: number, from: number, to: number) {
  return clamp((frame - from) / (to - from), 0, 1);
}

/** Ease-out cubic */
export function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Ease-in-out */
export function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Shared full-bleed container
export const Fill: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Glow shadow helpers
export function glowBox(color: string, spread = 40) {
  return `0 0 ${spread}px ${color}40, 0 0 ${spread * 2}px ${color}20`;
}

export function glowText(color: string) {
  return `0 0 20px ${color}80`;
}
