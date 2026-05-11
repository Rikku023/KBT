import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

/**
 * Footer Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - Professional footer dengan contact info dan social links
 * - Navy blue background dengan teal accents
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="blog" className="bg-[#0F172A] text-white py-16">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-display mb-4">OptimaData</h3>
            <p className="text-[#94A3B8] mb-6 text-sm leading-relaxed">
              Mengubah data retail Anda menjadi strategi bisnis yang menguntungkan. Kami membantu UMKM berkembang dengan analytics yang mudah dipahami.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#06B6D4]/20 hover:bg-[#06B6D4] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#06B6D4]/20 hover:bg-[#06B6D4] rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#06B6D4]/20 hover:bg-[#06B6D4] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-display">Produk</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Analisis Produk
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Prediksi Restock
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Market Basket
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-display">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-display">Hubungi Kami</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@optimadata.com" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  hello@optimadata.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <a href="tel:+62812345678" className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
                  +62 812 345 678
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <p className="text-[#94A3B8]">
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1E293B] my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[#64748B]">
          <p>
            © {currentYear} OptimaData. Semua hak dilindungi.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#06B6D4] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-[#06B6D4] transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-[#06B6D4] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
