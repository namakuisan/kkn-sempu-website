import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getUMKMBySlug, getAllUMKMSlugs } from "@/lib/api/umkm";
import { ArrowLeft, MapPin, Store, Tag, Phone } from "lucide-react";

// Revalidasi ISR setiap 60 detik & izinkan produk UMKM baru yang belum di-build diakses on-demand
export const revalidate = 60;
export const dynamicParams = true;

// ---------------------------------------------------------------------------
// generateStaticParams — SSG: pra-render semua halaman detail UMKM saat build
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  try {
    const slugs = await getAllUMKMSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// generateMetadata — SEO meta tags dinamis per UMKM
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const umkm = await getUMKMBySlug(slug);
    if (!umkm) return { title: "UMKM Tidak Ditemukan" };

    const fields = umkm.fields;
    const gambar = fields.gambar as unknown as
      | { fields: { file: { url: string } } }
      | undefined;

    return {
      title: `${String(fields.nama)} — Direktori UMKM Sempu`,
      description: String(fields.deskripsi),
      openGraph: {
        title: String(fields.nama),
        description: String(fields.deskripsi),
        images: gambar?.fields?.file?.url
          ? [`https:${gambar.fields.file.url}`]
          : [],
      },
    };
  } catch {
    return { title: "Detail UMKM — Padukuhan Sempu" };
  }
}

// ---------------------------------------------------------------------------
// Page Component Utama
// ---------------------------------------------------------------------------
// Fallback Unsplash UMKM (sama dengan di direktori)
const UMKM_FALLBACK = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75&auto=format&fit=crop";

export default async function UMKMDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let umkm = null;
  try {
    umkm = await getUMKMBySlug(slug);
  } catch {
    notFound();
  }

  if (!umkm) notFound();

  const fields = umkm.fields;

  const gambar = fields.gambar as unknown as
    | { fields: { file: { url: string }; title: string } }
    | undefined;
  const gambarUrl = gambar?.fields?.file?.url
    ? `https:${gambar.fields.file.url}`
    : UMKM_FALLBACK;

  let waLink = "#";
  if (fields.kontak) {
    const rawNumber = String(fields.kontak).replace(/\D/g, "");
    let cleanNumber = rawNumber;
    if (rawNumber.startsWith("0")) {
      cleanNumber = "62" + rawNumber.substring(1);
    }
    const textUrl = encodeURIComponent(`Halo, saya tertarik dengan produk ${String(fields.nama)} yang ada di website Padukuhan Sempu.`);
    waLink = `https://wa.me/${cleanNumber}?text=${textUrl}`;
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-20">
      <Link
        href="/galeri"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-emerald-700 tracking-[0.15em] uppercase mb-10 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Direktori UMKM
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* KIRI: Gambar (5 kolom) */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="relative w-full aspect-square overflow-hidden rounded-3xl border border-stone-200 shadow-xl bg-white">
            <Image
              src={gambarUrl}
              alt={gambar?.fields?.title ?? String(fields.nama)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* KANAN: Detail (7 kolom) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/50 text-amber-700 text-[10px] font-bold tracking-widest uppercase mb-4 rounded-full border border-amber-200">
              <Tag size={13} />
              {String(fields.kategori)}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
              {String(fields.nama)}
            </h1>
            {fields.harga && (
              <p className="text-2xl font-bold text-emerald-700 mb-6 bg-emerald-50 w-fit px-4 py-2 rounded-xl border border-emerald-100">
                {String(fields.harga)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
            {fields.pemilik && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                  <Store size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Pemilik Usaha</p>
                  <p className="text-sm font-semibold text-stone-900">{String(fields.pemilik)}</p>
                </div>
              </div>
            )}
            {fields.alamat && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Lokasi</p>
                  <p className="text-sm font-medium text-stone-700 leading-relaxed">{String(fields.alamat)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Tentang Produk
            </h2>
            <div className="prose prose-stone prose-sm sm:prose-base font-light text-stone-600">
              {String(fields.deskripsi).split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            {fields.kontak ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebd57] text-white text-sm sm:text-base font-bold py-4 px-6 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 uppercase tracking-wide"
              >
                <Phone size={20} />
                Pesan via WhatsApp
              </a>
            ) : (
              <div className="text-center py-4 px-6 bg-stone-100 rounded-2xl text-sm font-medium text-stone-500">
                Kontak penjual belum tersedia.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
