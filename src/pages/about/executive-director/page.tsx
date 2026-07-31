import PageLayout from '@/components/feature/PageLayout';
import { executiveDirector } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function ExecutiveDirectorPage() {
  const paragraphs = executiveDirector.letter.split('\n\n');

  return (
    <PageLayout
      title="Executive Director's Desk"
      subtitle="Annual letters, public announcements, and reflections from the leadership of WORI."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: "Executive Director's Desk" },
      ]}
      seo={{
        title: 'Executive Director\'s Desk | Wadi-Kaja Organization',
        description: 'Read annual letters, public announcements, and reflections from Nasseradin Bahar Abdullah, Executive Director of WORI, on refugee settlement, community impact, and organizational vision.',
        keywords: 'WORI executive director, Nasseradin Abdullah, refugee charity leadership, immigrant services director, Wadi-Kaja leadership message',
        canonicalPath: '/about/executive-director',
      }}
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
                  nasser@wadikajaorganization.org
                </p>
                <p>
                  <i className="ri-phone-line mr-2 text-emerald-800" />
                  647 777 8322 Ext. 8322
                </p>
                <p>
                  <i className="ri-printer-line mr-2 text-emerald-800" />
                  Fax: 647 777 8301
                </p>
                <p>
                  <i className="ri-map-pin-line mr-2 text-emerald-800" />
                  300 - 10 Milner Business Court, Scarborough, Ontario M1B 3C6
                </p>
                <p>
                  <i className="ri-calendar-line mr-2 text-emerald-800" />
                  <a
                    href="https://bookings.cloud.microsoft/book/WadiKajaOrganizationforRefugeesandImmigrantscopy@wadikajaorganization.org/?ismsaljsauthenabled=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:text-emerald-700 underline transition-colors"
                  >
                    Book Online: Book Now
                  </a>
                </p>
              </div>
            </div>

            {/* Letter */}
            <div className="flex-1">
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
                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-cream-200/30 hover:bg-cream-200/50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-charcoal-700">2025 Annual Letter</span>
                    <span className="text-xs text-charcoal-600/50">January 2025</span>
                  </div>

                  <Link
                    to="/news"
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-cream-200/30 hover:bg-cream-200/50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-charcoal-700">WORI Awards 2025 Opening Remarks</span>
                    <span className="text-xs text-charcoal-600/50">November 2025</span>
                  </Link>

                  <Link
                    to="/crisis-center"
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-cream-200/30 hover:bg-cream-200/50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-charcoal-700">Response to Sudan Crisis</span>
                    <span className="text-xs text-charcoal-600/50">February 2026</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Report PDF */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
              Annual Report
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-2">
              WORI Report 2020-2022
            </h2>
            <p className="text-sm text-charcoal-600/60 max-w-xl mx-auto">
              View our comprehensive report covering organizational activities, financial statements, and impact from 2020 through 2022.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-cream-300/50" style={{ height: '700px' }}>
            <iframe
              src="https://res.cloudinary.com/oqdvximy/image/upload/fl_attachment/v1785376663/Wori_-_Repport_2020-2022_rsp0or.pdf#toolbar=0&navpanes=0&scrollbar=1"
              title="WORI Report 2020-2022"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
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