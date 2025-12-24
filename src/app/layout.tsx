// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { poppins } from "./fonts";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

export const metadata: Metadata = {
  title: "Duo Media",
  description: "Influencer marketing that actually performs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="bg-[#0b0b0b] text-white antialiased">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
