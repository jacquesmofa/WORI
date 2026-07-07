import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { aboutTimeline, missionVision } from '@/mocks/pagesData';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title="About WORI"
      subtitle="A Canadian charity committed to empowering refugees and immigrants with dignity, services, and belonging since 2008."
      bgImage="https://readdy.ai/api/search-image?query=Elegant%20corporate%20governance%20boardroom%20with%20diverse%20professionals%20in%20formal%20attire%20sitting%20around%20a%20polished%20mahogany%20conference%20table%2C%20warm%20natural%20lighting%20through%20large%20windows%2C%20soft%20cream%20and%20emerald%20green%20tones%2C%20prestigious%20institutional%20atmosphere%2C%20high-end%20photography%20style&width=1920&height=600&seq=abouthero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance' },
        { label: 'About WORI' },
      ]}
    >
      {/* Mission Preview */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
                Our Purpose
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700 leading-tight mb-5">
                Mission, Vision & Values
              </h2>
              <p className="text-base text-charcoal-600/70 leading-relaxed mb-4">
                {missionVision.mission}
              </p>
              <p className="text-base text-charcoal-600/70 leading-relaxed mb-6">
                {missionVision.vision}
              </p>
              <Link
                to="/about/mission"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
              >
                Explore Our Values
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
            <div className="bg-cream-200/40 rounded-2xl p-6 md:p-8">
              <h3 className="font-serif text-lg text-charcoal-700 mb-4">Our Core Values</h3>
              <div className="space-y-4">
                {missionVision.values.slice(0, 4).map((v) => (
                  <div key={v.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0 mt-0.5">
                      <i className={`${v.icon} text-emerald-800 text-sm`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal-700">{v.title}</h4>
                      <p className="text-xs text-charcoal-600/60 leading-relaxed mt-0.5">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about/mission"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-800 hover:text-emerald-700 transition-colors"
              >
                View all six values <i className="ri-arrow-right-line text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links to Subpages */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 text-center mb-10">
            Institutional Trust & Transparency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Mission, Vision & Values',
                desc: 'The principles that guide every service we deliver.',
                path: '/about/mission',
                icon: 'ri-compass-3-line',
              },
              {
                title: "Executive Director's Desk",
                desc: 'Annual letters, announcements, and public communications.',
                path: '/about/executive-director',
                icon: 'ri-user-star-line',
              },
              {
                title: 'Board & Management',
                desc: 'Meet the governance team stewarding our mission.',
                path: '/about/board',
                icon: 'ri-team-line',
              },
              {
                title: 'Annual Reports & Financials',
                desc: 'Full transparency on impact, finances, and accountability.',
                path: '/about/annual-reports',
                icon: 'ri-file-chart-line',
              },
            ].map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className="group bg-cream-100 rounded-2xl p-6 border border-cream-300/50 hover:border-gold-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center mb-4 group-hover:bg-emerald-800/12 transition-colors">
                  <i className={`${card.icon} text-emerald-800 text-lg`} />
                </div>
                <h3 className="font-serif text-base font-medium text-charcoal-700 mb-2 group-hover:text-emerald-800 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-charcoal-600/60 leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
              Since 2008
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700">
              Our Journey of Impact
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-emerald-800/15 md:-translate-x-px" />

            <div className="space-y-10 md:space-y-14">
              {aboutTimeline.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-gold-500 border-2 border-cream-100 md:-translate-x-1.5 z-10" />

                  {/* Content */}
                  <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                    <div className={`inline-flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="font-serif text-xl font-semibold text-emerald-800">{item.year}</span>
                      {item.milestone && (
                        <span className="px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-600 text-[10px] font-semibold uppercase tracking-wider">
                          Milestone
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">{item.title}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-emerald-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-cream-100 mb-4">
            Join the WORI Community
          </h2>
          <p className="text-sm md:text-base text-cream-100/60 mb-8 leading-relaxed">
            Whether you donate, volunteer, partner, or seek services — you are part of building a more welcoming Canada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
            >
              {t('nav.donate')}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-cream-100/30 hover:border-cream-100/60 text-cream-100 text-sm font-medium rounded-full transition-all"
            >
              {t('nav.volunteer')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}