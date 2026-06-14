import React, { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RegisterInputSchema } from "@shared/auth";
import axios from "axios";
import { ArrowLeft, Loader2, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    // Validate inputs locally using shared Zod schema
    const parseResult = RegisterInputSchema.safeParse(formData);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      const formattedErrors: Record<string, string> = {};
      Object.keys(errors).forEach((key) => {
        const fieldError = errors[key];
        if (fieldError && fieldError[0]) {
          formattedErrors[key] = fieldError[0];
        }
      });
      setFieldErrors(formattedErrors);
      setLoading(false);
      toast.error("Validasi gagal. Silakan periksa kembali form Anda.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", formData);
      toast.success(response.data.message || "Registrasi berhasil! Silakan periksa email Anda.");
      // Redirect to login page after brief delay
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Registration failed:", error);
      const serverMessage = error.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      toast.error(serverMessage);
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Optima<span className="text-cyan-400">Data</span>
          </h1>
          <p className="text-sm text-slate-400">Daftarkan akun baru untuk mengoptimalkan inventory UMKM Anda</p>
        </div>

        <Card className="border-slate-800 bg-[#1E293B]/80 backdrop-blur-md text-slate-100 shadow-xl shadow-cyan-950/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Buat Akun Baru</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Isi data di bawah ini untuk melakukan pendaftaran
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Lengkap Anda"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-[#0F172A]/50 border-slate-800 focus:border-cyan-500 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    disabled={loading}
                    required
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Alamat Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-[#0F172A]/50 border-slate-800 focus:border-cyan-500 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    disabled={loading}
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-[#0F172A]/50 border-slate-800 focus:border-cyan-500 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    disabled={loading}
                    required
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.password}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-900/40 transition-colors flex items-center justify-center gap-2 py-5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftar Sekarang"
                )}
              </Button>

              <div className="text-sm text-center text-slate-400 mt-2">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="text-cyan-400 hover:underline hover:text-cyan-300 font-medium transition-colors">
                  Login di sini
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
