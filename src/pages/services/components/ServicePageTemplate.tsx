import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { servicePages } from '@/mocks/pagesData';

interface ServicePageProps {
  serviceKey: keyof typeof servicePages;
}

export default function ServicePage({ serviceKey }: ServicePageProps) {
  const { t } = useTranslation();
  const data = servicePages[serviceKey];
  if (!data) return null;

  const bgImages: Record<string, string> = {
    settlement: 'https://readdy.ai/api/search-image?query=Diverse%20refugee%20family%20arriving%20at%20a%20modern%20Canadian%20airport%20being%20greeted%20by%20settlement%20workers%20with%20warm%20smiles%2C%20natural%20daylight%2C%20hopeful%20atmosphere%2C%20warm%20cream%20and%20emerald%20green%20tones%2C%20documentary%20editorial%20photography%20style&width=1920&height=600&seq=setthero&orientation=landscape',
    ircc: 'https://readdy.ai/api/search-image?query=Clean%20organized%20government%20office%20desk%20with%20Canadian%20immigration%20documents%20forms%20and%20a%20small%20Canadian%20flag%2C%20warm%20natural%20lighting%2C%20professional%20authoritative%20atmosphere%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20photography&width=1920&height=600&seq=ircchero&orientation=landscape',
    'language-mentorship': 'https://readdy.ai/api/search-image?query=Diverse%20language%20mentor%20and%20newcomer%20student%20sitting%20together%20in%20a%20bright%20modern%20library%20studying%20English%20books%2C%20warm%20collaborative%20atmosphere%2C%20cream%20walls%20and%20natural%20wood%2C%20supportive%20educational%20environment%2C%20editorial%20photography&width=1920&height=600&seq=langhero&orientation=landscape',
    'private-sponsorship': 'https://readdy.ai/api/search-image?query=Diverse%20Canadian%20community%20group%20gathered%20around%20a%20table%20discussing%20sponsorship%20paperwork%20in%20a%20bright%20community%20center%2C%20warm%20natural%20light%2C%20collaborative%20hopeful%20atmosphere%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20photography&width=1920&height=600&seq=privhero&orientation=landscape',
    'language-services': 'https://readdy.ai/api/search-image?query=Professional%20interpreter%20headset%20and%20translation%20documents%20on%20a%20modern%20conference%20table%2C%20multicultural%20professional%20setting%2C%20warm%20natural%20lighting%2C%20cream%20and%20emerald%20green%20tones%2C%20high-end%20editorial%20photography&width=1920&height=600&seq=langshero&orientation=landscape',
    'mental-health': 'https://readdy.ai/api/search-image?query=Calm%20welcoming%20therapy%20office%20with%20comfortable%20seating%20and%20soft%20natural%20light%20through%20large%20windows%2C%20peaceful%20healing%20atmosphere%2C%20warm%20cream%20and%20sage%20green%20tones%2C%20mental%20health%20wellness%20space%2C%20editorial%20photography&width=1920&height=600&seq=mentalhero&orientation=landscape',
    employment: 'https://readdy.ai/api/search-image?query=Diverse%20professionals%20in%20a%20modern%20Canadian%20office%20having%20a%20productive%20meeting%2C%20warm%20collaborative%20atmosphere%2C%20contemporary%20workspace%20with%20natural%20light%2C%20career%20success%20and%20opportunity%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20photography&width=1920&height=600&seq=emphero&orientation=landscape',
    housing: 'https://readdy.ai/api/search-image?query=Warm%20modern%20apartment%20building%20exterior%20with%20diverse%20families%20entering%20their%20homes%2C%20golden%20hour%20sunlight%2C%20welcoming%20residential%20community%2C%20safe%20and%20dignified%20housing%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20photography&width=1920&height=600&seq=houshero&orientation=landscape',
    'women-empowerment': 'https://readdy.ai/api/search-image?query=Group%20of%20empowered%20diverse%20women%20in%20a%20modern%20workshop%20setting%20collaborating%20and%20learning%20together%2C%20bright%20warm%20lighting%2C%20confident%20expressions%2C%20cream%20and%20emerald%20green%20tones%2C%20community%20strength%2C%20editorial%20photography&width=1920&height=600&seq=womenhero&orientation=landscape',
    seniors: 'https://readdy.ai/api/search-image?query=Warm%20community%20center%20with%20elderly%20newcomers%20enjoying%20a%20social%20gathering%2C%20traditional%20tea%20and%20conversation%2C%20intergenerational%20connection%2C%20soft%20natural%20lighting%2C%20cream%20and%20warm%20earth%20tones%2C%20dignified%20elder%20care%2C%20editorial%20photography&width=1920&height=600&seq=senhero&orientation=landscape',
    'food-security': 'https://readdy.ai/api/search-image?query=Volunteers%20packing%20culturally%20diverse%20food%20hampers%20in%20a%20bright%20modern%20food%20bank%2C%20warm%20compassionate%20atmosphere%2C%20fresh%20produce%20and%20staple%20foods%2C%20community%20solidarity%2C%20cream%20and%20emerald%20green%20tones%2C%20documentary%20photography&width=1920&height=600&seq=foodhero&orientation=landscape',
  };

  const serviceNames: Record<string, string> = {
    settlement: 'Settlement & Resources',
    ircc: 'Settlement & Resources',
    'language-mentorship': 'Settlement & Resources',
    'private-sponsorship': 'Settlement & Resources',
    'language-services': 'Settlement & Resources',
    'mental-health': 'Wellbeing & Empowerment',
    employment: 'Wellbeing & Empowerment',
    housing: 'Wellbeing & Empowerment',
    'women-empowerment': 'Wellbeing & Empowerment',
    seniors: 'Wellbeing & Empowerment',
    'food-security': 'Wellbeing & Empowerment',
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
  };

  return (
    <PageLayout
      title={data.heroTitle}
      subtitle={data.heroSubtitle}
      bgImage={bgImages[serviceKey] || bgImages.settlement}
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: serviceNames[serviceKey], path: servicePaths[serviceKey].split('/').slice(0, 2).join('/') + '/*' },
        { label: data.heroTitle },
      ]}
    >
      {/* Content Sections */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
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
                      src={`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%60$%7Bsection.title%7D%20related%20scene%2C%20warm%20compassionate%20community%20support%2C%20diverse%20people%2C%20editorial%20photography%20style%2C%20cream%20and%20emerald%20green%20tones%2C%20high-end%20quality%60%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%7D&width=700&height=520&seq=${serviceKey}sec${idx}&orientation=landscape`}
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
                  <p className="text-base text-charcoal-600/70 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-emerald-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl md:text-4xl font-semibold text-gold-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-cream-100/60">{stat.label}</div>
              </div>
            ))}
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
              to="/services/settlement"
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