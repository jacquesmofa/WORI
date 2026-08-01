import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { useTranslation } from 'react-i18next';

export default function AnnualReportsPage() {
  const { t } = useTranslation();
  const pdfUrl = 'https://drive.google.com/uc?export=download&id=1rktOxTQlT8KGbzesyAr_47MYROihlUOJ';
  const googleViewerUrl = 'https://drive.google.com/uc?export=view&id=1rktOxTQlT8KGbzesyAr_47MYROihlUOJ';

  return (
    <PageLayout
      title={t('pages.annualReports.title')}
      subtitle={t('pages.annualReports.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: 'Annual Reports & Financials' },
      ]}
      seo={{
        title: 'Annual Reports & Financials | WORI Transparency',
        description: 'View WORI\'s audited financial reports, annual impact summaries, and T3010 filings. Full transparency on program spending, charitable activities, and organizational accountability.',
        keywords: 'WORI annual report, refugee charity financials, immigrant services transparency, Wadi-Kaja T3010, charity accountability Canada',
        canonicalPath: '/about/annual-reports',
      }}
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
                As a registered Canadian charity (CRN: 748873338RR0001), WORI is committed to the highest standards of financial accountability.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Program Spending', value: '86%' },
                { label: 'Audited Since', value: '2012' },
                { label: 'T3010 Filed', value: 'Annually' },
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

      {/* PDF Report — Google Docs Viewer (seamless, cross-browser, zoom enabled) */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-3">
              WORI Report 2020-2022
            </h2>
            <p className="text-sm text-charcoal-600/60 max-w-xl mx-auto">
              Our comprehensive report covering organizational activities, financial statements, and impact from 2020 through 2022.
            </p>
          </div>

          {/* Zoom Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line" />
                Download PDF
              </a>
              <span className="text-xs text-charcoal-600/50">
                Use browser controls (Ctrl + / Ctrl -) to zoom in and out of the document
              </span>
            </div>
          </div>

          {/* PDF Viewer — Google Docs Viewer proxy for seamless cross-browser display */}
          <div className="rounded-2xl overflow-hidden border border-cream-300/50 bg-white">
            <div className="relative" style={{ height: '850px' }}>
              <iframe
                src={googleViewerUrl}
                title="WORI Report 2020-2022"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen
              />
            </div>
          </div>

          {/* Request copy CTA */}
          <div className="mt-6 text-center">
            <a
              href="mailto:info@wadikajaorganization.org?subject=Request%20for%20WORI%20Report%202020-2022"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              <i className="ri-mail-line" />
              Request a Copy by Email
            </a>
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
            We welcome donor and stakeholder inquiries about our financial stewardship.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
          >
            Contact Us
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}