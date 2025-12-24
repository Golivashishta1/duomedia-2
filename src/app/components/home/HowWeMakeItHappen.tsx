"use client";

import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

const steps = [
  { title: "Influencer Search", desc: "Handpicked creators who get your vibe.", emoji: "🔎" },
  { title: "Creative Strategy", desc: "We make content that actually works.", emoji: "💡" },
  { title: "Content Guidelines", desc: "Clear briefs that keep output on-point.", emoji: "📜" },
  { title: "Trend Research", desc: "Stay ahead with insights that perform.", emoji: "📁" },
  { title: "Compliance & Contracts", desc: "Everything buttoned-up and sound.", emoji: "⚖️" },
  { title: "Reporting & Analytics", desc: "Clear reports that tell a story.", emoji: "📑" },
];

export default function HowWeMakeItHappen() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="How We Make It Happen"
          subtitle="Here's why smart brands stick with us (and brag about it later)"
          /* No headingClass needed — uses .font-display globally */
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-[28px] p-6 ring-1 ring-white/10 bg-gradient-to-b from-[#D6FF21]/10 to-transparent"
            >
              <div className="text-5xl leading-none">{s.emoji}</div>

              {/* Card title uses display font */}
              <h3 className="mt-4 text-2xl font-extrabold font-display">
                {s.title}
              </h3>

              <p className="mt-2 text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
