import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';

const timezones = [
  { value: 'America/Toronto', label: 'Eastern Time (ET) — Toronto' },
  { value: 'America/Chicago', label: 'Central Time (CT) — Winnipeg' },
  { value: 'America/Edmonton', label: 'Mountain Time (MT) — Calgary' },
  { value: 'America/Vancouver', label: 'Pacific Time (PT) — Vancouver' },
  { value: 'America/Halifax', label: 'Atlantic Time (AT) — Halifax' },
];

const serviceTypes = [
  { value: 'settlement', labelKey: 'settlementMenu.immigrantSettlement', icon: 'ri-home-heart-line' },
  { value: 'language', labelKey: 'settlementMenu.languageServices', icon: 'ri-translate-2' },
  { value: 'employment', labelKey: 'wellbeingMenu.employment', icon: 'ri-briefcase-line' },
  { value: 'housing', labelKey: 'wellbeingMenu.housing', icon: 'ri-building-2-line' },
  { value: 'mental-health', labelKey: 'wellbeingMenu.mentalHealth', icon: 'ri-mental-health-line' },
  { value: 'sponsorship', labelKey: 'settlementMenu.privateSponsorship', icon: 'ri-hand-heart-line' },
  { value: 'ircc', labelKey: 'settlementMenu.ircc', icon: 'ri-government-line' },
];

const faqs = [
  {
    q: 'Who is eligible for a consultation?',
    a: 'Consultations are available to all refugees, immigrants, and newcomers regardless of immigration status, country of origin, or length of time in Canada. Services are free and confidential.',
  },
  {
    q: 'What languages are available for consultations?',
    a: 'We offer consultations in English, French, Arabic, Amharic, Somali, and Tigrinya. Please specify your preferred language when booking and we will assign an interpreter if needed.',
  },
  {
    q: 'How long does a typical consultation last?',
    a: 'Initial consultations typically run 45-60 minutes. Follow-up sessions vary based on needs but average 30 minutes.',
  },
  {
    q: 'Can I bring a family member or friend?',
    a: 'Yes, you are welcome to bring a support person. They can participate in the consultation or wait in our comfortable reception area.',
  },
  {
    q: 'What should I bring to my consultation?',
    a: 'If available, bring any relevant documents such as immigration papers, identification, or correspondence from IRCC. Having these is helpful but not required — we can assist you regardless.',
  },
  {
    q: 'How soon can I get an appointment?',
    a: 'Our intake team responds within 24 hours. Urgent cases (housing emergencies, crisis situations) are prioritized for same-day or next-day appointments.',
  },
];

export default function BookingPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    timezone: 'America/Toronto',
    preferredDate: '',
    preferredTime: '',
    language: 'en',
    urgency: 'standard',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) setSubmitted(true);
  };

  // Get min date (today) and max date (3 months out)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
  ];

  if (submitted) {
    return (
      <PageLayout
        title="Book an Appointment"
        subtitle="Schedule a free, confidential consultation with our settlement team."
        breadcrumb={[
          { label: t('nav.home'), path: '/' },
          { label: 'Book an Appointment' },
        ]}
      >
        <section className="px-6 lg:px-10 py-20 md:py-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-800/8 flex items-center justify-center mx-auto mb-6">
              <i className="ri-calendar-check-line text-emerald-800 text-3xl" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-3">
              Appointment Requested
            </h2>
            <p className="text-sm text-charcoal-600/60 leading-relaxed mb-8">
              Thank you. Our intake team will contact you within 24 hours at the phone number or email you provided to confirm your appointment time.
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
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Book an Appointment"
      subtitle="Schedule a free, confidential consultation with our multilingual settlement team. We respond within 24 hours."
      bgImage="https://readdy.ai/api/search-image?query=Bright%20modern%20reception%20area%20of%20a%20community%20center%20with%20a%20friendly%20diverse%20staff%20member%20at%20a%20sleek%20desk%20with%20a%20tablet%2C%20warm%20natural%20lighting%20through%20large%20windows%2C%20comfortable%20stylish%20seating%20area%2C%20cream%20and%20emerald%20green%20tones%2C%20professional%20welcoming%20atmosphere%2C%20editorial%20photography&width=1920&height=600&seq=bookinghero1&orientation=landscape"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: 'Book an Appointment' },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mb-10">
                {[
                  { num: 1, label: 'Your Info' },
                  { num: 2, label: 'Appointment' },
                  { num: 3, label: 'Review' },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= s.num ? 'bg-emerald-800 text-cream-100 shadow-md' : 'bg-cream-200 text-charcoal-600/40'
                    }`}>
                      {step > s.num ? <i className="ri-check-line" /> : s.num}
                    </div>
                    <span className={`hidden sm:inline text-xs font-medium whitespace-nowrap ${
                      step >= s.num ? 'text-charcoal-700' : 'text-charcoal-600/40'
                    }`}>{s.label}</span>
                    {s.num < 3 && (
                      <div className={`w-6 h-0.5 transition-colors ${step > s.num ? 'bg-emerald-800' : 'bg-cream-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="bg-cream-200/30 rounded-2xl p-6 md:p-8 border border-cream-300/40">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-charcoal-700 mb-2">Your Information</h3>
                    <p className="text-sm text-charcoal-600/50 mb-4">We will use this to contact you and confirm your appointment.</p>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all ${
                          errors.fullName ? 'border-red-400' : 'border-cream-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Email *</label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all ${
                            errors.email ? 'border-red-400' : 'border-cream-300'
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Phone *</label>
                        <input
                          type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all ${
                            errors.phone ? 'border-red-400' : 'border-cream-300'
                          }`}
                          placeholder="+1 (416) 555-0000"
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Preferred Language</label>
                        <select
                          name="language" value={formData.language} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all"
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
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Time Zone</label>
                        <select
                          name="timezone" value={formData.timezone} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all"
                        >
                          {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Urgency</label>
                      <div className="flex gap-3">
                        {[
                          { value: 'standard', label: 'Standard (within 5 days)', icon: 'ri-calendar-line' },
                          { value: 'urgent', label: 'Urgent (within 48 hours)', icon: 'ri-alert-line' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, urgency: opt.value }))}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              formData.urgency === opt.value
                                ? 'border-gold-500 bg-gold-500/5 text-charcoal-700'
                                : 'border-cream-300 text-charcoal-600/40 hover:border-emerald-800/20'
                            }`}
                          >
                            <i className={`${opt.icon} text-sm ${
                              formData.urgency === opt.value ? 'text-gold-600' : ''
                            }`} />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button" onClick={handleNext}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
                      >
                        Next: Appointment Details <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Details */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-charcoal-700 mb-2">Appointment Details</h3>
                    <p className="text-sm text-charcoal-600/50 mb-4">Tell us what you need and when works best for you.</p>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Service Needed *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {serviceTypes.map((svc) => (
                          <button
                            key={svc.value}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, serviceType: svc.value }))}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                              formData.serviceType === svc.value
                                ? 'border-gold-500 bg-gold-500/5'
                                : 'border-cream-300 hover:border-emerald-800/20'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              formData.serviceType === svc.value ? 'bg-gold-500/10' : 'bg-emerald-800/5'
                            }`}>
                              <i className={`${svc.icon} text-sm ${
                                formData.serviceType === svc.value ? 'text-gold-600' : 'text-emerald-800'
                              }`} />
                            </div>
                            <span className="text-left text-sm font-medium text-charcoal-700">{t(svc.labelKey)}</span>
                          </button>
                        ))}
                      </div>
                      {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Preferred Date *</label>
                        <input
                          type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange}
                          min={today} max={maxDateStr}
                          className={`w-full px-4 py-3 rounded-xl border bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all ${
                            errors.preferredDate ? 'border-red-400' : 'border-cream-300'
                          }`}
                        />
                        {errors.preferredDate && <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Preferred Time</label>
                        <select
                          name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-600 mb-1.5 uppercase tracking-wider">Additional Notes</label>
                      <textarea
                        name="notes" value={formData.notes} onChange={handleChange}
                        rows={4} maxLength={500}
                        placeholder="Tell us anything that will help us prepare for your consultation — specific needs, questions, or preferences..."
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-all resize-none"
                      />
                      <p className="text-xs text-charcoal-600/40 mt-1 text-right">{formData.notes.length}/500</p>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button" onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all hover:bg-cream-200"
                      >
                        <i className="ri-arrow-left-line" /> Back
                      </button>
                      <button
                        type="button" onClick={handleNext}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
                      >
                        Review & Submit <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-charcoal-700 mb-2">Review Your Appointment</h3>
                    <p className="text-sm text-charcoal-600/50 mb-4">Please confirm the details below before submitting.</p>

                    <div className="bg-cream-100 rounded-xl border border-cream-300/50 divide-y divide-cream-300/50">
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Name</span>
                        <span className="text-sm font-medium text-charcoal-700">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Email</span>
                        <span className="text-sm font-medium text-charcoal-700">{formData.email}</span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Phone</span>
                        <span className="text-sm font-medium text-charcoal-700">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Service</span>
                        <span className="text-sm font-medium text-charcoal-700">
                          {serviceTypes.find((s) => s.value === formData.serviceType)?.labelKey
                            ? t(serviceTypes.find((s) => s.value === formData.serviceType)!.labelKey)
                            : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Date & Time</span>
                        <span className="text-sm font-medium text-charcoal-700">
                          {formData.preferredDate || '—'} {formData.preferredTime && `at ${formData.preferredTime}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Language</span>
                        <span className="text-sm font-medium text-charcoal-700">
                          {formData.language === 'en' ? 'English' : formData.language === 'ar' ? 'العربية' : formData.language === 'fr' ? 'Français' : formData.language === 'am' ? 'አማርኛ' : formData.language === 'so' ? 'Soomaali' : 'ትግርኛ'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-charcoal-600/60">Urgency</span>
                        <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                          formData.urgency === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-800/8 text-emerald-800'
                        }`}>
                          {formData.urgency === 'urgent' ? 'Urgent (48hrs)' : 'Standard (5 days)'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button" onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-700/15 text-charcoal-700 text-sm font-medium rounded-full transition-all hover:bg-cream-200"
                      >
                        <i className="ri-arrow-left-line" /> Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
                      >
                        Confirm Appointment <i className="ri-check-line" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Info Panel */}
            <div className="lg:col-span-2">
              {/* Quick Info Card */}
              <div className="bg-emerald-900 rounded-2xl p-6 md:p-7 mb-6">
                <h3 className="font-serif text-lg text-cream-100 mb-4">Appointment Information</h3>
                <div className="space-y-4 text-sm text-cream-100/70">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-time-line text-gold-500 text-sm" />
                    </div>
                    <p>Initial consultations last 45-60 minutes. Please arrive 10 minutes early for your first visit.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-money-dollar-circle-line text-gold-500 text-sm" />
                    </div>
                    <p>All consultations are <strong className="text-cream-100">completely free</strong>. No payment or insurance is required.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-translate-2 text-gold-500 text-sm" />
                    </div>
                    <p>Consultations available in <strong className="text-cream-100">6 languages</strong>. Interpreters provided at no cost.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-phone-line text-gold-500 text-sm" />
                    </div>
                    <p>Need immediate help? Call our crisis line:<br /><strong className="text-gold-400 text-base">1-800-WORI-SAFE</strong></p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-cream-200/40 rounded-2xl p-6 md:p-7 border border-cream-300/50 mb-6">
                <h3 className="font-serif text-lg text-charcoal-700 mb-4">Our Location</h3>
                <div className="space-y-3 text-sm text-charcoal-600/60">
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-line text-emerald-800 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal-700">WORI Head Office</p>
                      <p>10 Milner Business Court, Suite 306<br />Scarborough, ON M1B 3C6</p>
                    </div>
                  </div>
                </div>
                {/* Google Maps Placeholder */}
                <div className="mt-4 rounded-xl overflow-hidden border border-cream-300/40 bg-cream-100 h-40 flex items-center justify-center">
                  <div className="text-center px-4">
                    <i className="ri-map-pin-2-line text-charcoal-600/20 text-3xl mb-2 block" />
                    <p className="text-xs text-charcoal-600/30">
                      Google Maps — 10 Milner Business Court, Scarborough, ON
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-charcoal-700 font-medium mb-1">Office Hours</p>
                  <div className="text-xs text-charcoal-600/50 space-y-1">
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday: 10:00 AM – 4:00 PM</p>
                    <p className="text-gold-600">Sunday & Holidays: Crisis line only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-600 uppercase tracking-wider mb-4">
              FAQ
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-cream-100 rounded-xl border border-cream-300/50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-cream-200/40"
                >
                  <span className="text-sm font-medium text-charcoal-700 pr-4">{faq.q}</span>
                  <i className={`${openFaq === idx ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-charcoal-600/40 text-lg transition-transform duration-300 shrink-0`} />
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-4 text-sm text-charcoal-600/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}