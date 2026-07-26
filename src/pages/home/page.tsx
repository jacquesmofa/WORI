import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import HeroSlider from './components/HeroSlider';
import VisionSection from './components/VisionSection';
import AboutOrgSection from './components/AboutOrgSection';
import ActionCTASection from './components/ActionCTASection';
import PartnersSection from './components/PartnersSection';
import GallerySection from './components/GallerySection';
import DonateSection from './components/DonateSection';
import SudanCrisisSection from './components/SudanCrisisSection';
import EventsSection from './components/EventsSection';
import NewsletterSection from './components/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar transparent />

      {/* Top Contact Bar — sits below fixed navbar, always clickable */}
      <div className="bg-emerald-900/95 mt-[72px] border-b border-cream-100/10">
        <div className="flex items-center justify-between px-6 lg:px-12 h-10 w-full">
          <div className="flex items-center gap-5 text-cream-100/80 text-xs">
            <a href="tel:+16477778322" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors cursor-pointer">
              <i className="ri-phone-line" />
              <span className="hidden sm:inline">+1-647-777-8322</span>
            </a>
            <a href="mailto:info@wadikajaorganization.org" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors cursor-pointer">
              <i className="ri-mail-line" />
              <span className="hidden md:inline">info@wadikajaorganization.org</span>
            </a>
          </div>
          <Link
            to="/contact"
            className="text-xs font-semibold px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 rounded-full transition-colors whitespace-nowrap cursor-pointer"
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      <main>
        <HeroSlider />
        <VisionSection />
        <AboutOrgSection />
        <ActionCTASection />
        <PartnersSection />
        <GallerySection />
        <DonateSection />
        <SudanCrisisSection />
        <EventsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}