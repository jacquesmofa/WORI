import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AccessibilityPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('pages.accessibility.title')}
      subtitle={t('pages.accessibility.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.accessibility.title') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.commitment')}</h2>
            <p>{t('pages.accessibility.commitmentText')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.standards')}</h2>
            <p>{t('pages.accessibility.standardsText')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.whatWeDo')}</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('pages.accessibility.whatWeDoItem1')}</li>
              <li>{t('pages.accessibility.whatWeDoItem2')}</li>
              <li>{t('pages.accessibility.whatWeDoItem3')}</li>
              <li>{t('pages.accessibility.whatWeDoItem4')}</li>
              <li>{t('pages.accessibility.whatWeDoItem5')}</li>
              <li>{t('pages.accessibility.whatWeDoItem6')}</li>
              <li>{t('pages.accessibility.whatWeDoItem7')}</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.languageSupport')}</h2>
            <p>{t('pages.accessibility.languageSupportText')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.limitations')}</h2>
            <p>{t('pages.accessibility.limitationsText')}</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">{t('pages.accessibility.feedback')}</h2>
            <p>{t('pages.accessibility.feedbackText1')}</p>
            <p>
              {t('form.email')}: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              {t('form.phone')}: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a><br />
              {t('pages.contact.headOffice')}: 10 Milner Business Court Suite 306, Scarborough, ON M1B 3C6
            </p>
            <p>{t('pages.accessibility.feedbackText2')}</p>
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