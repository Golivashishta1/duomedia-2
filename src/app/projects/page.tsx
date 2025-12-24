"use client";

import { motion } from "framer-motion";
import { poppins } from "@/app/fonts"; 

type StatTriplet = { creators: string; views: string; reach: string };

type CaseItem = {
  tag: string;
  brand: string;
  blurb: string;
  video?: string;
  poster?: string;
  image?: string;
  stats: StatTriplet;
  href?: string;
};

const items: CaseItem[] = [
  {
    tag: "#DuoMedia",
    brand: "LensKart",
    blurb:
      "Utilize our tools to enhance Lens experiences and drive enrollment.",
    video: "/projects/lenskart.mp4",
    stats: { creators: "30", views: "5.4M", reach: "7.6M" },
  },
  {
    tag: "#DuoMedia",
    brand: "Beardo",
    blurb:
      "Utilize our tools to enhance learning experiences and drive enrollment.",
    video: "/projects/beardoreel.mp4",
    stats: { creators: "10", views: "1.8M", reach: "7.6M" },
  },
  {
    tag: "#DuoMedia",
    brand: "The Man Company",
    blurb:
      "Utilize our tools to enhance learning experiences and drive enrollment.",
    video: "/projects/themancompany.mp4",
    stats: { creators: "9", views: "1.6M", reach: "7.6M" },
  },
  {
    tag: "#DuoMedia",
    brand: "Meesho",
    blurb:
      "Utilize our tools to enhance learning experiences and drive enrollment.",
    video: "/projects/meshoreel.mp4",
    stats: { creators: "15", views: "3.7M", reach: "7.6M" },
  },
  {
    tag: "#DuoMedia",
    brand: "Urban Company",
    blurb: "From cluttered to clear — campaigns that people remember.",
    video: "/projects/urban.mp4",
    stats: { creators: "22", views: "4.9M", reach: "6.2M" },
  },
  {
    tag: "#DuoMedia",
    brand: "boAt",
    blurb: "Performance-first UGC that builds trust and drives action.",
    video: "/projects/boat.mp4",
    stats: { creators: "12", views: "2.1M", reach: "5.3M" },
  },
];

export default function RealResults() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <div className="text-center">
          <h2
            className={`${poppins.className} text-[#D6FF21] text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_24px_rgba(214,255,33,0.35)]`}
          >
            Real Brands. Real Results.
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Everything you need to go from cluttered to clear — and from noticed
            to remembered.
          </p>
        </div>

        {/* Mobile: 1 per row, Desktop: 2 per row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <CaseCard key={i} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: CaseItem }) {
  const { tag, brand, blurb, video, poster, image, stats, href } = item;

  return (
    <motion.a
      href={href ?? undefined}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative block overflow-hidden rounded-[28px] ring-1 ring-white/10 bg-black"
    >
      {/* Media with target aspect/height */}
      <div className="relative">
        {/* 1080 × 1035 feel */}
        <div className="aspect-[1080/1300] md:max-h-[1035px] w-full overflow-hidden">
          {video ? (
            <video
              src={video}
              poster={poster}
              className="h-full w-full object-cover transition-transform duration-500 md:hover:scale-[1.03]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : image ? (
            <img src={image} alt={brand} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
        <div className="px-5 pb-4">
          <span className="inline-block rounded-full bg-[#1671FF] text-white text-xs font-semibold px-3 py-1 mb-3">
            {tag}
          </span>
          <h3
            className={`${poppins.className} text-2xl md:text-[28px] font-extrabold drop-shadow`}
          >
            {brand}
          </h3>
          <p className="mt-1 text-white/85 max-w-[46ch]">{blurb}</p>
        </div>

        <div className="px-5 pb-5">
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#D6FF21] text-black px-4 py-4">
            <Stat label="Creators" value={stats.creators} />
            <Stat label="Total Views" value={stats.views} />
            <Stat label="Total Reach" value={stats.reach} />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className={`${poppins.className} text-2xl md:text-[26px] font-extrabold leading-none`}
      >
        {value}
      </div>
      <div className="text-[12px] md:text-[13px] font-medium opacity-80">{label}</div>
    </div>
  );
}
