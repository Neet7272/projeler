"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useCallback } from "react";

export function NetworkParticles() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        fullScreen: { enable: false },
        particles: {
          color: { value: ["#22d3ee", "#38bdf8", "#e2e8f0", "#60a5fa"] },
          shape: { type: "circle" },
          links: {
            enable: true,
            color: "#0ea5e9",
            distance: 120,
            opacity: 0.22,
            width: 1,
            triangles: { enable: true, opacity: 0.06 },
          },
          move: {
            enable: true,
            speed: 0.55,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          number: { value: 64, density: { enable: true, area: 900 } },
          opacity: {
            value: { min: 0.12, max: 0.45 },
            animation: { enable: true, speed: 0.35, minimumValue: 0.08 },
          },
          size: { value: { min: 1, max: 3.2 } },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              links: { opacity: 0.45 },
            },
          },
        },
      }}
      className="absolute inset-0"
    />
  );
}
