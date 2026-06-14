import React, { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Mail, ArrowRight, ArrowLeft } from "lucide-react";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");
    
    if (statusParam === "success") {
      setStatus("success");
    } else if (statusParam === "error") {
      setStatus("error");
    } else {
      setStatus("info");
    }
  }, []);

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
        </div>

        <Card className="border-slate-800 bg-[#1E293B]/80 backdrop-blur-md text-slate-100 shadow-xl shadow-cyan-950/20 text-center">
          <CardHeader className="flex flex-col items-center justify-center pt-8">
            {status === "success" && (
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
            )}
            {status === "error" && (
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <AlertTriangle size={36} />
              </div>
            )}
            {status === "info" && (
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                <Mail size={36} />
              </div>
            )}

            <CardTitle className="text-2xl font-bold text-white">
              {status === "success" && "Email Terverifikasi!"}
              {status === "error" && "Verifikasi Gagal"}
              {status === "info" && "Periksa Email Anda"}
            </CardTitle>
            
            <CardDescription className="text-slate-400">
              {status === "success" && "Akun OptimaData Anda telah aktif dan siap digunakan."}
              {status === "error" && "Tautan verifikasi tidak valid atau telah kedaluwarsa."}
              {status === "info" && "Kami telah mengirimkan tautan verifikasi ke email yang terdaftar."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-6">
            {status === "success" && (
              <p className="text-slate-300 text-sm">
                Terima kasih telah memverifikasi email Anda. Anda sekarang dapat masuk dan mengakses dashboard penuh untuk optimasi data UMKM Anda.
              </p>
            )}
            {status === "error" && (
              <p className="text-slate-300 text-sm">
                Silakan lakukan registrasi ulang atau hubungi layanan bantuan jika Anda merasa ini adalah sebuah kesalahan.
              </p>
            )}
            {status === "info" && (
              <div className="space-y-4">
                <p className="text-slate-300 text-sm">
                  Silakan klik tautan di email untuk mengaktifkan akun Anda. Periksa juga folder <strong>Spam</strong> jika Anda tidak menemukannya di kotak masuk.
                </p>
                <div className="p-3 bg-[#0F172A]/50 rounded-lg text-xs text-slate-400 border border-slate-800 text-left">
                  <span className="font-semibold text-cyan-400 block mb-1">Catatan Developer (Mailtrap / Mock):</span>
                  Jika Anda menggunakan mode default/mock, tautan verifikasi juga dicetak langsung pada log/terminal server Node.js.
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-8 border-slate-800">
            {status === "success" ? (
              <Button
                onClick={() => setLocation("/login")}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center justify-center gap-2 py-5"
              >
                Masuk ke Akun
                <ArrowRight size={16} />
              </Button>
            ) : status === "error" ? (
              <Button
                onClick={() => setLocation("/register")}
                variant="outline"
                className="w-full border-slate-800 hover:bg-slate-800 hover:text-white"
              >
                Daftar Kembali
              </Button>
            ) : (
              <Button
                onClick={() => setLocation("/login")}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center justify-center gap-2 py-5"
              >
                Halaman Login
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
