import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOMeta from '@/components/feature/SEOMeta';
import StructuredData from '@/components/feature/StructuredData';
import HeroSlider from './components/HeroSlider';
import VisionSection from './components/VisionSection';
import ProgramsSection from './components/ProgramsSection';
import ActionCTASection from './components/ActionCTASection';
import PartnersSection from './components/PartnersSection';
import GallerySection from './components/GallerySection';
import DonateSection from './components/DonateSection';
import SudanCrisisSection from './components/SudanCrisisSection';
import EventsSection from './components/EventsSection';
import NewsletterSection from './components/NewsletterSection';

const HOME_SEO = {
  title: 'Wadi-Kaja Organization (WORI) | Refugee & Immigrant Services in Toronto',
  description: 'Empowering refugees, newcomers, and immigrants in Canada through settlement support, housing assistance, language mentorship, IRCC guidance, and emergency relief services. CRA Registered Charity #74887 3338 RR0001.',
  keywords: 'WORI, Wadi-Kaja, refugee services Toronto, immigrant settlement Canada, newcomer support Scarborough, IRCC assistance, language mentorship, housing help, refugee sponsorship, charity Toronto',
  canonicalPath: '/',
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-cream-100">
      <SEOMeta {...HOME_SEO} />
      <StructuredData type="NGO" />
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
          <a
            href="https://bookings.cloud.microsoft/book/WadiKajaOrganizationforRefugeesandImmigrantscopy@wadikajaorganization.org/?ismsaljsauthenabled=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 rounded-full transition-colors whitespace-nowrap cursor-pointer"
          >
            {t('booking.bookConsultation')}
          </a>
        </div>
      </div>

      <main>
        <HeroSlider />
        <VisionSection />
        <ProgramsSection />
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