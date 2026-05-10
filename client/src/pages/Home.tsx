import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import SolutionSection from '@/components/SolutionSection';
import DashboardShowcase from '@/components/DashboardShowcase';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

/**
 * Home Page - OptimaData Landing Page
 * 
 * Design Philosophy: Modern Minimalist with Data Visualization Accent
 * - Navy Blue (#0F172A) + Teal (#06B6D4) color scheme
 * - Poppins + Inter typography
 * - Asimetric layouts dan smooth animations
 * - Productized Service approach
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        <PainPointsSection />
        <SolutionSection />
        <DashboardShowcase />
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
}
