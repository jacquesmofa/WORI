import PageLayout from '@/components/feature/PageLayout';
import { executiveDirector } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function ExecutiveDirectorPage() {
  const paragraphs = executiveDirector.letter.split('\n\n');

  return (
    <PageLayout
      title="Executive Director's Desk"
      subtitle="Annual letters, public announcements, and reflections from the leadership of WORI."
      bgImage="https://readdy.ai/api/search-image?query=Elegant%20executive%20office%20with%20floor-to-ceiling%20windows%20overlooking%20a%20green%20cityscape%2C%20polished%20wood%20desk%20with%20books%20and%20papers%2C%20warm%20afternoon%20light%2C%20prestigious%20institutional%20atmosphere%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20photography%20style&width=1920&height=600&seq=exechero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: "Executive Director's Desk" },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Portrait & Info */}
            <div className="w-full lg:w-2/5 shrink-0">
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src={executiveDirector.image}
                  alt={executiveDirector.name}
                  className="w-full h-80 md:h-96 lg:h-[480px] object-cover object-top"
                />
              </div>
              <h2 className="font-serif text-xl font-medium text-charcoal-700 mb-1">
                {executiveDirector.name}
              </h2>
              <p className="text-sm text-gold-600 font-medium mb-4">
                {executiveDirector.title}
              </p>
              <div className="space-y-2 text-sm text-charcoal-600/60">
                <p>
                  <i className="ri-mail-line mr-2 text-emerald-800" />
                  director@wori.org
                </p>
                <p>
                  <i className="ri-phone-line mr-2 text-emerald-800" />
                  +1 (416) 555-0140
                </p>
                <p>
                  <i className="ri-calendar-line mr-2 text-emerald-800" />
                  Serving since 2008
                </p>
              </div>
            </div>

            {/* Letter */}
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-5">
                Annual Letter — 2026
              </span>

              <div className="space-y-5">
                {paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className={`text-base text-charcoal-600/80 leading-relaxed ${
                      idx === paragraphs.length - 1 ? 'font-serif text-lg text-charcoal-700 mt-6' : ''
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-cream-300/50">
                <h3 className="font-serif text-lg text-charcoal-700 mb-4">More from the Director's Desk</h3>
                <div className="space-y-3">
                  {[
                    { label: '2025 Annual Letter', date: 'January 2025' },
                    { label: 'WORI Awards 2025 Opening Remarks', date: 'November 2025' },
                    { label: 'Response to Sudan Crisis', date: 'February 2026' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 px-4 rounded-xl bg-cream-200/30 hover:bg-cream-200/50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-charcoal-700">{item.label}</span>
                      <span className="text-xs text-charcoal-600/50">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            Connect with Leadership
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-6 max-w-xl mx-auto">
            For media inquiries, partnership proposals, or speaking requests, please reach out to the Executive Director's office.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
          >
            Contact the Director's Office
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}