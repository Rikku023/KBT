import { ArrowRight, TrendingUp } from 'lucide-react';

/**
 * Hero Section Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - Asymmetric layout (text left 60%, visual right 40%)
 * - Navy blue text with teal accent CTA
 * - Animated data visualization element
 */
export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center bg-white pt-20 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#F1F5F9] text-[#06B6D4] rounded-full text-sm font-semibold">
                ✨ Solusi Data untuk UMKM
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight font-display">
              Ubah Data Mati Menjadi Strategi <span className="text-[#06B6D4]">Cuan</span>
            </h1>

            <p className="text-xl text-[#64748B] leading-relaxed max-w-xl font-body">
              Tingkatkan penjualan hingga 40%, kurangi dead stock 30%, dan optimalkan inventory dengan analytics yang mudah dipahami. Dirancang khusus untuk UMKM yang ingin berkembang.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary flex items-center justify-center gap-2 group">
                Coba Audit Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                Lihat Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-[#E2E8F0]">
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-display">500+</p>
                <p className="text-sm text-[#64748B]">UMKM Dipercaya</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-display">98%</p>
                <p className="text-sm text-[#64748B]">Tingkat Kepuasan</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-display">24/7</p>
                <p className="text-sm text-[#64748B]">Support Siap Membantu</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-[#0F172A]/5 rounded-3xl blur-3xl animate-pulse"></div>

            {/* Dashboard Mockup */}
            <div className="relative z-10 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E8F0]">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 text-white">
                  <h3 className="font-bold text-lg font-display">Dashboard Analytics</h3>
                  <p className="text-sm text-[#06B6D4] mt-1">Real-time insights</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-xs text-[#64748B] mb-2">Revenue</p>
                      <p className="text-2xl font-bold text-[#0F172A] font-display">+32%</p>
                      <div className="flex items-center gap-1 mt-2 text-[#06B6D4]">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">vs bulan lalu</span>
                      </div>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-xs text-[#64748B] mb-2">Dead Stock</p>
                      <p className="text-2xl font-bold text-[#0F172A] font-display">-30%</p>
                      <div className="flex items-center gap-1 mt-2 text-[#06B6D4]">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Teroptimasi</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-[#F1F5F9] rounded-lg h-32 flex items-end justify-around px-4 py-4">
                    {[40, 65, 45, 75, 55, 80, 60].map((height, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-[#06B6D4] to-[#0891B2] rounded-full transition-all duration-500 hover:from-[#0F172A] hover:to-[#06B6D4]"
                        style={{
                          height: `${height}%`,
                          animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
