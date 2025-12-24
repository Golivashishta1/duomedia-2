// src/app/fonts.ts
import { Poppins } from "next/font/google";

/** Poppins for both display and body text */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

/** For backward compatibility */
export const displayFont = poppins;
export const bodyFont = poppins;
