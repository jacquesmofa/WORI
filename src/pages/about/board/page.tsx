import PageLayout from '@/components/feature/PageLayout';
import { boardMembers } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function BoardPage() {
  return (
    <PageLayout
      title="Board & Management"
      subtitle="Meet the diverse team of leaders, professionals, and community advocates who govern WORI with integrity and vision."
      bgImage="https://readdy.ai/api/search-image?query=Diverse%20professional%20board%20members%20in%20a%20prestigious%20meeting%20room%20with%20warm%20natural%20lighting%2C%20collaborative%20discussion%20around%20a%20polished%20table%2C%20cream%20and%20emerald%20green%20tones%2C%20high-end%20corporate%20editorial%20photography&width=1920&height=600&seq=boardhero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: 'Board & Management' },
      ]}
    >
      {/* Governance Overview */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-1">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
                Governance
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 leading-tight mb-4">
                Stewardship with Purpose
              </h2>
              <p className="text-sm text-charcoal-600/60 leading-relaxed mb-4">
                WORI is governed by a volunteer Board of Directors who bring expertise in refugee law, finance, community organizing, mental health, philanthropy, and youth leadership.
              </p>
              <p className="text-sm text-charcoal-600/60 leading-relaxed">
                The Board meets quarterly, oversees strategic direction, ensures financial accountability, and maintains full compliance with Canada Revenue Agency charitable regulations.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Board Members', value: '6' },
                { label: 'Average Tenure', value: '5.2 Years' },
                { label: 'Diverse Backgrounds', value: '4 Continents' },
                { label: 'Annual Reviews', value: '100%' },
                { label: 'Independent', value: 'Non-Profit' },
                { label: 'CRA Compliant', value: 'Since 2012' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-cream-200/40 rounded-xl p-4 text-center border border-cream-300/40"
                >
                  <div className="font-serif text-xl font-semibold text-emerald-800 mb-1">{stat.value}</div>
                  <div className="text-xs text-charcoal-600/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Grid */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 text-center mb-12">
            Board of Directors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-cream-100 rounded-2xl overflow-hidden border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-0.5">{member.name}</h3>
                  <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-sm text-charcoal-600/60 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team Placeholder */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Senior Management Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Dr. Layla Mahmoud', role: 'Executive Director' },
              { name: 'Tariq Hassan', role: 'Director of Settlement Services' },
              { name: 'Dr. Priya Nair', role: 'Director of Wellbeing Programs' },
              { name: 'Marcus Johnson', role: 'Director of Development & Partnerships' },
              { name: 'Amira Khalil', role: 'Director of Communications & Advocacy' },
              { name: 'Robert Chen', role: 'Director of Finance & Operations' },
            ].map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-cream-200/30 border border-cream-300/40"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-800/8 flex items-center justify-center shrink-0">
                  <span className="font-serif text-emerald-800 font-semibold text-sm">
                    {person.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700">{person.name}</h4>
                  <p className="text-xs text-charcoal-600/50">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-emerald-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-cream-100 mb-4">
            Governance Documents
          </h2>
          <p className="text-sm text-cream-100/60 mb-8 max-w-xl mx-auto">
            WORI maintains full transparency. Access our by-laws, governance policies, and board meeting minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/about/annual-reports"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
            >
              Annual Reports
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-cream-100/30 hover:border-cream-100/60 text-cream-100 text-sm font-medium rounded-full transition-all"
            >
              Governance Inquiries
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}