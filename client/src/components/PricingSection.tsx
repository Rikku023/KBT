import { Check } from 'lucide-react';

/**
 * Pricing Section Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - 3 tier pricing packages (Basic, Advanced, Retainer)
 * - Staggered card heights dengan middle card highlighted
 * - Teal accent untuk recommended package
 */
export default function PricingSection() {
  const pricingTiers = [
    {
      name: 'Basic Audit',
      description: 'Untuk UMKM yang ingin memulai dengan data analytics',
      price: '2.5',
      period: 'juta',
      billingPeriod: 'one-time',
      features: [
        'Audit data inventory lengkap',
        'Identifikasi 10 produk dengan dead stock tertinggi',
        'Laporan PDF dengan rekomendasi aksi',
        'Konsultasi 1x via Zoom (1 jam)',
        'Akses dashboard selama 30 hari',
        'Email support',
      ],
      cta: 'Mulai Audit',
      highlighted: false,
      color: 'from-blue-50',
    },
    {
      name: 'Advanced Forecasting',
      description: 'Paket lengkap dengan prediksi dan optimasi berkelanjutan',
      price: '7.5',
      period: 'juta',
      billingPeriod: 'per bulan',
      features: [
        'Semua fitur Basic Audit',
        'Machine Learning forecast untuk semua produk',
        'Market Basket Analysis (bundling recommendation)',
        'Dashboard real-time dengan update harian',
        'Konsultasi 2x per bulan (2 jam)',
        'Rekomendasi restock otomatis',
        'Priority email & WhatsApp support',
        'Custom report sesuai kebutuhan',
      ],
      cta: 'Pilih Paket Ini',
      highlighted: true,
      color: 'from-teal-50',
    },
    {
      name: 'Retainer Consulting',
      description: 'Kemitraan jangka panjang dengan dedicated analyst',
      price: '15',
      period: 'juta',
      billingPeriod: 'per bulan',
      features: [
        'Semua fitur Advanced Forecasting',
        'Dedicated analyst untuk bisnis Anda',
        'Strategi data-driven customized',
        'Monthly business review & strategy session',
        'Integrasi dengan sistem POS/inventory Anda',
        'A/B testing untuk strategi promosi',
        'Unlimited konsultasi via Zoom & WhatsApp',
        'Prioritas tertinggi untuk support',
        'Training team Anda tentang data analytics',
      ],
      cta: 'Hubungi Kami',
      highlighted: false,
      color: 'from-slate-50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-title">
            Paket Harga Transparan
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda. Semua paket dilengkapi dengan support profesional.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative transition-all duration-300 ${
                tier.highlighted ? 'md:scale-105 md:z-10' : ''
              }`}
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Highlight Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="px-4 py-1 bg-[#06B6D4] text-white text-xs font-bold rounded-full">
                    PALING POPULER
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`bg-gradient-to-br ${tier.color} to-white rounded-2xl p-8 h-full border-2 transition-all duration-300 hover:shadow-xl ${
                  tier.highlighted
                    ? 'border-[#06B6D4] shadow-2xl'
                    : 'border-[#E2E8F0] hover:border-[#06B6D4]'
                }`}
              >
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-[#64748B] text-sm mb-6">{tier.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-[#0F172A] font-display">
                      {tier.price}
                    </span>
                    <span className="text-[#64748B]">{tier.period}</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    {tier.billingPeriod === 'one-time' ? 'Sekali bayar' : 'per bulan'}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 mb-8 ${
                    tier.highlighted
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#06B6D4]" />
                      </div>
                      <p className="text-[#0F172A] text-sm font-body">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-8 border-t border-[#E2E8F0]">
                  <p className="text-xs text-[#64748B]">
                    ✓ Tidak ada biaya setup
                    <br />✓ Bisa cancel kapan saja
                    <br />✓ Money-back guarantee 30 hari
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] mb-12">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-8 font-display">
            Pertanyaan Umum
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">Apakah ada biaya setup?</h4>
              <p className="text-[#64748B] text-sm">
                Tidak ada. Kami langsung mulai bekerja setelah Anda memilih paket. Untuk paket Retainer, kami akan melakukan onboarding meeting untuk memahami bisnis Anda.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">Bagaimana jika saya tidak puas?</h4>
              <p className="text-[#64748B] text-sm">
                Kami menawarkan jaminan uang kembali 30 hari untuk semua paket. Jika tidak puas, kami kembalikan 100% pembayaran Anda.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">Bisakah saya upgrade paket?</h4>
              <p className="text-[#64748B] text-sm">
                Tentu saja. Anda bisa upgrade kapan saja. Kami akan melakukan proration untuk pembayaran yang sudah Anda lakukan.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">Apakah ada kontrak jangka panjang?</h4>
              <p className="text-[#64748B] text-sm">
                Tidak ada kontrak. Paket bulanan bisa dibatalkan kapan saja tanpa penalti. Kami percaya pada kualitas layanan, bukan kontrak.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-[#64748B] mb-6 font-body">
            Masih bingung memilih paket? Hubungi kami untuk konsultasi gratis.
          </p>
          <button className="btn-primary">
            Jadwalkan Konsultasi Gratis
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideInUp {\n          from {\n            opacity: 0;\n            transform: translateY(30px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n      `}</style>
    </section>
  );
}
