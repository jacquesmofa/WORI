import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import ImpactSection from './components/ImpactSection';
import TestimonialSection from './components/TestimonialSection';
import ProgramsSection from './components/ProgramsSection';
import ResourcesSection from './components/ResourcesSection';
import DonateSection from './components/DonateSection';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <main>
        <HeroSection />
        <ImpactSection />
        <TestimonialSection />
        <ProgramsSection />
        <ResourcesSection />
        <DonateSection />
      </main>

      <Footer />
    </div>
  );
}