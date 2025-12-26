"use client";

import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Influencer Search",
    desc: "Handpicked creators who get your vibe.",
    image: "/makeItHappen/1.png",
  },
  {
    title: "Creative Strategy",
    desc: "We make content that actually works.",
    image: "/makeItHappen/2.png",
  },
  {
    title: "Content Guidelines",
    desc: "Clear briefs that keep output on-point.",
    image: "/makeItHappen/3.png",
  },
  {
    title: "Trend Research",
    desc: "Stay ahead with insights that perform.",
    image: "/makeItHappen/4.png",
  },
  {
    title: "Compliance & Contracts",
    desc: "Everything buttoned-up and sound.",
    image: "/makeItHappen/5.png",
  },
  {
    title: "Reporting & Analytics",
    desc: "Clear reports that tell a story.",
    image: "/makeItHappen/6.png",
  },
];

export default function HowWeMakeItHappen() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="How We Make It Happen"
          subtitle="Here's why smart brands stick with us (and brag about it later)"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ rotateX: 1.2, rotateY: -1.2 }}
              className="relative overflow-hidden rounded-[28px] p-6 min-h-[350px] w-[88%] mx-auto
              hover:ring-[#D6FF21]/40 bg-gradient-to-b from-[#D6FF21]/8 to-transparent
              shadow-[0_12px_40px_rgba(214,255,33,0.06)] transition-all duration-300"
            >
              {/* 🔥 GLOW BORDER LAYER (FIRST CHILD) */}
              <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[28px] ring-4 ring-[#D6FF21]/0 animate-[borderGlow_4.5s_ease-in-out_infinite]"
              />

              {/* TOP travelling light */}
              <span className="pointer-events-none absolute top-0 left-[-40%] h-[3px] w-[60%] bg-gradient-to-r from-transparent via-[#D6FF21]/90 to-transparent animate-[topLight_4.5s_ease-in-out_infinite] blur-sm z-10 mix-blend-screen"
              />

              {/* BOTTOM travelling light */}
              <span className="pointer-events-none absolute bottom-0 right-[-40%] h-[3px] w-[60%] bg-gradient-to-l from-transparent via-[#D6FF21]/80 to-transparent animate-[bottomLight_4.5s_ease-in-out_infinite] blur-sm z-10 mix-blend-screen"
              />

              <h3 className="mt-4 text-[35px] leading-tight font-extrabold font-display">
                {s.title}
              </h3>

              <p className="mt-3 text-lg leading-relaxed text-white/50">
                {s.desc}
              </p>

              {/* Bottom-right image (unique per card) */}
              <Image
                src={s.image}
                alt=""
                width={220}
                height={220}
                className="pointer-events-none absolute bottom-[-40px] right-[-11px] opacity-80"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes topLight {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(240%);
            opacity: 0;
          }
        }

        @keyframes bottomLight {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          55% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(-240%);
            opacity: 0;
          }
        }

        @keyframes borderGlow {
  0% {
    box-shadow: 0 0 0 rgba(214,255,33,0);
    opacity: 0;
  }
  20% {
    opacity: 1;
    box-shadow:
      0 0 18px rgba(214,255,33,0.25),
      inset 0 0 12px rgba(214,255,33,0.18);
  }
  50% {
    opacity: 0.7;
    box-shadow:
      0 0 28px rgba(214,255,33,0.35),
      inset 0 0 18px rgba(214,255,33,0.25);
  }
  100% {
    opacity: 0;
    box-shadow: 0 0 0 rgba(214,255,33,0);
  }
}

      `}</style>
    </section>
  );
}
