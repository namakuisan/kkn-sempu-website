import { SejarahSection } from "@/components/profil/SejarahSection";
import { StrukturOrganisasiSection } from "@/components/profil/StrukturOrganisasiSection";

export default function ProfilPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-6">
      <SejarahSection />
      <StrukturOrganisasiSection />
    </main>
  );
}
