"use client";

/**
 * Thin wrapper around @remotion/player's <Player>.
 * Dynamic-imported so it never runs on the server.
 */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlayerType = ComponentType<any>;

const Player = dynamic<{ [key: string]: unknown }>(
  () => import("@remotion/player").then((m) => m.Player as unknown as ComponentType<{ [key: string]: unknown }>),
  { ssr: false }
);

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  className?: string;
}

export function RemotionPlayer({ component, durationInFrames, fps, width, height, className }: Props) {
  return (
    <div className={className} style={{ lineHeight: 0 }}>
      <Player
        component={component as unknown as PlayerType}
        durationInFrames={durationInFrames}
        compositionWidth={width}
        compositionHeight={height}
        fps={fps}
        loop={true}
        autoPlay={true}
        controls={false}
        style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
        inputProps={{}}
      />
    </div>
  );
}
