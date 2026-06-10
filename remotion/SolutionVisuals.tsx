/**
 * Four animated "solution" compositions — one per solution pillar.
 * 30fps / 90 frames (3 s) each.
 */

import { useCurrentFrame, AbsoluteFill } from "remotion";
import { C, prog, easeOut, easeInOut, glowBox, glowText } from "./shared";

const FPS = 30;
const DUR = 90;

/* ─── S1: Premium Site Reveal ─────────────────────── */
export function Solution1Premium() {
  const f = useCurrentFrame();

  // Old dull page fades out → gorgeous new page fades in
  const oldFade = 1 - easeOut(prog(f, 18, 40));
  const newFade = easeOut(prog(f, 32, 56));
  const checkmarks = [0, 1, 2].map(i => easeOut(prog(f, 52 + i * 10, 62 + i * 10)));
  const ctaP = easeOut(prog(f, 72, 84));

  // Shimmer sweep across new site
  const shimmerX = prog(f, 36, 54) * 340 - 30;

  const badges = ["Mobile-First", "Conversion-Ready", "Your Brand"];

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, background:
          `radial-gradient(ellipse at 50% 40%, ${C.primary}10 0%, transparent 60%)`,
      }} />

      {/* Before / After panels stacked */}
      <div style={{ position: "relative", width: 280 }}>
        {/* Before — dull, fading out */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          background: "#374151", borderRadius: 12, padding: "12px 14px",
          opacity: oldFade, zIndex: 1,
        }}>
          <div style={{ height: 10, background: "#6B7280", borderRadius: 4, marginBottom: 6, width: "60%" }} />
          <div style={{ height: 8, background: "#4B5563", borderRadius: 4, marginBottom: 4, width: "90%" }} />
          <div style={{ height: 8, background: "#4B5563", borderRadius: 4, marginBottom: 4, width: "75%" }} />
          <div style={{ height: 20, background: "#6B7280", borderRadius: 4, marginTop: 8, width: "40%" }} />
          <div style={{
            position: "absolute", top: 6, right: 8,
            fontSize: 9, color: "#9CA3AF", letterSpacing: 1, textTransform: "uppercase",
          }}>Before</div>
        </div>

        {/* After — glowing, fading in */}
        <div style={{
          background: `linear-gradient(135deg, #0F172A, #1E1B4B)`,
          borderRadius: 12, padding: "12px 14px",
          border: `1px solid ${C.primary}40`,
          boxShadow: glowBox(C.primary, 24),
          opacity: newFade, overflow: "hidden", position: "relative",
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            width: 40, left: shimmerX,
            background: "linear-gradient(90deg, transparent, #ffffff18, transparent)",
            pointerEvents: "none",
          }} />

          <div style={{ fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 6, letterSpacing: 0.3 }}>
            Elena Müller ·{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Luxury Makeup
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 8 }}>Berlin · Hamburg · Wien</div>
          {/* Nav dots */}
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {["Portfolio","About","Book"].map(l => (
              <div key={l} style={{
                fontSize: 8, padding: "3px 8px", borderRadius: 20,
                background: l === "Book" ? `linear-gradient(90deg, ${C.primary}, ${C.accent})` : "#1E293B",
                color: l === "Book" ? C.white : "#9CA3AF",
                fontWeight: l === "Book" ? 700 : 400,
              }}>{l}</div>
            ))}
          </div>
          {/* Hero image strip */}
          <div style={{
            height: 40, borderRadius: 8,
            background: `linear-gradient(135deg, ${C.accent}80, ${C.primary}80)`,
            marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, color: "#ffffff80" }}>★ 47 Bridal Transformations</span>
          </div>

          <div style={{
            position: "absolute", top: 6, right: 8,
            fontSize: 9, color: C.primary, letterSpacing: 1, textTransform: "uppercase",
          }}>After</div>
        </div>
      </div>

      {/* Checkmarks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
        {badges.map((b, i) => (
          <div key={b} style={{
            display: "flex", alignItems: "center", gap: 10,
            opacity: checkmarks[i],
            transform: `translateX(${(1 - checkmarks[i]) * -16}px)`,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: C.white, fontWeight: 900,
              boxShadow: glowBox(C.primary, 12),
            }}>✓</div>
            <span style={{ color: C.darkFg, fontSize: 12, fontWeight: 600 }}>{b}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

/* ─── S2: Zero-Risk Shield ────────────────────────── */
export function Solution2ZeroRisk() {
  const f = useCurrentFrame();

  const shieldIn = easeOut(prog(f, 0, 20));
  const checkAnim = [0, 1, 2].map(i => easeOut(prog(f, 22 + i * 12, 34 + i * 12)));
  const pulseScale = 1 + 0.04 * Math.sin(f * 0.3);
  const ringOpacity = (n: number) => 0.25 * (1 - (f % 60) / 60) * (n === 0 ? 1 : n === 1 ? 0.6 : 0.3);
  const guaranteeP = easeOut(prog(f, 58, 72));
  const items = ["100% money-back if not delivered", "Live within 7 days or free", "Unlimited revision round"];

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 18 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${C.green}08 0%, transparent 60%)`,
      }} />

      {/* Shield */}
      <div style={{
        position: "relative",
        transform: `scale(${shieldIn * pulseScale})`,
        width: 100, height: 110,
      }}>
        {/* Pulse rings */}
        {[0, 1, 2].map(n => (
          <div key={n} style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 100 + n * 36 + (f % 60) * 0.8,
            height: 110 + n * 36 + (f % 60) * 0.8,
            border: `2px solid ${C.green}`,
            borderRadius: "50% 50% 42% 42%",
            opacity: ringOpacity(n),
            pointerEvents: "none",
          }} />
        ))}

        {/* Shield body */}
        <div style={{
          width: 100, height: 110, background: `linear-gradient(160deg, ${C.green}30, ${C.green}18)`,
          borderRadius: "50% 50% 42% 42%",
          border: `2px solid ${C.green}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 40px ${C.green}40`,
          fontSize: 36,
        }}>
          🛡️
        </div>
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 270 }}>
        {items.map((item, i) => (
          <div key={item} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            opacity: checkAnim[i],
            transform: `translateX(${(1 - checkAnim[i]) * 20}px)`,
          }}>
            <span style={{ color: C.green, fontSize: 14, lineHeight: 1.4, fontWeight: 900 }}>✓</span>
            <span style={{ color: C.darkFg, fontSize: 12, lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Guarantee stamp */}
      <div style={{
        opacity: guaranteeP,
        transform: `scale(${0.7 + guaranteeP * 0.3})`,
        border: `2px solid ${C.green}`,
        borderRadius: 8, padding: "5px 18px",
        color: C.green, fontSize: 11, fontWeight: 800, letterSpacing: 2,
        boxShadow: `0 0 16px ${C.green}40`,
      }}>
        GUARANTEED
      </div>
    </AbsoluteFill>
  );
}

/* ─── S3: Live in Days Timeline ───────────────────── */
export function Solution3LiveInDays() {
  const f = useCurrentFrame();

  const steps = [
    { label: "Discovery Call", icon: "📞", day: "Day 1" },
    { label: "Design & Build", icon: "⚡", day: "Day 2-5" },
    { label: "Your Site Goes Live", icon: "🚀", day: "Day 7" },
  ];

  const lineP = easeOut(prog(f, 10, 60));
  const stepPs = steps.map((_, i) => easeOut(prog(f, 8 + i * 18, 22 + i * 18)));
  const liveGlow = easeOut(prog(f, 58, 78));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, padding: 24 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 70% 50%, ${C.accent}10 0%, transparent 60%)`,
      }} />

      <div style={{ color: C.darkMuted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        From call to live
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", width: 260 }}>
        {/* Animated connecting line */}
        <div style={{
          position: "absolute", left: 22, top: 28, bottom: 28, width: 2,
          background: `linear-gradient(to bottom, ${C.primary}, ${C.accent})`,
          transformOrigin: "top",
          transform: `scaleY(${lineP})`,
        }} />

        {steps.map((s, i) => (
          <div key={s.label} style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: i < 2 ? 24 : 0,
            opacity: stepPs[i],
            transform: `translateX(${(1 - stepPs[i]) * 16}px)`,
          }}>
            {/* Icon circle */}
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: i === 2
                ? `linear-gradient(135deg, ${C.primary}, ${C.accent})`
                : `linear-gradient(135deg, ${C.primary}30, ${C.accent}30)`,
              border: `2px solid ${i === 2 ? C.primary : C.primary + "50"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0, zIndex: 1,
              boxShadow: i === 2 ? `0 0 ${20 + 10 * liveGlow}px ${C.primary}${Math.round(liveGlow * 80).toString(16).padStart(2,"0")}` : "none",
            }}>
              {s.icon}
            </div>

            <div>
              <div style={{ color: C.primary, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>
                {s.day}
              </div>
              <div style={{ color: C.darkFg, fontSize: 13, fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Live badge */}
      <div style={{
        marginTop: 10,
        opacity: liveGlow,
        transform: `scale(${0.8 + liveGlow * 0.2})`,
        background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
        borderRadius: 20, padding: "6px 20px",
        color: C.white, fontSize: 12, fontWeight: 700, letterSpacing: 1,
        boxShadow: glowBox(C.primary, 20),
      }}>
        🟢 Your site is live
      </div>
    </AbsoluteFill>
  );
}

/* ─── S4: No-Effort Checklist ─────────────────────── */
export function Solution4NoEffort() {
  const f = useCurrentFrame();

  const items = [
    "We write every word",
    "We design every page",
    "We set up your domain",
    "We connect your booking link",
    "We handle all tech",
  ];

  const itemPs = items.map((_, i) => easeOut(prog(f, 6 + i * 11, 18 + i * 11)));
  const taglineP = easeOut(prog(f, 64, 78));

  // Confetti on last item
  const confettiP = easeOut(prog(f, 61, 75));
  const confettiItems = Array.from({ length: 8 });

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, padding: 24 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 70%, ${C.primary}0a 0%, transparent 60%)`,
      }} />

      <div style={{ color: C.darkMuted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
        You just show up
      </div>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: 11, width: 260 }}>
        {items.map((item, i) => (
          <div key={item} style={{
            display: "flex", alignItems: "center", gap: 12,
            opacity: itemPs[i],
            transform: `translateX(${(1 - itemPs[i]) * -14}px)`,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
              background: itemPs[i] > 0.7
                ? `linear-gradient(135deg, ${C.primary}, ${C.accent})`
                : "#1E293B",
              border: `1.5px solid ${itemPs[i] > 0.7 ? C.primary : "#334155"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: C.white,
              boxShadow: itemPs[i] > 0.7 ? glowBox(C.primary, 10) : "none",
              transition: "background 0.2s",
            }}>
              {itemPs[i] > 0.7 ? "✓" : ""}
            </div>
            <span style={{ color: i < 4 ? C.darkFg : C.white, fontSize: 12, fontWeight: i === 4 ? 700 : 400 }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 12, textAlign: "center",
        opacity: taglineP,
        transform: `translateY(${(1 - taglineP) * 10}px)`,
      }}>
        <span style={{
          color: C.darkFg, fontSize: 13, fontWeight: 600,
          background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Done-for-you. 100%.
        </span>
      </div>

      {/* Confetti */}
      {confettiItems.map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 60 + i * 8;
        const x = Math.cos(angle) * radius * confettiP;
        const y = Math.sin(angle) * radius * confettiP;
        const colors = [C.primary, C.accent, C.green, "#F59E0B"];
        return (
          <div key={i} style={{
            position: "absolute",
            top: "60%", left: "50%",
            transform: `translate(${x}px, ${y}px)`,
            width: 6, height: 6,
            borderRadius: i % 2 === 0 ? "50%" : 2,
            background: colors[i % 4],
            opacity: confettiP * (1 - prog(f, 72, 88)),
          }} />
        );
      })}
    </AbsoluteFill>
  );
}

export const SOLUTION_COMPOSITIONS = [
  { id: "s1", component: Solution1Premium,    durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "s2", component: Solution2ZeroRisk,   durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "s3", component: Solution3LiveInDays, durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "s4", component: Solution4NoEffort,   durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
];
