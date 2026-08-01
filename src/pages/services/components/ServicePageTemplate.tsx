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
    `${CLD}/v1784649543/Arrived-Refugee-Photos-page-004_orwibh.jpg`,
    `${CLD}/v1784649649/Day23_img34_ghbgnh.jpg`,
    `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
    `${CLD}/v1784649674/Day23_img44_fkgdgq.jpg`,
    `${CLD}/v1784649550/Arrived-Refugee-Photos-page-008_e6teua.jpg`,
    `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    `${CLD}/v1784649567/Arrived-Refugee-Photos-page-011_rtygf7.jpg`,
    `${CLD}/v1784649604/Day23_img14_e7dzgv.jpg`,
  ],
  ircc: [
    `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    `${CLD}/v1784295067/IMG-20201006-WA0161_g4vz3n.jpg`,
    `${CLD}/v1784295065/IMG-20201006-WA0158_zszvac.jpg`,
    `${CLD}/v1784295059/IMG-20201006-WA0110_igfxya.jpg`,
    `${CLD}/v1784295055/IMG-20201006-WA0094_evrdcc.jpg`,
    `${CLD}/v1784295048/IMG-20201006-WA0075_cjxny2.jpg`,
    `${CLD}/v1784295037/IMG-20201006-WA0049_r9eutl.jpg`,
    `${CLD}/v1784294998/IMG-20200922-WA0077_z4rcqe.jpg`,
  ],
  'language-mentorship': [
    `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    `${CLD}/v1784649622/Day23_img22_moiseg.jpg`,
    `${CLD}/v1784649654/Day23_img38_l0g3ac.jpg`,
    `${CLD}/v1784649647/Day23_img33_di2orl.jpg`,
    `${CLD}/v1784295067/IMG-20201006-WA0091_irqvja.jpg`,
    `${CLD}/v1784295057/IMG-20201006-WA0099_qpsqui.jpg`,
    `${CLD}/v1784295016/IMG-20200929-WA0088_bqjh5b.jpg`,
    `${CLD}/v1784649612/Day23_img18_mzwoko.jpg`,
  ],
  'private-sponsorship': [
    `${CLD}/v1784649535/Arrived-Refugee-Photos-page-001_grvjts.jpg`,
    `${CLD}/v1784649538/Arrived-Refugee-Photos-page-002_gwzljx.jpg`,
    `${CLD}/v1784649540/Arrived-Refugee-Photos-page-003_pw0kaj.jpg`,
    `${CLD}/v1784649547/Arrived-Refugee-Photos-page-006_jqrq1l.jpg`,
    `${CLD}/v1784649555/Arrived-Refugee-Photos-page-009_sgctuy.jpg`,
    `${CLD}/v1784649557/Arrived-Refugee-Photos-page-010_cq79yl.jpg`,
    `${CLD}/v1784649565/Arrived-Refugee-Photos-page-014_gm7qef.jpg`,
    `${CLD}/v1784649518/Arrived-Refugee-Photos-17_iffhdb.jpg`,
  ],
  'language-services': [
    `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    `${CLD}/v1784295062/IMG-20201006-WA0124_ijkkru.jpg`,
    `${CLD}/v1784649597/Day23_img12_gaorcc.jpg`,
    `${CLD}/v1784649579/Day23_img4_bwozyq.jpg`,
    `${CLD}/v1784295051/IMG-20201006-WA0084_oljwjr.jpg`,
    `${CLD}/v1784295041/IMG-20201006-WA0155_jnkngk.jpg`,
    `${CLD}/v1784649617/Day23_img21_kru1y9.jpg`,
    `${CLD}/v1784649632/Day23_img25_tv7gfm.jpg`,
  ],
  'mental-health': [
    `${CLD}/v1784648610/yoga-session-img20_l4w0jx.jpg`,
    `${CLD}/v1784648568/yoga-session-img1_vnjmwh.jpg`,
    `${CLD}/v1784648614/yoga-session-img22_eezl8t.jpg`,
    `${CLD}/v1784648645/yoga-session-img39_cwys01.jpg`,
    `${CLD}/v1784648629/yoga-session-img29_igaxx9.jpg`,
    `${CLD}/v1784648649/yoga-session-img34_jfqvxy.jpg`,
    `${CLD}/v1784648651/yoga-session-img40_etdqql.jpg`,
    `${CLD}/v1784648559/yoga-session-img53_dnidc7.jpg`,
  ],
  employment: [
    `${CLD}/v1784295067/IMG-20201006-WA0161_g4vz3n.jpg`,
    `${CLD}/v1784295066/IMG-20201006-WA0160_qnnfyq.jpg`,
    `${CLD}/v1784295056/IMG-20201006-WA0104_txhn3t.jpg`,
    `${CLD}/v1784295044/IMG-20201006-WA0057_k4wyj6.jpg`,
    `${CLD}/v1784295000/IMG-20201006-WA0009_inusqi.jpg`,
    `${CLD}/v1784294990/IMG-20200922-WA0033_gmpa4k.jpg`,
    `${CLD}/v1784649594/Day23_img10_e3iej2.jpg`,
    `${CLD}/v1784649664/Day23_img40_ci4dlt.jpg`,
  ],
  housing: [
    `${CLD}/v1784649560/Arrived-Refugee-Photos-page-012_ocnovf.jpg`,
    `${CLD}/v1784649562/Arrived-Refugee-Photos-page-013_vllclz.jpg`,
    `${CLD}/v1784649572/Day23_img2_ghcsds.jpg`,
    `${CLD}/v1784649589/Day23_img9_tndnvx.jpg`,
    `${CLD}/v1784295025/IMG-20201006-WA0014_qj8ukd.jpg`,
    `${CLD}/v1784295014/IMG-20200922-WA0071_wov2ky.jpg`,
    `${CLD}/v1784649642/Day23_img31_juj7wt.jpg`,
    `${CLD}/v1784649577/Day23_img5_umnepc.jpg`,
  ],
  'women-empowerment': [
    `${CLD}/v1784298529/wori-awards-14-1536x1024_axrgst.jpg`,
    `${CLD}/v1784298432/wori-awards-12-1536x1024_tjvoe9.jpg`,
    `${CLD}/v1784298443/wori-awards-14-1536x1024_axrgst.jpg`,
    `${CLD}/v1784298405/wori-awards-8-1536x1024_yet9b1.jpg`,
    `${CLD}/v1784295042/IMG-20201006-WA0056_ijybpe.jpg`,
    `${CLD}/v1784295017/IMG-20200929-WA0097_zdgpmf.jpg`,
    `${CLD}/v1784294993/IMG-20200922-WA0055_eoqtql.jpg`,
    `${CLD}/v1784649661/Day23_img35_pm6vpe.jpg`,
  ],
  seniors: [
    `${CLD}/v1784646872/Photo-1_idgega.jpg`,
    `${CLD}/v1784646873/Photo-2_cb6klb.jpg`,
    `${CLD}/v1784646875/Photo-3_slxubn.jpg`,
    `${CLD}/v1784646879/Photo-6_krdh5d.jpg`,
    `${CLD}/v1784646880/Photo-8_gtdqgv.jpg`,
    `${CLD}/v1784646882/Photo-9_mlkds6.jpg`,
    `${CLD}/v1784298597/Photo-5-1024x682_kli91d.jpg`,
    `${CLD}/v1784298590/Photo-7-1024x682_prr2hx.jpg`,
  ],
  'food-security': [
    `${CLD}/v1784295210/IMG_20200424_121422_452_hunip7.jpg`,
    `${CLD}/v1784295209/IMG_20200424_121004_354_vfyb7r.jpg`,
    `${CLD}/v1784295208/IMG_20200424_121918_579_lvs4si.jpg`,
    `${CLD}/v1784295206/IMG_20200424_121918_572_rlpdxm.jpg`,
    `${CLD}/v1784295204/IMG_20200424_121748_031_cpzyus.jpg`,
    `${CLD}/v1784295197/IMG_20200424_121004_338_p0gp0s.jpg`,
    `${CLD}/v1784295196/IMG_20200424_120850_071_zd5c1c.jpg`,
    `${CLD}/v1784295180/IMG_20200424_121748_036_ye0px5.jpg`,
  ],
  youth: [
    `${CLD}/v1784649622/Day23_img22_moiseg.jpg`,
    `${CLD}/v1784649629/Day23_img26_l3hthg.jpg`,
    `${CLD}/v1784649651/Day23_img37_itvlry.jpg`,
    `${CLD}/v1784649656/Day23_img36_fqvpuh.jpg`,
    `${CLD}/v1784649587/Day23_img8_plxkyf.jpg`,
    `${CLD}/v1784649584/Day23_img6_imozlc.jpg`,
    `${CLD}/v1784649574/Day23_img3_a5fwyu.jpg`,
    `${CLD}/v1784649570/Day23_img1_ncz57d.jpg`,
  ],
  'community-engagement': [
    `${CLD}/v1785062749/Wadi-Kaja-canada-day-2026_bwe3qt.jpg`,
    `${CLD}/v1784650837/Canada-Day-2022_uvumg9.jpg`,
    `${CLD}/v1784298489/wori-awards-20-1536x1024_uqyztr.jpg`,
    `${CLD}/v1784298013/wori-awards-20-2000x1200_ewun79.jpg`,
    `${CLD}/v1784298411/wori-awards-9-2048x1365_upzyxt.jpg`,
    `${CLD}/v1784298395/wori-awards-6-1536x1024_jd80a2.jpg`,
    `${CLD}/v1784298389/wori-awards-4-1536x1024_d46mfl.jpg`,
    `${CLD}/v1784298377/wori-awards-1-2048x1365_m59hir.jpg`,
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