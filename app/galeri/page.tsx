import { GaleriBudayaMasonry } from "@/components/galeri/GaleriBudayaMasonry";
import { DirektoriUMKM } from "@/components/galeri/DirektoriUMKM";

// Revalidasi ISR setiap 60 detik agar direktori UMKM dari Contentful ter-refresh otomatis
export const revalidate = 60;

export default function GaleriPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12 pb-20">
      {/* Page Hero Header */}
      <div className="mb-12 border-b border-stone-200 pb-8">
        <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-3">
          Potensi Lokal
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
          Galeri Budaya &amp; UMKM
        </h1>
        <p className="text-sm sm:text-base text-stone-500 font-light max-w-2xl leading-relaxed">
          Jelajahi kekayaan warisan budaya dan ragam produk unggulan karya warga Padukuhan Sempu.
        </p>
      </div>

      {/* Section 1: Galeri Budaya (Masonry Grid) */}
      <GaleriBudayaMasonry />

      {/* Section 2: Direktori UMKM (Standard 4-Column Grid) */}
      <DirektoriUMKM />
    </main>
  );
}
