import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';

interface Program {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  path: string;
  category: string;
  stats: { value: string; label: string }[];
}

export default function ProgramsServicesPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: t('pages.services.common.catAll') },
    { key: 'settlement', label: t('pages.services.common.catSettlement') },
    { key: 'wellbeing', label: t('pages.services.common.catWellbeing') },
  ];

  const programs: Program[] = [
    {
      id: 'ircc', titleKey: 'settlementMenu.ircc', descKey: '', icon: 'ri-government-line',
      path: '/services/ircc', category: 'settlement',
      stats: [{ value: '340+', label: 'Forms & Guides' }, { value: '89%', label: 'Success Rate' }, { value: '6', label: 'Languages' }],
    },
    {
      id: 'language-mentorship', titleKey: 'settlementMenu.languageMentorship', descKey: '', icon: 'ri-chat-1-line',
      path: '/services/language-mentorship', category: 'settlement',
      stats: [{ value: '520', label: 'Active Pairs' }, { value: '6mo', label: 'Avg Duration' }, { value: '78%', label: 'Improved 2+ CLB' }],
    },
    {
      id: 'private-sponsorship', titleKey: 'settlementMenu.privateSponsorship', descKey: '', icon: 'ri-hand-heart-line',
      path: '/services/private-sponsorship', category: 'settlement',
      stats: [{ value: '145', label: 'Sponsored 2024' }, { value: '38', label: 'Active Groups' }, { value: '100%', label: 'Audit Pass' }],
    },
    {
      id: 'language-services', titleKey: 'settlementMenu.languageServices', descKey: '', icon: 'ri-translate-2',
      path: '/services/language-services', category: 'settlement',
      stats: [{ value: '2,400+', label: 'Translated 2024' }, { value: '48hrs', label: 'Turnaround' }, { value: '6', label: 'Languages' }],
    },
    {
      id: 'settlement', titleKey: 'settlementMenu.immigrantSettlement', descKey: '', icon: 'ri-home-heart-line',
      path: '/services/settlement', category: 'settlement',
      stats: [{ value: '4,200+', label: 'Families 2024' }, { value: '24hrs', label: 'Response Time' }, { value: '96%', label: 'Satisfaction' }],
    },
    {
      id: 'mental-health', titleKey: 'wellbeingMenu.mentalHealth', descKey: '', icon: 'ri-mental-health-line',
      path: '/services/mental-health', category: 'wellbeing',
      stats: [{ value: '3,100', label: 'Sessions 2024' }, { value: '92%', label: 'Reduced Distress' }, { value: '14', label: 'Therapists' }],
    },
    {
      id: 'employment', titleKey: 'wellbeingMenu.employment', descKey: '', icon: 'ri-briefcase-line',
      path: '/services/employment', category: 'wellbeing',
      stats: [{ value: '76%', label: 'Placement Rate' }, { value: '120+', label: 'Employers' }, { value: '1,850', label: 'Employed 2024' }],
    },
    {
      id: 'housing', titleKey: 'wellbeingMenu.housing', descKey: '', icon: 'ri-building-2-line',
      path: '/services/housing', category: 'wellbeing',
      stats: [{ value: '2,100', label: 'Housed 2024' }, { value: '<24hrs', label: 'Placement' }, { value: '94%', label: 'Stable at 12mo' }],
    },
    {
      id: 'women-empowerment', titleKey: 'wellbeingMenu.womenEmpowerment', descKey: '', icon: 'ri-women-line',
      path: '/services/women-empowerment', category: 'wellbeing',
      stats: [{ value: '1,680', label: 'Women Served' }, { value: '340', label: 'Grads' }, { value: '89%', label: 'Uptake Rate' }],
    },
    {
      id: 'seniors', titleKey: 'wellbeingMenu.seniors', descKey: '', icon: 'ri-user-heart-line',
      path: '/services/seniors', category: 'wellbeing',
      stats: [{ value: '520', label: 'Enrolled' }, { value: '32/wk', label: 'Activities' }, { value: '85%', label: 'Less Lonely' }],
    },
    {
      id: 'food-security', titleKey: 'wellbeingMenu.foodSecurity', descKey: '', icon: 'ri-restaurant-2-line',
      path: '/services/food-security', category: 'wellbeing',
      stats: [{ value: '8,400', label: 'Hampers' }, { value: '48', label: 'Kitchen Sessions' }, { value: '14', label: 'Partner Banks' }],
    },
  ];

  const filteredPrograms = activeCategory === 'all'
    ? programs
    : programs.filter((p) => p.category === activeCategory);

  const categoryDescriptions: Record<string, string> = {
    all: t('pages.services.common.allDesc'),
    settlement: t('pages.services.common.settlementDesc'),
    wellbeing: t('pages.services.common.wellbeingDesc'),
  };

  return (
    <PageLayout
      title={t('pages.services.common.programsTitle')}
      subtitle={t('pages.services.common.programsSubtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.services.common.programsTitle') },
      ]}
      seo={{
        title: 'Programs & Services | WORI Settlement & Wellbeing Programs',
        description: 'Eleven interconnected programs across two strategic directories — Settlement & Resources and Wellbeing & Empowerment — for refugees, newcomers, and immigrants in Canada.',
        keywords: 'WORI services, refugee settlement programs, immigrant wellbeing services, newcomer support Canada, IRCC help, language mentorship, mental health refugees',
        canonicalPath: '/services',
      }}
    >
      {/* Two Directories Overview */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
            <Link
              to="/services/settlement"
              className="group relative overflow-hidden rounded-2xl bg-emerald-900 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20"
            >
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-compass-3-line text-gold-500 text-2xl" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-cream-100 mb-3">{t('pages.services.common.settlementResources')}</h2>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-5 max-w-sm">
                  {t('pages.services.common.settlementDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  {t('common.exploreDirectory')} <i className="ri-arrow-right-line" />
                </span>
              </div>
            </Link>

            <Link
              to="/services/mental-health"
              className="group relative overflow-hidden rounded-2xl bg-charcoal-700 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal-800/20"
            >
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784648610/yoga-session-img20_l4w0jx.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cream-100/10 border border-cream-100/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-heart-pulse-line text-cream-100 text-2xl" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-cream-100 mb-3">{t('pages.services.common.wellbeingEmpowerment')}</h2>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-5 max-w-sm">
                  {t('pages.services.common.wellbeingDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-cream-100/80 text-sm font-semibold group-hover:gap-3 transition-all">
                  {t('common.exploreDirectory')} <i className="ri-arrow-right-line" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 lg:px-10 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-2">
                {t('pages.services.common.allPrograms')}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700">
                {t('pages.services.common.findSupport')}
              </h2>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-emerald-800 text-cream-100 shadow-md'
                    : 'bg-cream-200/60 text-charcoal-600 hover:bg-cream-200 hover:text-charcoal-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-charcoal-600/50 mb-8 max-w-2xl leading-relaxed">
            {categoryDescriptions[activeCategory]}
          </p>
        </div>
      </section>

      {/* Program Cards Grid */}
      <section className="px-6 lg:px-10 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPrograms.map((program) => (
              <Link
                key={program.id}
                to={program.path}
                className="group relative bg-cream-100 rounded-2xl border border-cream-300/50 overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-emerald-900/5 hover:border-gold-500/30 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`h-1 w-full transition-all duration-500 ${
                  hoveredCard === program.id ? 'bg-gold-500' : 'bg-emerald-800/20 group-hover:bg-emerald-800/40'
                }`} />

                <div className="p-6 md:p-7">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    hoveredCard === program.id ? 'bg-gold-500/10 scale-110' : 'bg-emerald-800/8 group-hover:bg-emerald-800/12'
                  }`}>
                    <i className={`${program.icon} text-xl ${
                      hoveredCard === program.id ? 'text-gold-600' : 'text-emerald-800'
                    } transition-colors duration-300`} />
                  </div>

                  <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-3 group-hover:text-emerald-800 transition-colors">
                    {t(program.titleKey)}
                  </h3>

                  <p className="text-sm text-charcoal-600/60 leading-relaxed mb-5">
                    {t(`pages.services.common.intakeProcess`).substring(0, 90)}...
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-5 pt-4 border-t border-cream-300/50">
                    {program.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-serif text-sm font-semibold text-emerald-800">{stat.value}</div>
                        <div className="text-[10px] text-charcoal-600/40 leading-tight mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 group-hover:text-gold-600 transition-colors">
                    <span>{t('common.learnMoreShort')}</span>
                    <i className={`ri-arrow-right-line text-xs transition-transform duration-300 ${
                      hoveredCard === program.id ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-cream-200/40 flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-charcoal-600/30 text-2xl" />
              </div>
              <p className="text-sm text-charcoal-600/40">{t('common.noProgramsFound')}</p>
            </div>
          )}
        </div>
      </section>

      {/* How Services Work */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
              {t('common.howItWorks')}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700">
              {t('common.fromArrival')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { step: '01', title: t('pages.services.common.step1Title'), desc: t('pages.services.common.step1Desc'), icon: 'ri-phone-line' },
              { step: '02', title: t('pages.services.common.step2Title'), desc: t('pages.services.common.step2Desc'), icon: 'ri-clipboard-line' },
              { step: '03', title: t('pages.services.common.step3Title'), desc: t('pages.services.common.step3Desc'), icon: 'ri-link-m' },
              { step: '04', title: t('pages.services.common.step4Title'), desc: t('pages.services.common.step4Desc'), icon: 'ri-heart-3-line' },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative bg-cream-100 rounded-2xl p-6 md:p-7 border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <span className="font-serif text-4xl font-bold text-emerald-800/8 group-hover:text-gold-500/20 transition-colors absolute top-4 right-5">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center mb-4 group-hover:bg-emerald-800/12 transition-colors relative z-10">
                  <i className={`${item.icon} text-emerald-800 text-lg`} />
                </div>
                <h3 className="font-serif text-base font-medium text-charcoal-700 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-600/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-emerald-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-cream-100 mb-4">
            {t('common.readyToStep')}
          </h2>
          <p className="text-sm md:text-base text-cream-100/60 mb-8 max-w-xl mx-auto leading-relaxed">
            {t('pages.services.common.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
            >
              {t('common.connectWithUs')}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-cream-100/30 hover:border-cream-100/60 text-cream-100 text-sm font-medium rounded-full transition-all"
            >
              {t('common.becomeVolunteer')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}