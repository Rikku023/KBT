import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Mail, Phone, MapPin, ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      const currentQuery = window.location.search;
      setLocation(`/login?redirectTo=${encodeURIComponent('/contact' + currentQuery)}`);
    } else {
      setTokenChecked(true);
    }
  }, [setLocation]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    need: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("selected");
    if (selected === "konsultasi") {
      setFormData((prev) => ({ ...prev, need: "Konsultasi Layanan Kustom UMKM" }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        needs: formData.need,
        message: formData.message,
      });

      toast.success(response.data.message || "Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", phone: "", need: "", message: "" });
    } catch (error: any) {
      console.error("Failed to send contact inquiry:", error);
      const errMessage = error.response?.data?.message || "Gagal mengirim pesan. Silakan coba beberapa saat lagi.";
      toast.error(errMessage);
    } finally {
      setLoading(false);
    }
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

      <main className="flex-grow py-16 flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
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

          {/* Redesigned Grid Layout matching template */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content (Info & Slogan - spans 5 columns) */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-display leading-tight">
                  Let’s Make It Happen
                </h1>
                <p className="text-[#64748B] font-body text-base leading-relaxed">
                  Diskusikan bagaimana kami dapat membantu UMKM Anda menghentikan kebocoran modal dan melejitkan profit lewat data.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-8">
                {/* Address Business */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0F172A] flex items-center justify-center text-cyan-400 shrink-0 shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A] font-display">Address Business</h4>
                    <p className="text-sm text-[#64748B] font-body leading-relaxed">
                      Departemen Statistika, Institut Teknologi Sepuluh Nopember (ITS), Kampus Sukolilo, Surabaya, Jawa Timur, Indonesia.
                    </p>
                  </div>
                </div>

                {/* Contact With Us */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0F172A] flex items-center justify-center text-cyan-400 shrink-0 shadow-md">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A] font-display">Contact With Us</h4>
                    <p className="text-sm text-[#64748B] font-body">
                      Call Us: <span className="font-semibold text-[#0F172A]">+62 812-3456-7890</span>
                    </p>
                    <p className="text-sm text-[#64748B] font-body">
                      Send mail: <a href="mailto:OptimaDataKBT@gmail.com" className="font-semibold text-[#06B6D4] hover:underline">OptimaDataKBT@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Response Time (Waktu Respon) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0F172A] flex items-center justify-center text-cyan-400 shrink-0 shadow-md">
                    <Clock size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#0F172A] font-display">Waktu Respon</h4>
                    <p className="text-sm text-[#64748B] font-body">
                      Senin - Jumat: <span className="font-semibold text-[#0F172A]">09.00 - 18.00 WIB</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links matching template */}
              <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#64748B] font-body">
                <a href="#facebook" className="hover:text-[#06B6D4] transition-colors">Facebook</a>
                <a href="#twitter" className="hover:text-[#06B6D4] transition-colors">Twitter / X</a>
                <a href="#instagram" className="hover:text-[#06B6D4] transition-colors">Instagrams</a>
                <a href="#skype" className="hover:text-[#06B6D4] transition-colors">Skype</a>
                <a href="#telegram" className="hover:text-[#06B6D4] transition-colors">Telegrams</a>
              </div>
            </div>

            {/* Right Content (Form - spans 7 columns) */}
            <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-8 lg:p-10 rounded-3xl shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="*Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 px-5 bg-slate-50 border border-slate-200/80 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl transition-all font-body border-none"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="*Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 px-5 bg-slate-50 border border-slate-200/80 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl transition-all font-body border-none"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number & Needs Dropdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="*Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 px-5 bg-slate-50 border border-slate-200/80 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl transition-all font-body border-none"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="relative">
                    <select
                      id="need"
                      name="need"
                      value={formData.need}
                      onChange={handleChange}
                      className="h-12 w-full px-5 bg-slate-50 border-none text-[#0F172A] focus:ring-1 focus:ring-[#06B6D4] rounded-xl transition-all font-body outline-none appearance-none cursor-pointer pr-10"
                      disabled={loading}
                      required
                    >
                      <option value="" disabled hidden>
                        *What are your needs?
                      </option>
                      <option value="Analisis & Identifikasi Produk Berpasangan">
                        Analisis & Identifikasi Produk Berpasangan
                      </option>
                      <option value="Rekomendasi Bundling Produk Profitable">
                        Rekomendasi Bundling Produk Profitable
                      </option>
                      <option value="Strategi Optimasi Inventaris (Dead Stock)">
                        Strategi Optimasi Inventaris (Dead Stock)
                      </option>
                      <option value="Konsultasi Layanan Kustom UMKM">
                        Konsultasi Layanan Kustom UMKM
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Write Message Textarea */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write Messeage...."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-5 bg-slate-50 border-none text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-2xl transition-all font-body outline-none resize-none"
                    disabled={loading}
                    required
                  />
                </div>

                {/* Row 4: Submit Button (Left-aligned or Right-aligned as requested, let's put it on the right bottom with amazing styles) */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="px-8 py-6 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#06B6D4]/20 active:translate-y-0.5 hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-[#06B6D4] flex items-center justify-center gap-2 cursor-pointer font-body text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Submit Require <span className="text-cyan-400">➤</span>
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
