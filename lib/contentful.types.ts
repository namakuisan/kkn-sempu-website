import type { Asset, Entry, EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

/**
 * Shape of fields for a UMKM entry in Contentful.
 * Sesuaikan nama field dengan Content Model yang Anda buat di Contentful dashboard.
 */
export interface UMKMFields extends EntrySkeletonType {
  contentTypeId: "umkm";
  fields: {
    nama: string;              // Nama produk / usaha UMKM
    slug: string;              // URL-friendly identifier
    deskripsi: string;         // Deskripsi singkat produk
    kategori: string;          // Kategori: kerajinan, kuliner, fashion, dll.
    harga?: string;            // Harga (opsional, contoh: "Rp 50.000")
    gambar?: Asset;            // Foto produk utama
    pemilik?: string;          // Nama pemilik usaha
    kontak?: string;           // Nomor telepon / WhatsApp
    alamat?: string;           // Alamat usaha
    unggulan?: boolean;        // Tandai sebagai produk unggulan
  };
}

/**
 * Shape of fields for an Artikel entry in Contentful.
 * Sesuaikan nama field dengan Content Model yang Anda buat di Contentful dashboard.
 */
export interface ArtikelFields extends EntrySkeletonType {
  contentTypeId: "artikel";
  fields: {
    judul: string;             // Judul artikel
    slug: string;              // URL-friendly identifier
    ringkasan: string;         // Ringkasan / excerpt singkat
    konten: Document | string;  // Konten utama artikel (Rich Text dari Contentful)
    kategori: string;          // Kategori: pembangunan, ekonomi, layanan, budaya
    thumbnail?: Asset;         // Gambar cover artikel
    penulis?: string;          // Nama penulis
    tanggalPublikasi: string;  // ISO date string (contoh: "2024-10-12")
    sorotan?: boolean;         // Tampilkan sebagai sorotan terbaru di homepage
  };
}

// ---------------------------------------------------------------------------
// Utility Types (exported for use in components)
// ---------------------------------------------------------------------------

export type UMKMEntry = Entry<UMKMFields>;
export type ArtikelEntry = Entry<ArtikelFields>;
