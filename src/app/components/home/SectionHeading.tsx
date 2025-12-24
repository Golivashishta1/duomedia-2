"use client";
import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  /** Optional override: pass a custom class (e.g. another next/font) */
  headingClass?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  headingClass,
}: Props) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="text-white/60 text-sm md:text-base tracking-wide">
          {eyebrow}
        </p>
      )}

      <motion.h2

        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={[
          headingClass || "font-display", 
          "font-extrabold",        // 👈 default heading font
          "mt-4 text-[#D6FF21]",
          "text-4xl md:text-5xl lg:text-6xl",
          "leading-[0.95] tracking-[-0.02em]",
          "drop-shadow-[0_0_24px_rgba(214,255,33,0.25)]",
        ].join(" ")}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
