/**
 * Five animated "problem" compositions — one per problem card.
 * Each loops at 30 fps, 90 frames (3 s).
 * Style: dark background, brand glow — professional ad / Apple-keynote aesthetic.
 */

import { useCurrentFrame, spring, interpolate, Easing, AbsoluteFill, Sequence } from "remotion";
import { C, prog, easeOut, easeInOut, glowBox, glowText } from "./shared";

const FPS = 30;
const DUR = 90; // 3 s

/* ─── Shared chrome ───────────────────────────────── */
function BrowserMock({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div style={{
      width: 320 * scale, background: C.card, borderRadius: 12,
      boxShadow: "0 8px 40px #0002", overflow: "hidden",
      border: `1px solid ${C.border}`,
    }}>
      {/* Tab bar */}
      <div style={{ background: "#E5E7EB", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
        {["#EF4444","#F59E0B","#22C55E"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div style={{
          flex: 1, height: 20, borderRadius: 6, background: C.white,
          marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 8,
        }}>
          <span style={{ fontSize: 10, color: C.muted }}>yourwebsite.com</span>
        </div>
      </div>
      <div style={{ minHeight: 180 }}>
        {children}
      </div>
    </div>
  );
}

function PhoneMock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 160, height: 300, background: C.fg, borderRadius: 28,
      border: `3px solid ${C.fg}`, overflow: "hidden", position: "relative",
      boxShadow: glowBox(C.primary, 30),
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 60, height: 18, background: C.fg, borderRadius: "0 0 12px 12px", zIndex: 10,
      }} />
      <div style={{
        position: "absolute", inset: 0, background: C.white, margin: 3, borderRadius: 24, overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── P1: Outdated Template ───────────────────────── */
export function Problem1Outdated() {
  const f = useCurrentFrame();

  // Page elements appear dated, then a big 2015 stamp crashes in
  const elP = (from: number) => easeOut(prog(f, from, from + 14));

  const stampP = easeOut(prog(f, 48, 62));
  const stampScale = interpolate(stampP, [0, 1], [2, 1]);
  const stampOpacity = stampP;

  // Shake after stamp
  const shake = f >= 62 && f <= 72
    ? Math.sin((f - 62) * 1.8) * 6 * (1 - (f - 62) / 10)
    : 0;

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 300, height: 300,
        borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}18 0%, transparent 70%)`,
        top: -60, right: -60,
      }} />

      <div style={{ transform: `translateX(${shake}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <BrowserMock>
          {/* 2015-style website interior */}
          <div style={{ background: "#7B3F00", padding: "10px 0", textAlign: "center", opacity: elP(0) }}>
            <span style={{ color: "#FFD700", fontFamily: "serif", fontSize: 13, fontWeight: "bold" }}>✦ WELCOME TO MY SALON ✦</span>
          </div>
          {/* Misaligned hero image placeholder */}
          <div style={{ background: "linear-gradient(135deg, #b45309, #92400e)", height: 70, margin: "8px 4px 4px -8px", borderRadius: 2, opacity: elP(8) }}>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#00000040", fontSize: 11 }}>[ Banner Image ]</span>
            </div>
          </div>
          {/* Comic-sans-esque nav */}
          <div style={{ display: "flex", gap: 16, padding: "6px 10px", fontSize: 11, color: "#0000EE", textDecoration: "underline", opacity: elP(4) }}>
            <span>Home</span><span>About</span><span>Gallery</span><span>Contact</span>
          </div>
          {/* Body text */}
          <div style={{ padding: "6px 10px", opacity: elP(10) }}>
            <p style={{ fontFamily: "serif", fontSize: 10, color: C.fg, lineHeight: 1.5 }}>
              Hi! Im a makeup artist based in berlin. I have been doing makeup for 10+ years and i love what i do! Contact me for bookings!
            </p>
          </div>
        </BrowserMock>

        {/* 2015 STAMP */}
        <div style={{
          position: "absolute",
          transform: `rotate(-18deg) scale(${stampScale})`,
          opacity: stampOpacity,
          pointerEvents: "none",
        }}>
          <div style={{
            border: `4px solid ${C.red}`,
            borderRadius: 8, padding: "6px 16px",
            color: C.red, fontSize: 28, fontWeight: 900,
            letterSpacing: 4, fontFamily: "monospace",
            textShadow: glowText(C.red),
            boxShadow: `0 0 20px ${C.red}60`,
          }}>
            2015
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center",
        opacity: easeOut(prog(f, 70, 82)),
      }}>
        <span style={{ color: C.darkMuted, fontSize: 13, letterSpacing: 1 }}>
          Your first impression is costing you clients.
        </span>
      </div>
    </AbsoluteFill>
  );
}

/* ─── P2: Mobile Abandonment ──────────────────────── */
export function Problem2Mobile() {
  const f = useCurrentFrame();

  const phoneIn = easeOut(prog(f, 0, 16));
  const loadP = prog(f, 14, 50);
  const loadWidth = loadP * 100;

  // "8 in 10" counter
  const countP = easeOut(prog(f, 48, 70));
  const count = Math.round(countP * 8);

  // Swipe-up exit
  const exitP = easeOut(prog(f, 72, 86));
  const phoneY = exitP * -120;
  const exitOpacity = 1 - exitP;

  // ✗ marks appearing on broken layout
  const xP = easeOut(prog(f, 40, 55));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <div style={{
        position: "absolute", width: 250, height: 250,
        borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}14 0%, transparent 70%)`,
        bottom: 0, left: 0,
      }} />

      {/* Phone + broken site */}
      <div style={{
        transform: `scale(${phoneIn}) translateY(${phoneY}px)`,
        opacity: exitOpacity,
      }}>
        <PhoneMock>
          {/* Broken mobile site */}
          <div style={{ padding: "20px 6px 6px" }}>
            {/* Text too tiny */}
            <div style={{ background: C.primary, height: 28, borderRadius: 2, marginBottom: 6, opacity: 0.3, overflow: "hidden", display: "flex", alignItems: "center", paddingLeft: 4 }}>
              <span style={{ fontSize: 6, color: C.white, whiteSpace: "nowrap", overflow: "hidden" }}>
                WELCOME TO MY AMAZING BEAUTY STUDIO BERLIN
              </span>
            </div>
            {/* Image overflowing */}
            <div style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              height: 60, borderRadius: 2, marginRight: -20, marginBottom: 6,
              position: "relative",
            }}>
              {/* ✗ mark */}
              <div style={{
                position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)",
                fontSize: 16, color: C.red, fontWeight: 900, opacity: xP,
                textShadow: glowText(C.red),
              }}>✗</div>
            </div>
            {/* Tiny unclickable button */}
            <div style={{
              background: C.muted, borderRadius: 2, padding: "2px 4px",
              fontSize: 6, color: C.white, display: "inline-block", position: "relative",
            }}>
              Book Now
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                fontSize: 14, color: C.red, fontWeight: 900, opacity: xP,
                textShadow: glowText(C.red),
              }}>✗</div>
            </div>
          </div>
          {/* Loading bar */}
          <div style={{ position: "absolute", top: 18, left: 3, right: 3, height: 2, background: "#eee", borderRadius: 1 }}>
            <div style={{
              height: "100%", borderRadius: 1,
              width: `${loadWidth}%`, background: C.primary,
              transition: "width 0.1s",
            }} />
          </div>
        </PhoneMock>
      </div>

      {/* 8 in 10 stat */}
      <div style={{
        textAlign: "center",
        opacity: easeOut(prog(f, 46, 62)),
      }}>
        <div style={{
          fontSize: 52, fontWeight: 900, color: C.white,
          textShadow: glowText(C.primary), lineHeight: 1,
        }}>
          <span style={{ color: C.primary }}>{count}</span>
          <span style={{ fontSize: 28, color: C.darkMuted }}> in 10</span>
        </div>
        <div style={{ color: C.darkMuted, fontSize: 13, marginTop: 4, letterSpacing: 0.5 }}>
          visitors leave within 2 seconds
        </div>
      </div>

      {/* Swipe gesture indicator */}
      <div style={{
        position: "absolute", bottom: 28, right: 32,
        opacity: easeOut(prog(f, 65, 75)) * (1 - prog(f, 80, 88)),
        color: C.darkMuted, fontSize: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
        <span style={{ fontSize: 18 }}>↑</span>
        <span>swipe out</span>
      </div>
    </AbsoluteFill>
  );
}

/* ─── P3: Invisible on Google ─────────────────────── */
export function Problem3Invisible() {
  const f = useCurrentFrame();

  const searchIn = easeOut(prog(f, 0, 14));
  const typed = Math.floor(prog(f, 8, 30) * 22); // "wedding makeup near me"
  const query = "wedding makeup near me".slice(0, typed);

  const competitors = [
    { name: "beautybymaria.de", stars: "★★★★★", y: 0 },
    { name: "glamourstudio-berlin.de", stars: "★★★★☆", y: 1 },
    { name: "makeuploft.com", stars: "★★★★★", y: 2 },
  ];

  const youRowP = easeOut(prog(f, 58, 70));
  const youOpacity = youRowP * 0.25; // faded — not showing up

  // "Not found" badge
  const notFoundP = easeOut(prog(f, 68, 80));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 20 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", width: 200, height: 200,
        borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}18 0%, transparent 70%)`,
        top: -40, left: "50%", transform: "translateX(-50%)",
      }} />

      {/* Google-ish search bar */}
      <div style={{
        width: 300, background: C.white, borderRadius: 24, padding: "8px 16px",
        boxShadow: "0 2px 12px #0003", display: "flex", alignItems: "center", gap: 8,
        transform: `scale(${searchIn})`,
      }}>
        <span style={{ fontSize: 14 }}>🔍</span>
        <span style={{ fontSize: 13, color: C.fg, fontFamily: "sans-serif" }}>
          {query}
          <span style={{
            borderRight: `2px solid ${C.primary}`,
            animation: "none",
            opacity: Math.sin(f * 0.4) > 0 ? 1 : 0,
          }}> </span>
        </span>
      </div>

      {/* Results */}
      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 6 }}>
        {competitors.map((c, i) => (
          <div key={c.name} style={{
            background: C.white, borderRadius: 8, padding: "8px 12px",
            opacity: easeOut(prog(f, 28 + i * 8, 40 + i * 8)),
            transform: `translateY(${interpolate(prog(f, 28 + i * 8, 40 + i * 8), [0, 1], [12, 0])}px)`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>Wedding Makeup · Berlin</div>
              </div>
              <span style={{ fontSize: 9, color: "#F59E0B" }}>{c.stars}</span>
            </div>
          </div>
        ))}

        {/* Your slot — faded */}
        <div style={{
          background: C.white, borderRadius: 8, padding: "8px 12px",
          opacity: youOpacity, position: "relative",
          filter: "grayscale(1)",
        }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>yourwebsite.com</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>Not indexed · No reviews</div>

          {/* NOT FOUND badge */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            opacity: notFoundP,
          }}>
            <div style={{
              border: `2px solid ${C.red}`, borderRadius: 4, padding: "2px 10px",
              color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: 2,
              background: "#fff8", boxShadow: `0 0 12px ${C.red}40`,
            }}>
              NOT FOUND
            </div>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: "center", marginTop: 4,
        opacity: easeOut(prog(f, 74, 86)),
        color: C.darkMuted, fontSize: 12, letterSpacing: 0.5,
      }}>
        A bride searched at 11pm. Five others showed up. You didn't.
      </div>
    </AbsoluteFill>
  );
}

/* ─── P4: Visitors but Zero Bookings ──────────────── */
export function Problem4NoBookings() {
  const f = useCurrentFrame();

  const panelIn = easeOut(prog(f, 0, 18));
  const visCount = Math.round(easeOut(prog(f, 14, 60)) * 847);
  const bookCount = 0; // stays at zero

  // Pulse on the zero — draws attention
  const pulseScale = 1 + 0.08 * Math.sin(f * 0.35);
  const zeroGlow = `0 0 ${16 + 8 * Math.sin(f * 0.35)}px ${C.red}80`;

  const labelP = easeOut(prog(f, 62, 76));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      {/* Ambient */}
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}0c 0%, transparent 70%)`, bottom: -80, right: -80,
      }} />

      {/* Two stat panels */}
      <div style={{ display: "flex", gap: 20, transform: `scale(${panelIn})` }}>
        {/* Visitors */}
        <div style={{
          background: "#0F172A", border: `1px solid ${C.primary}40`,
          borderRadius: 16, padding: "20px 24px", textAlign: "center", minWidth: 120,
          boxShadow: glowBox(C.primary, 20),
        }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            Visitors
          </div>
          <div style={{
            fontSize: 42, fontWeight: 900, color: C.green,
            textShadow: glowText(C.green), lineHeight: 1,
          }}>
            {visCount.toLocaleString()}
          </div>
          <div style={{ color: C.green, fontSize: 10, marginTop: 6, opacity: 0.7 }}>↑ this month</div>
        </div>

        {/* Bookings */}
        <div style={{
          background: "#0F172A", border: `1px solid ${C.red}40`,
          borderRadius: 16, padding: "20px 24px", textAlign: "center", minWidth: 120,
          boxShadow: glowBox(C.red, 20),
        }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            Bookings
          </div>
          <div style={{
            fontSize: 42, fontWeight: 900, color: C.red,
            textShadow: zeroGlow,
            transform: `scale(${pulseScale})`,
            display: "inline-block",
            lineHeight: 1,
          }}>
            {bookCount}
          </div>
          <div style={{ color: C.red, fontSize: 10, marginTop: 6, opacity: 0.7 }}>← no change</div>
        </div>
      </div>

      {/* Insight label */}
      <div style={{
        textAlign: "center", maxWidth: 280,
        opacity: labelP,
        transform: `translateY(${interpolate(labelP, [0, 1], [12, 0])}px)`,
      }}>
        <span style={{
          color: C.darkFg, fontSize: 14, fontWeight: 600, lineHeight: 1.5,
        }}>
          Genuine interest,<br />
          <span style={{ color: C.red }}>silently becoming missed clients.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
}

/* ─── P5: Looks Optional ──────────────────────────── */
export function Problem5LooksOptional() {
  const f = useCurrentFrame();

  const leftIn = easeOut(prog(f, 0, 16));
  const rightIn = easeOut(prog(f, 10, 26));

  // Price drops on the right
  const priceDropP = prog(f, 40, 72);
  const rightPrice = Math.round(300 - priceDropP * 220); // 300 → 80

  // Question marks pulsing
  const qOpacity = 0.5 + 0.5 * Math.sin(f * 0.5);

  const captionP = easeOut(prog(f, 72, 84));

  return (
    <AbsoluteFill style={{ background: C.darkBg, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      {/* Split title */}
      <div style={{ color: C.darkMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
        Same artist. Two different impressions.
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        {/* In person — premium */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary}22, ${C.accent}22)`,
          border: `1px solid ${C.primary}50`, borderRadius: 14,
          padding: "18px 20px", textAlign: "center", width: 130,
          opacity: leftIn,
          transform: `translateX(${interpolate(leftIn, [0, 1], [-20, 0])}px)`,
        }}>
          <div style={{ fontSize: 9, color: C.primary, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
            In person
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: C.white, textShadow: glowText(C.primary) }}>
            €300
          </div>
          <div style={{ marginTop: 8, fontSize: 9, color: C.muted }}>Trusted. Worth it.</div>
          <div style={{
            marginTop: 10, padding: "6px 0",
            background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
            borderRadius: 8, color: C.white, fontSize: 11, fontWeight: 700,
          }}>
            ★ Book now
          </div>
        </div>

        <div style={{ color: C.darkMuted, alignSelf: "center", fontSize: 18 }}>≠</div>

        {/* Online — looks cheap */}
        <div style={{
          background: "#1F2937", border: `1px solid ${C.border}30`,
          borderRadius: 14, padding: "18px 20px", textAlign: "center", width: 130,
          opacity: rightIn,
          transform: `translateX(${interpolate(rightIn, [0, 1], [20, 0])}px)`,
        }}>
          <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
            Online
          </div>
          <div style={{
            fontSize: 32, fontWeight: 900,
            color: rightPrice > 150 ? C.white : C.red,
            lineHeight: 1,
          }}>
            €{rightPrice}
            <span style={{ color: C.red, opacity: qOpacity, fontSize: 20 }}>?</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 9, color: C.red, opacity: 0.8 }}>
            {priceDropP > 0.5 ? "Looks like less." : "Looks generic."}
          </div>
          <div style={{
            marginTop: 10, background: "#374151", borderRadius: 8,
            color: C.muted, fontSize: 10, fontWeight: 600, padding: "6px 0",
          }}>
            Maybe later...
          </div>
        </div>
      </div>

      <div style={{
        textAlign: "center", color: C.darkMuted, fontSize: 12,
        opacity: captionP, marginTop: 4, letterSpacing: 0.3,
      }}>
        Your website is quietly asking clients to doubt your prices.
      </div>
    </AbsoluteFill>
  );
}

export const PROBLEM_COMPOSITIONS = [
  { id: "p1", component: Problem1Outdated, durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "p2", component: Problem2Mobile,   durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "p3", component: Problem3Invisible,durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "p4", component: Problem4NoBookings,durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
  { id: "p5", component: Problem5LooksOptional,durationInFrames: DUR, fps: FPS, width: 500, height: 420 },
];
