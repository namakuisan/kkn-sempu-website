import { createClient } from "contentful";

/**
 * Validasi environment variables wajib saat runtime.
 * Akan melempar error yang jelas jika ada variabel yang belum diisi.
 */
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[Contentful] Environment variable "${name}" tidak ditemukan. ` +
        `Pastikan sudah diisi di file .env.local Anda.`
    );
  }
  return value;
}

/**
 * Client utama Contentful untuk Content Delivery API (published content).
 * Digunakan di halaman-halaman production.
 */
export const contentfulClient = createClient({
  space: getEnvVar("CONTENTFUL_SPACE_ID"),
  accessToken: getEnvVar("CONTENTFUL_ACCESS_TOKEN"),
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

/**
 * Client Preview Contentful untuk Content Preview API (draft content).
 * Digunakan untuk mode preview / draft sebelum dipublikasikan.
 */
export const contentfulPreviewClient = createClient({
  space: getEnvVar("CONTENTFUL_SPACE_ID"),
  accessToken: getEnvVar("CONTENTFUL_PREVIEW_ACCESS_TOKEN"),
  host: "preview.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

/**
 * Helper untuk memilih client berdasarkan mode preview.
 * @param preview - Jika true, gunakan Preview Client (draft). Default false.
 */
export function getContentfulClient(preview = false) {
  return preview ? contentfulPreviewClient : contentfulClient;
}
