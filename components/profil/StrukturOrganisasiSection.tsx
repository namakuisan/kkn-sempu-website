import React from "react";
import Image from "next/image";

// Foto potret orang dari Unsplash — nuansa profesional/natural
const PORTRAIT_PHOTOS: Record<string, string> = {
  "Kepala Padukuhan": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "Ketua RW 01":     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "Ketua RW 02":     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "Ketua RT 01":     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "Ketua RT 02":     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  "Ketua RT 03":     "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
};

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&q=80&auto=format&fit=crop&crop=face";

const members = [
  { name: "Bapak Ibnu Arif Nugroho", title: "Kepala Padukuhan Sempu" },
  { name: "Bapak Suratmin", title: "Ketua RW 24" },
  { name: "Bapak Subarjo",    title: "Ketua RW 25" },
  { name: "Bapak Sunardi",    title: "Ketua RT 01" },
  { name: "Bapak Gunardi",      title: "Ketua RT 02" },
  { name: "Bapak Subardiyan",    title: "Ketua RT 03" },
  {name: "Bapak Sugiyanto",    title: "Ketua RT 04" },
  {name: "Bapak Untung",    title: "Ketua RT 05" },
  {name: "Bapak Djarwanto",    title: "Ketua RT 06" },
  {name: "Bapak Suleman",    title: "Ketua RT 07" },
];

export function StrukturOrganisasiSection() {
  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="mb-10 pb-5 border-b border-stone-200">
        <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">
          Perangkat Desa
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
          Struktur Organisasi
        </h2>
      </div>

      {/* Grid 4-kolom desktop, 2 mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {members.map((member, index) => {
          const photoUrl = PORTRAIT_PHOTOS[member.title] ?? FALLBACK_AVATAR;
          const isHead = index === 0;

          return (
            <div
              key={index}
              className={`group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isHead
                  ? "bg-gradient-to-b from-emerald-800 to-teal-900 border-emerald-700 text-white col-span-2 sm:col-span-1 lg:col-span-1"
                  : "bg-white border-stone-100 shadow-sm"
              }`}
            >
              {/* Foto lingkaran */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 ring-4 ${
                  isHead ? "ring-amber-400" : "ring-stone-100 group-hover:ring-emerald-200"
                } transition-all duration-300 shadow-md`}
              >
                <Image
                  src={photoUrl}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>

              {/* Nama */}
              <h3
                className={`font-serif text-base sm:text-lg font-bold mb-1 ${
                  isHead ? "text-white" : "text-stone-900"
                }`}
              >
                {member.name}
              </h3>

              {/* Jabatan */}
              <p
                className={`text-xs font-semibold tracking-wider uppercase ${
                  isHead ? "text-amber-300" : "text-emerald-700"
                }`}
              >
                {member.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
