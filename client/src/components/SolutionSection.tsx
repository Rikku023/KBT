import { BarChart3, Zap, ShoppingCart } from 'lucide-react';

/**
 * Solution Section Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - 3 solusi utama dengan icon dan deskripsi
 * - Alternating left-right layout untuk visual rhythm
 * - Teal accent untuk highlight
 */
export default function SolutionSection() {
  const solutions = [
    {
      icon: BarChart3,
      title: 'Analisis Siklus Hidup Produk',
      description: 'Kami menganalisis perjalanan setiap produk dari penjualan pertama hingga saat ini. Identifikasi produk yang sedang growth, mature, atau decline dengan akurat.',
      benefits: [
        'Dashboard real-time untuk setiap produk',
        'Prediksi lifecycle stage otomatis',
        'Rekomendasi action untuk setiap tahap',
      ],
      color: 'from-blue-50',
    },
    {
      icon: Zap,
      title: 'Prediksi Restock Cerdas',
      description: 'Machine learning kami mempelajari pola penjualan Anda dan memberikan rekomendasi restock yang presisi. Hindari stockout dan overstock sekaligus.',
      benefits: [
        'Prediksi demand akurat hingga 92%',
        'Rekomendasi qty restock otomatis',
        'Alert untuk produk dengan trend perubahan',
      ],
      color: 'from-cyan-50',
    },
    {
      icon: ShoppingCart,
      title: 'Market Basket Analysis',
      description: 'Temukan kombinasi produk yang sering dibeli bersama. Optimalkan bundling, cross-selling, dan strategi promosi berdasarkan data real.',
      benefits: [
        'Identifikasi produk yang sering dipasangkan',
        'Rekomendasi bundle yang profitable',
        'Strategi promosi berbasis insight data',
      ],
      color: 'from-teal-50',
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">
            Solusi Kami untuk Anda
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Tiga layanan utama yang dirancang untuk mengatasi setiap tantangan bisnis retail Anda.
          </p>
        </div>

        {/* Solutions */}
        <div className="space-y-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                style={{
                  animation: `fadeInScale 0.7s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Content - Left on even, Right on odd */}
                <div className={isEven ? 'order-1' : 'order-2'}>
                  <div className="space-y-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#06B6D4] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0F172A] font-display">
                          {solution.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#64748B] text-lg leading-relaxed font-body">
                      {solution.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-3 pt-4">
                      {solution.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div>
                          </div>
                          <p className="text-[#0F172A] font-body">{benefit}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <button className="text-[#06B6D4] font-semibold hover:text-[#0891B2] transition-colors flex items-center gap-2 group">
                        Pelajari lebih lanjut
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual - Right on even, Left on odd */}
                <div className={`order-${isEven ? 2 : 1}`}>
                  <div className={`bg-gradient-to-br ${solution.color} to-white rounded-2xl p-12 h-80 flex items-center justify-center border border-[#E2E8F0] relative overflow-hidden`}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 right-10 w-32 h-32 bg-[#06B6D4] rounded-full blur-3xl"></div>
                      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#0F172A] rounded-full blur-3xl"></div>
                    </div>

                    {/* Icon Display */}
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Icon className="w-12 h-12 text-[#06B6D4]" />
                      </div>
                      <p className="text-[#64748B] font-semibold">
                        Solusi {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-[#64748B] mb-6 font-body">
            Ingin tahu lebih detail tentang setiap layanan?
          </p>
          <button className="btn-primary">
            Hubungi Tim Kami
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
