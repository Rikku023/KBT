import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation } from 'wouter';

/**
 * Header/Navigation Component
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - Sticky header dengan navy background
 * - Responsive mobile menu
 * - Teal accent untuk CTA button
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  // Read login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("auth_token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("auth_token"));
    };
    window.addEventListener("storage", checkAuth);
    window.addEventListener("local-storage-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("local-storage-change", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("local-storage-change"));
    setLocation("/");
  };

  const navLinks = [
    { label: 'Solusi', href: '#solutions' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-[#0F172A] font-display">OptimaData</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#64748B] hover:text-[#06B6D4] transition-colors font-body"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <button className="px-6 py-2 bg-[#06B6D4] text-white font-semibold rounded-lg hover:bg-[#0891B2] cursor-pointer transition-colors">
                    Ke Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-rose-500 font-semibold hover:text-rose-600 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-6 py-2 text-[#06B6D4] font-semibold hover:text-[#0891B2] cursor-pointer transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-6 py-2 bg-[#06B6D4] text-white font-semibold rounded-lg hover:bg-[#0891B2] cursor-pointer transition-colors">
                    Coba Gratis
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#0F172A]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0F172A]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] py-4 space-y-4 animate-slideDown">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-[#64748B] hover:text-[#06B6D4] hover:bg-[#F1F5F9] rounded-lg transition-colors font-body"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 py-4 border-t border-[#E2E8F0] space-y-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <button className="w-full px-4 py-2 bg-[#06B6D4] text-white font-semibold rounded-lg hover:bg-[#0891B2] cursor-pointer transition-colors">
                      Ke Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-rose-500 font-semibold border border-rose-200 rounded-lg hover:bg-rose-500 hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="w-full px-4 py-2 text-[#06B6D4] font-semibold border border-[#06B6D4] rounded-lg hover:bg-[#06B6D4] hover:text-white cursor-pointer transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="w-full px-4 py-2 bg-[#06B6D4] text-white font-semibold rounded-lg hover:bg-[#0891B2] cursor-pointer transition-colors">
                      Coba Gratis
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
