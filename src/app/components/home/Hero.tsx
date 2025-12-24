"use client";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import HeroReelsBG from "./HeroReelsBG";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#0b0b0b]"
      style={{
        backgroundImage: `
          /* faint cross glow */
          radial-gradient(circle at center, rgba(255,153,51,0.06) 0px, transparent 80px),
          /* vertical lines */
          repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 40px),
          /* horizontal lines */
          repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 40px)
        `,
        backgroundSize: "cover",
      }}
    >
      {/* BG slider band at bottom (behind content) */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[260px] sm:h-[300px]">
        <HeroReelsBG />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content ABOVE slider */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-28 sm:pt-36 md:pt-20 pb-10 md:pb-10" style={{marginTop: "10px"}}>
        {/* Eyebrow turned into a pill/button card */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full px-8 py-4
                           font-semibold text-white bg-white/10 ring-1 ring-white/15
                           shadow-[0_8px_28px_rgba(255,153,51,0.18)]
                           hover:bg-white/15 transition">
            <span className="h-2 w-2 rounded-full bg-[#D6FF21]" />
            Build your market with us
          </span>
        </div>

        <SectionHeading
          eyebrow=""
          title="Campaigns Don't Have to Be Boring."
          subtitle="From shoutouts to sell-outs, we run campaigns that move product, build hype, and make both brands and creators look like rockstars."
        />

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#D6FF21] px-6 py-3 font-semibold text-black hover:shadow-[0_10px_40px_rgba(214,255,33,0.35)] transition-shadow"
          >
            Chat with us
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
          >
            View Portfolio
          </Link>
        </div>

        {/* Decorative image only */}
        <div className="relative mx-auto mt-10 grid place-items-center">
          <motion.img
            src="/hero1.png"
            alt="Results"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={[
              "pointer-events-none z-30",
              "w-[92vw] max-w-[680px]",
              "sm:max-w-[760px] md:max-w-[860px] lg:max-w-[920px]",
              "h-auto",
              "rotate-0 sm:-rotate-1 md:-rotate-3 lg:-rotate-5",
            ].join(" ")}
          />
        </div>
      </div>
    </section>
  );
}
