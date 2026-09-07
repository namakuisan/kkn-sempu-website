import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllArtikel } from "@/lib/api/artikel";
import type { ArtikelEntry } from "@/lib/contentful.types";

// Unsplash fallback untuk artikel tanpa thumbnail dari CMS
const UNSPLASH_FALLBACKS = [
  "https://images.unsplash.com/photo-1432847712612-926caafaa802?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=75&auto=format&fit=crop",
];

function formatTanggal(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function ArtikelCard({ artikel, index }: { artikel: ArtikelEntry; index: number }) {
  const fields = artikel.fields;

  const thumbnail = fields.thumbnail as unknown as
    | { fields: { file: { url: string } } }
    | undefined;

  const imgUrl = thumbnail?.fields?.file?.url
    ? `https:${thumbnail.fields.file.url}`
    : UNSPLASH_FALLBACKS[index % UNSPLASH_FALLBACKS.length];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      <Link href={`/berita/${String(fields.slug)}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={imgUrl}
            alt={String(fields.judul)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
              {String(fields.kategori)}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <h3 className="font-serif text-stone-900 text-lg font-bold leading-snug mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
            {String(fields.judul)}
          </h3>
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-5 line-clamp-3 flex-1">
            {String(fields.ringkasan)}
          </p>

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
    </article>
  );
}

export default async function BeritaIndexPage() {
  let daftarBerita: ArtikelEntry[] = [];
  let fetchError = false;

  try {
    daftarBerita = await getAllArtikel();
  } catch (error) {
    console.error("[BeritaIndex] Gagal memuat artikel:", error);
    fetchError = true;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Page hero header */}
      <div className="w-full bg-gradient-to-b from-teal-950 to-teal-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase mb-3">
            Informasi Desa
          </p>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
            Kabar Padukuhan Sempu
          </h1>
          <p className="text-stone-300 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
            Dapatkan informasi terbaru seputar pembangunan, ekonomi, layanan administrasi, dan kegiatan budaya warga.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        {fetchError ? (
          <div className="py-20 text-center border border-dashed border-stone-300 rounded-2xl bg-stone-50">
            <p className="text-sm text-stone-500">
              Gagal memuat berita. Harap periksa koneksi atau konfigurasi CMS.
            </p>
          </div>
        ) : daftarBerita.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {daftarBerita.map((artikel, idx) => (
              <ArtikelCard key={artikel.sys.id} artikel={artikel} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-stone-300 rounded-2xl bg-stone-50">
            <div className="text-5xl mb-5">📰</div>
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-3">
              Belum Ada Berita
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
              Saat ini belum ada artikel yang dipublikasikan. Silakan cek kembali nanti.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
