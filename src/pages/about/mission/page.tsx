import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { missionVision } from '@/mocks/pagesData';

export default function MissionPage() {
  return (
    <PageLayout
      title="Mission, Vision & Values"
      subtitle="The foundational principles that guide every service, every partnership, and every decision at WORI."
      bgImage="https://readdy.ai/api/search-image?query=Abstract%20artistic%20composition%20of%20hands%20reaching%20toward%20light%20representing%20hope%20and%20human%20connection%2C%20warm%20golden%20and%20emerald%20green%20tones%2C%20soft%20bokeh%20background%2C%20inspirational%20symbolic%20photography%2C%20high-end%20editorial%20quality&width=1920&height=600&seq=missionhero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: 'Mission, Vision & Values' },
      ]}
    >
      {/* Mission & Vision */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Mission */}
            <div className="bg-emerald-900 rounded-2xl p-8 md:p-10">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500/15 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-5">
                Our Mission
              </span>
              <p className="font-serif text-xl md:text-2xl text-cream-100 leading-relaxed">
                {missionVision.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-cream-200/40 rounded-2xl p-8 md:p-10 border border-cream-300/50">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-5">
                Our Vision
              </span>
              <p className="font-serif text-xl md:text-2xl text-charcoal-700 leading-relaxed">
                {missionVision.vision}
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
              What We Stand For
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700">
              Our Six Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {missionVision.values.map((value) => (
              <div
                key={value.title}
                className="group bg-cream-100 rounded-2xl p-6 md:p-8 border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center mb-5 group-hover:bg-emerald-800/12 transition-colors">
                  <i className={`${value.icon} text-emerald-800 text-xl`} />
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
            Values in Action
          </h2>
          <p className="text-sm md:text-base text-charcoal-600/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every WORI program, partnership, and policy is measured against these six values. Explore how they come alive in our work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/about/executive-director"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              From the Executive Director
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/about/board"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/20 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              Meet the Board
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}