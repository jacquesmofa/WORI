import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('pages.terms.title')}
      subtitle={t('pages.terms.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('footer.terms') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">
            <p>{t('pages.terms.lastUpdated')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s1Title')}</h2>
            <p>{t('pages.terms.s1Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s2Title')}</h2>
            <p>{t('pages.terms.s2Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s3Title')}</h2>
            <p>{t('pages.terms.s3Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s4Title')}</h2>
            <p>{t('pages.terms.s4Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s5Title')}</h2>
            <p>{t('pages.terms.s5Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s6Title')}</h2>
            <p>{t('pages.terms.s6Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s7Title')}</h2>
            <p>{t('pages.terms.s7Text')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.terms.s8Title')}</h2>
            <p>{t('pages.terms.s8Text')}</p>
            <p>
              {t('form.email')}: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              {t('form.phone')}: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a>
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