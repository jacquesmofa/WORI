import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { useTranslation } from 'react-i18next';

export default function MissionPage() {
  const { t } = useTranslation();

  const missionText = t('pages.mission.missionText');
  const visionText = t('pages.mission.visionText');
  const values: { title: string; description: string }[] = t('pages.mission.values', { returnObjects: true }) as { title: string; description: string }[] || [];
  const icons = ['ri-heart-3-line', 'ri-shield-check-line', 'ri-equalizer-line', 'ri-hand-heart-line', 'ri-lightbulb-flash-line', 'ri-lock-star-line'];

  return (
    <PageLayout
      title={t('pages.mission.title')}
      subtitle={t('pages.mission.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg"
      breadcrumb={[
        { label: t('pages.mission.breadcrumb1'), path: '/about' },
        { label: t('pages.mission.breadcrumb2') },
      ]}
      seo={{
        title: 'Mission, Vision & Values | Wadi-Kaja Organization',
        description: 'Explore WORI\'s founding mission, vision for newcomer empowerment, and the six core values — dignity, inclusivity, accountability, collaboration, innovation, and compassion — guiding every program.',
        keywords: 'WORI mission, refugee charity values, immigrant empowerment vision, Wadi-Kaja principles, newcomer dignity Canada',
        canonicalPath: '/about/mission',
      }}
    >
      {/* Mission & Vision */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Mission */}
            <div className="bg-emerald-900 rounded-2xl p-8 md:p-10">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500/15 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-5">
                {t('pages.mission.ourMission')}
              </span>
              <p className="font-serif text-xl md:text-2xl text-cream-100 leading-relaxed">
                {missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-cream-200/40 rounded-2xl p-8 md:p-10 border border-cream-300/50">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-5">
                {t('pages.mission.ourVision')}
              </span>
              <p className="font-serif text-xl md:text-2xl text-charcoal-700 leading-relaxed">
                {visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
              {t('pages.mission.whatWeStandFor')}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700">
              {t('pages.mission.ourSixCoreValues')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="group bg-cream-100 rounded-2xl p-6 md:p-8 border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center mb-5 group-hover:bg-emerald-800/12 transition-colors">
                  <i className={`${icons[idx] || 'ri-star-line'} text-emerald-800 text-xl`} />
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-3">{value.title}</h3>
                <p className="text-sm text-charcoal-600/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            {t('pages.mission.valuesInAction')}
          </h2>
          <p className="text-sm md:text-base text-charcoal-600/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('pages.mission.valuesInActionDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/about/executive-director"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              {t('pages.mission.fromDirector')}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/about/board"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/20 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              {t('pages.mission.meetBoard')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}