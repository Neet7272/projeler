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
          color: { value: "#2563eb" },
          links: {
            enable: true,
            color: "#2563eb",
            distance: 140,
            opacity: 0.18,
            width: 1,
          },
          move: { enable: true, speed: 0.7, outModes: { default: "out" } },
          number: { value: 70, density: { enable: true } },
          opacity: { value: 0.22 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: true,
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.25 } },
          },
        },
      }}
      className="absolute inset-0"
    />
  );
}

