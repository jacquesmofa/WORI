import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSiteContent } from '@/hooks/useSiteContent';

const PROGRAMS = [
  {
    key: 'private-sponsorship',
    icon: 'ri-hand-heart-line',
    labelKey: 'settlementMenu.privateSponsorship',
    path: '/services/private-sponsorship',
  },
  {
    key: 'settlement',
    icon: 'ri-community-line',
    labelKey: 'settlementMenu.immigrantSettlement',
    path: '/services/settlement',
  },
  {
    key: 'language',
    icon: 'ri-translate-2',
    labelKey: 'settlementMenu.languageServices',
    path: '/services/language-services',
  },
  {
    key: 'youth',
    icon: 'ri-group-line',
    labelKey: 'wellbeingMenu.employment',
    path: '/services/employment',
  },
  {
    key: 'ircc',
    icon: 'ri-file-list-3-line',
    labelKey: 'settlementMenu.ircc',
    path: '/services/ircc',
  },
];

export default function AboutOrgSection() {
  const { t } = useTranslation();
  const { getContent, getImage } = useSiteContent();

  const aboutImage = getImage(
    'about.image',
    'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto/v1784649547/Arrived-Refugee-Photos-page-006_jqrq1l.jpg'
  );

  const aboutDesc = getContent('about.description') ||
    'Wadi-Kaja Organization for Refugees and Immigrants (WORI) is a non-profit organization in Toronto, Canada. The organization helps with refugees, and new immigrants in GTA. The organization also provides settlement services, translation and interpretation for new immigrants to Canada.';

  return (
    <section className="py-14 md:py-20 bg-cream-100">
      <div className="px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start max-w-7xl mx-auto">
          {/* Left: Programs Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-emerald-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-emerald-700">
                <h3 className="font-serif text-xl font-semibold text-cream-100">
                  Our Programs
                </h3>
              </div>
              <ul className="divide-y divide-emerald-700/50">
                {PROGRAMS.map((p) => (
                  <li key={p.key}>
                    <Link
                      to={p.path}
                      className="flex items-center gap-3 px-5 py-3.5 text-cream-100/85 hover:bg-emerald-700 hover:text-cream-100 transition-colors group"
                    >
                      <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gold-500/15 group-hover:bg-gold-500/25 transition-colors shrink-0">
                        <i className={`${p.icon} text-gold-400 text-sm`} />
                      </div>
                      <span className="text-sm font-medium">{t(p.labelKey)}</span>
                      <i className="ri-arrow-right-s-line ml-auto text-cream-100/40 group-hover:text-cream-100/70 text-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Org Description */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-emerald-800 mb-5 leading-tight">
                Wadi-Kaja Organization for Refugee and Immigrant
              </h2>

              <p className="text-base text-charcoal-600/75 leading-relaxed mb-6">
                {aboutDesc}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-7">
                <div className="text-center py-4 px-3 bg-white rounded-xl border border-cream-200">
                  <div className="font-serif text-2xl font-bold text-emerald-800 mb-0.5">12K+</div>
                  <div className="text-xs text-charcoal-600/60 font-medium">Families Served</div>
                </div>
                <div className="text-center py-4 px-3 bg-white rounded-xl border border-cream-200">
                  <div className="font-serif text-2xl font-bold text-emerald-800 mb-0.5">6</div>
                  <div className="text-xs text-charcoal-600/60 font-medium">Languages</div>
                </div>
                <div className="text-center py-4 px-3 bg-white rounded-xl border border-cream-200">
                  <div className="font-serif text-2xl font-bold text-emerald-800 mb-0.5">18</div>
                  <div className="text-xs text-charcoal-600/60 font-medium">Years Active</div>
                </div>
              </div>

              <Link
                to="/about/mission"
                className="inline-flex items-center gap-2 text-emerald-800 font-semibold text-sm hover:text-emerald-700 transition-colors group"
              >
                View Our Vision and Mission
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
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">CRA Registered</span>
                </div>
                <p className="text-xs text-charcoal-600/60 font-medium">Charity No. 748873338RR0001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}