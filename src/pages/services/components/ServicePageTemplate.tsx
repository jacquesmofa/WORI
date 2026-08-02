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

// Per-service unique section images — no more repeating across programs
const serviceSectionImages: Record<string, string[]> = {
  settlement: [
    `${CLD}/v1785638951/nicole-geri-gMJ3tFOLvnA-unsplash_tt0jlz.jpg`,
    `${CLD}/v1785638971/oxana-melis-xXS03_k8yc0-unsplash_ikhhhv.jpg`,
    `${CLD}/v1785638985/dillon-kydd-2F92872IMCs-unsplash_tt7wn6.jpg`,
    `${CLD}/v1785639003/brian-zhu-0IM71KfH3mo-unsplash_kjdnlb.jpg`,
    `${CLD}/v1785638937/vitaly-gariev-tw-mAZXr6H4-unsplash_gq8lsz.jpg`,
  ],
  ircc: [
    `${CLD}/v1785638951/jason-hafso-C2keINMOhIE-unsplash_a9ntcy.jpg`,
    `${CLD}/v1785638977/tom-carnegie-7k294YFeVbI-unsplash_iykt9w.jpg`,
    `${CLD}/v1785639005/eduard-pretsi-ops8lDcAwVo-unsplash_sa0zry.jpg`,
    `${CLD}/v1785639010/small-group-network-bxiOjnbjRM0-unsplash_fq1izu.jpg`,
  ],
  'language-mentorship': [
    `${CLD}/v1785638957/vitaly-gariev-6jmCztFHGQM-unsplash_fh9olz.jpg`,
    `${CLD}/v1785638957/vitaly-gariev-_Am5E9vcsu8-unsplash_k5b2mz.jpg`,
    `${CLD}/v1785638955/vitaly-gariev-nrE0LK_qN7E-unsplash_lyo4uc.jpg`,
    `${CLD}/v1785638932/ling-app-TFtIBULUMP0-unsplash_xq7dn3.jpg`,
    `${CLD}/v1785638963/ling-app-KGS_h4GnlbI-unsplash_vhotdj.jpg`,
  ],
  'private-sponsorship': [
    `${CLD}/v1785638937/vitaly-gariev-tw-mAZXr6H4-unsplash_gq8lsz.jpg`,
    `${CLD}/v1785638954/francis-odeyemi-ZendTXpyTeU-unsplash_wnr2sl.jpg`,
    `${CLD}/v1785638957/vitaly-gariev-_Am5E9vcsu8-unsplash_k5b2mz.jpg`,
    `${CLD}/v1785638961/sarah-b-ifO_r0SxGX4-unsplash_e4c2g0.jpg`,
  ],
  'language-services': [
    `${CLD}/v1785638932/ling-app-TFtIBULUMP0-unsplash_xq7dn3.jpg`,
    `${CLD}/v1785638967/shina-memud-TWbpgdy7Asw-unsplash_rz1wpa.jpg`,
    `${CLD}/v1785638963/ling-app-KGS_h4GnlbI-unsplash_vhotdj.jpg`,
    `${CLD}/v1785638976/akeyodia-business-coaching-firm-9VG-HVNGu7s-unsplash_tnorpo.jpg`,
  ],
  'mental-health': [
    `${CLD}/v1785638972/marcel-strauss-fzqxoFJytiE-unsplash_xgiusw.jpg`,
    `${CLD}/v1785638966/vitaly-gariev-qgK7izTlg5g-unsplash_dgkfxm.jpg`,
    `${CLD}/v1785638940/total-shape-Ianw4RdVuoo-unsplash_utmqa9.jpg`,
    `${CLD}/v1785638941/vitaly-gariev-k-sCcKy6ED4-unsplash_aqaqi7.jpg`,
    `${CLD}/v1785638937/vitaly-gariev-tw-mAZXr6H4-unsplash_gq8lsz.jpg`,
  ],
  employment: [
    `${CLD}/v1785638961/sarah-b-ifO_r0SxGX4-unsplash_e4c2g0.jpg`,
    `${CLD}/v1785638975/charanjeet-dhiman-mHusyBu4bxM-unsplash_t4tuwz.jpg`,
    `${CLD}/v1785638982/chidera-faustina-okeke-aMNFii9MWUE-unsplash_zl8or4.jpg`,
    `${CLD}/v1785638983/chidera-faustina-okeke-6JPMEebAP5A-unsplash_ldzbto.jpg`,
    `${CLD}/v1785638993/creatopy-MzqniYN2OGM-unsplash_goc7l9.jpg`,
  ],
  housing: [
    `${CLD}/v1785638983/erik-mclean-UZmX9c4duHE-unsplash_tqreb0.jpg`,
    `${CLD}/v1785638936/towfiqu-barbhuiya-05XcCfTOzN4-unsplash_1_sly42m.jpg`,
    `${CLD}/v1785638935/jakub-zerdzicki-Snk488INnQs-unsplash_zxxiqj.jpg`,
    `${CLD}/v1785638972/marcel-strauss-fzqxoFJytiE-unsplash_xgiusw.jpg`,
  ],
  'women-empowerment': [
    `${CLD}/v1785638943/tan-duong-cAJHIdijOmY-unsplash_j0ioal.jpg`,
    `${CLD}/v1785638936/markus-winkler-UsG7z9TAZdc-unsplash_bfh0zt.jpg`,
    `${CLD}/v1785638965/budka-damdinsuren-UZ4x1O4IXz4-unsplash_jm71uu.jpg`,
  ],
  seniors: [
    `${CLD}/v1785638946/vitaly-gariev-XcHGzdXaLX0-unsplash_sl641t.jpg`,
    `${CLD}/v1785638980/age-cymru-D394dKgOjec-unsplash_nut9ay.jpg`,
    `${CLD}/v1785638993/vlad-sargu-ItphH2lGzuI-unsplash_k4rgxm.jpg`,
    `${CLD}/v1785638943/tan-duong-cAJHIdijOmY-unsplash_j0ioal.jpg`,
  ],
  'food-security': [
    `${CLD}/v1785638939/maria-lin-kim-8RaUEd8zD-U-unsplash_oulkth.jpg`,
    `${CLD}/v1785638970/marquise-kamanke-i_EfnS7aMNw-unsplash_uarll8.jpg`,
    `${CLD}/v1785638973/nick-hillier-5nkHbhrDbqc-unsplash_pkhlm3.jpg`,
  ],
  youth: [
    `${CLD}/v1785638942/joel-mott-dQBkIZzyM-4-unsplash_zn029t.jpg`,
    `${CLD}/v1785638969/meadow-marie-ogM9EkNoAfM-unsplash_fyyq7a.jpg`,
    `${CLD}/v1785638990/md-duran-W2DqufoLy2g-unsplash_rfmhtf.jpg`,
    `${CLD}/v1785639002/aleksandar-andreev-RECIb1Wak4g-unsplash_hezcou.jpg`,
    `${CLD}/v1785639007/cybele-and-bevan-_zHU5J8aJ1E-unsplash_s6kbgu.jpg`,
  ],
  'community-engagement': [
    `${CLD}/v1785638934/camylla-battani-ABVE1cyT7hk-unsplash_mhoh6f.jpg`,
    `${CLD}/v1785638945/markus-spiske-cMR8Wc64vqU-unsplash_ajijhl.jpg`,
    `${CLD}/v1785638943/amir-mortezaie-8C11i8fqEdY-unsplash_jpxjz4.jpg`,
    `${CLD}/v1785638997/kamil-kalkan-BTpIUnszs_Q-unsplash_xcy4cz.jpg`,
  ],
};

export default function ServicePage({ serviceKey, seoTitle, seoDescription }: ServicePageProps) {
  const { t } = useTranslation();
  const data = servicePages[serviceKey];
  if (!data) return null;

  const bgImages: Record<string, string> = {
    settlement: `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
    ircc: `${CLD}/v1784295067/IMG-20201006-WA0091_irqvja.jpg`,
    'language-mentorship': `${CLD}/v1784649622/Day23_img22_moiseg.jpg`,
    'private-sponsorship': `${CLD}/v1784649535/Arrived-Refugee-Photos-page-001_grvjts.jpg`,
    'language-services': `${CLD}/v1784295062/IMG-20201006-WA0124_ijkkru.jpg`,
    'mental-health': `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
    employment: `${CLD}/v1784295067/IMG-20201006-WA0161_g4vz3n.jpg`,
    housing: `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
    'women-empowerment': `${CLD}/v1784298529/wori-awards-14-1536x1024_axrgst.jpg`,
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

  const sectionTitle = (idx: number, fallback: string) => {
    const key = `pages.services.${serviceKey}.sections.${idx}.title`;
    const translated = t(key);
    return translated !== key ? translated : fallback;
  };
  const sectionDesc = (idx: number, fallback: string) => {
    const key = `pages.services.${serviceKey}.sections.${idx}.description`;
    const translated = t(key);
    return translated !== key ? translated : fallback;
  };
  const ctaLabel = () => {
    const key = `pages.services.${serviceKey}.ctaLabel`;
    const translated = t(key);
    return translated !== key ? translated : data.cta.label;
  };

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
            {data.sections.map((section, idx) => {
              const sectionImgs = serviceSectionImages[serviceKey] || serviceSectionImages.settlement;
              return (
                <div
                  key={section.title}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-start ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200/50">
                      <img
                        src={sectionImgs[idx % sectionImgs.length]}
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
                      {sectionTitle(idx, section.title)}
                    </h2>
                    <ExpandableText text={sectionDesc(idx, section.description)} maxLength={500} />
                  </div>
                </div>
              );
            })}
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
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const key = `pages.services.common.eligibilityItems.${idx}`;
                  const item = t(key);
                  return (
                    <li key={idx} className="flex items-start gap-2.5">
                      <i className="ri-checkbox-circle-fill text-gold-500 text-sm mt-0.5 shrink-0" />
                      <span className="text-sm text-charcoal-700">{item !== key ? item : [
                        'Government-assisted refugees (GARs)',
                        'Privately sponsored refugees',
                        'Asylum claimants & protected persons',
                        'Permanent residents & convention refugees',
                        'Temporary residents with work/study permits',
                        'Naturalized Canadian citizens (first 3 years)',
                      ][idx]}</span>
                    </li>
                  );
                })}
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
              {ctaLabel()}
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