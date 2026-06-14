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
  const [isMobile, setIsMobile] = useState(false);

  const handleEmerged = useCallback(() => {
    setIntroDone(true);
    onEmerged?.();
  }, [onEmerged]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadySeen = !!sessionStorage.getItem("io_intro_seen");
    const shouldPlayIntro = !prefersReduced && !alreadySeen;

    setPlayIntro(shouldPlayIntro);
    setMounted(true);

    // Don't play the loop here — wait for the isMobile effect below to load
    // the correct src first, then play.
    if (!shouldPlayIntro) {
      handleEmerged();
    }
  }, [handleEmerged]);

  // After isMobile is determined, reload the loop video with the correct src
  // and start it if the intro is already done (or skipped).
  useEffect(() => {
    const video = loopRef.current;
    if (!video || !mounted) return;
    video.load();
    if (introDone) video.play().catch(() => {});
  }, [isMobile, mounted, introDone]);

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

  const loopSrc = isMobile ? "/hero-loop-mobile.mp4?v=1" : "/hero-loop.mp4?v=3";
  const loopPoster = isMobile ? "/hero-anchor-mobile.jpeg" : "/hero-anchor.jpeg";
  const introSrc = isMobile ? "/hero-intro-mobile.mp4?v=1" : "/hero-intro.mp4?v=2";
  const introPoster = isMobile ? "/hero-anchor-intro-mobile.jpeg" : "/hero-anchor-intro.jpeg";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/*
        Loop video — always in the DOM (SSR + CSR).
        Keyed by isMobile so the element remounts when the correct src is known.
        Pre-rolled silently by handleIntroTimeUpdate, then cross-fades in.
      */}
      <video
        ref={loopRef}
        className={`absolute inset-0 h-full w-full object-cover [object-position:center_40%]
                    transition-opacity duration-[900ms] ease-in-out ${
                      introDone ? "opacity-100" : "opacity-0"
                    }`}
        poster={loopPoster}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={loopSrc} type="video/mp4" />
      </video>

      {/* Intro video — client-only, never part of SSR output */}
      {mounted && playIntro && (
        <video
          className={`absolute inset-0 h-full w-full object-cover [object-position:center_40%]
                      transition-opacity duration-[900ms] ease-in-out ${
                        introDone ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
          poster={introPoster}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleIntroTimeUpdate}
          onEnded={handleIntroEnd}
        >
          <source src={introSrc} type="video/mp4" />
        </video>
      )}

      {/* Scrim — always present */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 dark:from-background/85 via-transparent to-background/30" />
    </div>
  );
}
