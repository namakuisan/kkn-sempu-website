"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  aspectRatio: string;
  images: string[];
}

export function GaleriBudayaMasonry() {
  const [activeCategory, setActiveCategory] = useState("SEMUA");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    "SEMUA",
    "TRADISI",
    "KEGIATAN",
    "KRIYA",
  ];

  // Data dummy dengan array path gambar lokal
  const items: GalleryItem[] = [
    {
      id: "1",
      title: "MAULID NABI",
      description: "Pengajian Sholawat Nabi Muhammad SAW dalam rangka peringatan Maulid Nabi.",
      category: "TRADISI",
      aspectRatio: "aspect-[3/4]",
      images: [
        "/maulid-1-v3.jpg",
        "/maulid-2-v2.jpg",
        "/maulid-3-v2.jpg",
        "/maulid-4-v2.jpg",
        "/maulid-5-v2.jpg",
        "/maulid-6-v2.jpg",
      ],
    },
    {
      id: "2",
      title: "KEGIATAN RAPAT",
      description: "Kegiatan rapat rutin oleh kelompok bapak-bapak untuk membahas isu-isu penting di dusun.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      images: [
        "/rapat-1-v2.jpg",
      ],
    },
    {
      id: "3",
      title: "MERTI DUSUN",
      description: "Kegiatan memperingati hari jadi dusun dan pertunjukan wayang yang kental budaya Jawa.",
      category: "TRADISI",
      aspectRatio: "aspect-[3/5]",
      images: [
        "/wayangan-sempu-1-v3.jpg",
        "/wayangan-sempu-2-v2.jpg",
        "/wayangan-sempu-3-v2.jpg",
        "/wayangan-gandok-1-v2.jpg",
        "/wayangan-gandok-2.jpeg",
      ],
    },
    {
      id: "4",
      title: "KERJA BAKTI WARGA",
      description: "Kegiatan kerja bakti warga untuk membersihkan fasilitas dusun dan persiapan acara.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      images: [
        "/kerja-bakti-1-v2.jpg",
        "/kerja-bakti-2-v2.jpg",
        "/kerja-bakti-3.jpg",
        "/kerja-bakti-4-v2.jpg",
        "/kerja-bakti-5-v2.jpg",
      ],
    },
    {
      id: "5",
      title: "POSYANDU",
      description: "Pemeriksaan rutin kesehatan gratis untuk balita dusun.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      images: [
        "/posyandu-1-v2.jpg",
        "/posyandu-2-v2.jpg",
        "/posyandu-3-v2.jpg",
      ],
    },
    {
      id: "6",
      title: "TPA RUTIN ANAK-ANAK",
      description: "Kegiatan pembelajaran keagamaan dan mengaji bersama di balai TPA dusun.",
      category: "KEGIATAN",
      aspectRatio: "aspect-[4/3]",
      images: [
        "/tpa-1-v2.jpg",
        "/tpa-2-v2.jpg",
        "/tpa-3-v2.jpg",
        "/tpa-4-v2.jpg",
      ],
    },
  ];

  const filteredItems =
    activeCategory === "SEMUA"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedItem || selectedItem.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  }, [selectedItem]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedItem || selectedItem.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  }, [selectedItem]);

  // Mencegah scroll pada body saat modal terbuka & navigasi keyboard
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedItem, handlePrev, handleNext]);

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
          {filteredItems.map((item) => {
            const coverImage = item.images[0] || "/blank-picture.jpg";
            const hasMultipleImages = item.images.length > 1;

            return (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="break-inside-avoid border border-stone-100 rounded-3xl bg-white group cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative"
              >
                {/* Image with dynamic aspect ratio & zoom effect */}
                <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-stone-100`}>
                  <Image
                    src={coverImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Lencana (Badge) Jumlah Foto di Pojok Kanan Atas */}
                  {hasMultipleImages && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1 border border-white/20">
                      <span>📸</span>
                      <span>{item.images.length} Foto</span>
                    </div>
                  )}

                  {/* Overlay gradient elegan saat hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Item Text Content */}
                <div className="p-6 relative bg-white group-hover:bg-emerald-50/50 transition-colors duration-300">
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
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal / Carousel Slider */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-stone-950/90 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Content Container */}
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 sm:-right-4 sm:-top-4 w-10 h-10 bg-white/10 hover:bg-amber-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 pointer-events-auto z-30"
              aria-label="Tutup Galeri"
            >
              <X size={20} />
            </button>

            {/* Slider / Image Container */}
            <div className="relative w-full max-h-[65vh] sm:max-h-[70vh] flex items-center justify-center pointer-events-auto">
              {/* Tombol Panah Prev */}
              {selectedItem.images.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 z-20 border border-white/20 shadow-lg hover:scale-105 active:scale-95"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Gambar Aktif */}
              <img
                key={currentImageIndex}
                src={selectedItem.images[currentImageIndex] || "/blank-picture.jpg"}
                alt={`${selectedItem.title} - foto ${currentImageIndex + 1}`}
                className="max-w-full max-h-[65vh] sm:max-h-[70vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300"
              />

              {/* Tombol Panah Next */}
              {selectedItem.images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 z-20 border border-white/20 shadow-lg hover:scale-105 active:scale-95"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Indikator Titik (Dots) & Nomor Foto */}
            {selectedItem.images.length > 1 && (
              <div className="flex flex-col items-center gap-2 mt-4 pointer-events-auto z-20">
                <div className="flex items-center gap-2">
                  {selectedItem.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      aria-label={`Lihat foto ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        currentImageIndex === idx
                          ? "w-7 h-2.5 bg-amber-400"
                          : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-stone-300 font-medium bg-black/40 px-3 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  {currentImageIndex + 1} dari {selectedItem.images.length} foto
                </span>
              </div>
            )}

            {/* Teks Deskripsi Bawah Gambar */}
            <div className="w-full max-w-2xl mt-4 sm:mt-6 text-center pointer-events-auto bg-stone-900/60 p-5 sm:p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 border border-amber-500/30">
                {selectedItem.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
