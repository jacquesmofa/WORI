import PageLayout from '@/components/feature/PageLayout';
import { crisisData } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CrisisCenterPage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      title={t('pages.crisis.title')}
      subtitle={t('pages.crisis.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649813/sudan-img_d04jwo.png"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.crisis.title') },
      ]}
      seo={{
        title: 'Crisis Response Center | WORI Emergency Relief & Resources',
        description: 'Immediate crisis resources, emergency contacts, and humanitarian response for affected refugee communities. Get help, donate to crisis relief, or volunteer for emergency response.',
        keywords: 'crisis response, refugee emergency, Sudan crisis relief, humanitarian aid Canada, WORI emergency, community crisis support',
        canonicalPath: '/crisis-center',
      }}
    >
      {/* Active Crisis Banner */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-emerald-900 rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                    Active Crisis — {crisisData.activeCrisis.date}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-cream-100 mb-4">
                  {crisisData.activeCrisis.title}
                </h2>
                <p className="text-sm md:text-base text-cream-100/70 leading-relaxed mb-6">
                  {crisisData.activeCrisis.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
                  >
                    <i className="ri-heart-3-line" />
                    {t('pages.crisis.donateCrisis')}
                  </Link>
                  <Link
                    to="/volunteer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-cream-100/30 hover:border-cream-100/60 text-cream-100 text-sm font-medium rounded-full transition-all"
                  >
                    <i className="ri-user-heart-line" />
                    {t('pages.crisis.volunteerResponse')}
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-2/5 relative min-h-[200px] lg:min-h-0">
                <img
                  src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg"
                  alt="Crisis response"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-40 lg:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-10">
            {t('pages.crisis.emergencyResources')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {crisisData.resources.map((resource) => (
              <div
                key={resource.title}
                className="bg-cream-100 rounded-2xl p-6 border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center mb-4">
                  <i className={`${resource.icon} text-emerald-800 text-xl`} />
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">{resource.title}</h3>
                <p className="text-sm text-charcoal-600/60 leading-relaxed mb-4">{resource.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800/6 text-emerald-800 text-sm font-semibold">
                  <i className="ri-phone-line" />
                  {resource.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-6">
                {t('pages.crisis.howToHelp')}
              </h2>
              <div className="space-y-4">
                {crisisData.waysToHelp.map((way, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-gold-600">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-charcoal-600/70 leading-relaxed">{way}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-900 rounded-2xl p-6 md:p-8">
              <h3 className="font-serif text-xl text-cream-100 mb-4">{t('pages.crisis.stayInformed')}</h3>
              <p className="text-sm text-cream-100/60 leading-relaxed mb-5">
                {t('pages.crisis.stayInformedDesc')}
              </p>
              <form className="flex items-stretch gap-0 mb-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('pages.crisis.enterEmail')}
                  className="flex-1 bg-transparent border-b border-cream-100/25 px-0 py-2.5 text-sm text-cream-100 placeholder:text-cream-100/30 focus:outline-none focus:border-gold-500/60 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2.5 border-b border-cream-100/25 text-cream-100 hover:text-gold-400 transition-colors"
                >
                  <i className="ri-arrow-right-line text-lg" />
                </button>
              </form>
              <Link
                to="/news"
                className="inline-flex items-center gap-1 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
              >
                {t('pages.crisis.readAllNews')} <i className="ri-arrow-right-line text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}