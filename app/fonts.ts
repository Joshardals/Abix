// Fonts for the Site

// Get fonts from Google (Lora and Rubik)
import { Lora, Rubik } from "next/font/google";

// Set up Lora font with different weights and latin characters
export const lora = Lora({
  subsets: ["latin"], // Use latin characters
  weight: ["400", "500", "600", "700"], // Different font thicknesses
  display: "swap", // Swap font as soon as it's ready
  variable: "--font-lora", // Save it as a CSS variable for later
});

// Set up Rubik font with different weights and latin characters
export const rubik = Rubik({
  subsets: ["latin"], // Use latin characters
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Different font thicknesses
  display: "swap", // Swap font as soon as it's ready
  variable: "--font-rubik", // Save it as a CSS variable for later
});
