import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { homeStats } from '@/mocks/homeData';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function ImpactSection() {
  const { t } = useTranslation();
  const { getContent, getImage } = useSiteContent();

  const stats = [
    { value: homeStats.familiesServed.toLocaleString(), label: t('stats.familiesServed') },
    { value: homeStats.languagesSupported.toString(), label: t('stats.languagesSupported') },
    { value: homeStats.volunteersActive.toString(), label: t('stats.volunteersActive') },
    { value: homeStats.yearsOfService.toString(), label: t('stats.yearsOfService') },
  ];

  const impactImage = getImage(
    'impact.image',
    'https://readdy.ai/api/search-image?query=Diverse%20group%20of%20smiling%20refugee%20and%20immigrant%20families%20standing%20together%20in%20a%20bright%20modern%20community%20center%2C%20warm%20natural%20light%2C%20genuine%20happiness%20and%20hope%2C%20multicultural%20community%2C%20warm%20cream%20and%20emerald%20green%20color%20tones%2C%20editorial%20documentary%20photography%2C%20professional%20high-quality&width=800&height=600&seq=impact1&orientation=landscape'
  );

  return (
    <section className="relative bg-cream-100 py-16 md:py-24 overflow-hidden">
      {/* Decorative line pattern */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M0 50 Q25 0 50 50 T100 50" stroke="#0F4C3A" strokeWidth="0.5" />
          <path d="M0 60 Q25 10 50 60 T100 60" stroke="#0F4C3A" strokeWidth="0.5" />
          <path d="M0 40 Q25 -10 50 40 T100 40" stroke="#0F4C3A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="px-6 lg:px-10">
        {/* Upper: Two Column */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={impactImage}
                alt="Diverse community members at WORI settlement center"
                className="w-full h-64 md:h-80 lg:h-96 object-cover object-center"
              />
              {/* Glassmorphic labels */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-cream-100">
                  AODA Compliant
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-cream-100">
                  CRA Registered
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-cream-100">
                  Since 2008
                </span>
              </div>
            </div>
          </div>

          {/* Right: Text + Card */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
                {getContent('impact.label')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-charcoal-700 leading-[1.15] mb-5 text-balance">
                {getContent('impact.title')}
              </h2>
              <p className="text-base text-charcoal-600/70 leading-relaxed">
                {getContent('impact.description')}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-charcoal-600/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Emerald Card */}
            <div className="bg-emerald-800 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-1">
                <span className="text-xs font-medium text-gold-400 uppercase tracking-wider mb-2 block">
                  WORI Awards 2025
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-cream-100 mb-2">
                  Celebrating Community Excellence
                </h3>
                <p className="text-sm text-cream-100/60 leading-relaxed">
                  Our annual gala recognizes the extraordinary contributions of volunteers, donors, and community partners who make our mission possible.
                </p>
              </div>
              <div className="shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Elegant%20gala%20awards%20ceremony%20with%20golden%20trophy%20on%20stage%2C%20warm%20ambient%20lighting%2C%20sophisticated%20event%20photography%2C%20emerald%20green%20and%20gold%20color%20scheme%2C%20shallow%20depth%20of%20field%2C%20prestigious%20atmosphere&width=300&height=300&seq=awards1&orientation=squarish"
                  alt="WORI Awards ceremony"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lower: CTA Bar */}
        <div className="flex items-center justify-between py-5 px-6 md:px-8 bg-cream-200/60 rounded-xl">
          <p className="text-sm text-charcoal-600/70 font-medium">
            Serving communities across Toronto, Ottawa, and beyond
          </p>
          <Link
            to="/about"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            {getContent('impact.cta')}
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}