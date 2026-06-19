import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Mail, Phone, MapPin, Send, ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLocation("/login?redirectTo=/contact");
    } else {
      setTokenChecked(true);
    }
  }, [setLocation]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Pesan Anda berhasil dikirim! Tim kami akan menghubungi Anda segera.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  // Prevent flashing content if not verified
  if (!tokenChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-[#64748B] font-medium font-body">Memuat halaman...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Title Section */}
          <div className="mb-12">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#06B6D4] transition-colors text-sm font-medium font-body mb-4 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </button>
            <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight font-display mb-3">
              Hubungi Tim Kami
            </h1>
            <p className="text-[#64748B] max-w-2xl font-body text-base">
              Kami di OptimaData siap membantu Anda menyempurnakan alur supply chain, analitik penjualan, dan optimasi inventory UMKM Anda.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Card (Left) */}
            <div className="bg-[#0F172A] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[450px]">
              {/* Background ambient glow */}
              <div className="absolute top-[-20%] right-[-20%] w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[-20%] left-[-20%] w-[250px] h-[250px] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none" />

              <div className="z-10 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display mb-2">Informasi Kontak</h3>
                  <p className="text-slate-400 text-sm font-body">
                    Pilih saluran komunikasi yang paling nyaman bagi Anda.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-body">Kirim Email</p>
                      <a href="mailto:support@optimadata.id" className="text-sm font-semibold hover:text-cyan-400 transition-colors font-body">
                        support@optimadata.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-body">Telepon / WhatsApp</p>
                      <a href="tel:+6281234567890" className="text-sm font-semibold hover:text-cyan-400 transition-colors font-body">
                        +62 812-3456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-body">Kantor Kami</p>
                      <p className="text-sm font-semibold font-body text-slate-200">
                        Gedung Technopreneur Lt. 3, Jl. Kebon Jeruk No. 23, Jakarta Barat, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="z-10 mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                <Clock className="text-cyan-400" size={20} />
                <div>
                  <p className="text-xs text-slate-400 font-body">Waktu Respon</p>
                  <p className="text-xs font-semibold text-slate-200 font-body">Senin - Jumat: 09.00 - 18.00 WIB</p>
                </div>
              </div>
            </div>

            {/* Form Card (Right, Spans 2) */}
            <div className="lg:col-span-2 bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm z-10">
              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-6">Kirimkan Pesan Anda</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#0F172A] font-body text-sm font-semibold">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-[#E2E8F0] focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] transition-all font-body"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0F172A] font-body text-sm font-semibold">
                      Email UMKM / Bisnis
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@umkm.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-[#E2E8F0] focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] transition-all font-body"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[#0F172A] font-body text-sm font-semibold">
                    Subjek Pertanyaan
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Contoh: Integrasi Sistem Kasir / Rekomendasi Restock"
                    value={formData.subject}
                    onChange={handleChange}
                    className="border-[#E2E8F0] focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] transition-all font-body"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#0F172A] font-body text-sm font-semibold">
                    Pesan Detail
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tuliskan tantangan inventory bisnis Anda atau pertanyaan yang ingin Anda ajukan kepada tim kami..."
                    value={formData.message}
                    onChange={handleChange}
                    className="border-[#E2E8F0] focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] transition-all font-body"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-8 py-5 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold shadow-md shadow-cyan-100 dark:shadow-none transition-colors flex items-center justify-center gap-2 cursor-pointer font-body"
                    disabled={loading}
                  >
                    {loading ? (
                      "Mengirim..."
                    ) : (
                      <>
                        <Send size={16} />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
