import PageLayout from '@/components/feature/PageLayout';
import { partnersData } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function PartnersPage() {
  return (
    <PageLayout
      title="Partners & Funders"
      subtitle="WORI's work is made possible by the generous support of government partners, foundations, corporate sponsors, and community organizations."
      bgImage="https://readdy.ai/api/search-image?query=Prestigious%20partnership%20event%20with%20elegant%20banners%20and%20diverse%20attendees%20networking%20in%20a%20modern%20conference%20hall%2C%20warm%20golden%20lighting%2C%20cream%20and%20emerald%20green%20decor%2C%20professional%20corporate%20atmosphere%2C%20editorial%20photography&width=1920&height=600&seq=partnershero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'Partners & Funders' },
      ]}
    >
      {/* Government Partners */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
            Government
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Government Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partnersData.government.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 p-5 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-gold-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0">
                  <i className="ri-government-line text-emerald-800 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal-700">{p.name}</h3>
                  <span className="text-xs text-charcoal-600/50">{p.level} Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundations */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
            Foundations
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Foundation Supporters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnersData.foundations.map((p) => (
              <div
                key={p.name}
                className="p-5 rounded-xl bg-cream-100 border border-cream-300/40 hover:border-gold-500/20 transition-all hover:shadow-md hover:shadow-emerald-900/5"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center mb-3">
                  <i className="ri-hand-heart-line text-gold-600 text-lg" />
                </div>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{p.name}</h3>
                <span className="text-xs text-charcoal-600/50">Focus: {p.focus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
            Corporate
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Corporate Sponsors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnersData.corporate.map((p) => (
              <div
                key={p.name}
                className="p-5 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-gold-500/20 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-800/8 flex items-center justify-center mx-auto mb-3">
                  <i className="ri-building-4-line text-emerald-800 text-lg" />
                </div>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{p.name}</h3>
                <span className="text-xs text-charcoal-600/50">{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
            Community
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Community Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnersData.community.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl bg-cream-100 border border-cream-300/40 hover:border-gold-500/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-community-line text-emerald-800 text-sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal-700">{p.name}</h3>
                    <span className="text-xs text-charcoal-600/50">{p.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            Become a Partner
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-6 max-w-xl mx-auto leading-relaxed">
            Whether you represent a corporation, foundation, government body, or community organization, we would be honored to explore partnership opportunities with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              Contact Partnerships Team
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}