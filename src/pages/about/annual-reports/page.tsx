import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { annualReports } from '@/mocks/pagesData';

export default function AnnualReportsPage() {
  return (
    <PageLayout
      title="Annual Reports & Financials"
      subtitle="Full financial transparency and impact reporting. Every dollar is accounted for, every outcome is measured."
      bgImage="https://readdy.ai/api/search-image?query=Professional%20financial%20documents%20and%20annual%20report%20covers%20spread%20on%20a%20polished%20mahogany%20desk%2C%20warm%20natural%20lighting%2C%20elegant%20typography%20and%20charts%20visible%2C%20cream%20and%20emerald%20green%20color%20tones%2C%20high-end%20editorial%20photography&width=1920&height=600&seq=reporthero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: 'Annual Reports & Financials' },
      ]}
    >
      {/* Financial Transparency */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-1">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
                Accountability
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 leading-tight mb-4">
                Radical Transparency
              </h2>
              <p className="text-sm text-charcoal-600/60 leading-relaxed">
                As a registered Canadian charity (CRN: 748873338RR0001), WORI is committed to the highest standards of financial accountability. Every annual report includes audited financial statements, impact metrics, and third-party evaluations.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Revenue 2024', value: '$4.2M' },
                { label: 'Program Spending', value: '86%' },
                { label: 'Admin & Fundraising', value: '14%' },
                { label: 'Audited Since', value: '2012' },
                { label: 'T3010 Filed', value: 'Annually' },
                { label: 'Charity Rating', value: 'Platinum' },
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

      {/* Reports */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-10">
            Annual Reports Archive
          </h2>

          <div className="space-y-5">
            {annualReports.map((report) => (
              <div
                key={report.year}
                className="group bg-cream-100 rounded-2xl p-6 md:p-8 border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="shrink-0 w-20 h-20 rounded-xl bg-emerald-800 flex flex-col items-center justify-center text-cream-100">
                    <span className="text-xs font-medium opacity-70">Year</span>
                    <span className="font-serif text-lg font-bold">{report.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2 group-hover:text-emerald-800 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed mb-4">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {report.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-lg bg-emerald-800/6 text-emerald-800 text-xs font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal-700/15 hover:border-emerald-800/40 text-charcoal-700 text-sm font-medium rounded-full transition-all group-hover:bg-emerald-800/5">
                    <i className="ri-download-line" />
                    Download PDF
                  </button>
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
            Have Questions About Our Finances?
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-6 max-w-xl mx-auto">
            We welcome donor and stakeholder inquiries about our financial stewardship. Our Finance Director is available for direct conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
          >
            Contact Finance Office
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}