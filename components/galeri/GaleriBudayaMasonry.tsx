"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  aspectRatio: string;
  imageUrl: string;
}

export function GaleriBudayaMasonry() {
  const [activeCategory, setActiveCategory] = useState("SEMUA");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    "SEMUA",
    "TRADISI",
    "KEGIATAN",
    "KRIYA",
  ];

  // Menggunakan gambar Unsplash beresolusi tinggi sesuai instruksi
  const items: GalleryItem[] = [
    {
      id: "1",
      title: "TARI GAMBYONG",
      description: "Penampilan memukau pada puncak acara Merti Dusun Sempu.",
      category: "TRADISI",
      aspectRatio: "aspect-[3/4]",
      imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "KERAJINAN KAYU",
      description: "Proses detail pembuatan ukiran tradisional khas Sempu oleh pengrajin lokal.",
      category: "KRIYA",
      aspectRatio: "aspect-[4/3]",
      imageUrl: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "MERTI DUSUN",
      description: "Prosesi sakral arak-arakan gunungan hasil bumi mengelilingi desa.",
      category: "TRADISI",
      aspectRatio: "aspect-[3/5]",
      imageUrl: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "GOTONG ROYONG",
      description: "Kegiatan kerja bakti rutin warga untuk membersihkan saluran air dan fasilitas umum.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      imageUrl: "https://images.unsplash.com/photo-1593113565694-c689b9359e19?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "TENUN TRADISIONAL",
      description: "Pembuatan kain tenun dengan alat tradisional oleh ibu-ibu PKK Padukuhan Sempu.",
      category: "KRIYA",
      aspectRatio: "aspect-[3/4]",
      imageUrl: "https://images.unsplash.com/photo-1605814578148-9c165d75d278?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "POSYANDU LANSIA",
      description: "Pemeriksaan kesehatan gratis dan senam bersama lansia setiap bulan.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80&auto=format&fit=crop",
    },
    {
      id: "7",
      title: "GAMELAN JAWA",
      description: "Persiapan latihan rutin kesenian gamelan oleh para pemuda Sempu.",
      category: "TRADISI",
      aspectRatio: "aspect-[4/3]",
      imageUrl: "https://images.unsplash.com/photo-1518155317743-159d3e8e2c7c?w=800&q=80&auto=format&fit=crop",
    },
  ];

  const filteredItems =
    activeCategory === "SEMUA"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Mencegah scroll pada body saat modal terbuka
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedItem]);

  return (
    <>
      <section className="mb-16">
        {/* Header & Category Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase mb-2">
              Koleksi Visual
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Galeri Budaya
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[10px] sm:text-xs font-bold tracking-widest rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/20"
                    : "bg-white text-stone-500 border border-stone-200 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Container */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="break-inside-avoid border border-stone-100 rounded-3xl bg-white group cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative"
            >
              {/* Image with dynamic aspect ratio & zoom effect */}
              <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-stone-100`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Overlay gradient elegan saat hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Item Text Content */}
              <div className="p-6 relative bg-white group-hover:bg-emerald-50/50 transition-colors duration-500">
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 text-[9px] font-bold tracking-widest uppercase rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-stone-950/90 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-transparent flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 sm:-right-4 sm:-top-4 w-10 h-10 bg-white/10 hover:bg-amber-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 pointer-events-auto"
              aria-label="Tutup Galeri"
            >
              <X size={20} />
            </button>

            {/* Gambar Fullscreen */}
            <div className="relative w-full max-h-[70vh] flex justify-center pointer-events-auto">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Teks Deskripsi Bawah Gambar */}
            <div className="w-full max-w-2xl mt-6 text-center pointer-events-auto bg-stone-900/50 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 border border-amber-500/30">
                {selectedItem.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-stone-300 font-light leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
