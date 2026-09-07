import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Static import gambar lokal untuk performa LCP & placeholder="blur"
import bgBudaya from "@/public/bg-budaya.jpg";
import bgUmkm from "@/public/bg-umkm.jpg";
import bgBerita from "@/public/bg-kabar.jpg";

export function QuickLinks() {
  return (
    <section className="mb-20">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px flex-1 bg-stone-200" />
        <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">
          Eksplorasi Desa
        </p>
        <span className="h-px flex-1 bg-stone-200" />
      </div>

      {/* Bento Grid: asymmetric 3-col layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Budaya & Seni — tall card */}
        <Link
          href="/galeri"
          className="group relative overflow-hidden rounded-3xl sm:row-span-2 min-h-[280px] sm:min-h-[420px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
        >
          <Image
            src={bgBudaya}
            alt="Budaya & Seni Padukuhan Sempu"
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-2">
              Warisan Budaya
            </span>
            <h3 className="font-serif text-white text-xl sm:text-2xl font-bold leading-snug mb-2">
              Budaya &amp; Seni
            </h3>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              Jelajahi warisan budaya dan agenda kesenian lokal desa.
            </p>
            <div className="mt-4 flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
              Jelajahi <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* Card 2: Berita */}
        <Link
          href="/berita"
          className="group relative overflow-hidden rounded-3xl min-h-[200px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
        >
          <Image
            src={bgBerita}
            alt="Berita Padukuhan Sempu"
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1">
              Informasi Desa
            </span>
            <h3 className="font-serif text-white text-xl font-bold leading-snug mb-1">
              Kabar Terbaru
            </h3>
            <p className="text-stone-300 text-xs font-light">
              Berita dan pengumuman resmi desa.
            </p>
          </div>
        </Link>

        {/* Card 3: Etalase UMKM */}
        <Link
          href="/galeri"
          className="group relative overflow-hidden rounded-3xl min-h-[200px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
        >
          <Image
            src={bgUmkm}
            alt="Etalase UMKM Padukuhan Sempu"
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1">
              Ekonomi Lokal
            </span>
            <h3 className="font-serif text-white text-xl font-bold leading-snug mb-1">
              Etalase UMKM
            </h3>
            <p className="text-stone-300 text-xs font-light">
              Dukung produk karya warga Padukuhan Sempu.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
