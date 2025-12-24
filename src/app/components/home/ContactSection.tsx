// src/components/ContactSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import { poppins } from "@/app/fonts";

/* ---------- Types ---------- */
type Tab = "brand" | "influencer";

type BrandForm = {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  details: string;
  budget: string;
  hearAbout: string;
};

type InfluencerForm = {
  firstName: string;
  lastName: string;
  instagram: string;
  followers: string;
  category: string;
  phone: string;
  email: string;
};

/* ---------- Config ---------- */
const WHATSAPP_NUMBER = "+919336161355"; // your WhatsApp number
const BRAND_NAME = "Duo Media";

/* Phones overlay PNG (transparent) */
const phonesOverlay = "/contact/phones.png";

/* Heading style */
const heading = "font-bold";

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>("brand");

  const [brand, setBrand] = useState<BrandForm>({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    details: "",
    budget: "",
    hearAbout: "",
  });

  const [creator, setCreator] = useState<InfluencerForm>({
    firstName: "",
    lastName: "",
    instagram: "",
    followers: "",
    category: "",
    phone: "",
    email: "",
  });

  const isBrand = tab === "brand";

  const canSubmit = useMemo(() => {
    if (isBrand) {
      const v = brand;
      return v.firstName && v.lastName && v.email && v.designation && v.details && v.budget;
    } else {
      const v = creator;
      return v.firstName && v.lastName && v.instagram && v.followers && v.category && v.phone && v.email;
    }
  }, [isBrand, brand, creator]);

  function openWhatsApp() {
    const message = isBrand
      ? `Hello ${BRAND_NAME} Team,

I'm reaching out as a *Brand*.

Name: ${brand.firstName} ${brand.lastName}
Email: ${brand.email}
Designation: ${brand.designation}

Project / Campaign details:
${brand.details}

Estimated Budget: ${brand.budget}
Discovered via: ${brand.hearAbout || "-"}

Please get in touch.`
      : `Hello ${BRAND_NAME} Team,

I'm reaching out as an *Influencer*.

Name: ${creator.firstName} ${creator.lastName}
Instagram: ${creator.instagram}
Followers: ${creator.followers}
Category: ${creator.category}
Phone: ${creator.phone}
Email: ${creator.email}

Excited to collaborate!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^+\d]/g, "")}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    openWhatsApp();
  }

  return (
    <main className="bg-[#0b0b0b] text-white">
      {/* ===== Top Heading (down from navbar) ===== */}
      <section className="mx-auto max-w-7xl px-6 pt-28 md:pt-36 pb-10">
        <div className="text-center">
          <h1
            className={`${heading} text-[#D6FF21] text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_24px_rgba(214,255,33,0.35)]`}
          >
            Forms That Don’t Suck
          </h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto">
            Here’s why smart brands stick with us (and brag about it later)
          </p>
        </div>
      </section>

      {/* ===== Tabs + Two Column Layout ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-3">
          <TabPill active={isBrand} onClick={() => setTab("brand")} label="I am Brand" />
          <TabPill active={!isBrand} onClick={() => setTab("influencer")} label="I am Influencer" />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Copy */}
          <div className="lg:col-span-5">
            <h2 className={`${heading} text-3xl md:text-[44px] font-black leading-tight`}>
              TODAY IS A GREAT DAY TO
              <br />
              GET IN TOUCH WITH <span className="text-[#D6FF21]">{BRAND_NAME.toUpperCase()}</span>.
            </h2>
            <p className="mt-4 text-white/80 max-w-xl">
              To get started, tell us a little about you and a {BRAND_NAME} team member will reach out.
            </p>

            <ul className="mt-8 space-y-6 text-white/85">
              <Bullet>
                Discover how {BRAND_NAME}’s skilled team can handle all your influencer marketing requirements from
                start to finish.
              </Bullet>
              <Bullet>
                Explore how {BRAND_NAME} crafts effective strategies and connects you with a handpicked creator
                network.
              </Bullet>
              <Bullet>Get dashboards, KPIs and clear reporting — no fluff, just receipts.</Bullet>
            </ul>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#121212] ring-1 ring-white/10 p-5 md:p-7">
              <h3 className={`${heading} text-2xl font-extrabold`}>{isBrand ? "I Am Brand" : "I Am Influencer"}</h3>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                {isBrand ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First name"
                        value={brand.firstName}
                        onChange={(v) => setBrand({ ...brand, firstName: v })}
                        placeholder="Jane"
                      />
                      <Input
                        label="Last name"
                        value={brand.lastName}
                        onChange={(v) => setBrand({ ...brand, lastName: v })}
                        placeholder="Smith"
                      />
                    </div>

                    <Input
                      label="Email"
                      type="email"
                      value={brand.email}
                      onChange={(v) => setBrand({ ...brand, email: v })}
                      placeholder="janesmith@gmail.com"
                    />

                    <Input
                      label="Your designation in the company"
                      value={brand.designation}
                      onChange={(v) => setBrand({ ...brand, designation: v })}
                    />

                    <Textarea
                      label="Briefly explain what you are looking for — such as campaign or project details."
                      rows={5}
                      value={brand.details}
                      onChange={(v) => setBrand({ ...brand, details: v })}
                    />

                    <Input
                      label="Estimated Budget for Influencer Marketing"
                      value={brand.budget}
                      onChange={(v) => setBrand({ ...brand, budget: v })}
                      placeholder="₹5L–₹20L / $5k–$25k / etc."
                    />

                    <Input
                      label="Lastly, how did you hear about DUO MEDIA?"
                      value={brand.hearAbout}
                      onChange={(v) => setBrand({ ...brand, hearAbout: v })}
                      placeholder="Instagram / LinkedIn / Referral / Google..."
                    />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First name"
                        value={creator.firstName}
                        onChange={(v) => setCreator({ ...creator, firstName: v })}
                        placeholder="Jane"
                      />
                      <Input
                        label="Last name"
                        value={creator.lastName}
                        onChange={(v) => setCreator({ ...creator, lastName: v })}
                        placeholder="Smith"
                      />
                    </div>

                    <Input
                      label="Your Instagram Handle"
                      value={creator.instagram}
                      onChange={(v) => setCreator({ ...creator, instagram: v })}
                      placeholder="@janedoe"
                    />

                    <Input
                      label="Number Of Followers You Have"
                      value={creator.followers}
                      onChange={(v) => setCreator({ ...creator, followers: v })}
                      placeholder="e.g., 120K"
                    />

                    <Input
                      label="What's Your Category in Content Creation"
                      value={creator.category}
                      onChange={(v) => setCreator({ ...creator, category: v })}
                      placeholder="Tech / Comedy / Beauty / Education..."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Your Contact Number"
                        value={creator.phone}
                        onChange={(v) => setCreator({ ...creator, phone: v })}
                        placeholder="+91 98xxxxxxx"
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={creator.email}
                        onChange={(v) => setCreator({ ...creator, email: v })}
                        placeholder="janesmith@gmail.com"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full rounded-xl px-6 py-4 text-center font-semibold transition ${
                    canSubmit
                      ? "bg-[#D6FF21] text-black hover:shadow-[0_12px_50px_rgba(214,255,33,0.35)]"
                      : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  Submit via WhatsApp
                </button>

                <p className="text-center text-xs text-white/50">
                  We'll open WhatsApp with your details pre-filled. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom headline + ONLY phones image (no reels, no logos) ===== */}
      <BottomHeadlineWithPhones />
    </main>
  );
}

/* ====================== Bottom Section ====================== */
function BottomHeadlineWithPhones() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24">
      <div className="text-center px-6">
        <h2 className={`${heading} text-[#D6FF21] text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight`}>
          Trends. Creator tea.
          <br className="hidden sm:block" />
          Campaign breakdowns.
        </h2>
        <p className="mt-4 text-white/70 max-w-3xl mx-auto">
          Here’s why smart brands stick with us (and brag about it later)
        </p>
      </div>

      <div className="relative mt-10 grid place-items-center">
        <img
          src={phonesOverlay}
          alt=""
          className="pointer-events-none w-[560px] max-w-[90vw] h-auto drop-shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0b0b0b] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
    </section>
  );
}

/* ====================== UI Bits ====================== */

function TabPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-5 md:px-6 py-3 text-sm md:text-base font-semibold transition shadow",
        active
          ? "bg-[#D6FF21] text-black shadow-[0_10px_40px_rgba(214,255,33,0.35)]"
          : "bg-white/10 text-white/80 hover:bg-white/15",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1.5 inline-flex size-5 items-center justify-center rounded-full bg-[#D6FF21] text-black text-xs font-bold">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-[#181818] px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6FF21]"
        required
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/80">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg bg-[#181818] px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6FF21]"
        required
      />
    </label>
  );
}
