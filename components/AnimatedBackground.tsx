"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "gear";
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(253, 106, 2, 0.15)",
      "rgba(0, 240, 255, 0.12)",
      "rgba(168, 85, 247, 0.12)",
      "rgba(34, 197, 94, 0.1)",
    ];

    const shapes: Particle["shape"][] = ["circle", "square", "triangle", "gear"];

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setParticles(newParticles);
  }, []);

  const renderShape = (p: Particle) => {
    const baseStyle = {
      position: "absolute" as const,
      left: `${p.x}%`,
      top: `${p.y}%`,
      animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
    };

    switch (p.shape) {
      case "circle":
        return (
          <div
            key={p.id}
            style={{
              ...baseStyle,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              filter: "blur(1px)",
            }}
          />
        );
      case "square":
        return (
          <div
            key={p.id}
            style={{
              ...baseStyle,
              width: p.size,
              height: p.size,
              borderRadius: "3px",
              background: p.color,
              transform: "rotate(45deg)",
              filter: "blur(1px)",
            }}
          />
        );
      case "triangle":
        return (
          <div
            key={p.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${p.size / 2}px solid transparent`,
              borderRight: `${p.size / 2}px solid transparent`,
              borderBottom: `${p.size}px solid ${p.color}`,
              filter: "blur(1px)",
            }}
          />
        );
      case "gear":
        return (
          <svg
            key={p.id}
            style={{
              ...baseStyle,
              width: p.size + 5,
              height: p.size + 5,
              animation: `spin ${p.duration}s linear infinite`,
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
              stroke={p.color}
              strokeWidth="1"
            />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
              stroke={p.color}
              strokeWidth="0.5"
            />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-float-slow"
        style={{
          top: "-10%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(253, 106, 2, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float"
        style={{
          bottom: "-5%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: "40%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 12s ease-in-out infinite alternate",
        }}
      />

      {/* Floating particles */}
      {particles.map(renderShape)}
    </div>
  );
}
