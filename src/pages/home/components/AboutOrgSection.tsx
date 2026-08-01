import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSiteContent } from '@/hooks/useSiteContent';

const SETTLEMENT_PROGRAMS = [
  { key: 'ircc', icon: 'ri-government-line', labelKey: 'settlementMenu.ircc', path: '/services/ircc' },
  { key: 'language-mentorship', icon: 'ri-chat-1-line', labelKey: 'settlementMenu.languageMentorship', path: '/services/language-mentorship' },
  { key: 'private-sponsorship', icon: 'ri-hand-heart-line', labelKey: 'settlementMenu.privateSponsorship', path: '/services/private-sponsorship' },
  { key: 'settlement', icon: 'ri-home-heart-line', labelKey: 'settlementMenu.immigrantSettlement', path: '/services/settlement' },
  { key: 'language-services', icon: 'ri-translate-2', labelKey: 'settlementMenu.languageServices', path: '/services/language-services' },
];

const WELLBEING_PROGRAMS = [
  { key: 'youth', icon: 'ri-user-star-line', labelKey: 'wellbeingMenu.youth', path: '/services/youth' },
  { key: 'employment', icon: 'ri-briefcase-line', labelKey: 'wellbeingMenu.employment', path: '/services/employment' },
  { key: 'mental-health', icon: 'ri-mental-health-line', labelKey: 'wellbeingMenu.mentalHealth', path: '/services/mental-health' },
  { key: 'housing', icon: 'ri-building-2-line', labelKey: 'wellbeingMenu.housing', path: '/services/housing' },
  { key: 'women-empowerment', icon: 'ri-women-line', labelKey: 'wellbeingMenu.womenEmpowerment', path: '/services/women-empowerment' },
  { key: 'seniors', icon: 'ri-user-heart-line', labelKey: 'wellbeingMenu.seniors', path: '/services/seniors' },
  { key: 'food-security', icon: 'ri-restaurant-2-line', labelKey: 'wellbeingMenu.foodSecurity', path: '/services/food-security' },
];

const COMMUNITY_PROGRAMS = [
  { key: 'community-engagement', icon: 'ri-group-line', labelKey: 'wellbeingMenu.communityEngagement', path: '/services/community-engagement' },
  { key: 'event-celebrations', icon: 'ri-calendar-event-line', labelKey: 'wellbeingMenu.eventCelebrations', path: '/events' },
];

export default function AboutOrgSection() {
  const { t } = useTranslation();
  const { getContent, getImage } = useSiteContent();

  const aboutImage = getImage(
    'about.image',
    'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649547/Arrived-Refugee-Photos-page-006_jqrq1l.jpg'
  );

  const renderProgramItem = (p: typeof SETTLEMENT_PROGRAMS[number]) => (
    <li key={p.key}>
      <Link
        to={p.path}
        className="flex items-center gap-3 px-5 py-2.5 text-cream-100/85 hover:bg-emerald-700 hover:text-cream-100 transition-colors group"
      >
        <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gold-500/15 group-hover:bg-gold-500/25 transition-colors shrink-0">
          <i className={`${p.icon} text-gold-400 text-sm`} />
        </div>
        <span className="text-sm font-medium leading-snug">{t(p.labelKey)}</span>
        <i className="ri-arrow-right-s-line ml-auto text-cream-100/40 group-hover:text-cream-100/70 text-sm" />
      </Link>
    </li>
  );

  return (
    <section className="py-14 md:py-20 bg-cream-100">
      <div className="px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start max-w-7xl mx-auto">
          {/* Left: Programs Sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <div className="bg-emerald-800 rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/10">
              {/* Header */}
              <div className="px-5 py-4 border-b border-emerald-700/60 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-cream-100">
                  {t('programs.sectionTitle')}
                </h3>
                <span className="text-[10px] font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t('programs.badgeCount')}
                </span>
              </div>

              {/* Settlement & Resources */}
              <div className="px-5 pt-3 pb-1">
                <span className="text-[10px] font-bold text-gold-400/70 uppercase tracking-[0.15em]">
                  {t('programs.catSettlement')}
                </span>
              </div>
              <ul className="divide-y divide-emerald-700/30">
                {SETTLEMENT_PROGRAMS.map(renderProgramItem)}
              </ul>

              {/* Wellbeing & Empowerment */}
              <div className="px-5 pt-3 pb-1 border-t border-emerald-700/30">
                <span className="text-[10px] font-bold text-gold-400/70 uppercase tracking-[0.15em]">
                  {t('programs.catWellbeing')}
                </span>
              </div>
              <ul className="divide-y divide-emerald-700/30">
                {WELLBEING_PROGRAMS.map(renderProgramItem)}
              </ul>

              {/* Community & Events */}
              <div className="px-5 pt-3 pb-1 border-t border-emerald-700/30">
                <span className="text-[10px] font-bold text-gold-400/70 uppercase tracking-[0.15em]">
                  {t('programs.catCommunity')}
                </span>
              </div>
              <ul className="divide-y divide-emerald-700/30">
                {COMMUNITY_PROGRAMS.map(renderProgramItem)}
              </ul>

              {/* View All Link */}
              <div className="px-5 py-3 border-t border-emerald-700/60 bg-emerald-800">
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group"
                >
                  <span>{t('common.viewAllPrograms')}</span>
                  <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Org Description */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-emerald-800 mb-5 leading-tight">
                {t('programs.orgName')}
              </h2>

              <p className="text-base text-charcoal-600/75 leading-relaxed mb-5">
                {t('programs.orgDesc')}
              </p>

              <Link
                to="/about/mission"
                className="inline-flex items-center gap-2 text-emerald-800 font-semibold text-sm hover:text-emerald-700 transition-colors group"
              >
                {t('common.viewOurVision')}
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* About Image */}
            <div className="w-full lg:w-64 xl:w-72 shrink-0">
              <div className="rounded-2xl overflow-hidden" style={{ height: '280px' }}>
                <img
                  src={aboutImage}
                  alt="WORI community members"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl border border-cream-200">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-shield-check-fill text-emerald-700 text-sm" />
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">{t('common.craRegistered')}</span>
                </div>
                <p className="text-xs text-charcoal-600/60 font-medium">{t('programs.charityNo')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}