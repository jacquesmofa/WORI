import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';

export default function VolunteerPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programs: [] as string[],
    availability: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleProgram = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

  if (submitted) {
    return (
      <PageLayout
        title={t('nav.volunteer')}
        subtitle={t('pages.volunteer.applicationDesc')}
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
              {t('pages.volunteer.applicationSubmitted')}
            </h2>
            <p className="text-sm text-charcoal-600/60 leading-relaxed mb-8">
              {t('pages.volunteer.thankYou')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
              >
                {t('pages.volunteer.returnHome')}
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/about/executive-director"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
              >
                {t('pages.volunteer.fromDirector')}
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
      subtitle="Join 340+ active volunteers who make settlement, wellbeing, and empowerment possible for thousands of newcomer families."
      bgImage="https://readdy.ai/api/search-image?query=Diverse%20group%20of%20smiling%20volunteers%20wearing%20matching%20branded%20vests%20in%20a%20bright%20community%20center%2C%20warm%20natural%20lighting%2C%20teamwork%20and%20compassion%2C%20cream%20and%20emerald%20green%20tones%2C%20editorial%20volunteer%20photography%2C%20high-end%20quality&width=1920&height=600&seq=volhero1&orientation=landscape"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('nav.volunteer') },
      ]}
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

          <form onSubmit={handleSubmit} className="bg-cream-100 rounded-2xl p-6 md:p-8 border border-cream-300/50">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-charcoal-700 mb-2">{t('pages.volunteer.step1')}</h3>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.fullName')} *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.email')} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.phone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="button" onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all">
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
                    <button key={option.value} type="button" onClick={() => toggleProgram(option.value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        formData.programs.includes(option.value) ? 'border-gold-500 bg-gold-500/5' : 'border-cream-300 hover:border-emerald-800/20'
                      }`}>
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
                  <button type="button" onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all">
                    <i className="ri-arrow-left-line" /> {t('form.back')}
                  </button>
                  <button type="button" onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all">
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
                  <select name="availability" value={formData.availability} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors">
                    <option value="">{t('form.selectAvailability')}</option>
                    {availabilityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1.5">{t('form.experience')}</label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange} rows={4}
                    placeholder={t('form.experiencePlaceholder')} maxLength={500}
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors resize-none" />
                  <p className="text-xs text-charcoal-600/40 mt-1 text-right">{formData.experience.length}/500</p>
                </div>
                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all">
                    <i className="ri-arrow-left-line" /> {t('form.back')}
                  </button>
                  <button type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all">
                    {t('form.submitApplication')} <i className="ri-check-line" />
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