import { getContentfulClient } from "@/lib/contentful";
import type { ArtikelEntry, ArtikelFields } from "@/lib/contentful.types";
import type { EntriesQueries } from "contentful";

// ---------------------------------------------------------------------------
// Artikel Data Fetching Utilities
// ---------------------------------------------------------------------------

/**
 * Mengambil semua artikel dari Contentful.
 * Diurutkan berdasarkan tanggal publikasi terbaru.
 *
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getAllArtikel(preview = false): Promise<ArtikelEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "artikel",
    order: ["-sys.createdAt"],
    limit: 100,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  return response.items as ArtikelEntry[];
}

/**
 * Mengambil artikel-artikel yang ditandai sebagai "sorotan" untuk ditampilkan
 * di halaman utama (Latest Highlights section).
 *
 * @param limit   - Jumlah artikel yang diambil (default: 3)
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getArtikelSorotan(
  limit = 3,
  preview = false
): Promise<ArtikelEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "artikel",
    "fields.sorotan": true,
    order: ["-sys.createdAt"],
    limit,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  return response.items as ArtikelEntry[];
}

/**
 * Mengambil satu artikel berdasarkan slug uniknya.
 * Mengembalikan null jika tidak ditemukan.
 *
 * @param slug    - Slug dari artikel (contoh: "renovasi-balai-budaya-selesai")
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getArtikelBySlug(
  slug: string,
  preview = false
): Promise<ArtikelEntry | null> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "artikel",
    "fields.slug": slug,
    limit: 1,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  if (response.items.length === 0) return null;
  return response.items[0] as ArtikelEntry;
}

/**
 * Mengambil daftar artikel berdasarkan kategori tertentu.
 *
 * @param kategori - Nama kategori (contoh: "pembangunan", "ekonomi", "layanan", "budaya")
 * @param preview  - Jika true, ambil draft konten via Preview API
 */
export async function getArtikelByKategori(
  kategori: string,
  preview = false
): Promise<ArtikelEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "artikel",
    "fields.kategori": kategori,
    order: ["-sys.createdAt"],
    limit: 50,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  return response.items as ArtikelEntry[];
}

/**
 * Mengambil artikel terbaru secara umum.
 * Cocok untuk sidebar "Berita Terbaru" atau widget ringkas.
 *
 * @param limit   - Jumlah artikel yang diambil (default: 5)
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getArtikelTerbaru(
  limit = 5,
  preview = false
): Promise<ArtikelEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "artikel",
    order: ["-sys.createdAt"],
    limit,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  return response.items as ArtikelEntry[];
}

/**
 * Mendapatkan daftar semua slug artikel yang sudah dipublikasikan.
 * Berguna untuk generateStaticParams() di dynamic routes Next.js App Router.
 */
export async function getAllArtikelSlugs(): Promise<string[]> {
  const client = getContentfulClient(false);

  const query = {
    content_type: "artikel",
    select: ["fields.slug"],
    limit: 1000,
  } as unknown as EntriesQueries<ArtikelFields, undefined>;

  const response = await client.getEntries<ArtikelFields>(query);
  return response.items.map((item) => {
    const fields = item.fields as { slug: string };
    return fields.slug;
  });
}
