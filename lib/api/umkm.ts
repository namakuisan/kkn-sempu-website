import { getContentfulClient } from "@/lib/contentful";
import type { UMKMEntry, UMKMFields } from "@/lib/contentful.types";
import type { EntriesQueries } from "contentful";

// ---------------------------------------------------------------------------
// UMKM Data Fetching Utilities
// ---------------------------------------------------------------------------

/**
 * Mengambil semua data UMKM dari Contentful.
 * Diurutkan berdasarkan nama secara ascending.
 *
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getAllUMKM(preview = false): Promise<UMKMEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "umkm",
    limit: 100,
  } as unknown as EntriesQueries<UMKMFields, undefined>;

  const response = await client.getEntries<UMKMFields>(query);
  return response.items as UMKMEntry[];
}

/**
 * Mengambil daftar produk UMKM yang ditandai sebagai "unggulan".
 * Cocok digunakan di homepage atau halaman Direktori UMKM bagian atas.
 *
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getUMKMUnggulan(preview = false): Promise<UMKMEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "umkm",
    "fields.unggulan": true,
    limit: 10,
  } as unknown as EntriesQueries<UMKMFields, undefined>;

  const response = await client.getEntries<UMKMFields>(query);
  return response.items as UMKMEntry[];
}

/**
 * Mengambil data satu produk UMKM berdasarkan slug uniknya.
 * Mengembalikan null jika tidak ditemukan.
 *
 * @param slug    - Slug dari produk UMKM (contoh: "kerajinan-bambu-sempurna")
 * @param preview - Jika true, ambil draft konten via Preview API
 */
export async function getUMKMBySlug(
  slug: string,
  preview = false
): Promise<UMKMEntry | null> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "umkm",
    "fields.slug": slug,
    limit: 1,
  } as unknown as EntriesQueries<UMKMFields, undefined>;

  const response = await client.getEntries<UMKMFields>(query);
  if (response.items.length === 0) return null;
  return response.items[0] as UMKMEntry;
}

/**
 * Mengambil daftar produk UMKM berdasarkan kategori tertentu.
 *
 * @param kategori - Nama kategori (contoh: "kerajinan", "kuliner", "fashion")
 * @param preview  - Jika true, ambil draft konten via Preview API
 */
export async function getUMKMByKategori(
  kategori: string,
  preview = false
): Promise<UMKMEntry[]> {
  const client = getContentfulClient(preview);

  const query = {
    content_type: "umkm",
    "fields.kategori": kategori,
    limit: 50,
  } as unknown as EntriesQueries<UMKMFields, undefined>;

  const response = await client.getEntries<UMKMFields>(query);
  return response.items as UMKMEntry[];
}

/**
 * Mendapatkan daftar semua slug UMKM yang sudah dipublikasikan.
 * Berguna untuk generateStaticParams() di dynamic routes Next.js App Router.
 */
export async function getAllUMKMSlugs(): Promise<string[]> {
  const client = getContentfulClient(false);

  const query = {
    content_type: "umkm",
    select: ["fields.slug"],
    limit: 1000,
  } as unknown as EntriesQueries<UMKMFields, undefined>;

  const response = await client.getEntries<UMKMFields>(query);
  return response.items.map((item) => {
    const fields = item.fields as { slug: string };
    return fields.slug;
  });
}
