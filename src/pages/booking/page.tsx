import PageLayout from '@/components/feature/PageLayout';
import { useTranslation } from 'react-i18next';

export default function BookingPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('pages.booking.title')}
      subtitle={t('pages.booking.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto/v1784649679/gallery_img2-1024x768-640x480_iq3j0a.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.booking.title') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Message Card */}
          <div className="bg-cream-200/30 rounded-2xl p-8 md:p-10 border border-cream-300/50 mb-10">
            <div className="w-16 h-16 rounded-full bg-emerald-800/8 flex items-center justify-center mx-auto mb-5">
              <i className="ri-chat-heart-line text-emerald-800 text-2xl" />
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-medium text-charcoal-700 mb-4">
              Dear Clients,
            </h2>
            <p className="text-sm text-charcoal-600/60 leading-relaxed max-w-lg mx-auto">
              Please if you need any assistance with settlement programs and other services; such as,
              writing resumes, getting a job, applying for SIN, OHIP, etc. please feel free to book
              an appointment using the following link.
            </p>
          </div>

          {/* Book Now Button */}
          <a
            href="https://bookings.cloud.microsoft/book/WadiKajaOrganizationforRefugeesandImmigrantscopy@wadikajaorganization.org/?ismsaljsauthenabled=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-base font-bold rounded-full transition-all hover:shadow-lg whitespace-nowrap cursor-pointer"
          >
            BOOK NOW
            <i className="ri-arrow-right-line text-lg" />
          </a>

          <p className="text-xs text-charcoal-600/40 mt-4">
            You will be redirected to our secure Microsoft Bookings portal where you can fill in all your information.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}