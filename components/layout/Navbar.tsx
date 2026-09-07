"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil Desa", href: "/profil" },
  { name: "Produk Lokal", href: "/galeri" },
  { name: "Berita", href: "/berita" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif font-bold text-lg sm:text-xl tracking-tight text-emerald-900 hover:text-emerald-700 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center shadow-sm">
            <Leaf size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span>Padukuhan Sempu</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-0.5"
                    : "text-stone-600 hover:text-emerald-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="https://maps.app.goo.gl/W2SgveEf7RaCuPDU9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
          >
            Kunjungi Sempu
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-stone-600 hover:text-emerald-800 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-2.5 px-4 rounded-xl transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-emerald-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 px-4">
            <a
              href="https://maps.app.goo.gl/W2SgveEf7RaCuPDU9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full bg-emerald-800 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-emerald-700 transition-colors uppercase tracking-wide"
            >
              Kunjungi Sempu
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
