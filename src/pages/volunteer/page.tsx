import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';

/* =============================================================================
   VOLUNTEER PAGE — Real Form Submission via Readdy Form API
   ============================================================================= */

const FORM_SUBMIT_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = '383b7ca6-d26f-4508-87d5-99a05e4d1282';

interface VolunteerForm {
  fullName: string;
  email: string;
  phone: string;
  programs: string[];
  availability: string;
  experience: string;
  contact_alt: string; // honeypot
}

export default function VolunteerPage() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<VolunteerForm>({
    fullName: '',
    email: '',
    phone: '',
    programs: [],
    availability: '',
    experience: '',
    contact_alt: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProgram = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }));
  };

  const canProceedStep2 = formData.fullName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const canProceedStep3 = formData.programs.length > 0;
  const canSubmit = formData.availability !== '';

  const programOptions = [
    { value: 'settlement', labelKey: 'settlementMenu.immigrantSettlement' },
    { value: 'language-mentorship', labelKey: 'settlementMenu.languageMentorship' },
    { value: 'employment', labelKey: 'wellbeingMenu.employment' },
    { value: 'mental-health', labelKey: 'wellbeingMenu.mentalHealth' },
    { value: 'housing', labelKey: 'wellbeingMenu.housing' },
    { value: 'food-security', labelKey: 'wellbeingMenu.foodSecurity' },
    { value: 'women-empowerment', labelKey: 'wellbeingMenu.womenEmpowerment' },
    { value: 'seniors', labelKey: 'wellbeingMenu.seniors' },
    { value: 'events', labelKey: 'nav.volunteer' },
  ];

  const availabilityOptions = [
    { value: 'weekdays', label: t('pages.volunteer.weekdaysDay') },
    { value: 'weekdays-evening', label: t('pages.volunteer.weekdaysEvening') },
    { value: 'weekends', label: t('pages.volunteer.weekends') },
    { value: 'flexible', label: t('pages.volunteer.flexible') },
    { value: 'event-only', label: t('pages.volunteer.eventsOnly') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Anti-spam honeypot */
    if (formData.contact_alt && formData.contact_alt.trim() !== '') {
      setStatus('success');
      return;
    }

    if (!canSubmit) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const payload = new URLSearchParams();
      payload.append('access_key', WEB3FORMS_KEY);
      payload.append('subject', `Volunteer Application — ${formData.fullName.trim()}`);
      payload.append('from_name', 'WORI Volunteer Form');
      payload.append('fullName', formData.fullName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('programs', formData.programs.join(', '));
      payload.append('availability', formData.availability);
      payload.append('experience', formData.experience.slice(0, 500));

      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      const responseText = await response.text();
      let parsed: { success?: boolean; message?: string } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        /* raw text */
      }

      if (!response.ok || !parsed?.success) {
        setErrorMsg(parsed?.message || 'Submission failed. Please try again or contact us directly.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Please try again later.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <PageLayout
        title={t('nav.volunteer')}
        subtitle={t('pages.volunteer.subtitle')}
        breadcrumb={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.volunteer') },
        ]}
      >
        <section className="px-6 lg:px-10 py-20 md:py-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-800/8 flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-emerald-800 text-3xl" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-3">
              Application Submitted
            </h2>
            <p className="text-sm text-charcoal-600/60 leading-relaxed mb-8">
              Thank you for your interest in volunteering with WORI. Our volunteer coordinator will review your application and reach out within 3 business days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
              >
                Return Home
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/about/executive-director"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
              >
                From the Director
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={t('nav.volunteer')}
      subtitle={t('pages.volunteer.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('nav.volunteer') },
      ]}
      seo={{
        title: 'Volunteer with WORI | Join Refugee & Immigrant Community Support',
        description: 'Apply to volunteer with Wadi-Kaja Organization. Join 340+ volunteers supporting settlement, language mentorship, food security, mental health, and crisis response for newcomers.',
        keywords: 'volunteer WORI, refugee volunteer Toronto, immigrant support volunteer, community service Canada, settlement volunteer opportunity',
        canonicalPath: '/volunteer',
      }}
    >
      {/* Stats */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {[
              { value: '340+', label: t('stats.volunteersActive') },
              { value: '18,500', label: 'Hours Contributed (2024)' },
              { value: '9', label: 'Program Areas' },
              { value: '92%', label: 'Retention Rate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream-200/40 rounded-xl p-4 text-center border border-cream-300/40">
                <div className="font-serif text-xl md:text-2xl font-semibold text-emerald-800 mb-1">{stat.value}</div>
                <div className="text-xs text-charcoal-600/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 text-center mb-3">
            {t('pages.volunteer.application')}
          </h2>
          <p className="text-sm text-charcoal-600/60 text-center mb-10">
            {t('pages.volunteer.applicationDesc')}
          </p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s ? 'bg-emerald-800 text-cream-100' : 'bg-cream-300 text-charcoal-600/40'
                }`}>
                  {step > s ? <i className="ri-check-line" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-8 h-0.5 transition-colors ${step > s ? 'bg-emerald-800' : 'bg-cream-300'}`} />
                )}
              </div>
            ))}
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-cream-100 rounded-2xl p-6 md:p-8 border border-cream-300/50"
            data-readdy-form
            noValidate
          >
            {/* Honeypot */}
            <div className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <input
                type="text"
                name="contact_alt"
                value={formData.contact_alt}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                readOnly
              />
            </div>

            {status === 'error' && errorMsg && (
              <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                <i className="ri-error-warning-line mr-1" />
                {errorMsg}
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-charcoal-700 mb-2">{t('pages.volunteer.step1')}</h3>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.fullName')} *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                    placeholder="Your full name"
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
                      placeholder="your@email.com"
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
                      placeholder="+1 (416) 555-0000"
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep2}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 disabled:bg-cream-300 disabled:text-charcoal-600/40 text-cream-100 text-sm font-semibold rounded-full transition-all"
                  >
                    {t('form.nextStep')} <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-charcoal-700 mb-2">{t('pages.volunteer.step2')}</h3>
                <p className="text-sm text-charcoal-600/60 mb-4">{t('pages.volunteer.step2Desc')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {programOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleProgram(option.value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        formData.programs.includes(option.value)
                          ? 'border-gold-500 bg-gold-500/5'
                          : 'border-cream-300 hover:border-emerald-800/20'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        formData.programs.includes(option.value) ? 'border-gold-500 bg-gold-500' : 'border-cream-300'
                      }`}>
                        {formData.programs.includes(option.value) && <i className="ri-check-line text-cream-100 text-[10px]" />}
                      </div>
                      <span className="text-sm text-charcoal-700">{t(option.labelKey)}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all"
                  >
                    <i className="ri-arrow-left-line" /> {t('form.back')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep3}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 disabled:bg-cream-300 disabled:text-charcoal-600/40 text-cream-100 text-sm font-semibold rounded-full transition-all"
                  >
                    {t('form.nextStep')} <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-charcoal-700 mb-2">{t('pages.volunteer.step3')}</h3>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.availability')} *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                  >
                    <option value="">{t('form.selectAvailability')}</option>
                    {availabilityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.experience')}</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('form.experiencePlaceholder')}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors resize-none"
                  />
                  <p className="text-xs text-charcoal-600/40 mt-1 text-right">{formData.experience.length}/500</p>
                </div>
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all"
                  >
                    <i className="ri-arrow-left-line" /> {t('form.back')}
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !canSubmit}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-800 hover:bg-emerald-700 disabled:bg-cream-300 disabled:text-charcoal-600/40 text-cream-100 text-sm font-semibold rounded-full transition-all"
                  >
                    {status === 'submitting' ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {t('form.submitApplication')} <i className="ri-check-line" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </PageLayout>
  );
}