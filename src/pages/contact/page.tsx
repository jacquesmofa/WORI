import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';

const BOOKING_URL = 'https://bookings.cloud.microsoft/book/WadiKajaOrganizationforRefugeesandImmigrantscopy@wadikajaorganization.org/?ismsaljsauthenabled=true';

const CONTACT_SEO = {
  title: 'Contact Us | WORI Refugee & Immigrant Services Scarborough',
  description: 'Get in touch with the Wadi-Kaja Organization team. Visit our Scarborough office at 10 Milner Business Court, call +1-647-777-8322, or schedule a consultation. We offer services in 11+ languages.',
  keywords: 'contact WORI, refugee services contact, immigrant help Toronto, Scarborough settlement office, Wadi-Kaja phone, newcomer support contact',
  canonicalPath: '/contact',
  ogType: 'website',
};

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('pages.contact.getInTouch')}
      subtitle="Connect with WORI for services, partnerships, media inquiries, or to schedule a consultation with our settlement team."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.contact.getInTouch') },
      ]}
      seo={CONTACT_SEO}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Info */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-6">
                {t('pages.contact.getInTouch')}
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-map-pin-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.headOffice')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      10 Milner Business Court, Suite 306<br />
                      Scarborough, ON M1B 3C6<br />
                      <span className="text-xs text-charcoal-600/40">Serving communities across Ontario</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-phone-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.phone')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      <a href="tel:+16477778322" className="hover:text-emerald-800 transition-colors">Main: +1-647-777-8322</a><br />
                      <a href="tel:+16477778300" className="hover:text-emerald-800 transition-colors">Office: +1-647-777-8300</a><br />
                      <span className="text-xs text-gold-600 font-medium">Crisis: 1-800-WORI-SAFE</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-mail-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.email')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      <a href="mailto:info@wadikajaorganization.org" className="hover:text-emerald-800 transition-colors">info@wadikajaorganization.org</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-time-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.officeHours')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      Monday – Friday: 9:00 AM – 5:00 PM<br />
                      Saturday: 10:00 AM – 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-cream-300/50 bg-cream-200/40 h-56 mb-6">
                <iframe
                  title="WORI Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.912345678901!2d-79.24512345678901!3d43.80123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ4JzA0LjQiTiA3OcKwMTQnNDIuNCJX!5e0!3m2!1sen!2sca!4v1600000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Crisis Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-7">
                <h3 className="font-serif text-lg text-cream-100 mb-3">{t('pages.contact.needImmediateHelp')}</h3>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-4">
                  If you or someone you know is in immediate crisis, our 24/7 emergency line is open.
                </p>
                <a
                  href="tel:1-800-WORI-SAFE"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/15 text-gold-400 text-sm font-semibold hover:bg-gold-500/25 transition-colors"
                >
                  <i className="ri-phone-line" />
                  1-800-WORI-SAFE
                </a>
              </div>
            </div>

            {/* Right: Schedule a Consultation — Booking Redirect */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-2">
                {t('pages.contact.scheduleConsultation')}
              </h2>
              <p className="text-sm text-charcoal-600/60 mb-6 leading-relaxed">
                Use our online booking system to schedule a consultation directly. Choose a time that works for you — our intake team is ready to help.
              </p>

              <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-8 md:p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/15 flex items-center justify-center mx-auto mb-5">
                  <i className="ri-calendar-check-line text-gold-400 text-2xl" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-cream-100 mb-3">
                  Book Your Consultation
                </h3>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-7 max-w-md mx-auto">
                  Click the button below to open our Microsoft Bookings calendar. Select your preferred date and time, and we&apos;ll confirm your appointment.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-base font-bold rounded-full transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.02]"
                >
                  <i className="ri-calendar-2-line text-lg" />
                  Schedule Now
                  <i className="ri-external-link-line text-sm" />
                </a>
                <p className="text-xs text-cream-100/40 mt-5">
                  You will be redirected to Microsoft Bookings — our secure scheduling platform.
                </p>
              </div>

              {/* Quick Contact Alternatives */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+16477778322"
                  className="flex items-center gap-3 p-4 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-emerald-800/30 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 transition-colors">
                    <i className="ri-phone-line text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-700">Call Us Directly</p>
                    <p className="text-xs text-charcoal-600/50">+1-647-777-8322</p>
                  </div>
                </a>
                <a
                  href="mailto:info@wadikajaorganization.org"
                  className="flex items-center gap-3 p-4 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-emerald-800/30 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 transition-colors">
                    <i className="ri-mail-line text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-700">Send an Email</p>
                    <p className="text-xs text-charcoal-600/50">info@wadikajaorganization.org</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}