/**
 * Three animated "how it works" compositions — one per step.
 * 30fps / 90 frames (3 s) each.
 */

import { useCurrentFrame, AbsoluteFill } from "remotion";
import { C, prog, easeOut, easeInOut, glowBox, glowText } from "./shared";

const FPS = 30;
const DUR = 90;

/* ─── HIW1: Preview Call ──────────────────────────── */
export function HowItWorks1Preview() {
  const f = useCurrentFrame();

  // Chat bubbles appear sequentially
  const msgs = [
    { from: "us",   text: "What vibe should your site give?" },
    { from: "them", text: "Luxury. Warm. Like walking into a high-end salon." },
    { from: "us",   text: "Perfect. We have exactly that." },
  ];
  const msgPs = msgs.map((_, i) => easeOut(prog(f, 8 + i * 18, 20 + i * 18)));

  // Mock on screen
  const screenIn = easeOut(prog(f, 52, 70));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, padding: 20 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 40% 30%, ${C.primary}0e 0%, transparent 60%)`,
      }} />

      <div style={{ color: C.darkMuted, fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>
        Step 1 — Discovery
      </div>

      {/* Chat bubbles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 270 }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.from === "us" ? "flex-start" : "flex-end",
            opacity: msgPs[i],
            transform: `translateY(${(1 - msgPs[i]) * 10}px)`,
          }}>
            <div style={{
              background: msg.from === "us"
                ? `linear-gradient(135deg, ${C.primary}30, ${C.accent}20)`
                : "#1E293B",
              border: `1px solid ${msg.from === "us" ? C.primary + "40" : "#334155"}`,
              borderRadius: msg.from === "us" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
              padding: "8px 12px",
              maxWidth: "78%",
              color: C.darkFg, fontSize: 11, lineHeight: 1.5,
            }}>
              {msg.text}
              {msg.from === "us" && (
                <div style={{ fontSize: 8, color: C.primary, marginTop: 3, opacity: 0.8 }}>IO Projects</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mini preview mockup */}
      <div style={{
        width: 180, background: "#0F172A", borderRadius: 10,
        border: `1px solid ${C.primary}30`,
        boxShadow: glowBox(C.primary, 18),
        overflow: "hidden",
        opacity: screenIn,
        transform: `scale(${0.85 + screenIn * 0.15})`,
      }}>
        <div style={{ background: "#1E1B4B", height: 8, display: "flex", alignItems: "center", paddingLeft: 6, gap: 3 }}>
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} style={{ width: 4, height: 4, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ padding: "8px 10px" }}>
          <div style={{
            height: 6, borderRadius: 3, marginBottom: 4, width: "55%",
            background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, opacity: 0.8,
          }} />
          <div style={{ height: 4, borderRadius: 2, marginBottom: 3, width: "80%", background: "#334155" }} />
          <div style={{ height: 4, borderRadius: 2, marginBottom: 6, width: "65%", background: "#334155" }} />
          <div style={{
            height: 20, borderRadius: 6,
            background: `linear-gradient(90deg, ${C.accent}60, ${C.primary}60)`,
          }} />
        </div>
      </div>

      <div style={{
        color: C.darkMuted, fontSize: 11, textAlign: "center",
        opacity: easeOut(prog(f, 72, 84)),
      }}>
        In 30 min we know exactly what you need.
      </div>
    </AbsoluteFill>
  );
}

/* ─── HIW2: Build ─────────────────────────────────── */
export function HowItWorks2Build() {
  const f = useCurrentFrame();

  // Code lines appearing — then page rendering
  const codeLines = 6;
  const linePs = Array.from({ length: codeLines }, (_, i) =>
    easeOut(prog(f, 4 + i * 7, 14 + i * 7))
  );

  const renderP = easeOut(prog(f, 52, 72));
  const sparkleP = easeOut(prog(f, 68, 82));

  const fakeLines = [
    { indent: 0, color: C.primary,  text: "export default function ElenaHero() {" },
    { indent: 1, color: "#9CA3AF",  text: "return (" },
    { indent: 2, color: C.accent,   text: '<section className="luxury-hero">' },
    { indent: 3, color: "#9CA3AF",  text: "<HeroHeadline />" },
    { indent: 3, color: C.green,    text: "<BookingCTA label='Book Elena' />" },
    { indent: 2, color: C.accent,   text: "</section>" },
  ];

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, padding: 20 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 60% 40%, ${C.accent}0c 0%, transparent 60%)`,
      }} />

      <div style={{ color: C.darkMuted, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
        Step 2 — Build
      </div>

      {/* Code panel */}
      <div style={{
        background: "#0F172A", borderRadius: 10, padding: "12px 14px",
        border: `1px solid #1E293B`, width: 280, fontFamily: "monospace",
      }}>
        {/* Editor tab bar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 8, color: "#4B5563" }}>ElenaHero.tsx</span>
        </div>

        {fakeLines.map((line, i) => (
          <div key={i} style={{
            paddingLeft: line.indent * 10,
            fontSize: 9, lineHeight: 1.8,
            color: line.color,
            opacity: linePs[i],
          }}>
            {line.text}
          </div>
        ))}

        {/* Cursor blink */}
        <div style={{
          display: "inline-block", width: 6, height: 12, background: C.primary,
          opacity: Math.sin(f * 0.5) > 0 ? 1 : 0, marginLeft: 60, marginTop: 2,
        }} />
      </div>

      {/* Rendered result preview */}
      <div style={{
        width: 280, borderRadius: 10, overflow: "hidden",
        background: `linear-gradient(135deg, #0F172A, #1E1B4B)`,
        border: `1px solid ${C.primary}40`,
        boxShadow: glowBox(C.primary, 18),
        opacity: renderP,
        transform: `scale(${0.9 + renderP * 0.1})`,
      }}>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4 }}>
            ✨ Elena Müller
          </div>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 8 }}>
            Luxury Bridal Makeup · Berlin
          </div>
          <div style={{
            background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
            borderRadius: 6, padding: "5px 12px",
            color: C.white, fontSize: 10, fontWeight: 700,
            display: "inline-block",
            boxShadow: glowBox(C.primary, 10),
            opacity: sparkleP,
          }}>
            Book Elena →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ─── HIW3: Launch ────────────────────────────────── */
export function HowItWorks3Launch() {
  const f = useCurrentFrame();

  const rocketIn = easeOut(prog(f, 0, 20));
  const rocketY = -easeOut(prog(f, 20, 55)) * 80;
  const trailP = prog(f, 22, 55);

  // Domain bar types in
  const domainText = "elena-beauty.de";
  const typedLen = Math.floor(easeOut(prog(f, 28, 52)) * domainText.length);
  const typed = domainText.slice(0, typedLen);

  const statsP = easeOut(prog(f, 54, 70));
  const stats = [
    { label: "Domain live", value: "✓", color: C.green },
    { label: "SSL cert", value: "✓", color: C.green },
    { label: "Google indexed", value: "✓", color: C.green },
  ];

  const celebP = easeOut(prog(f, 68, 82));
  const particles = Array.from({ length: 12 });

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, padding: 20 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 60%, ${C.green}08 0%, transparent 60%)`,
      }} />

      <div style={{ color: C.darkMuted, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
        Step 3 — Launch
      </div>

      {/* Rocket */}
      <div style={{
        fontSize: 44,
        transform: `scale(${rocketIn}) translateY(${rocketY}px)`,
        position: "relative", zIndex: 2,
      }}>
        🚀
        {/* Flame trail */}
        <div style={{
          position: "absolute", top: "80%", left: "50%", transform: "translateX(-50%)",
          width: 12, height: 40 * trailP,
          background: `linear-gradient(to bottom, ${C.primary}80, transparent)`,
          borderRadius: "0 0 6px 6px",
          opacity: trailP,
        }} />
      </div>

      {/* Browser domain bar */}
      <div style={{
        width: 240, background: C.white, borderRadius: 20, padding: "6px 14px",
        display: "flex", alignItems: "center", gap: 8,
        boxShadow: `0 2px 12px #0004`,
        opacity: easeOut(prog(f, 24, 38)),
      }}>
        <span style={{ color: C.green, fontSize: 11 }}>🔒</span>
        <span style={{ fontSize: 12, color: C.fg, fontFamily: "monospace" }}>
          {typed}
          <span style={{
            borderRight: `1.5px solid ${C.primary}`,
            opacity: Math.sin(f * 0.5) > 0 ? 1 : 0,
          }}> </span>
        </span>
      </div>

      {/* Stats checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 230 }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#0F172A", borderRadius: 8, padding: "7px 12px",
            border: `1px solid ${C.green}30`,
            opacity: easeOut(prog(f, 54 + i * 8, 66 + i * 8)),
            transform: `translateX(${(1 - easeOut(prog(f, 54 + i * 8, 66 + i * 8))) * 14}px)`,
          }}>
            <span style={{ color: C.darkFg, fontSize: 11 }}>{s.label}</span>
            <span style={{ color: s.color, fontSize: 12, fontWeight: 700, textShadow: glowText(C.green) }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Celebration tagline */}
      <div style={{
        textAlign: "center",
        opacity: celebP,
        transform: `scale(${0.85 + celebP * 0.15})`,
      }}>
        <span style={{
          fontSize: 13, fontWeight: 700,
          background: `linear-gradient(90deg, ${C.green}, ${C.primary})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          You're live. Bookings open. 🎉
        </span>
      </div>

      {/* Particle burst */}
      {particles.map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 70 + (i % 3) * 25;
        return (
          <div key={i} style={{
            position: "absolute", top: "38%", left: "50%",
            width: 5, height: 5, borderRadius: "50%",
            background: [C.primary, C.accent, C.green, "#F59E0B"][i % 4],
            transform: `translate(${Math.cos(angle) * dist * celebP}px, ${Math.sin(angle) * dist * celebP}px)`,
            opacity: celebP * (1 - prog(f, 76, 88)),
          }} />
        );
      })}
    </AbsoluteFill>
  );
}

export const HOW_IT_WORKS_COMPOSITIONS = [
  { id: "h1", component: HowItWorks1Preview, durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "h2", component: HowItWorks2Build,   durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "h3", component: HowItWorks3Launch,  durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
];
