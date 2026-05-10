import { useEffect, useRef, useState } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

  // Simulasi data retail - sebelum menggunakan OptimaData
  const beforeData = [
    { month: 'Jan', revenue: 45000, deadStock: 28000, forecast: 42000 },
    { month: 'Feb', revenue: 52000, deadStock: 32000, forecast: 48000 },
    { month: 'Mar', revenue: 48000, deadStock: 35000, forecast: 45000 },
    { month: 'Apr', revenue: 61000, deadStock: 38000, forecast: 58000 },
    { month: 'May', revenue: 55000, deadStock: 40000, forecast: 52000 },
    { month: 'Jun', revenue: 67000, deadStock: 42000, forecast: 64000 },
  ];

  // Simulasi data retail - sesudah menggunakan OptimaData
  const afterData = [
    { month: 'Jan', revenue: 58000, deadStock: 18000, forecast: 56000 },
    { month: 'Feb', revenue: 71000, deadStock: 16000, forecast: 70000 },
    { month: 'Mar', revenue: 68000, deadStock: 15000, forecast: 67000 },
    { month: 'Apr', revenue: 82000, deadStock: 12000, forecast: 81000 },
    { month: 'May', revenue: 76000, deadStock: 10000, forecast: 75000 },
    { month: 'Jun', revenue: 91000, deadStock: 8000, forecast: 90000 },
  ];

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
    <section className="py-20 bg-white">
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

          {/* Charts Container */}
          <div className="p-8">
            {/* Before & After Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Before */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                <p className="text-white/70 text-sm font-semibold mb-4">SEBELUM OptimaData</p>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <ResponsiveContainer width="100%" height={300}>
                    {activeTab === 'revenue' ? (
                      <LineChart data={beforeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Line type="monotone" dataKey="revenue" stroke="#EF4444" strokeWidth={2} dot={false} />
                      </LineChart>
                    ) : activeTab === 'deadstock' ? (
                      <BarChart data={beforeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="deadStock" fill="#F97316" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LineChart data={beforeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Line type="monotone" dataKey="forecast" stroke="#FBBF24" strokeWidth={2} dot={false} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* After */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                <p className="text-white/70 text-sm font-semibold mb-4">SESUDAH OptimaData</p>
                <div className="bg-white/5 rounded-xl p-4 border border-[#06B6D4]/50">
                  <ResponsiveContainer width="100%" height={300}>
                    {activeTab === 'revenue' ? (
                      <LineChart data={afterData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={false} />
                      </LineChart>
                    ) : activeTab === 'deadstock' ? (
                      <BarChart data={afterData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="deadStock" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LineChart data={afterData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Line type="monotone" dataKey="forecast" stroke="#06B6D4" strokeWidth={2} dot={false} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Comparison Insight */}
            <div className="bg-gradient-to-r from-[#06B6D4]/20 to-transparent rounded-xl p-6 border border-[#06B6D4]/30">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-2">Insight Utama</p>
                  <p className="text-white/80 text-sm">
                    Dengan menggunakan OptimaData, klien kami berhasil meningkatkan revenue rata-rata 38% dalam 6 bulan, sambil mengurangi dead stock sebesar 66% dan meningkatkan akurasi forecast dari 72% menjadi 92%.
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
