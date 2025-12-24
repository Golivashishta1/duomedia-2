"use client";
import { useMemo } from "react";
import SectionHeading from "./SectionHeading";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We had tight deadlines and high expectations, but the team made creator content seamless—and results outperformed previous campaigns.",
    name: "Ayush Khandelwal",
    title: "Marketing Lead, Mirai School of Technology",
  },
  {
    quote:
      "Tight timelines, last-minute briefs—they handled everything with ease. Solid creator network and sharp execution.",
    name: "Dev Mehta",
    title: "Founder, Tiffly",
  },
  {
    quote:
      "We needed creators that actually deliver engagement, not vanity metrics—these guys got it right.",
    name: "Rajat Malhotra",
    title: "Founder, PrepVerse",
  },
  {
    quote:
      "Our CAC came down and CTRs went up. Clean briefs + consistent execution—exactly what we wanted.",
    name: "Priya Arora",
    title: "CMO, FreshKart",
  },
  {
    quote:
      "From influencer shortlisting to reporting, everything felt organized and data-driven.",
    name: "Nikhil Sharma",
    title: "Growth Lead, FitGen",
  },
  {
    quote:
      "They understood our brand voice quickly and kept creators aligned without killing creativity.",
    name: "Ananya Desai",
    title: "Founder, CraftUp",
  },
  {
    quote:
      "Campaign dashboards made stakeholder updates super easy—transparent, quick, reliable.",
    name: "Siddharth Rao",
    title: "Marketing Head, LoanLynk",
  },
  {
    quote:
      "We saw a noticeable lift in engagement quality and saves. Definitely recommending them.",
    name: "Meera Kapoor",
    title: "Brand Manager, GlowLiv",
  },
];

export default function Testimonials() {
  // Duplicate for seamless loop
  const items = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="What our clients say"
          subtitle="Here’s why smart brands stick with us (and brag about it later)"
        />

        {/* Slider */}
        <div className="mt-10 relative overflow-hidden group">
          {/* Edge fade mask */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          />

          <div className="t-track flex items-stretch gap-6 will-change-transform">
            {items.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="t-card shrink-0 w-[320px] md:w-[380px] rounded-[28px] bg-white/5 ring-1 ring-white/10 p-6"
              >
                <p className="text-lg md:text-xl leading-relaxed">{t.quote}</p>
                <figcaption className="mt-6 text-sm">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-white/70 italic">{t.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* slider CSS */}
          <style jsx global>{`
            .t-track {
              width: max-content;
              animation: t-marquee 24s linear infinite;
              padding: 0 0.5rem;
            }
            /* Pause on hover */
            .group:hover .t-track {
              animation-play-state: paused;
            }
            @keyframes t-marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            /* Improve readability on smaller screens by controlling card width via media queries (optional) */
            @media (max-width: 480px) {
              .t-card {
                width: 290px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
