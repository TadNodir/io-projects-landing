"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroVideoProps {
  onEmerged?: () => void;
}

export function HeroVideo({ onEmerged }: HeroVideoProps) {
  const loopRef = useRef<HTMLVideoElement>(null);
  const loopPrerolledRef = useRef(false);

  const [introDone, setIntroDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);

  const handleEmerged = useCallback(() => {
    setIntroDone(true);
    onEmerged?.();
  }, [onEmerged]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadySeen = !!sessionStorage.getItem("io_intro_seen");
    const shouldPlayIntro = !prefersReduced && !alreadySeen;

    setPlayIntro(shouldPlayIntro);
    setMounted(true);

    if (!shouldPlayIntro) {
      loopRef.current?.play().catch(() => {});
      handleEmerged();
    }
  }, [handleEmerged]);

  // Start the loop video ~1 s before the intro ends so it has already
  // decoded frames when the cross-fade begins — eliminates the black flash.
  const handleIntroTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (loopPrerolledRef.current) return;
      const video = e.currentTarget;
      if (!video.duration) return;
      if (video.duration - video.currentTime < 1.0) {
        loopPrerolledRef.current = true;
        const loop = loopRef.current;
        if (loop) {
          loop.currentTime = 0;
          loop.play().catch(() => {});
        }
      }
    },
    []
  );

  // Loop is already playing by now — just trigger the opacity cross-fade.
  const handleIntroEnd = useCallback(() => {
    sessionStorage.setItem("io_intro_seen", "1");
    handleEmerged();
  }, [handleEmerged]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/*
        Loop video — always in the DOM (SSR + CSR).
        Pre-rolled silently by handleIntroTimeUpdate, then cross-fades in.
      */}
      <video
        ref={loopRef}
        className={`absolute inset-0 h-full w-full object-cover [object-position:center_40%]
                    transition-opacity duration-[900ms] ease-in-out ${
                      introDone ? "opacity-100" : "opacity-0"
                    }`}
        poster="/hero-anchor.jpeg"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-loop.mp4?v=3" type="video/mp4" />
      </video>

      {/* Intro video — client-only, never part of SSR output */}
      {mounted && playIntro && (
        <video
          className={`absolute inset-0 h-full w-full object-cover [object-position:center_40%]
                      transition-opacity duration-[900ms] ease-in-out ${
                        introDone ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
          poster="/hero-anchor-intro.jpeg"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleIntroTimeUpdate}
          onEnded={handleIntroEnd}
        >
          <source src="/hero-intro.mp4?v=2" type="video/mp4" />
        </video>
      )}

      {/* Scrim — always present */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 dark:from-background/85 via-transparent to-background/30" />
    </div>
  );
}
