import { AlertCircle, TrendingDown, Package } from 'lucide-react';

/**
 * Pain Points Section Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - 3 pain points yang relevan dengan UMKM retail
 * - Card-based layout dengan icon dan teal accent
 * - Smooth animations on scroll
 */
export default function PainPointsSection() {
  const painPoints = [
    {
      icon: Package,
      title: 'Stok Menumpuk Tanpa Terjual',
      description: 'Ribuan produk terjebak di gudang, modal terbuang, dan cash flow terhambat. Tidak tahu barang mana yang lambat bergerak.',
      metric: '35% dead stock',
      color: 'from-red-50 to-orange-50',
      iconColor: 'text-red-500',
    },
    {
      icon: TrendingDown,
      title: 'Salah Prediksi Tren Pasar',
      description: 'Kesulitan memprediksi permintaan produk. Sering kehabisan stok best-seller atau malah membeli terlalu banyak produk yang tidak laku.',
      metric: '45% forecast error',
      color: 'from-yellow-50 to-orange-50',
      iconColor: 'text-yellow-600',
    },
    {
      icon: AlertCircle,
      title: 'Tidak Tahu Produk Mana yang Harus Di-Bundle',
      description: 'Tanpa insight data, bundling produk dilakukan secara random. Peluang cross-selling dan upselling terlewatkan, revenue tidak optimal.',
      metric: '60% potensi terbuang',
      color: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">
            Masalah UMKM yang Kami Pahami
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Mayoritas UMKM retail menghadapi tantangan yang sama. Mari kita lihat masalah Anda dan bagaimana kami bisa membantu.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="group card-hover"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                <div className={`bg-gradient-to-br ${point.color} rounded-2xl p-8 h-full border border-[#E2E8F0] hover:border-[#06B6D4] transition-colors duration-300`}>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <Icon className={`w-8 h-8 ${point.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 font-display">
                    {point.title}
                  </h3>
                  <p className="text-[#64748B] mb-6 leading-relaxed font-body">
                    {point.description}
                  </p>

                  {/* Metric Badge */}
                  <div className="inline-block px-4 py-2 bg-white rounded-lg border-2 border-[#06B6D4]">
                    <p className="text-sm font-semibold text-[#06B6D4]">
                      {point.metric}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl text-white text-center">
          <p className="text-lg mb-4 font-body">
            Apakah Anda menghadapi salah satu masalah ini?
          </p>
          <button className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold rounded-lg transition-colors duration-200">
            Konsultasi Gratis Sekarang
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
