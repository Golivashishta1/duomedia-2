"use client";

import { poppins } from "@/app/fonts";
import AboutSection from "../components/home/AboutSection";

/* ---------- Logos for trust strip ---------- */
type Logo = { src: string; alt: string; w: number; h: number };
const logos: Logo[] = [
  { src: "/about/image copy.png", alt: "Lens-cart", w: 220, h: 80 },
  { src: "/about/bellavita.png", alt: "Bella-vita", w: 210, h: 80 },
  { src: "/about/urban.png", alt: "Urban Company", w: 220, h: 80 },
  { src: "/about/boat.png", alt: "boAt", w: 200, h: 80 },
  { src: "/about/physics.png", alt: "PhysicsWallah", w: 240, h: 80 },
];

export default function AboutPage() {
  const display = poppins.className;

  const logoItems = [...logos, ...logos]; // seamless marquee

  return (
    <main className="bg-black text-white">
      {/* ===== Trust strip (marquee) ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-white/80 text-lg">
            Companies trusting{" "}
            <span className="text-[#D6FF21] font-semibold">Duo Media</span> for
            their branding &amp; marketing.
          </p>

          <div className="mt-8 relative overflow-hidden">
            {/* soft edge mask */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
            />
            <div className="logos-track flex items-center gap-12 will-change-transform">
              {logoItems.map((l, i) => (
                <img
                  key={`${l.src}-${i}`}
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={l.h}
                  className="h-[48px] md:h-[60px] w-auto object-contain brightness-200 contrast-0 invert"
                />
              ))}
            </div>

            <style jsx global>{`
              .logos-track {
                width: max-content;
                animation: logos-left 24s linear infinite;
              }
              @keyframes logos-left {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* ===== Manifesto / hero copy ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className={`${display} text-3xl md:text-5xl leading-tight text-white/90 text-center`}>
            We're not just another agency. We're your{" "}
            <span className="px-2 rounded-lg text-[#0B0B0B] bg-[#D6FF21] font-bold">
              execution powerhouse
            </span>
            . Built for D2C, Edtech &amp; lifestyle{" "}
            <span className="text-[#D6FF21] font-bold">brands that demand ROI</span>{" "}
            from influencer marketing.
          </p>

          <div className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#D6FF21] px-6 py-3 font-semibold text-black hover:shadow-[0_10px_40px_rgba(214,255,33,0.35)] transition-shadow"
            >
              Chat With Us <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Horizontal pinned slider ===== */}
      <AboutSection />
    </main>
  );
}
