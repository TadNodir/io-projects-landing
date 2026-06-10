"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Visual1Premium() {
  const checks = ["Mobile-first design", "Conversion-optimized", "Your exact brand"];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center gap-5 w-full max-w-sm"
    >
      {/* Before → After stacked panels */}
      <div className="relative w-72 h-44">
        {/* Before (behind) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute inset-0 bg-gray-700 rounded-xl p-4"
        >
          <div className="h-3 bg-gray-500 rounded-full w-3/5 mb-2" />
          <div className="h-2 bg-gray-600 rounded-full w-4/5 mb-2" />
          <div className="h-2 bg-gray-600 rounded-full w-2/3 mb-4" />
          <div className="h-6 bg-gray-500 rounded-lg w-2/5" />
          <div className="absolute top-2 right-3 text-[9px] text-gray-400 tracking-widest uppercase">Before</div>
        </motion.div>

        {/* After (front) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
          className="absolute inset-0 rounded-xl p-4 border border-primary/40 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F172A, #1E1B4B)",
            boxShadow: "0 0 40px rgba(37,99,235,0.2), 0 16px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Shimmer */}
          <motion.div
            initial={{ x: -80 }}
            animate={{ x: 320 }}
            transition={{ delay: 0.9, duration: 0.7, ease: "easeIn" }}
            className="absolute top-0 bottom-0 w-12 -skew-x-12"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
          />
          <div className="text-[11px] font-bold text-white mb-1">
            Elena Müller ·{" "}
            <span style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Luxury Makeup
            </span>
          </div>
          <div className="text-[9px] text-gray-400 mb-3">Berlin · Hamburg · Wien</div>
          <div className="h-16 rounded-lg mb-3" style={{ background: "linear-gradient(135deg,#7c3aed50,#2563eb50)" }} />
          <div
            className="inline-block text-[10px] text-white font-bold px-4 py-1.5 rounded-full"
            style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)", boxShadow: "0 0 16px #2563eb50" }}
          >
            Book Elena →
          </div>
          <div className="absolute top-2 right-3 text-[9px] text-primary tracking-widest uppercase">After</div>
        </motion.div>
      </div>

      {/* Checkmarks */}
      <div className="flex flex-col gap-2.5 w-full">
        {checks.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.4, ease: EASE }}
            className="flex items-center gap-3"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", boxShadow: "0 0 10px #2563eb50" }}
            >✓</div>
            <span className="text-foreground/80 text-sm">{c}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Visual2ZeroRisk() {
  const items = ["100% money-back if not delivered", "Live within 7 days or free", "Unlimited revision round"];
  const pulseRings = [0, 1, 2];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center gap-6"
    >
      {/* Shield */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {pulseRings.map(i => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-[50%_50%_42%_42%] border border-green-400"
          />
        ))}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-[50%_50%_42%_42%] flex items-center justify-center text-4xl border-2 border-green-400/60"
          style={{
            background: "linear-gradient(160deg, rgba(34,197,94,0.2), rgba(34,197,94,0.08))",
            boxShadow: "0 0 40px rgba(34,197,94,0.3)",
          }}
        >
          🛡️
        </motion.div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: EASE }}
            className="flex items-start gap-3"
          >
            <span className="text-green-400 font-black text-sm mt-0.5 flex-shrink-0">✓</span>
            <span className="text-foreground/80 text-sm leading-snug">{item}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 14 }}
        className="border-2 border-green-400 rounded-lg px-5 py-1.5 text-green-400 text-[11px] font-black tracking-[3px]"
        style={{ boxShadow: "0 0 16px rgba(34,197,94,0.3)" }}
      >
        GUARANTEED
      </motion.div>
    </motion.div>
  );
}

export function Visual3LiveInDays() {
  const steps = [
    { icon: "📞", day: "Day 1", label: "Discovery Call" },
    { icon: "⚡", day: "Day 2–5", label: "Design & Build" },
    { icon: "🚀", day: "Day 7", label: "Your Site Goes Live" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative flex flex-col gap-0 w-full max-w-xs"
    >
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
        className="absolute left-5 top-8 bottom-8 w-0.5 origin-top"
        style={{ background: "linear-gradient(to bottom, #2563eb, #7c3aed)" }}
      />

      {steps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.2, duration: 0.4, ease: EASE }}
          className={`flex items-center gap-4 ${i < 2 ? "mb-7" : ""}`}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2 relative z-10"
            style={{
              background: i === 2
                ? "linear-gradient(135deg,#2563eb,#7c3aed)"
                : "linear-gradient(135deg,rgba(37,99,235,0.2),rgba(124,58,237,0.2))",
              borderColor: i === 2 ? "#2563eb" : "rgba(37,99,235,0.4)",
              boxShadow: i === 2 ? "0 0 20px rgba(37,99,235,0.5)" : "none",
            }}
          >
            {s.icon}
          </div>
          <div>
            <div className="text-[9px] text-primary font-bold tracking-widest uppercase mb-0.5">{s.day}</div>
            <div className="text-sm font-semibold text-foreground">{s.label}</div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, ease: EASE }}
        className="mt-2 inline-block text-[11px] font-bold text-white px-4 py-2 rounded-full"
        style={{ background: "linear-gradient(90deg,#22c55e,#2563eb)", boxShadow: "0 0 20px rgba(34,197,94,0.35)" }}
      >
        🟢 Your site is live
      </motion.div>
    </motion.div>
  );
}

export function Visual4NoEffort() {
  const items = [
    "We write every word",
    "We design every page",
    "We set up your domain",
    "We connect your booking link",
    "We handle all tech",
  ];
  const particles = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col gap-3 w-full max-w-xs relative"
    >
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 + i * 0.1, duration: 0.4, ease: EASE }}
          className="flex items-center gap-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0 border border-primary/50"
            style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              boxShadow: "0 0 12px rgba(37,99,235,0.4)",
            }}
          >
            ✓
          </motion.div>
          <span className={`text-sm ${i === 4 ? "font-bold text-foreground" : "text-foreground/70"}`}>{item}</span>
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-2 text-sm font-bold"
        style={{
          background: "linear-gradient(90deg,#2563eb,#7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Done-for-you. 100%.
      </motion.p>

      {/* Confetti */}
      {particles.map((p) => {
        const angle = (p / 8) * Math.PI * 2;
        const dist = 55 + p * 7;
        const colors = ["#2563eb","#7c3aed","#22c55e","#f59e0b"];
        return (
          <motion.div
            key={p}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{ delay: 0.65, duration: 0.9, ease: "easeOut" }}
            className="absolute left-1/2 top-[55%] w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{ background: colors[p % 4] }}
          />
        );
      })}
    </motion.div>
  );
}
