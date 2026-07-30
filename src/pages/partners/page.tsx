import PageLayout from '@/components/feature/PageLayout';
import { partnersData } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function PartnersPage() {
  return (
    <PageLayout
      title="Partners & Funders"
      subtitle="WORI's work is made possible by the generous support of government partners, foundations, corporate sponsors, and community organizations."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649639/Day23_img30_qdnr0n.jpg"
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
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-gold-500/20 hover:shadow-md hover:shadow-emerald-900/5 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-cream-200 flex items-center justify-center shrink-0 overflow-hidden p-2">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors">{p.name}</h3>
                  <span className="text-xs text-charcoal-600/50">{p.level} Partner</span>
                </div>
                <i className="ri-arrow-right-up-line text-charcoal-600/30 group-hover:text-gold-600 ml-auto transition-all" />
              </a>
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
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-cream-100 border border-cream-300/40 hover:border-gold-500/20 hover:shadow-md hover:shadow-emerald-900/5 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-cream-200 flex items-center justify-center mb-3 overflow-hidden p-2">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors mb-1">{p.name}</h3>
                <span className="text-xs text-charcoal-600/50">Focus: {p.focus}</span>
              </a>
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
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-gold-500/20 hover:shadow-md hover:shadow-emerald-900/5 transition-all cursor-pointer group text-center"
              >
                <div className="w-14 h-14 rounded-lg bg-white border border-cream-200 flex items-center justify-center mx-auto mb-3 overflow-hidden p-2">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors mb-1">{p.name}</h3>
                <span className="text-xs text-charcoal-600/50">{p.category}</span>
              </a>
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
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-cream-100 border border-cream-300/40 hover:border-gold-500/20 hover:shadow-md hover:shadow-emerald-900/5 transition-all cursor-pointer group flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-cream-200 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-charcoal-700 group-hover:text-emerald-800 transition-colors">{p.name}</h3>
                  <span className="text-xs text-charcoal-600/50">{p.type}</span>
                </div>
                <i className="ri-arrow-right-up-line text-charcoal-600/30 group-hover:text-gold-600 ml-auto transition-all shrink-0" />
              </a>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              Contact Partnerships Team
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all whitespace-nowrap"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}