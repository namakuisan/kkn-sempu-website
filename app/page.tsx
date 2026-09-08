import { HeroSection } from "@/components/home/HeroSection";
import { QuickLinks } from "@/components/home/QuickLinks";
import { LatestHighlights } from "@/components/home/LatestHighlights";

// Revalidasi ISR setiap 60 detik agar data Contentful terbaru ter-refresh otomatis
export const revalidate = 60;

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero: full-bleed, padded agar image bisa menyentuh tepi layar */}
      <div className="px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroSection />
      </div>

      {/* Content area: limited max-width */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Bento Quick Links */}
        <QuickLinks />

        {/* Sorotan Berita Terbaru */}
        <LatestHighlights />
      </main>
    </div>
  );
}
