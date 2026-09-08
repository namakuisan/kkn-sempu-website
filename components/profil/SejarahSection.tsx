import React from "react";
import Image from "next/image";

// Foto sejarah / wayangan lokal dari folder public
const BANNER_URL = "/bg-sejarah.jpg";

export function SejarahSection() {
  return (
    <section className="mb-20 pt-8">
      {/* Section label */}
      <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-3">
        Sejarah Kami
      </p>

      {/* Judul */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight tracking-tight mb-8 max-w-3xl">
        Sejarah Padukuhan Sempu
      </h1>

      {/* Banner gambar lebar dengan bingkai rounded-3xl, shadow-xl, dan object-cover */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] overflow-hidden rounded-3xl shadow-xl border border-stone-100 mb-10 sm:mb-14">
        <Image
          src={BANNER_URL}
          alt="Wayangan Sejarah Padukuhan Sempu"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
      </div>

      {/* 2-column text layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="space-y-5 text-stone-600 text-base leading-8 font-light">
          <p>
            Padukuhan Sempu merupakan salah satu wilayah strategis yang menjadi bagian integral dari tata ruang Daerah Istimewa Yogyakarta. Secara administratif, padukuhan ini bernaung di bawah wilayah Kalurahan Wedomartani, Kapanewon Ngemplak, Kabupaten Sleman. Wilayah ini tidak sekadar menjadi tempat bermukim yang nyaman bagi warganya, tetapi juga menyimpan rekam jejak sejarah yang panjang mengenai dinamika perkembangan tata pemerintahan desa di Yogyakarta.
          </p>
          <p>
            Menilik jauh ke belakang, akar historis Padukuhan Sempu memiliki ikatan yang kuat dengan struktur pemerintahan masa lampau. Dahulu, sebelum terbentuknya sistem tata wilayah kalurahan seperti yang dikenal saat ini, Sempu merupakan bagian dari wilayah administrasi Kelurahan Pokoh. Pada masa tersebut, Kelurahan Pokoh adalah satu dari empat wilayah kelurahan lama yang berdiri sendiri di kawasan ini, berdampingan dengan Kelurahan Babadan, Gedongan, dan Krapyak.
          </p>
        </div>

        <div className="space-y-5 text-stone-600 text-base leading-8 font-light">
          <p>
            Titik balik sejarah tata wilayah ini terjadi bertepatan dengan momentum awal kemerdekaan Republik Indonesia. Tepatnya pada tahun 1946, menyusul diterbitkannya Maklumat Pemerintah Provinsi Yogyakarta, dilakukan reorganisasi tata pemerintahan desa secara menyeluruh. Empat kelurahan lama tersebut termasuk Kelurahan Pokoh yang menaungi wilayah Sempu, dilebur dan disatukan menjadi sebuah entitas kalurahan definitif yang sejak saat itu resmi dinamakan Kalurahan Wedomartani.
          </p>
          <p>
            Kini, Padukuhan Sempu terus bertransformasi menghadapi era modern
            sambil tetap mempertahankan nilai-nilai luhur warisan leluhur.
            Melalui portal digital ini, kami menghadirkan jembatan antara
            masa lampau yang kaya makna dan masa depan yang penuh harapan
            bagi generasi penerus Padukuhan Sempu.
          </p>
        </div>
      </div>
    </section>
  );
}
