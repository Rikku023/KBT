import React from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Users, GraduationCap, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const [, setLocation] = useLocation();

  const members = [
    { name: "Ericnaldy Kurniawan", initials: "EK" },
    { name: "Anak Agung Sagung R.P.L.", initials: "AA" },
    { name: "Regina Avril Putri P.", initials: "RA" },
    { name: "Keira Myeisharinna P.", initials: "KM" },
    { name: "Dini Kusuma", initials: "DK" },
  ];

  const handleContactClick = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setLocation("/contact");
    } else {
      setLocation("/login?redirectTo=/contact");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#06B6D4] transition-colors text-sm font-medium font-body cursor-pointer"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </button>
          </div>

          {/* About Section */}
          <div className="space-y-12">
            {/* Project Info Block */}
            <div className="bg-white border border-[#E2E8F0] p-8 lg:p-10 rounded-3xl shadow-xs space-y-6">
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-cyan-50 text-[#06B6D4] rounded-full text-xs font-bold tracking-wider uppercase font-body flex items-center gap-1.5">
                  <GraduationCap size={14} /> Tugas Besar Kuliah
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
                Tentang OptimaData
              </h1>
              <p className="text-[#64748B] font-body text-base leading-relaxed text-justify">
                OptimaData adalah platform inovasi digital yang dikembangkan sebagai tugas besar untuk memenuhi mata kuliah Kewirausahaan Berbasis Teknologi (KBT). Proyek ini dirancang sebagai solusi berbasis analitika data untuk membantu pelaku UMKM mengubah data mati menjadi strategi bisnis yang menghasilkan keuntungan, mengoptimalkan inventaris, dan mengurangi risiko dead stock.
              </p>
            </div>

            {/* Team Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-cyan-400">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] font-display">Kelompok Kelompok 6</h2>
                  <p className="text-xs text-[#64748B] font-body font-semibold">
                    Kewirausahaan Berbasis Teknologi (KBT)
                  </p>
                </div>
              </div>

              {/* Members Grid Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs flex items-center gap-4 hover:border-[#06B6D4] hover:shadow-md hover:shadow-[#06B6D4]/5 transition-all duration-300 group"
                  >
                    {/* Initials Badge Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center text-white font-bold text-base font-display shrink-0 shadow-sm group-hover:from-[#06B6D4] group-hover:to-[#0891B2] transition-all duration-300">
                      {member.initials}
                    </div>
                    {/* Member Details */}
                    <div>
                      <h4 className="font-bold text-[#0F172A] font-display group-hover:text-[#06B6D4] transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[#64748B] font-body mt-0.5">
                        Anggota Kelompok 6 • KBT
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Contact Us CTA Section */}
            <div className="bg-[#0F172A] rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden shadow-xl space-y-6">
              {/* Background ambient glow */}
              <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[90px] pointer-events-none" />

              <div className="z-10 relative space-y-4 max-w-xl mx-auto">
                <h3 className="text-2xl font-bold text-white font-display">
                  Tertarik Berkolaborasi dengan Kami?
                </h3>
                <p className="text-slate-400 font-body text-sm leading-relaxed">
                  Kami siap membantu dan mendiskusikan implementasi analitika data untuk optimasi supply chain UMKM Anda.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-[#06B6D4]/30 hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer font-body"
                  >
                    Contact Us <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
