import React from "react";

/**
 * Skeleton loading placeholder untuk kartu artikel.
 * Ditampilkan saat data Contentful sedang dimuat via Suspense.
 */
export function ArtikelCardSkeleton() {
  return (
    <div className="border border-zinc-200 bg-white flex flex-col animate-pulse">
      <div className="w-full aspect-[16/10] bg-zinc-200" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 w-20 bg-zinc-200 rounded mb-3" />
          <div className="h-5 w-full bg-zinc-200 rounded mb-2" />
          <div className="h-5 w-4/5 bg-zinc-200 rounded mb-4" />
          <div className="h-3 w-full bg-zinc-100 rounded mb-1" />
          <div className="h-3 w-3/4 bg-zinc-100 rounded" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-6">
          <div className="h-3 w-16 bg-zinc-200 rounded" />
          <div className="h-4 w-4 bg-zinc-200 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loading placeholder untuk kartu UMKM.
 */
export function UMKMCardSkeleton() {
  return (
    <div className="border border-zinc-200 bg-white flex flex-col p-4 sm:p-5 animate-pulse">
      <div className="w-full aspect-[4/3] bg-zinc-200 mb-4" />
      <div className="h-5 w-3/4 bg-zinc-200 rounded mb-2" />
      <div className="h-3 w-full bg-zinc-100 rounded mb-1" />
      <div className="h-3 w-5/6 bg-zinc-100 rounded mb-1" />
      <div className="h-3 w-2/3 bg-zinc-100 rounded mb-6" />
      <div className="h-9 w-full bg-zinc-200 rounded mt-auto" />
    </div>
  );
}
