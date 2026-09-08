import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

// Static import background hero untuk performa (LCP) dan placeholder="blur"
import heroBg from "@/public/IMG_7659-v2.jpg";

const VIDEO_THUMB =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80&auto=format&fit=crop";

export function HeroSection() {
  return (
    <>
      {/* ─── HERO BANNER ─── */}
      <section className="relative w-full overflow-hidden rounded-3xl h-[88vh] min-h-[540px] max-h-[820px] -mt-16 mb-20">
        {/* Background image */}
        <Image
          src={heroBg}
          alt="Pemandangan ladang pertanian Padukuhan Sempu"
          fill
          priority
          placeholder="blur"
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay: Gelap merata (black/40) ditambah gradient kuat di bagian bawah agar teks putih sangat kontras */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content: pushed to bottom-left */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-14 sm:pb-20 max-w-7xl mx-auto left-0 right-0">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Selamat Datang
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-5 drop-shadow">
            Padukuhan{" "}
            <span className="text-amber-300 italic">Sempu</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-stone-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-10 font-light">
            Menjaga warisan leluhur, membangun masa depan bersama. Portal
            resmi informasi, budaya, dan potensi ekonomi Padukuhan Sempu.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/profil"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-400/40 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
            >
              Profil Desa
            </Link>
            <Link
              href="/galeri"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
            >
              Potensi Lokal
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VIDEO FEATURE BANNER ─── */}
      <section className="mb-20">
        <div className="relative w-full overflow-hidden rounded-3xl aspect-[21/9] min-h-[220px] shadow-2xl shadow-stone-300/50 group cursor-pointer">
          {/* Thumbnail */}
          <Image
            src={VIDEO_THUMB}
            alt="Video profil Padukuhan Sempu"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-teal-950/40 group-hover:bg-teal-950/30 transition-colors duration-300" />

          {/* Play button — glassmorphism */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 pl-1">
              <Play size={28} className="text-white" fill="white" />
            </div>
            <p className="text-white/90 text-sm font-semibold tracking-wider uppercase bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              Video Profil Desa — 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
