import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllUMKM, getAllUMKMSlugs } from "@/lib/api/umkm";
import type { UMKMEntry } from "@/lib/contentful.types";
import { ArrowRight } from "lucide-react";

// Unsplash fallback — nuansa produk artisan/lokal yang elegan
const UMKM_FALLBACKS = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=600&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603110986100-0b319b36e99f?w=600&q=75&auto=format&fit=crop",
];

// ─── Satu Kartu UMKM ───
function UMKMCard({ umkm, index }: { umkm: UMKMEntry; index: number }) {
  const fields = umkm.fields;

  const gambar = fields.gambar as unknown as
    | { fields: { file: { url: string } } }
    | undefined;

  const imgUrl = gambar?.fields?.file?.url
    ? `https:${gambar.fields.file.url}`
    : UMKM_FALLBACKS[index % UMKM_FALLBACKS.length];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Product image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={imgUrl}
          alt={String(fields.nama)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-emerald-800/90 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
            {String(fields.kategori)}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-stone-900 text-lg font-bold leading-snug mb-1 group-hover:text-emerald-800 transition-colors line-clamp-2">
          {String(fields.nama)}
        </h3>

        {fields.harga && (
          <p className="text-base font-bold text-amber-600 mb-3">
            {String(fields.harga)}
          </p>
        )}

        <p className="text-sm text-stone-500 font-light leading-relaxed mb-5 line-clamp-3 flex-1">
          {String(fields.deskripsi)}
        </p>

        <Link
          href={`/galeri/umkm/${String(fields.slug)}`}
          className="flex items-center justify-center gap-2 w-full border-2 border-emerald-700 text-emerald-800 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-emerald-800 hover:text-white transition-all duration-200 group-hover:gap-3"
        >
          Lihat Detail <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── Server Component Utama ───
export async function DirektoriUMKM() {
  let semuaUMKM: UMKMEntry[] = [];

  try {
    semuaUMKM = await getAllUMKM();
  } catch (error) {
    console.warn("[DirektoriUMKM] Gagal mengambil data Contentful:", error);
  }

  // Pre-generate slugs (unused here but keeps export for static generation)
  void getAllUMKMSlugs().catch(() => {});

  return (
    <section className="my-12">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">
            Potensi Ekonomi
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Direktori UMKM
          </h2>
        </div>
        <p className="text-sm text-stone-400 font-medium">
          {semuaUMKM.length > 0 ? `${semuaUMKM.length} produk ditemukan` : ""}
        </p>
      </div>

      {/* Grid */}
      {semuaUMKM.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {semuaUMKM.map((umkm, idx) => (
            <UMKMCard key={umkm.sys.id} umkm={umkm} index={idx} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-stone-300 rounded-2xl bg-stone-50">
          <div className="text-5xl mb-5">🪴</div>
          <h3 className="font-serif text-xl font-bold text-stone-700 mb-2">
            Direktori UMKM Kosong
          </h3>
          <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
            Data produk UMKM akan muncul setelah ditambahkan di Contentful CMS.
          </p>
        </div>
      )}
    </section>
  );
}
