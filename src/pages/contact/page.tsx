import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    language: 'en',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const serviceOptions = [
    { value: 'settlement', key: 'settlementMenu.immigrantSettlement' },
    { value: 'language', key: 'settlementMenu.languageServices' },
    { value: 'employment', key: 'wellbeingMenu.employment' },
    { value: 'housing', key: 'wellbeingMenu.housing' },
    { value: 'mental-health', key: 'wellbeingMenu.mentalHealth' },
    { value: 'women', key: 'wellbeingMenu.womenEmpowerment' },
    { value: 'seniors', key: 'wellbeingMenu.seniors' },
    { value: 'food', key: 'wellbeingMenu.foodSecurity' },
  ];

  return (
    <PageLayout
      title={t('pages.contact.getInTouch')}
      subtitle="Connect with WORI for services, partnerships, media inquiries, or to schedule a consultation with our settlement team."
      bgImage="https://readdy.ai/api/search-image?query=Bright%20welcoming%20modern%20community%20center%20reception%20area%20with%20diverse%20staff%20at%20front%20desk%2C%20warm%20natural%20lighting%2C%20comfortable%20seating%20area%2C%20cream%20and%20emerald%20green%20tones%2C%20professional%20and%20compassionate%20atmosphere%2C%20editorial%20photography&width=1920&height=600&seq=contacthero1&orientation=landscape"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.contact.getInTouch') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Info */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-6">
                {t('pages.contact.getInTouch')}
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-map-pin-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.headOffice')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      {t('footer.address')}<br />
                      Serving communities across Ontario
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-phone-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.phone')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      Main: +1 (416) 555-0100<br />
                      Crisis Hotline: {t('pages.contact.crisisHotline')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-mail-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.email')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      General: info@wori.org<br />
                      Services: services@wori.org<br />
                      Donations: donate@wori.org
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-time-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.officeHours')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      {t('pages.contact.monFri')}<br />
                      {t('pages.contact.saturday')}<br />
                      {t('pages.contact.sundayHolidays')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900 rounded-2xl p-6">
                <h3 className="font-serif text-lg text-cream-100 mb-3">{t('pages.contact.needImmediateHelp')}</h3>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-4">
                  {t('pages.contact.crisisDesc')}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/15 text-gold-400 text-sm font-semibold">
                  <i className="ri-phone-line" />
                  {t('pages.contact.crisisHotline')}
                </div>
              </div>
            </div>

            {/* Right: Consultation Form */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-2">
                {t('pages.contact.scheduleConsultation')}
              </h2>
              <p className="text-sm text-charcoal-600/60 mb-6 leading-relaxed">
                {t('pages.contact.scheduleDesc')}
              </p>

              {submitted ? (
                <div className="bg-emerald-800/8 border border-emerald-800/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-800/10 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-emerald-800 text-2xl" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-800 mb-2">{t('pages.contact.requestSubmitted')}</h3>
                  <p className="text-sm text-charcoal-600/60">
                    {t('pages.contact.requestSubmittedDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.fullName')} *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.email')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.serviceNeeded')} *</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                      >
                        <option value="">{t('form.selectService')}</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{t(opt.key)}</option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.preferredDate')}</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.preferredLanguage')}</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                      <option value="fr">Français</option>
                      <option value="am">አማርኛ</option>
                      <option value="so">Soomaali</option>
                      <option value="ti">ትግርኛ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.notes')}</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors resize-none"
                    />
                    <p className="text-xs text-charcoal-600/40 mt-1 text-right">{formData.notes.length}/500</p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
                  >
                    {t('form.submitRequest')}
                    <i className="ri-arrow-right-line" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}