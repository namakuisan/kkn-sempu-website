import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getArtikelBySlug, getAllArtikelSlugs, getArtikelTerbaru } from "@/lib/api/artikel";
import type { ArtikelEntry } from "@/lib/contentful.types";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

// Revalidasi ISR setiap 60 detik & izinkan artikel baru yang belum di-build diakses on-demand
export const revalidate = 60;
export const dynamicParams = true;

// ---------------------------------------------------------------------------
// generateStaticParams — SSG: pra-render semua halaman artikel saat build
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  try {
    const slugs = await getAllArtikelSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Jika Contentful belum dikonfigurasi, kembalikan array kosong
    return [];
  }
}

// ---------------------------------------------------------------------------
// generateMetadata — SEO meta tags dinamis per artikel
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const artikel = await getArtikelBySlug(slug);
    if (!artikel) return { title: "Artikel Tidak Ditemukan" };

    const fields = artikel.fields;
    const thumbnail = fields.thumbnail as unknown as
      | { fields: { file: { url: string } } }
      | undefined;

    return {
      title: `${String(fields.judul)} — Padukuhan Sempu`,
      description: String(fields.ringkasan),
      openGraph: {
        title: String(fields.judul),
        description: String(fields.ringkasan),
        images: thumbnail?.fields?.file?.url
          ? [`https:${thumbnail.fields.file.url}`]
          : [],
      },
    };
  } catch {
    return { title: "Berita — Padukuhan Sempu" };
  }
}

// ---------------------------------------------------------------------------
// Rich Text Renderer Options — kustomisasi typografi elegan
// ---------------------------------------------------------------------------
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="text-zinc-700 leading-8 text-base sm:text-[17px] mb-6 font-light">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
      <h1 className="text-3xl font-bold text-zinc-900 mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4 border-b border-zinc-200 pb-2">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-zinc-700 leading-7">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-zinc-700 leading-7">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
      <li className="text-base">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote className="border-l-4 border-zinc-900 pl-5 py-1 my-8 text-zinc-600 italic text-lg leading-relaxed bg-zinc-50">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="border-zinc-200 my-10" />
    ),
    [INLINES.HYPERLINK]: (node: unknown, children: ReactNode) => {
      const { data } = node as { data: { uri: string } };
      return (
        <a
          href={data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 underline underline-offset-2 decoration-zinc-400 hover:decoration-zinc-900 transition-all"
        >
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="font-semibold text-zinc-900">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: ReactNode) => (
      <em className="italic text-zinc-600">{text}</em>
    ),
    [MARKS.CODE]: (text: ReactNode) => (
      <code className="bg-zinc-100 border border-zinc-200 rounded px-1.5 py-0.5 text-sm font-mono text-zinc-800">
        {text}
      </code>
    ),
  },
};

// ---------------------------------------------------------------------------
// Helper: Format tanggal
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Sub-komponen: Kartu Artikel Terkait (sidebar)
// ---------------------------------------------------------------------------
function ArtikelTerkaitCard({ artikel }: { artikel: ArtikelEntry }) {
  const fields = artikel.fields;
  const thumbnail = fields.thumbnail as unknown as
    | { fields: { file: { url: string } } }
    | undefined;
  const imgUrl = thumbnail?.fields?.file?.url
    ? `https:${thumbnail.fields.file.url}`
    : null;

  return (
    <Link
      href={`/berita/${String(fields.slug)}`}
      className="flex gap-3 group py-3 border-b border-zinc-100 last:border-0"
    >
      {imgUrl ? (
        <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-zinc-100">
          <Image src={imgUrl} alt={String(fields.judul)} fill sizes="64px" className="object-cover" />
        </div>
      ) : (
        <ImagePlaceholder className="w-16 h-16 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">
          {String(fields.kategori)}
        </p>
        <p className="text-sm font-semibold text-zinc-800 leading-snug group-hover:text-zinc-600 transition-colors line-clamp-2">
          {String(fields.judul)}
        </p>
      </div>
    </Link>
  );
}

// Fallback image
const UNSPLASH_FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop";

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let artikel: ArtikelEntry | null = null;
  try {
    artikel = await getArtikelBySlug(slug);
  } catch {
    notFound();
  }

  if (!artikel) notFound();

  const fields = artikel.fields;

  const thumbnail = fields.thumbnail as unknown as
    | { fields: { file: { url: string }; title: string } }
    | undefined;
  const thumbnailUrl = thumbnail?.fields?.file?.url
    ? `https:${thumbnail.fields.file.url}`
    : UNSPLASH_FALLBACK;

  let artikelTerbaru: ArtikelEntry[] = [];
  try {
    const all = await getArtikelTerbaru(5);
    artikelTerbaru = all
      .filter((a) => a.sys.id !== artikel!.sys.id)
      .slice(0, 4);
  } catch {
    // ignore
  }

  const konten = fields.konten as unknown;
  const isRichText =
    konten !== null &&
    typeof konten === "object" &&
    "nodeType" in (konten as Record<string, unknown>);
  const kontenString = typeof konten === "string" ? konten : "";

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-20">
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-emerald-700 tracking-[0.15em] uppercase mb-10 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Berita
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
        <article>
          <header className="mb-10">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-700 bg-amber-100/50 border border-amber-200 px-3 py-1.5 rounded-full mb-5">
              {String(fields.kategori)}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[54px] font-bold text-stone-900 leading-[1.1] tracking-tight mb-6">
              {String(fields.judul)}
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-light border-l-4 border-amber-400 pl-6 mb-8">
              {String(fields.ringkasan)}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500 pb-6 border-b border-stone-200">
              <span className="inline-flex items-center gap-2 font-medium">
                <Calendar size={14} className="text-emerald-700" />
                {formatTanggal(String(fields.tanggalPublikasi))}
              </span>
              {fields.penulis && (
                <span className="inline-flex items-center gap-2 font-medium">
                  <User size={14} className="text-emerald-700" />
                  {String(fields.penulis)}
                </span>
              )}
            </div>
          </header>

          <figure className="mb-12">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-lg bg-stone-100">
              <Image
                src={thumbnailUrl}
                alt={thumbnail?.fields?.title ?? String(fields.judul)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="prose-content max-w-none prose prose-stone prose-lg prose-p:font-light prose-headings:font-serif">
            {isRichText ? (
              documentToReactComponents(
                konten as Document,
                richTextOptions as Parameters<typeof documentToReactComponents>[1]
              )
            ) : kontenString.length > 0 ? (
              kontenString.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="text-stone-700 leading-8 text-base sm:text-lg mb-6 font-light">
                  {para}
                </p>
              ))
            ) : (
              <div className="py-12 text-center border border-dashed border-stone-300 bg-stone-50 rounded-2xl">
                <p className="text-sm text-stone-400">Konten artikel belum tersedia.</p>
              </div>
            )}
          </div>
        </article>

        <aside className="lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h2 className="text-xs font-bold tracking-widest uppercase text-stone-900 mb-5 pb-3 border-b border-stone-200">
              Berita Terbaru
            </h2>
            {artikelTerbaru.length > 0 ? (
              <div className="flex flex-col gap-1">
                {artikelTerbaru.map((a) => (
                  <ArtikelTerkaitCard key={a.sys.id} artikel={a} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 py-4 text-center">Belum ada artikel lain.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
