"use client";
import { useMemo } from "react";

const sources = [
  "/reels/1.mp4",
  "/reels/2.mp4",
  "/reels/3.mp4",
  "/reels/4.mp4",
  "/reels/5.mp4",
];

export default function VideoMarquee() {
  const items = useMemo(() => [...sources, ...sources], []); // duplicate for seamless loop

  return (
    <section className="py-6 md:py-10">
      <div className="relative overflow-hidden">
        {/* fade masks on edges */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        />

        <div className="marquee-track flex gap-4 will-change-transform">
          {items.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[220px] md:w-[260px] rounded-[24px] overflow-hidden bg-white/5 ring-1 ring-white/10"
            >
              {/* Replace poster with your thumbnails if needed */}
              <video
                src={src}
                loop
                muted
                playsInline
                autoPlay
                preload="metadata"
                className="block h-[380px] md:h-[440px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* styled-jsx for rightwards marquee */}
      <style jsx global>{`
        .marquee-track {
          width: max-content;
          animation: marquee-right 30s linear infinite;
          padding: 0 1rem;
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
}