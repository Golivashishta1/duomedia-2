"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { poppins } from "@/app/fonts";
import ScrollReveal from "./ScrollReveal";
import RotatingText from "./RotatingText";


/* ---------- Types ---------- */
type Step = { title: string; blurb?: string; decoBR?: string };
type Logo = { src: string; alt: string; w: number; h: number };

/* ---------- Logos (Trust Strip) ---------- */
const logos: Logo[] = [
  { src: "/about/image copy.png", alt: "Lens-cart", w: 220, h: 80 },
  { src: "/about/bellavita.png", alt: "Bella-vita", w: 210, h: 80 },
  { src: "/about/urban.png", alt: "Urban Company", w: 220, h: 80 },
  { src: "/about/boat.png", alt: "boAt", w: 200, h: 80 },
  { src: "/about/physics.png", alt: "PhysicsWallah", w: 240, h: 80 },
];

/* ---------- Steps (Pinned slider) ---------- */
const steps: Step[] = [
  {
    title: "Make\nThem Look",
    blurb: "Reels, buzz content, micro-moments built to stop the scroll.",
    decoBR: "/about/eyeicon.png",
  },
  {
    title: "Now\nThey're Curious",
    blurb: "Stories, testimonials, deeper content to build brand desire.",
    decoBR: "/about/icon2.png",
  },
  {
    title: "Making it\nconversion friendly ;)",
    blurb: "CTAs, links, promos — built for action and ROI.",
    decoBR: "/about/icon3.png",
  },
  {
    title: "Yes, We\nGot The Data",
    blurb: "Clean dashboards, KPIs, learnings with no fluff — just receipts.",
    decoBR: "/about/icon4.png",
  },
];

/* =========================================================
   AboutSection (MERGED): Trust Strip + Manifesto + Pinned Slider
   ========================================================= */
export default function AboutSection() {
  const displayClass = poppins.className;

  /* -------- Trust Strip marquee data -------- */
  const logoItems = [...logos, ...logos]; // seamless loop

  /* -------- Pinned Horizontal Slider setup -------- */
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [maxShift, setMaxShift] = useState(0);
  const [pinHeight, setPinHeight] = useState(900);

  useLayoutEffect(() => {
    const calc = () => {
      const v = viewportRef.current;
      const t = trackRef.current;
      if (!v || !t) return;

      const overflow = Math.max(t.scrollWidth - v.clientWidth, 0);
      setMaxShift(overflow);
      setPinHeight(v.clientHeight + overflow + 1); // keep pinned until fully slid
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Map vertical progress across the pin container to horizontal x
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  const slides = [
    ...steps.map((s) => ({ kind: "step" as const, data: s })),
    { kind: "heart" as const, data: null },
  ];

  return (
    <section className="bg-black text-white">
      {/* ===== Trust Strip (marquee) ===== */}
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
  <div className="mx-auto w-full px-6 md:px-10 lg:px-16">

    <p
      className={`${displayClass}
        w-full max-w-none
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        leading-[1.1]
        text-white/90
        text-center
        text-balance`}
    >
      We're not just another agency. We're your{" "}
      <span className="text-[#D6FF21] font-bold">
        execution powerhouse
      </span>.{" "}
      Built for D2C, Edtech & lifestyle brands that demand ROI from{" "}

      {/* ROTATING PHRASE WITH SOLID BACKGROUND */}
      <span className="inline-flex items-center align-middle">
        <span className="ml-2 rounded-lg bg-[#D6FF21] px-4 py-1 shadow-[0_0_25px_rgba(214,255,33,0.35)]">
          <RotatingText
            texts={[
              "influencer marketing",
              "Content creation",
              "Advertisement",
            ]}
            rotationInterval={2200}
            staggerFrom="last"
            staggerDuration={0.04}
            splitBy="characters"
            mainClassName="text-black font-bold inline-block"
          />
        </span>
      </span>
      .
    </p>

    {/* CTA */}
    <div className="mt-10 text-center">
      <a
        href="/contact"
        className="inline-flex items-center gap-3 rounded-full bg-[#D6FF21] px-6 py-3 font-semibold text-black hover:shadow-[0_10px_40px_rgba(214,255,33,0.35)] transition-shadow"
      >
        Chat With Us <span className="text-xl">→</span>
      </a>
    </div>

  </div>
</section>






      {/* ===== Header for slider ===== */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={`${displayClass} text-4xl md:text-6xl font-bold text-[#D6FF21]`}
        >
          How We Make It Happen
        </motion.h2>
        <p className="mt-4 text-white/70 text-lg max-w-3xl mx-auto">
          From scroll-stopping content to sales that stick — here's how we turn
          attention into action, one smart step at a time.
        </p>
      </div>

      {/* ===== Pinned Horizontal Slider ===== */}
      <div className="mx-auto max-w-6xl px-6 mt-12">
        <div ref={pinRef} style={{ height: pinHeight }} className="relative">
          <div
            ref={viewportRef}
            className="sticky top-16 md:top-24 h-[500px] md:h-[600px] w-full md:max-w-[1080px] ml-auto"
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="h-full flex items-center gap-12 will-change-transform"
            >
              {slides.map((sl, i) => {
                if (sl.kind === "heart") {
                  return (
                    <div
                      key={`heart-${i}`}
                      className="shrink-0 w-[90vw] md:w-[640px] h-full flex items-center justify-center"
                    >
                      <img
                        src="/about/heart_no_bg.png"
                        alt="Love from the audience"
                        className="max-h-64 md:max-h-[360px] w-auto object-contain"
                      />
                    </div>
                  );
                }

                const s = sl.data as Step;
                return (
                  <div
                    key={s.title}
                    className="shrink-0 w-[90vw] md:w-[640px] h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative inline-block">
                      <h3
                        className={`${displayClass} whitespace-pre-line text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold text-[#D6FF21] leading-tight`}
                      >
                        {s.title}
                      </h3>
                      {s.decoBR && (
                        <img
                          src={s.decoBR}
                          alt=""
                          className="pointer-events-none absolute -top-14 -right-8 w-20 sm:w-24 md:w-28 h-auto object-contain"
                        />
                      )}
                    </div>
                    {s.blurb && (
                      <p className="mt-4 text-white/80 text-base sm:text-lg max-w-[560px]">
                        {s.blurb}
                      </p>
                    )}

                    {i < slides.length - 1 && (
                      <div className="mt-6">
                        <span className="inline-block text-white/90 text-4xl md:text-5xl select-none">
                          →
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
