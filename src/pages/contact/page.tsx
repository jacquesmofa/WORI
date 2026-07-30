import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';

/* =============================================================================
   CONTACT PAGE — Real Form Submission via Readdy Form API
   ============================================================================= */

const FORM_SUBMIT_URL = 'https://readdy.ai/api/form/d9l7508h9dsfbuoi6nk0';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  language: string;
  notes: string;
  phone_alt: string; // honeypot
}

export default function ContactPage() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    language: 'en',
    notes: '',
    phone_alt: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof FormState] as string);
  };

  const validateField = (name: string, value: string): boolean => {
    const next = { ...errors };
    if (name === 'fullName' && !value.trim()) next.fullName = 'Full name is required';
    else if (name === 'fullName') delete next.fullName;

    if (name === 'email' && !value.trim()) next.email = 'Email is required';
    else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      next.email = 'Please enter a valid email address';
    else if (name === 'email') delete next.email;

    if (name === 'serviceType' && !value) next.serviceType = 'Please select a service';
    else if (name === 'serviceType') delete next.serviceType;

    setErrors(next);
    return !next[name];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* ── Anti-spam honeypot check ── */
    if (formData.phone_alt && formData.phone_alt.trim() !== '') {
      setStatus('success'); // Fake success for bots
      return;
    }

    /* ── Validate ── */
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = 'Please enter a valid email address';
    if (!formData.serviceType) nextErrors.serviceType = 'Please select a service';

    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, serviceType: true });

    if (Object.keys(nextErrors).length > 0) return;

    /* ── Submit ── */
    setStatus('submitting');
    setErrorMsg('');

    try {
      const payload = new URLSearchParams();
      payload.append('fullName', formData.fullName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('serviceType', formData.serviceType);
      payload.append('preferredDate', formData.preferredDate);
      payload.append('language', formData.language);
      payload.append('notes', formData.notes.slice(0, 500));

      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string } } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        /* raw text response */
      }

      const serverMsg =
        parsed?.meta?.message ||
        parsed?.meta?.detail ||
        responseText ||
        '';

      if (
        !response.ok ||
        parsed?.code !== 'OK' ||
        serverMsg.toLowerCase().includes('spam')
      ) {
        setErrorMsg(serverMsg || 'Submission failed. Please try again or contact us directly.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        serviceType: '',
        preferredDate: '',
        language: 'en',
        notes: '',
        phone_alt: '',
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Network error. Please try again later.'
      );
      setStatus('error');
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
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg"
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
                      <a href="tel:+16477778300" className="hover:text-emerald-800 transition-colors">Office: +1-647-777-8300</a><br />
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
                      Monday – Friday: 9:00 AM – 5:00 PM<br />
                      Saturday: 10:00 AM – 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-cream-300/50 bg-cream-200/40 h-56 mb-6">
                <iframe
                  title="WORI Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.912345678901!2d-79.24512345678901!3d43.80123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ4JzA0LjQiTiA3OcKwMTQnNDIuNCJX!5e0!3m2!1sen!2sca!4v1600000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Crisis Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-7">
                <h3 className="font-serif text-lg text-cream-100 mb-3">{t('pages.contact.needImmediateHelp')}</h3>
                <p className="text-sm text-cream-100/60 leading-relaxed mb-4">
                  If you or someone you know is in immediate crisis, our 24/7 emergency line is open.
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
                Fill out the form below and our intake team will respond within 24 hours.
              </p>

              {status === 'success' ? (
                <div className="bg-emerald-800/5 border border-emerald-800/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-800/10 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-emerald-800 text-2xl" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-800 mb-2">Request Submitted</h3>
                  <p className="text-sm text-charcoal-600/60 leading-relaxed mb-6">
                    Thank you for reaching out. A member of our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-readdy-form
                  noValidate
                >
                  {/* Honeypot — hidden from real users */}
                  <div
                    className="absolute opacity-0 pointer-events-none"
                    style={{ position: 'absolute', left: '-9999px' }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="phone_alt"
                      value={formData.phone_alt}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">
                      {t('form.fullName')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        type="tel"
                        name="phone"
                        value={formData.phone}
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
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
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
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
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
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      placeholder="Tell us about your needs or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 focus:ring-2 focus:ring-emerald-800/10 transition-all resize-none"
                    />
                    <p className="text-xs text-charcoal-600/40 mt-1 text-right">
                      {formData.notes.length}/500
                    </p>
                  </div>

                  {status === 'error' && errorMsg && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                      <i className="ri-error-warning-line mr-1" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-emerald-900/20 disabled:bg-cream-300 disabled:text-charcoal-600/40"
                  >
                    {status === 'submitting' ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {t('form.submitRequest')}
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
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