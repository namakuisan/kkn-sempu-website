import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getArtikelSorotan } from "@/lib/api/artikel";
import type { ArtikelEntry } from "@/lib/contentful.types";

// Fallback Unsplash images jika thumbnail CMS kosong (nuansa elegan/abstrak)
const UNSPLASH_FALLBACKS = [
  "https://images.unsplash.com/photo-1432847712612-926caafaa802?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=75&auto=format&fit=crop",
];

function formatTanggal(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

// ─── Satu Kartu Artikel ───
function ArtikelCard({
  artikel,
  index,
}: {
  artikel: ArtikelEntry;
  index: number;
}) {
  const fields = artikel.fields;

  const thumbnail = fields.thumbnail as unknown as
    | { fields: { file: { url: string } } }
    | undefined;

  // Contentful image jika ada, fallback ke Unsplash
  const imgUrl = thumbnail?.fields?.file?.url
    ? `https:${thumbnail.fields.file.url}`
    : UNSPLASH_FALLBACKS[index % UNSPLASH_FALLBACKS.length];

  return (
    <Link
      href={`/berita/${String(fields.slug)}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={imgUrl}
          alt={String(fields.judul)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category badge over image */}
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
            {String(fields.kategori)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="font-serif text-stone-900 text-lg font-bold leading-snug mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
          {String(fields.judul)}
        </h3>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-5 line-clamp-3 flex-1">
          {String(fields.ringkasan)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <Calendar size={12} />
            {formatTanggal(String(fields.tanggalPublikasi))}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-2 transition-all">
            Baca <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Empty State ───
function EmptyState() {
  return (
    <div className="col-span-full py-16 text-center border border-dashed border-stone-300 rounded-2xl bg-stone-50">
      <div className="text-4xl mb-4">📰</div>
      <h3 className="font-serif text-lg font-bold text-stone-700 mb-2">
        Belum Ada Artikel
      </h3>
      <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
        Sorotan berita akan muncul di sini setelah dipublikasikan di Contentful CMS.
      </p>
    </div>
  );
}

// ─── Server Component Utama ───
export async function LatestHighlights() {
  let artikelSorotan: ArtikelEntry[] = [];

  try {
    artikelSorotan = await getArtikelSorotan(3);
  } catch (error) {
    console.warn("[LatestHighlights] Gagal mengambil data Contentful:", error);
  }

  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">
            Kabar Terkini
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Sorotan Terbaru
          </h2>
        </div>
        <Link
          href="/berita"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600 transition-colors whitespace-nowrap group"
        >
          Semua Berita <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artikelSorotan.length > 0 ? (
          artikelSorotan.map((artikel, idx) => (
            <ArtikelCard key={artikel.sys.id} artikel={artikel} index={idx} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
