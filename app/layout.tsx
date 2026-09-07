import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// --- Font Serif untuk Heading: berwibawa & bersejarah ---
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// --- Font Sans untuk body & UI: modern & mudah dibaca ---
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Padukuhan Sempu — Portal Informasi & Profil Desa",
  description:
    "Pusat informasi, administrasi, dan kebudayaan Padukuhan Sempu. Menghadirkan potensi lokal, berita desa, dan pelestarian warisan budaya Jawa.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-stone-800 font-sans relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
