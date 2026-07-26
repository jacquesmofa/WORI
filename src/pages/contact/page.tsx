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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    validateField(e.target.name, formData[e.target.name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    if (name === 'fullName' && !value.trim()) newErrors.fullName = 'Full name is required';
    else if (name === 'fullName') delete newErrors.fullName;

    if (name === 'email' && !value.trim()) newErrors.email = 'Email is required';
    else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Please enter a valid email address';
    else if (name === 'email') delete newErrors.email;

    if (name === 'serviceType' && !value) newErrors.serviceType = 'Please select a service';
    else if (name === 'serviceType') delete newErrors.serviceType;

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, serviceType: true });

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
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

  const getInputClass = (fieldName: string) =>
    `w-full px-4 py-3 rounded-xl border bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all ${
      touched[fieldName] && errors[fieldName]
        ? 'border-red-400 focus:ring-red-400/10'
        : 'border-cream-300'
    }`;

  return (
    <PageLayout
      title={t('pages.contact.getInTouch')}
      subtitle="Connect with WORI for services, partnerships, media inquiries, or to schedule a consultation with our settlement team."
      bgImage="https://readdy.ai/api/search-image?query=Bright%20welcoming%20modern%20community%20center%20reception%20area%20with%20diverse%20staff%20at%20front%20desk%2C%20warm%20natural%20lighting%2C%20comfortable%20seating%20area%2C%20cream%20and%20emerald%20green%20tones%2C%20professional%20and%20compassionate%20atmosphere%2C%20editorial%20photography&width=1920&height=600&seq=contacthero2&orientation=landscape"
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
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-map-pin-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.headOffice')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      10 Milner Business Court, Suite 306<br />
                      Scarborough, ON M1B 3C6<br />
                      <span className="text-xs text-charcoal-600/40">Serving communities across Ontario</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-phone-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.phone')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      <a href="tel:+16477778322" className="hover:text-emerald-800 transition-colors">Main: +1-647-777-8322</a><br />
                      <span className="text-xs text-gold-600 font-medium">Crisis: 1-800-WORI-SAFE</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
                    <i className="ri-mail-line text-emerald-800 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-700 mb-1">{t('pages.contact.email')}</h3>
                    <p className="text-sm text-charcoal-600/60 leading-relaxed">
                      <a href="mailto:info@wadikajaorganization.org" className="hover:text-emerald-800 transition-colors">info@wadikajaorganization.org</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800/8 flex items-center justify-center shrink-0 group-hover:bg-emerald-800/12 group-hover:scale-105 transition-all duration-300">
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

              {/* Google Maps Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-cream-300/50 bg-cream-200/40 h-56 flex items-center justify-center mb-6">
                <div className="text-center px-6">
                  <i className="ri-map-pin-2-line text-charcoal-600/20 text-4xl mb-3 block" />
                  <p className="text-sm text-charcoal-600/30 mb-1 font-medium">Google Maps</p>
                  <p className="text-xs text-charcoal-600/20">
                    10 Milner Business Court, Suite 306<br />Scarborough, ON M1B 3C6
                  </p>
                </div>
              </div>

              {/* Crisis Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-7">
                <h3 className="font-serif text-lg text-cream-100 mb-3">{t('pages.contact.needImmediateHelp')}</h3>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-4">
                  {t('pages.contact.crisisDesc')}
                </p>
                <a
                  href="tel:1-800-WORI-SAFE"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/15 text-gold-400 text-sm font-semibold hover:bg-gold-500/25 transition-colors"
                >
                  <i className="ri-phone-line" />
                  1-800-WORI-SAFE
                </a>
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
                <div className="bg-emerald-800/5 border border-emerald-800/20 rounded-2xl p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-800/10 flex items-center justify-center mx-auto mb-4 animate-slide-up">
                    <i className="ri-check-line text-emerald-800 text-2xl" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-800 mb-2">{t('pages.contact.requestSubmitted')}</h3>
                  <p className="text-sm text-charcoal-600/60 leading-relaxed">
                    {t('pages.contact.requestSubmittedDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                      {t('form.fullName')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="fullName" value={formData.fullName}
                      onChange={handleChange} onBlur={handleBlur}
                      className={getInputClass('fullName')}
                      placeholder="Enter your full name"
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                        {t('form.email')} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange} onBlur={handleBlur}
                        className={getInputClass('email')}
                        placeholder="your@email.com"
                      />
                      {touched.email && errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                        {t('form.phone')}
                      </label>
                      <input
                        type="tel" name="phone" value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all"
                        placeholder="+1 (416) 555-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                        {t('form.serviceNeeded')} <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="serviceType" value={formData.serviceType}
                        onChange={handleChange} onBlur={handleBlur}
                        className={getInputClass('serviceType')}
                      >
                        <option value="">{t('form.selectService')}</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{t(opt.key)}</option>
                        ))}
                        <option value="other">Other / General Inquiry</option>
                      </select>
                      {touched.serviceType && errors.serviceType && (
                        <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                        {t('form.preferredDate')}
                      </label>
                      <input
                        type="date" name="preferredDate" value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                      {t('form.preferredLanguage')}
                    </label>
                    <select
                      name="language" value={formData.language} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية (Arabic)</option>
                      <option value="fr">Français (French)</option>
                      <option value="am">አማርኛ (Amharic)</option>
                      <option value="so">Soomaali (Somali)</option>
                      <option value="ti">ትግርኛ (Tigrinya)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                      {t('form.notes')}
                    </label>
                    <textarea
                      name="notes" value={formData.notes} onChange={handleChange}
                      rows={4} maxLength={500}
                      placeholder="Tell us about your needs or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all resize-none"
                    />
                    <p className="text-xs text-charcoal-600/40 mt-1 text-right">{formData.notes.length}/500</p>
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-emerald-900/20"
                  >
                    {t('form.submitRequest')}
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
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