"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function VisualPreview() {
  const msgs = [
    { from: "us",   text: "What vibe should your site give?" },
    { from: "them", text: "Luxury. Warm. Like a high-end salon." },
    { from: "us",   text: "Perfect. We have exactly that." },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col gap-4 w-full max-w-xs"
    >
      {/* Chat bubbles */}
      <div className="flex flex-col gap-2.5">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.2, duration: 0.4, ease: EASE }}
            className={`flex ${m.from === "us" ? "justify-start" : "justify-end"}`}
          >
            <div
              className="max-w-[78%] px-3 py-2 text-[11px] leading-relaxed text-foreground/90"
              style={{
                borderRadius: m.from === "us" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
                background: m.from === "us"
                  ? "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.15))"
                  : "rgba(30,41,59,0.7)",
                border: `1px solid ${m.from === "us" ? "rgba(37,99,235,0.3)" : "rgba(51,65,85,0.5)"}`,
              }}
            >
              {m.text}
              {m.from === "us" && (
                <div className="text-primary/60 text-[8px] mt-1">IO Projects</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini mockup preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
        className="rounded-xl overflow-hidden border border-primary/25"
        style={{
          background: "linear-gradient(135deg, #0F172A, #1E1B4B)",
          boxShadow: "0 0 24px rgba(37,99,235,0.2)",
        }}
      >
        <div className="flex items-center gap-1.5 bg-[#1E1B4B] px-3 py-2">
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="p-3">
          <div
            className="h-1.5 rounded-full mb-2 w-2/5"
            style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)", opacity: 0.8 }}
          />
          <div className="h-1 rounded-full bg-gray-700 mb-1.5 w-4/5" />
          <div className="h-1 rounded-full bg-gray-700 mb-3 w-3/5" />
          <div
            className="h-5 rounded-lg"
            style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.6),rgba(37,99,235,0.6))" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VisualBuild() {
  const lines = [
    { indent: 0, color: "#60a5fa", text: "export default function Hero() {" },
    { indent: 1, color: "#9ca3af", text: "return (" },
    { indent: 2, color: "#a78bfa", text: '<section className="luxury-hero">' },
    { indent: 3, color: "#9ca3af", text: "<HeroHeadline />" },
    { indent: 3, color: "#4ade80", text: '<BookingCTA label="Book Elena" />' },
    { indent: 2, color: "#a78bfa", text: "</section>" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      {/* Code editor */}
      <div
        className="rounded-xl p-3 border border-gray-800"
        style={{ background: "#0F172A" }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-auto text-[9px] text-gray-600">ElenaHero.tsx</span>
        </div>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.1, duration: 0.3, ease: EASE }}
            className="font-mono text-[9px] leading-6"
            style={{ paddingLeft: l.indent * 10, color: l.color }}
          >
            {l.text}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-1.5 h-3 bg-blue-400 ml-10 mt-1 rounded-sm"
        />
      </div>

      {/* Rendered result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.45, ease: EASE }}
        className="rounded-xl p-4 border border-primary/30 overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #0F172A, #1E1B4B)",
          boxShadow: "0 0 30px rgba(37,99,235,0.18)",
        }}
      >
        {/* Shimmer */}
        <motion.div
          initial={{ x: -120 }}
          animate={{ x: 320 }}
          transition={{ delay: 1, duration: 0.7, ease: "easeIn" }}
          className="absolute inset-0 -skew-x-12 w-16"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        />
        <div className="text-sm font-bold text-white mb-0.5">✨ Elena Müller</div>
        <div className="text-[9px] text-gray-400 mb-3">Luxury Bridal Makeup · Berlin</div>
        <div
          className="inline-block text-[10px] text-white font-bold px-4 py-1.5 rounded-full"
          style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)", boxShadow: "0 0 14px rgba(37,99,235,0.4)" }}
        >
          Book Elena →
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VisualLaunch() {
  const [domainText, setDomainText] = useState("");
  const full = "elena-beauty.de";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDomainText(full.slice(0, ++i));
      if (i >= full.length) clearInterval(id);
    }, 65);
    return () => clearInterval(id);
  }, []);

  const stats = ["Domain live", "SSL active", "Google indexed"];
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center gap-5 w-full max-w-xs relative"
    >
      {/* Rocket */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative"
      >
        <motion.span
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl block"
        >
          🚀
        </motion.span>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 32 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 top-[90%] w-2 rounded-b-full"
          style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.7), transparent)" }}
        />
      </motion.div>

      {/* Domain bar */}
      <motion.div
        initial={{ scaleX: 0.7, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: EASE }}
        className="w-full bg-white rounded-full py-2 px-4 flex items-center gap-2 shadow-lg"
      >
        <span className="text-green-500 text-sm">🔒</span>
        <span className="text-gray-700 text-xs font-mono">
          {domainText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-px h-3 bg-blue-500 ml-0.5 align-middle"
          />
        </span>
      </motion.div>

      {/* Stat checklist */}
      <div className="flex flex-col gap-2.5 w-full">
        {stats.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.15, duration: 0.4, ease: EASE }}
            className="flex items-center justify-between rounded-xl px-4 py-2.5 border border-green-400/20"
            style={{ background: "rgba(34,197,94,0.06)" }}
          >
            <span className="text-foreground/80 text-sm">{s}</span>
            <span
              className="text-green-400 font-black text-sm"
              style={{ textShadow: "0 0 10px rgba(34,197,94,0.5)" }}
            >✓</span>
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        className="text-sm font-bold text-center"
        style={{
          background: "linear-gradient(90deg,#22c55e,#2563eb)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        You&apos;re live. Bookings open. 🎉
      </motion.p>

      {/* Particles */}
      {particles.map((p) => {
        const angle = (p / 12) * Math.PI * 2;
        const dist = 60 + (p % 3) * 20;
        const colors = ["#2563eb","#7c3aed","#22c55e","#f59e0b"];
        return (
          <motion.div
            key={p}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ delay: 0.88, duration: 1, ease: "easeOut" }}
            className="absolute left-[45%] top-[55%] w-2 h-2 rounded-full pointer-events-none"
            style={{ background: colors[p % 4] }}
          />
        );
      })}
    </motion.div>
  );
}
