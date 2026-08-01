import PageLayout from '@/components/feature/PageLayout';
import { boardMembers } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BOARD_SEO = {
  title: 'Leadership, Board & Team | Wadi-Kaja Organization',
  description: 'Meet the dedicated executive leadership, board members, management team, and grassroots volunteers driving refugee support and community empowerment at WORI.',
  keywords: 'WORI board, refugee charity leadership, immigrant services management, Wadi-Kaja team, non-profit governance Toronto',
  canonicalPath: '/about/board',
};

const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve';

const managementTeam = [
  {
    name: 'Nasseradin Bahar Abdullah',
    role: 'Executive Director',
    image: `${CLD}/v1784647735/nasseradin-bahar-abdullah_nlj0th.jpg`,
    email: 'nasser@wadikajaorganization.org',
    phone: '647-656-7436',
  },
  {
    name: 'Suher Moussa',
    role: 'General Manager',
    image: `${CLD}/v1784647719/suher-moussa_t1s1lg.jpg`,
    email: 'suher@wadikajaorganization.org',
    phone: '647-777-8352',
  },
  {
    name: 'Besma Ali',
    role: 'Program Manager',
    image: `${CLD}/v1784647729/besma-ali_q3mmcb.jpg`,
    email: 'besma@wadikajaorganization.org',
    phone: '647-777-8322',
  },
  {
    name: 'Mohammed Hanif Ayubzada',
    role: 'Volunteer Coordinator',
    image: `${CLD}/v1784647731/mohammed-hanif-ayubzada_lqx0s5.jpg`,
    email: 'hanif@wadikajaorganization.org',
    phone: '647-777-8352',
  },
];

const volunteers = [
  'Sara Abdullah',
  'Abdulsalam Khojali',
  'Samuel Tesfaye',
  'Sadia Mohammed Ali',
  'Morsat Malik',
  'Marhawe Mathhew',
  'John Majok',
  'Shadia Issa Saeed',
  'Jihan Mohammed',
  'Nasir Mohammed',
];

export default function BoardPage() {
  const { t } = useTranslation();
  return (
    <PageLayout
      title={t('pages.board.title')}
      subtitle={t('pages.board.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'About & Governance', path: '/about' },
        { label: 'Board & Management' },
      ]}
      seo={BOARD_SEO}
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
                { label: 'Board Members', value: '8' },
                { label: 'Diverse Backgrounds', value: '4 Continents' },
                { label: 'Independent', value: 'Non-Profit' },
                { label: 'CRA Compliant', value: 'Since 2012' },
                { label: 'Charity Reg.', value: '748873338RR0001' },
                { label: 'Toronto Based', value: 'Scarborough, ON' },
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-cream-100 rounded-2xl overflow-hidden border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-medium text-charcoal-700 mb-0.5">{member.name}</h3>
                  <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Management Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {managementTeam.map((person) => (
              <div
                key={person.name}
                className="flex items-start gap-4 p-5 rounded-xl bg-cream-200/30 border border-cream-300/40"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700">{person.name}</h4>
                  <p className="text-xs text-gold-600 font-medium mb-2">{person.role}</p>
                  <div className="space-y-0.5 text-xs text-charcoal-600/50">
                    <p><i className="ri-mail-line mr-1 text-emerald-800" /> {person.email}</p>
                    <p><i className="ri-phone-line mr-1 text-emerald-800" /> {person.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-8">
            Volunteers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {volunteers.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-cream-200/40 border border-cream-300/30"
              >
                <i className="ri-user-smile-line text-emerald-700 text-sm" />
                <span className="text-sm text-charcoal-700 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Governance Documents */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-emerald-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-cream-100 mb-4">
            Governance Documents
          </h2>
          <p className="text-sm text-cream-100/60 mb-8 max-w-xl mx-auto">
            WORI maintains full transparency. Access our annual report covering organizational activities from 2020 through 2022.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/about/executive-director"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
            >
              View Annual Report
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