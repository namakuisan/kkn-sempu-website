import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

import logoUii from "@/public/logo-uii.png";
import logoKkn from "@/public/logo-kkn.jpg";

export function Footer() {
  return (
    <footer className="w-full bg-teal-950 text-stone-300 pt-16 pb-8 mt-auto border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Kolom Kiri: Identitas Desa (col-span 5 on lg) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Portal Informasi<br />
              <span className="text-amber-400">Padukuhan Sempu</span>
            </h3>
            <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed mb-8 max-w-md">
              Portal Informasi Terpadu Padukuhan Sempu. Melestarikan warisan budaya, memberdayakan ekonomi lokal, dan menghubungkan warga dalam satu ekosistem digital desa.
            </p>
            
            <ul className="space-y-4 text-sm text-stone-300 font-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Padukuhan Sempu, Wedomartani,<br />
                  Ngemplak, Sleman, D.I. Yogyakarta 55584
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+62 812-3456-7890 (WA Admin Desa)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>pemdes.sempu@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Kolom Tengah: Akses Cepat (col-span 3 on lg) */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6 border-b border-teal-800 pb-3">
              Akses Cepat
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "/" },
                { label: "Profil Desa", href: "/profil" },
                { label: "Direktori UMKM", href: "/galeri" },
                { label: "Berita & Pengumuman", href: "/berita" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-stone-400 hover:text-amber-400 transition-colors text-sm font-light"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-amber-500 transition-all duration-300 mr-2" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Kanan: Atribusi KKN UII (col-span 4 on lg) */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6 border-b border-teal-800 pb-3">
              Dipersembahkan Oleh
            </h4>
            
            <div className="bg-teal-900/50 border border-teal-800/50 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-white mb-5 leading-relaxed">
                Mahasiswa KKN UII<br />
                <span className="text-amber-400">Angkatan 73 Unit 56 (2026)</span>
              </p>
              
              <div className="flex gap-4 items-center">
                {/* Logo UII */}
                <div className="w-16 h-16 bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
                  <Image
                    src={logoUii}
                    alt="Logo Universitas Islam Indonesia"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Logo KKN */}
                <div className="w-16 h-16 bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
                  <Image
                    src={logoKkn}
                    alt="Logo KKN UII 73 Unit 56"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-teal-800/60 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs text-stone-500 font-light text-center sm:text-left">
          <p>
            &copy; 2026 Padukuhan Sempu, Wedomartani. All rights reserved.
          </p>
          <p>
            Developed with <span className="text-red-500 animate-pulse inline-block">❤️</span> by <span className="font-semibold text-stone-400">KKN UII Unit 56</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
