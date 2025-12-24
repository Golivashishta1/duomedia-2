"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { poppins } from "@/app/fonts";

/* --- Heading style --- */
const headingFont = poppins;

type Service = {
  title: string;
  body?: string;
  img?: string;
  video?: string;
  poster?: string;
  imgClass?: string;
  href?: string;
  solidLime?: boolean;
};

const services: Service[] = [
  {
    title: "Brainy\nCampaign\nPlanning",
    body:
      "We map campaigns that actually align with your goals & not just vibes and hashtags.",
    img: "/services/speaker.png",
    imgClass: "absolute right-6 bottom-[-10px] w-[30%] md:w-[35%] object-contain",
  },
  {
    title: "Creator\nOutreach &\nNegotiation",
    body:
      "We find the right faces, start smart conversations, & close collabs without chaos.",
  },
  {
    title: "Content\nCoordination\n& Scripting",
    body:
      "No fluff — just scripts & systems that keep creators moving and content consistent.",
    video: "/services/Video-291.mp4",
  },
  {
    title: "Testimonials &\nPerformance\nContent",
    body:
      "We turn real voices into real results in thumb-stopping UGC that builds trust & drives action.",
  },
  {
    title: "KPI Tracking &\nReporting",
    body:
      "Dashboards that actually show you what worked, no fluff, just data that talks.",
  },
  {
    title: "Full-Funnel\nStrategy",
    body:
      "Our funnel-first approach guides your audience from curiosity to checkout.",
  },
  {
    title: "Know Us",
    href: "/about",
    img: "/services/funnel2.png",
    imgClass: "absolute left-4 bottom-[10%] w-[75%] object-contain",
    solidLime: true,
  },
];

/* -------------------------- Page -------------------------- */
export default function ServicesPage() {
  return (
    <main className="bg-[#0b0b0b] text-white">
      {/* ====== “ALL THE SERVICES” header ====== */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        {/* —— Header ——————————————————————————— */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3 md:gap-4">
            <img
              src="/services/megaphone.png"
              alt=""
              className="shrink-0 w-[56px] md:w-[72px] lg:w-[90px] h-auto -mr-2 md:-mr-3 align-middle"
            />
            <h2
              className={`${headingFont.className} text-[#d6ff21] text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_24px_rgba(214,255,33,0.35)]`}
            >
              ALL THE SERVICES
            </h2>
            <img
              src="/services/bulb.png"
              alt=""
              className="shrink-0 w-[52px] md:w-[68px] lg:w-[84px] h-auto -ml-2 md:-ml-3 align-middle"
            />
          </div>

          <p className="mt-3 text-white/70 max-w-3xl mx-auto">
            This isn't fluff, filler, or 'influencer marketing' as usual. It's
            structured, strategic, and designed to get your brand where it need to go fast
          </p>
        </div>

        {/* Row 1 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ServiceCard data={services[0]} className="lg:col-span-5" />
          <ServiceCard data={services[1]} className="lg:col-span-7" />
        </div>

        {/* Row 2 */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ServiceCard data={services[2]} className="lg:col-span-7" />
          <ServiceCard data={services[3]} className="lg:col-span-5" />
        </div>

        {/* Row 3 */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ServiceCard data={services[4]} className="lg:col-span-4" />
          <ServiceCard data={services[5]} className="lg:col-span-4" />
          <ServiceCard data={services[6]} className="lg:col-span-4" />
        </div>

        {/* CTA row */}
        <div className="mt-10 mb-6 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-black bg-[#D6FF21] hover:shadow-[0_6px_30px_rgba(214,255,33,0.35)]"
          >
            Chat With Us <span className="text-xl">→</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-white/10 ring-1 ring-white/15"
          >
            View Portfolio
          </Link>
        </div>
      </section>

      {/* ====== PICK YOUR POWER MODE ====== */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <div className="text-center">
          <h2
            className={`${headingFont.className} text-[#D6FF21] text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_24px_rgba(214,255,33,0.35)]`}
          >
            Pick Your Power Mode
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PlanCard
            title={"Classic Influencer\nMarketing (IG + YT)"}
            chip="Most Popular"
            items={[
              "High quality Reels and Videos",
              "Micro, Macro, Mega and Celebs creators",
              "In-house dedicated team for retainers",
              "Creative strategy, planning and execution",
              "Exclusive influencer-lead property",
              "Compliance, Budgeting, Reporting",
            ]}
            theme="dark"
            headingClassName={headingFont.className}
          />
          <PlanCard
            title={"Meme Marketing and\nAmplification"}
            items={[
              "Stay on top-of-the-mind of the internet",
              "Target PAN India audience",
              "Exclusive scalable meme strategy",
              "Dedicated copywriter",
              "Creative strategy",
              "Budget planning",
            ]}
            theme="dark"
            headingClassName={headingFont.className}
          />
          <PlanCard
            title={"LinkedIn Influencer Marketing"}
            items={[
              "Top LinkedIn influencers scouting",
              "Amplify TVC, films, billboard campaigns etc",
              "Creative ideas and platform analysis",
              "Long-term LinkedIn strategy",
              "Dedicated specialist",
              "Post-campaign impact measuring",
            ]}
            theme="dark"
            headingClassName={headingFont.className}
          />
        </div>
      </section>
    </main>
  );
}

/* ------------------------ ServiceCard ------------------------ */
function ServiceCard({
  data,
  className = "",
}: {
  data: Service;
  className?: string;
}) {
  const { title, body, img, video, poster, imgClass, href, solidLime } = data;
  const hasArt = Boolean(video || img);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[28px] ring-1 min-h-[260px]",
        solidLime
          ? "bg-[#D6FF21] ring-[#D6FF21]/60 text-black"
          : "bg-gradient-to-b from-white via-white to-[#D6FF21]/65 ring-white/10 text-black",
        className,
      ].join(" ")}
    >
      <div className={["relative z-10 p-6 md:p-7 lg:p-8", hasArt ? "md:pr-[48%]" : ""].join(" ")}>
        <h3
          className={`${headingFont.className} whitespace-pre-line text-[34px] leading-[0.95] md:text-[40px] font-extrabold tracking-tight`}
        >
          {title}
        </h3>

        {body && (
          <p className="mt-3 text-[15px] md:text-base text-black/80 max-w-[32ch]">{body}</p>
        )}

        {href && <Link href={href} className="absolute inset-0" aria-label={title || "Know us"} />}

        {href && (
          <div className="absolute right-2 bottom-0">
            <div className="grid place-items-center size-24 md:size-28 rounded-full bg-black/5">
              <ArrowUpRight className="size-16 text-black" strokeWidth={3.5} />
            </div>
          </div>
        )}
      </div>

      {/* Artwork */}
      {video ? (
        <div className="mt-4 md:mt-0 md:absolute md:inset-y-4 md:right-4 md:w-[46%]">
          <video
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full rounded-2xl object-cover shadow-xl ring-1 ring-black/10"
          />
        </div>
      ) : img ? (
        <>
          <img
            src={img}
            alt=""
            className="mt-4 w-full h-auto rounded-2xl object-contain md:hidden"
          />
          <img
            src={img}
            alt=""
            className={[
              "hidden md:block",
              imgClass || "absolute right-6 bottom-0 w-[44%] object-contain",
            ].join(" ")}
          />
        </>
      ) : null}
    </div>
  );
}

/* --------------------------- PlanCard --------------------------- */
function PlanCard({
  title,
  items,
  chip,
  theme = "light",
  headingClassName = "",
}: {
  title: string;
  items: string[];
  chip?: string;
  theme?: "light" | "dark";
  headingClassName?: string;
}) {
  const isDark = theme === "dark";
  return (
    <div className="h-full flex flex-col">
      <div
        className={[
          "relative rounded-[22px] overflow-hidden ring-1 flex-1 flex flex-col",
          isDark ? "bg-black ring-white/10" : "bg-white ring-black/10",
        ].join(" ")}
      >
        <div className="p-6 md:p-7 lg:p-8 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3
                className={[
                  headingClassName,
                  "whitespace-pre-line text-[28px] md:text-[30px] font-extrabold leading-[1.1]",
                  isDark ? "text-[#D6FF21]" : "text-emerald-700",
                ].join(" ")}
              >
                {title}
              </h3>
              {chip && (
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  {chip}
                </span>
              )}
            </div>

            <ul className="mt-5 space-y-4">
              {items.map((it, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className={["mt-1 shrink-0", isDark ? "text-emerald-400" : "text-emerald-600"].join(" ")} />
                  <span className={isDark ? "text-white/85" : "text-black/80"}>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7" style={{ borderWidth: "2px", borderRadius: "12px",
    borderColor: "#d6ff21"}}>
            <Link
              href="/contact"
              className={[
                "w-full inline-flex items-center justify-center rounded-[12px] px-5 py-3 font-semibold",
                isDark 
                  ? "bg-[#111] text-white ring-1 ring-white/15 hover:bg-black transition-colors duration-200" 
                  : "bg-[#111] text-white hover:bg-black transition-colors border-green/10 duration-200",
              ].join(" ")} 
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
