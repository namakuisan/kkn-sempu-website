import React from "react";
import Image from "next/image";

interface PerangkatDesa {
  name: string;
  title: string;
  image: string;
}

const members: PerangkatDesa[] = [
  { name: "Bapak Ibnu Arif Nugroho", title: "Kepala Padukuhan Sempu", image: "/blank-profile.png" },
  { name: "Bapak Suratmin", title: "Ketua RW 24", image: "/blank-profile.png" },
  { name: "Bapak Subarjo", title: "Ketua RW 25", image: "/blank-profile.png" },
  { name: "Bapak Sunardi", title: "Ketua RT 01", image: "/blank-profile.png" },
  { name: "Bapak Gunardi", title: "Ketua RT 02", image: "/blank-profile.png" },
  { name: "Bapak Subardiyan", title: "Ketua RT 03", image: "/blank-profile.png" },
  { name: "Bapak Sugiyanto", title: "Ketua RT 04", image: "/blank-profile.png" },
  { name: "Bapak Untung", title: "Ketua RT 05", image: "/blank-profile.png" },
  { name: "Bapak Djarwanto", title: "Ketua RT 06", image: "/blank-profile.png" },
  { name: "Bapak Suleman", title: "Ketua RT 07", image: "/blank-profile.png" },
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
                } transition-all duration-300 shadow-md bg-stone-100`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover"
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
