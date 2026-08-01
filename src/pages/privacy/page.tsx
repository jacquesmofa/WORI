import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('pages.privacy.title')}
      subtitle={t('pages.privacy.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.privacy.title') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">
            <p>{t('pages.privacy.lastUpdated')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s1Title')}</h2>
            <p>{t('pages.privacy.s1Text')}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('pages.privacy.s1Item1')}</li>
              <li>{t('pages.privacy.s1Item2')}</li>
              <li>{t('pages.privacy.s1Item3')}</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s2Title')}</h2>
            <p>{t('pages.privacy.s2Text')}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('pages.privacy.s2Item1')}</li>
              <li>{t('pages.privacy.s2Item2')}</li>
              <li>{t('pages.privacy.s2Item3')}</li>
              <li>{t('pages.privacy.s2Item4')}</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s3Title')}</h2>
            <p>{t('pages.privacy.s3Text')}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('pages.privacy.s3Item1')}</li>
              <li>{t('pages.privacy.s3Item2')}</li>
              <li>{t('pages.privacy.s3Item3')}</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s4Title')}</h2>
            <p>{t('pages.privacy.s4Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s5Title')}</h2>
            <p>{t('pages.privacy.s5Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s6Title')}</h2>
            <p>{t('pages.privacy.s6Text')}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('pages.privacy.s6Item1')}</li>
              <li>{t('pages.privacy.s6Item2')}</li>
              <li>{t('pages.privacy.s6Item3')}</li>
              <li>{t('pages.privacy.s6Item4')}</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.privacy.s7Title')}</h2>
            <p>{t('pages.privacy.s7Text')}</p>
            <p>
              {t('form.email')}: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              {t('form.phone')}: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a><br />
              {t('pages.contact.headOffice')}: 10 Milner Business Court Suite 306, Scarborough, ON M1B 3C6
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              {t('common.contactUs')}
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}