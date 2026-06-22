import { useState } from 'react';
import { TrendingUp, Download } from 'lucide-react';

/**
 * Interactive Dashboard Showcase Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - Simulasi data retail dengan before/after comparison
 * - Interactive tabs untuk berbagai metrik
 * - Animated chart transitions
 * - Case study dengan dataset sintetis
 */
export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [isAnimating, setIsAnimating] = useState(false);



  // Metrik case study
  const caseStudyMetrics = [
    { label: 'Peningkatan Revenue', before: '55K/bulan', after: '76K/bulan', improvement: '+38%', color: 'text-green-600' },
    { label: 'Pengurangan Dead Stock', before: '35K/bulan', after: '12K/bulan', improvement: '-66%', color: 'text-green-600' },
    { label: 'Akurasi Forecast', before: '72%', after: '92%', improvement: '+20%', color: 'text-green-600' },
    { label: 'ROI dalam 3 Bulan', before: 'N/A', after: '280%', improvement: 'Terbukti', color: 'text-green-600' },
  ];

  const handleTabChange = (tab: string) => {
    setIsAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section id="case-study" className="py-20 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">
            Lihat Transformasi Data dalam Aksi
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Studi kasus nyata dari salah satu klien kami. Dataset sintetis berdasarkan pola retail UMKM.
          </p>
        </div>

        {/* Main Dashboard Container */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl overflow-hidden shadow-2xl mb-12">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#06B6D4] p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-display">Dashboard Analytics</h3>
                <p className="text-[#06B6D4] mt-1">Simulasi Data Retail UMKM - 6 Bulan Pertama</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 px-8 pt-6">
            {[
              { id: 'revenue', label: 'Revenue Trend' },
              { id: 'deadstock', label: 'Dead Stock Reduction' },
              { id: 'forecast', label: 'Forecast Accuracy' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-[#06B6D4] border-b-2 border-[#06B6D4]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Legend and Charts Container */}
          <div className="p-8">
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
              {activeTab === 'revenue' && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-white/70">Sebelum (Tren Revenue Rendah)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <span className="text-white/70">Sesudah (Tren Revenue Naik)</span>
                  </div>
                </>
              )}
              {activeTab === 'deadstock' && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-white/70">Sebelum (Dead Stock Tinggi & Stabil)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <span className="text-white/70">Sesudah (Penurunan Dead Stock 66%)</span>
                  </div>
                </>
              )}
              {activeTab === 'forecast' && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-0.5 border-t-2 border-dashed border-[#94A3B8]" />
                    <span className="text-white/70">Permintaan Asli</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-white/70">Prediksi Sebelum (Fluktuasi Liar)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <span className="text-white/70">Prediksi Sesudah (Akurasi Presisi)</span>
                  </div>
                </>
              )}
            </div>

            {/* Before & After Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Before */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                <p className="text-white/70 text-sm font-semibold mb-4">SEBELUM OptimaData</p>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-[340px] flex flex-col justify-between relative overflow-hidden">
                  {/* Chart Visual */}
                  <div className="relative w-full h-[240px]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5 py-4">
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                    </div>

                    {activeTab === 'revenue' && (
                      <div className="w-full h-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="redAreaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path 
                            d="M 40 140 L 124 125 L 208 133 L 292 105 L 376 118 L 460 92 L 460 190 L 40 190 Z" 
                            fill="url(#redAreaGrad)"
                          />
                          <path 
                            d="M 40 140 L 124 125 L 208 133 L 292 105 L 376 118 L 460 92" 
                            fill="none" 
                            stroke="#EF4444" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          {[
                            { cx: 40, cy: 140 },
                            { cx: 124, cy: 125 },
                            { cx: 208, cy: 133 },
                            { cx: 292, cy: 105 },
                            { cx: 376, cy: 118 },
                            { cx: 460, cy: 92 }
                          ].map((pt, idx) => (
                            <circle key={idx} cx={pt.cx} cy={pt.cy} r="4.5" fill="#EF4444" className="shadow-lg" />
                          ))}
                        </svg>
                      </div>
                    )}

                    {activeTab === 'deadstock' && (
                      <div className="w-full h-full flex items-end justify-between px-6 pt-4 pb-2">
                        {[
                          { val: '35K', height: '85%' },
                          { val: '36K', height: '88%' },
                          { val: '35K', height: '85%' },
                          { val: '37K', height: '90%' },
                          { val: '36K', height: '88%' },
                          { val: '35K', height: '85%' },
                        ].map((bar, idx) => (
                          <div key={idx} className="flex flex-col items-center w-8 z-10 group relative">
                            <span className="absolute -top-6 text-[10px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
                              {bar.val}
                            </span>
                            <div 
                              className="w-full bg-[#EF4444] rounded-t shadow-[0_0_10px_rgba(239,68,68,0.25)] transition-all duration-500 ease-out" 
                              style={{ height: bar.height }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'forecast' && (
                      <div className="w-full h-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                          {/* Permintaan Asli (Gray dashed line) */}
                          <path 
                            d="M 40 130 L 124 125 L 208 133 L 292 105 L 376 118 L 460 92" 
                            fill="none" 
                            stroke="#94A3B8" 
                            strokeWidth="2" 
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                          />
                          {/* Prediksi Sebelum (Red wild fluctuating line) */}
                          <path 
                            d="M 40 180 L 124 40 L 208 170 L 292 20 L 376 175 L 460 50" 
                            fill="none" 
                            stroke="#EF4444" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* X-Axis labels */}
                  <div className="flex justify-between px-10 text-white/40 text-xs font-semibold mt-2 border-t border-white/5 pt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                <p className="text-white/70 text-sm font-semibold mb-4">SESUDAH OptimaData</p>
                <div className="bg-white/5 rounded-xl p-6 border border-[#06B6D4]/50 h-[340px] flex flex-col justify-between relative overflow-hidden">
                  {/* Chart Visual */}
                  <div className="relative w-full h-[240px]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5 py-4">
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                      <div className="border-b border-white w-full"></div>
                    </div>

                    {activeTab === 'revenue' && (
                      <div className="w-full h-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="tealAreaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path 
                            d="M 40 115 L 124 88 L 208 95 L 292 65 L 376 78 L 460 45 Z" 
                            fill="url(#tealAreaGrad)"
                          />
                          <path 
                            d="M 40 115 L 124 88 L 208 95 L 292 65 L 376 78 L 460 45" 
                            fill="none" 
                            stroke="#06B6D4" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          {[
                            { cx: 40, cy: 115 },
                            { cx: 124, cy: 88 },
                            { cx: 208, cy: 95 },
                            { cx: 292, cy: 65 },
                            { cx: 376, cy: 78 },
                            { cx: 460, cy: 45 }
                          ].map((pt, idx) => (
                            <circle key={idx} cx={pt.cx} cy={pt.cy} r="4.5" fill="#06B6D4" className="shadow-lg" />
                          ))}
                        </svg>
                      </div>
                    )}

                    {activeTab === 'deadstock' && (
                      <div className="w-full h-full flex items-end justify-between px-6 pt-4 pb-2">
                        {[
                          { val: '35K', height: '85%' },
                          { val: '28K', height: '68%' },
                          { val: '22K', height: '53%' },
                          { val: '16K', height: '38%' },
                          { val: '14K', height: '33%' },
                          { val: '12K', height: '28%' },
                        ].map((bar, idx) => (
                          <div key={idx} className="flex flex-col items-center w-8 z-10 group relative">
                            <span className="absolute -top-6 text-[10px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
                              {bar.val}
                            </span>
                            <div 
                              className="w-full bg-[#06B6D4] rounded-t shadow-[0_0_10px_rgba(6,182,212,0.25)] transition-all duration-500 ease-out" 
                              style={{ height: bar.height }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'forecast' && (
                      <div className="w-full h-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                          {/* Permintaan Asli (Gray dashed line) */}
                          <path 
                            d="M 40 130 L 124 125 L 208 133 L 292 105 L 376 118 L 460 92" 
                            fill="none" 
                            stroke="#94A3B8" 
                            strokeWidth="2" 
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                          />
                          {/* Prediksi Sesudah (Teal precise line) */}
                          <path 
                            d="M 40 132 L 124 127 L 208 131 L 292 107 L 376 116 L 460 93" 
                            fill="none" 
                            stroke="#06B6D4" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* X-Axis labels */}
                  <div className="flex justify-between px-10 text-white/40 text-xs font-semibold mt-2 border-t border-white/5 pt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Insight */}
            <div className="bg-gradient-to-r from-[#06B6D4]/20 to-transparent rounded-xl p-6 border border-[#06B6D4]/30">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-2">Insight Utama</p>
                  <p className="text-white/80 text-sm transition-all duration-300">
                    {activeTab === 'revenue' && "Dengan menggunakan OptimaData, klien kami berhasil meningkatkan revenue rata-rata 38% dalam 6 bulan, sambil mengurangi dead stock sebesar 66% dan meningkatkan akurasi forecast dari 72% menjadi 92%."}
                    {activeTab === 'deadstock' && "Tanpa analitika, kapital UMKM terkunci dalam bentuk barang mati di gudang (Holding Cost) hingga belasan juta rupiah. Algoritma pemetaan kami memotong rantai macet tersebut dan sukses memangkas volume dead stock sebesar 66% hanya dalam waktu 6 bulan."}
                    {activeTab === 'forecast' && "Tebakan inventaris yang meleset memicu risiko kehabisan stok atau penumpukan ekstrem. OptimaData mendongkrak akurasi peramalan dari 72% menjadi 92%, memastikan pemilik bisnis selalu menyediakan barang dalam jumlah yang tepat."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {caseStudyMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#F1F5F9] to-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#06B6D4] transition-all duration-300"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <p className="text-[#64748B] text-sm font-semibold mb-4">{metric.label}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Sebelum:</span>
                  <span className="text-sm font-bold text-[#0F172A]">{metric.before}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Sesudah:</span>
                  <span className="text-sm font-bold text-[#0F172A]">{metric.after}</span>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <p className={`text-lg font-bold ${metric.color}`}>
                    {metric.improvement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#64748B] mb-6 font-body">
            Ingin hasil serupa untuk bisnis Anda?
          </p>
          <button className="btn-primary">
            Mulai Audit Gratis Hari Ini
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
