"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function Counter({ target, duration = 1.4 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return <span>{val.toLocaleString()}</span>;
}

export function Visual1Outdated() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative flex items-center justify-center py-6"
    >
      {/* Floating browser */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-72 rounded-xl overflow-hidden shadow-[0_20px_60px_-10px] shadow-black/40
                   border border-black/10 bg-[#F8FAFC]"
      >
        <div className="bg-[#E5E7EB] px-3 py-2 flex items-center gap-1.5">
          {["#EF4444","#F59E0B","#22C55E"].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <div className="flex-1 bg-white h-5 rounded-md ml-2 flex items-center px-2">
            <span className="text-[10px] text-gray-400">yourwebsite.com</span>
          </div>
        </div>
        <div className="bg-[#7B3F00] py-2 text-center">
          <span className="text-[#FFD700] text-[11px] font-bold font-serif">✦ WELCOME TO MY SALON ✦</span>
        </div>
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 h-14 mx-2 mt-1.5 rounded flex items-center justify-center">
          <span className="text-black/30 text-[10px]">[ Banner Image ]</span>
        </div>
        <div className="flex gap-4 px-3 py-1.5 text-[11px] text-blue-600 underline">
          <span>Home</span><span>About</span><span>Gallery</span><span>Contact Me!!</span>
        </div>
        <div className="px-3 pb-3">
          <p className="text-[10px] text-gray-600 font-serif leading-relaxed">
            Hi! Im a makeup artist based in berlin. I love what i do! Contact me for bookings
          </p>
        </div>
      </motion.div>

      {/* 2015 stamp */}
      <motion.div
        initial={{ rotate: -22, scale: 3.5, opacity: 0 }}
        animate={{ rotate: -16, scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5, type: "spring", stiffness: 280, damping: 14 }}
        className="absolute border-[3px] border-red-500 rounded-lg px-4 py-1"
        style={{ boxShadow: "0 0 24px #ef444455, inset 0 0 12px #ef444415" }}
      >
        <span
          className="text-red-500 text-[2rem] font-black tracking-[5px] font-mono block"
          style={{ textShadow: "0 0 14px #ef444490" }}
        >
          2015
        </span>
      </motion.div>

      {/* Subtle glow behind browser */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-primary/10 blur-[60px]" />
      </div>
    </motion.div>
  );
}

export function Visual2Mobile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center gap-7"
    >
      {/* Phone */}
      <div
        className="relative w-36 h-[260px] rounded-[28px] bg-gray-800 p-1 shadow-2xl"
        style={{ boxShadow: "0 0 40px #2563eb30, 0 20px 50px -10px #0006" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-800 rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[22px] bg-white overflow-hidden relative">
          {/* Loading bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
            className="absolute top-4 left-1 right-1 h-0.5 bg-primary origin-left rounded-full z-10"
          />
          <div className="p-2 pt-6">
            <div className="h-5 bg-blue-100 rounded mb-1.5 overflow-hidden flex items-center px-1">
              <span className="text-[6px] text-gray-400 whitespace-nowrap">WELCOME TO MY AMAZING BEAUTY STUDIO BERLIN</span>
            </div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 bg-gradient-to-r from-orange-500 to-orange-700 rounded -mr-3 mb-1.5 relative"
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-300 text-base font-black"
              >✗</motion.span>
            </motion.div>
            <div className="bg-gray-400 rounded px-1.5 py-0.5 inline-block relative">
              <span className="text-[7px] text-white">Book Now</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-red-400 font-black text-sm"
              >✗</motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Big stat */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 240, damping: 14 }}
          className="text-[3.5rem] font-black leading-none tracking-tight"
        >
          <span className="text-primary" style={{ textShadow: "0 0 24px var(--primary)" }}>8</span>
          <span className="text-foreground/30 text-3xl"> in 10</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="text-muted-foreground text-xs mt-1"
        >
          visitors leave in under 2 seconds
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Visual3Invisible() {
  const results = ["beautybymaria.de", "glamourstudio-berlin.de", "makeuploft.com"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center gap-3 w-full max-w-xs"
    >
      {/* Search bar */}
      <motion.div
        initial={{ scaleX: 0.7, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
        className="w-full bg-white rounded-full py-2 px-4 flex items-center gap-2 shadow-lg"
      >
        <span className="text-sm">🔍</span>
        <TypedText text="wedding makeup near me" />
      </motion.div>

      {/* Results */}
      <div className="w-full flex flex-col gap-2">
        {results.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: EASE }}
            className="bg-white rounded-lg px-3 py-2 shadow-md flex justify-between items-center"
          >
            <div>
              <div className="text-[11px] text-blue-600 font-semibold">{r}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Wedding Makeup · Berlin</div>
            </div>
            <span className="text-[9px] text-amber-400">★★★★★</span>
          </motion.div>
        ))}

        {/* Your slot — greyed out */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="bg-white rounded-lg px-3 py-2 shadow-md relative grayscale"
        >
          <div className="text-[11px] text-gray-400 font-semibold">yourwebsite.com</div>
          <div className="text-[9px] text-gray-300 mt-0.5">Not indexed · No reviews</div>
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="border-2 border-red-500 text-red-500 text-[10px] font-bold tracking-[3px] px-2 py-0.5 rounded bg-white/90"
              style={{ boxShadow: "0 0 10px #ef444440" }}
            >
              NOT FOUND
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TypedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="text-xs text-gray-700 font-medium">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.7, repeat: displayed.length < text.length ? Infinity : 0 }}
        className="inline-block w-px h-3 bg-blue-500 ml-0.5 align-middle"
      />
    </span>
  );
}

export function Visual4NoBookings() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex gap-5 items-center"
    >
      {/* Visitors */}
      <div
        className="rounded-2xl p-5 text-center min-w-[110px] border border-primary/30"
        style={{
          background: "rgba(37,99,235,0.08)",
          boxShadow: "0 0 30px #2563eb25",
        }}
      >
        <div className="text-[9px] text-primary/70 tracking-[2px] uppercase mb-2">Visitors</div>
        <div
          className="text-4xl font-black text-green-400 leading-none"
          style={{ textShadow: "0 0 20px #22c55e60" }}
        >
          <Counter target={847} />
        </div>
        <div className="text-green-400/60 text-[9px] mt-1.5">↑ this month</div>
      </div>

      {/* Bookings */}
      <div
        className="rounded-2xl p-5 text-center min-w-[110px] border border-red-500/30"
        style={{
          background: "rgba(239,68,68,0.08)",
          boxShadow: "0 0 30px #ef444425",
        }}
      >
        <div className="text-[9px] text-red-400/70 tracking-[2px] uppercase mb-2">Bookings</div>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-4xl font-black text-red-500 leading-none"
          style={{ textShadow: "0 0 24px #ef444470" }}
        >
          0
        </motion.div>
        <div className="text-red-400/60 text-[9px] mt-1.5">← no change</div>
      </div>
    </motion.div>
  );
}

export function Visual5Price() {
  const [rightPrice, setRightPrice] = useState(300);
  useEffect(() => {
    const id = setInterval(() => {
      setRightPrice(p => (p > 80 ? p - 5 : 80));
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center gap-3"
    >
      <p className="text-muted-foreground text-[10px] tracking-[2px] uppercase">Same artist. Two impressions.</p>
      <div className="flex gap-4 items-stretch">
        {/* In person */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, ease: EASE }}
          className="rounded-xl p-4 text-center w-32 border border-primary/40"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))" }}
        >
          <div className="text-[9px] text-primary tracking-widest uppercase mb-2">In person</div>
          <div className="text-3xl font-black text-white" style={{ textShadow: "0 0 16px var(--primary)" }}>
            €300
          </div>
          <div className="text-[9px] text-muted-foreground mt-2">Trusted. Worth it.</div>
          <div
            className="mt-3 text-[10px] font-bold text-white py-1.5 rounded-lg"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }}
          >
            ★ Book now
          </div>
        </motion.div>

        <div className="text-muted-foreground/40 text-lg self-center">≠</div>

        {/* Online — price dropping */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, ease: EASE }}
          className="rounded-xl p-4 text-center w-32 border border-border/20"
          style={{ background: "rgba(31,41,55,0.6)" }}
        >
          <div className="text-[9px] text-muted-foreground tracking-widest uppercase mb-2">Online</div>
          <div
            className="text-3xl font-black leading-none transition-colors duration-200"
            style={{ color: rightPrice > 150 ? "white" : "#ef4444", textShadow: rightPrice <= 150 ? "0 0 16px #ef444450" : "none" }}
          >
            €{rightPrice}
            <span className="text-red-400 text-lg">?</span>
          </div>
          <div className="text-[9px] text-red-400/70 mt-2">
            {rightPrice <= 150 ? "Looks like less." : "Looks generic."}
          </div>
          <div className="mt-3 bg-gray-700 text-muted-foreground text-[10px] font-medium py-1.5 rounded-lg">
            Maybe later...
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
