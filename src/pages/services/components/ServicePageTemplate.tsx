import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import ExpandableText from '@/components/base/ExpandableText';
import { servicePages } from '@/mocks/pagesData';

const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve';

interface ServicePageProps {
  serviceKey: keyof typeof servicePages;
  seoTitle?: string;
  seoDescription?: string;
}

const sectionImages: string[] = [
  `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
  `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
  `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
  `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
  `${CLD}/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg`,
  `${CLD}/v1784295210/IMG_20200424_121422_452_hunip7.jpg`,
  `${CLD}/v1784646872/Photo-1_idgega.jpg`,
  `${CLD}/v1785062749/Wadi-Kaja-canada-day-2026_bwe3qt.jpg`,
  `${CLD}/v1784649688/Day23_img28_jqixge.jpg`,
  `${CLD}/v1784649666/Day23_img41_qwxabt.jpg`,
];

export default function ServicePage({ serviceKey, seoTitle, seoDescription }: ServicePageProps) {
  const { t } = useTranslation();
  const data = servicePages[serviceKey];
  if (!data) return null;

  const bgImages: Record<string, string> = {
    settlement: `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
    ircc: `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    'language-mentorship': `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    'private-sponsorship': `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
    'language-services': `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    'mental-health': `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
    employment: `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    housing: `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
    'women-empowerment': `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
    seniors: `${CLD}/v1784646872/Photo-1_idgega.jpg`,
    'food-security': `${CLD}/v1784295210/IMG_20200424_121422_452_hunip7.jpg`,
    youth: `${CLD}/v1784649622/Day23_img22_moiseg.jpg`,
    'community-engagement': `${CLD}/v1785062749/Wadi-Kaja-canada-day-2026_bwe3qt.jpg`,
  };

  const serviceNames: Record<string, string> = {
    settlement: t('settlementMenu.immigrantSettlement'),
    ircc: t('settlementMenu.ircc'),
    'language-mentorship': t('settlementMenu.languageMentorship'),
    'private-sponsorship': t('settlementMenu.privateSponsorship'),
    'language-services': t('settlementMenu.languageServices'),
    'mental-health': t('wellbeingMenu.mentalHealth'),
    employment: t('wellbeingMenu.employment'),
    housing: t('wellbeingMenu.housing'),
    'women-empowerment': t('wellbeingMenu.womenEmpowerment'),
    seniors: t('wellbeingMenu.seniors'),
    'food-security': t('wellbeingMenu.foodSecurity'),
    youth: t('wellbeingMenu.youth'),
    'community-engagement': t('wellbeingMenu.communityEngagement'),
  };

  const servicePaths: Record<string, string> = {
    settlement: '/services/settlement',
    ircc: '/services/ircc',
    'language-mentorship': '/services/language-mentorship',
    'private-sponsorship': '/services/private-sponsorship',
    'language-services': '/services/language-services',
    'mental-health': '/services/mental-health',
    employment: '/services/employment',
    housing: '/services/housing',
    'women-empowerment': '/services/women-empowerment',
    seniors: '/services/seniors',
    'food-security': '/services/food-security',
    youth: '/services/youth',
    'community-engagement': '/services/community-engagement',
  };

  const heroTitle = t(`pages.services.${serviceKey}.heroTitle`) !== `pages.services.${serviceKey}.heroTitle`
    ? t(`pages.services.${serviceKey}.heroTitle`)
    : data.heroTitle;
  const heroSubtitle = t(`pages.services.${serviceKey}.heroSubtitle`) !== `pages.services.${serviceKey}.heroSubtitle`
    ? t(`pages.services.${serviceKey}.heroSubtitle`)
    : data.heroSubtitle;

  const pageTitle = seoTitle || heroTitle;
  const pageDescription = seoDescription || heroSubtitle || data.heroSubtitle || '';

  const serviceSeo = {
    title: pageTitle,
    description: pageDescription,
    canonicalPath: `/services/${serviceKey}`,
  };

  return (
    <PageLayout
      title={heroTitle}
      subtitle={heroSubtitle}
      bgImage={bgImages[serviceKey] || bgImages.settlement}
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: serviceNames[serviceKey], path: servicePaths[serviceKey].split('/').slice(0, 2).join('/') + '/*' },
        { label: data.heroTitle },
      ]}
      seo={serviceSeo}
    >
      {/* Content Sections */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Extra Resource Buttons (e.g. IRCC) */}
          {data.extraButtons && data.extraButtons.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-14">
              {data.extraButtons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.external ? '_blank' : undefined}
                  rel={btn.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 gold-shimmer text-emerald-900 text-sm font-bold rounded-full animate-gold-pulse cursor-pointer"
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  <span className="relative z-10">{btn.label}</span>
                  <i className={`${btn.external ? 'ri-external-link-line' : 'ri-arrow-right-line'} relative z-10`} />
                </a>
              ))}
            </div>
          )}

          <div className="space-y-16 md:space-y-20">
            {data.sections.map((section, idx) => (
              <div
                key={section.title}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-start ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200/50">
                    <img
                      src={sectionImages[idx % sectionImages.length]}
                      alt={section.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
                    0{idx + 1}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 leading-tight mb-4">
                    {section.title}
                  </h2>
                  <ExpandableText text={section.description} maxLength={500} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Eligibility */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <i className="ri-user-star-line text-gold-600 text-lg" />
                </div>
                <h3 className="font-serif text-xl text-charcoal-700">
                  {t('pages.services.common.eligibility')}
                </h3>
              </div>
              <p className="text-sm text-charcoal-600/70 leading-relaxed mb-6">
                {t('pages.services.common.eligibilityDesc')}
              </p>
              <ul className="space-y-3">
                {[
                  'Government-assisted refugees (GARs)',
                  'Privately sponsored refugees',
                  'Asylum claimants & protected persons',
                  'Permanent residents & convention refugees',
                  'Temporary residents with work/study permits',
                  'Naturalized Canadian citizens (first 3 years)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <i className="ri-checkbox-circle-fill text-gold-500 text-sm mt-0.5 shrink-0" />
                    <span className="text-sm text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intake Process */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center">
                  <i className="ri-guide-line text-emerald-800 text-lg" />
                </div>
                <h3 className="font-serif text-xl text-charcoal-700">
                  {t('pages.services.common.intakeProcess')}
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: '01', title: t('pages.services.common.step1Title'), desc: t('pages.services.common.step1Desc'), icon: 'ri-phone-line' },
                  { step: '02', title: t('pages.services.common.step2Title'), desc: t('pages.services.common.step2Desc'), icon: 'ri-clipboard-line' },
                  { step: '03', title: t('pages.services.common.step3Title'), desc: t('pages.services.common.step3Desc'), icon: 'ri-links-line' },
                  { step: '04', title: t('pages.services.common.step4Title'), desc: t('pages.services.common.step4Desc'), icon: 'ri-heart-pulse-line' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cream-200/50 flex items-center justify-center shrink-0 border border-cream-300/40">
                      <span className="text-xs font-bold text-emerald-800">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal-700 mb-0.5">{item.title}</h4>
                      <p className="text-xs text-charcoal-600/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-cream-300/40">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                      {t('pages.services.common.connect')} <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            {t('pages.services.common.readyToStep')}
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-8 max-w-xl mx-auto leading-relaxed">
            {t('pages.services.common.readyToStepDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={data.cta.path}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              {data.cta.label}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              {t('pages.services.common.viewAllServices')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}