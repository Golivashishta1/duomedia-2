"use client";
import { useMemo } from "react";

// 6 reels
const row = [
  "/reels/1.mp4",
  "/reels/2.mp4",
  "/reels/3.mp4",
  "/reels/4.mp4",
  "/reels/5.mp4",
  "/reels/6.mp4",
];

export default function HeroReelsBG() {
  // Triple up to ensure full coverage + seamless loop
  const items = useMemo(() => [...row, ...row, ...row], []);

  return (
    // Parent should set explicit height (e.g., h-[240px]/h-[300px])
    <div className="h-full w-full overflow-hidden">
      <div className="hero-track flex h-full will-change-transform">
        {items.map((src, i) => (
          <div key={i} className="hero-reel h-full shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 bg-white/5">
            <video
              src={src}
              loop
              muted
              playsInline
              autoPlay
              preload="metadata"
              className="h-full w-full object-cover block"
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        /* Each card width scales with viewport so the band always fills screen */
        .hero-reel {
          width: clamp(180px, 16vw, 260px);
          margin-right: clamp(12px, 1.2vw, 20px);
        }

        .hero-track {
          width: max-content;
          /* Faster speed: reduce duration (was 26s) */
          animation: hero-marquee-left 18s linear infinite;
        }

        /* Start with fully-visible band across screen (no staggered entry),
           then move left continuously to loop seamlessly. */
        @keyframes hero-marquee-left {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
