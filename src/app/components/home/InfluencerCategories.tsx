"use client";
import { useMemo } from "react";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

const cats = [
  { title: "Education & Career", img: "/home/1.png" },
  { title: "Tech & Gadgets", img: "/home/2.png" },
  { title: "Comedy & Entertainment", img: "/home/3.png" },
  { title: "Fashion & Beauty", img: "/home/4.png" },
  { title: "Fitness & Health", img: "/home/5.png" },   
];

export default function InfluencerCategories() {
  const items = useMemo(() => [...cats, ...cats], []); 

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="Influencer Category" />

        {/* Right-moving slider */}
        <div className="mt-10 relative overflow-hidden">
          {/* edge fade mask */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          />

          <div className="cat-track flex items-stretch gap-4 md:gap-6 will-change-transform">
            {items.map((c, i) => (
              <div
                key={`${c.title}-${i}`}
                className="shrink-0 w-[240px] md:w-[300px] relative overflow-hidden rounded-[24px] ring-1 ring-white/10 bg-white/5 group"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-[220px] md:h-[260px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
                  <p className="font-semibold drop-shadow text-white">{c.title}</p>
                  <span className="grid place-items-center size-10 rounded-full ring-1 ring-amber-300/40 bg-[#D6FF21]/20 text-black group-hover:bg-[#D6FF21] transition-colors">
                    <ArrowUpRight />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* slider CSS */}
          <style jsx global>{`
            .cat-track {
              width: max-content;
              animation: cat-right 22s linear infinite;
              padding: 0 0.5rem;
            }
            @keyframes cat-right {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
          `}</style>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-black bg-[#D6FF21]" href="/contact">
            Chat With Us
          </a>
          <a className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-white/10 ring-1 ring-white/15" href="projects">
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
