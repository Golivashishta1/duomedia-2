"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const baseLink =
    "transition-colors font-medium px-3 py-1.5 rounded-full";
  const activeLink =
    "text-[#0b0b0b] bg-[#D6FF21] ring-1 ring-[#C8F018]/60";
  const idleLink =
    "text-white/80 hover:text-[#D6FF21] hover:bg-white/5";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex items-center justify-between max-w-7xl px-6 py-4">
        {/* Logo → go to home */}
        <Link
  href="/"
  aria-label="Duo Media — Home"
>
  <Image
    src="/Group342.png"
    alt="Duo Media Logo"
    width={120}
    height={40}
    className="h-12 w-auto"
  />
</Link>


        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`${baseLink} ${isActive(link.href) ? activeLink : idleLink}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-full bg-[#D6FF21] px-5 py-2 font-semibold text-black hover:shadow-[0_4px_20px_rgba(214,255,33,0.4)] transition-shadow"
          >
            Chat With Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/80 hover:text-[#D6FF21] text-2xl"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <nav className="flex flex-col gap-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${baseLink} ${isActive(link.href) ? activeLink : "text-white/80 hover:text-[#D6FF21] hover:bg-white/5"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#D6FF21] px-5 py-2 text-center font-semibold text-black hover:shadow-[0_4px_20px_rgba(214,255,33,0.4)]"
            >
              Chat With Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
