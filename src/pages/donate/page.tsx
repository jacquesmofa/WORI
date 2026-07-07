import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';

export default function DonatePage() {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<number | null>(150);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState<'stripe' | 'paypal' | 'canadahelps'>('stripe');

  const tiers = [
    { amount: 50, desc: t('donate.tier1') },
    { amount: 150, desc: t('donate.tier2') },
    { amount: 500, desc: t('donate.tier3') },
  ];

  const finalAmount = selectedTier === 0 && customAmount ? parseInt(customAmount, 10) || 0 : selectedTier || 0;

  return (
    <PageLayout
      title={t('donate.title')}
      subtitle="Every dollar directly funds housing, language mentorship, mental health counseling, and emergency food support for vulnerable newcomers."
      bgImage="https://readdy.ai/api/search-image?query=Warm%20emotional%20close-up%20of%20hands%20exchanging%20a%20donation%20envelope%20in%20a%20bright%20community%20center%2C%20golden%20light%2C%20compassionate%20gesture%2C%20cream%20and%20emerald%20green%20tones%2C%20documentary%20photography%20style%2C%20high-end%20editorial%20quality&width=1920&height=600&seq=donatehero1&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: t('nav.donate') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Donation Tiers */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-3">
                {t('pages.donate.selectGift')}
              </h2>
              <p className="text-sm text-charcoal-600/60 mb-8 leading-relaxed">
                {t('donate.description')}
              </p>

              <div className="space-y-3 mb-6">
                {tiers.map((tier) => (
                  <button
                    key={tier.amount}
                    onClick={() => { setSelectedTier(tier.amount); setCustomAmount(''); }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedTier === tier.amount
                        ? 'border-gold-500 bg-gold-500/5'
                        : 'border-cream-300 hover:border-emerald-800/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                        selectedTier === tier.amount ? 'border-gold-500 bg-gold-500' : 'border-cream-300'
                      }`}>
                        {selectedTier === tier.amount && (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-check-line text-cream-100 text-xs" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-serif text-lg font-semibold text-charcoal-700">${tier.amount}</span>
                        <p className="text-xs text-charcoal-600/60 mt-0.5 leading-relaxed">{tier.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Custom */}
                <button
                  onClick={() => setSelectedTier(0)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTier === 0 ? 'border-gold-500 bg-gold-500/5' : 'border-cream-300 hover:border-emerald-800/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                      selectedTier === 0 ? 'border-gold-500 bg-gold-500' : 'border-cream-300'
                    }`}>
                      {selectedTier === 0 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-check-line text-cream-100 text-xs" />
                        </div>
                      )}
                    </div>
                    <span className="font-serif text-lg font-semibold text-charcoal-700">{t('donate.tierCustom')}</span>
                  </div>
                </button>

                {selectedTier === 0 && (
                  <div className="px-5">
                    <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Enter amount (CAD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600/40 font-serif">$</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter custom amount"
                        min={1}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-100 text-charcoal-700 text-sm focus:outline-none focus:border-emerald-800/40 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Method Selector */}
              <div className="mb-8">
                <label className="block text-xs font-medium text-charcoal-600 mb-2 uppercase tracking-wider">{t('pages.donate.paymentMethod')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'stripe' as const, label: 'Stripe', icon: 'ri-bank-card-line', sub: 'Card, Apple Pay, Google Pay' },
                    { key: 'paypal' as const, label: 'PayPal', icon: 'ri-paypal-line', sub: 'PayPal Express' },
                    { key: 'canadahelps' as const, label: 'CanadaHelps', icon: 'ri-government-line', sub: 'Tax receipt via CRA' },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setMethod(m.key)}
                      className={`px-3 py-3 rounded-xl border-2 text-center transition-all ${
                        method === m.key ? 'border-gold-500 bg-gold-500/5' : 'border-cream-300 hover:border-emerald-800/20'
                      }`}
                    >
                      <i className={`${m.icon} text-lg ${method === m.key ? 'text-gold-600' : 'text-charcoal-600/40'}`} />
                      <div className="text-xs font-semibold text-charcoal-700 mt-1">{m.label}</div>
                      <div className="text-[10px] text-charcoal-600/40 mt-0.5">{m.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all mb-4">
                {finalAmount > 0 ? `Donate $${finalAmount.toLocaleString()} CAD` : t('donate.cta')}
                <i className="ri-arrow-right-line" />
              </button>

              <p className="text-xs text-charcoal-600/40 text-center leading-relaxed">
                {t('donate.secure')}
              </p>
            </div>

            {/* Right: Impact Info */}
            <div>
              <div className="bg-cream-200/40 rounded-2xl p-6 md:p-8 mb-6">
                <h3 className="font-serif text-lg text-charcoal-700 mb-4">{t('pages.donate.yourImpact')}</h3>
                <div className="space-y-4">
                  {[
                    { amount: '$50', impact: 'Provides one week of temporary housing support for a newly arrived refugee family.', icon: 'ri-home-heart-line' },
                    { amount: '$150', impact: 'Funds a full month of one-on-one language mentorship for a newcomer preparing for job interviews.', icon: 'ri-translate-2' },
                    { amount: '$500', impact: 'Sponsors a complete settlement package: housing placement, employment coaching, and mental health check-ins.', icon: 'ri-seedling-line' },
                  ].map((item) => (
                    <div key={item.amount} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0">
                        <i className={`${item.icon} text-emerald-800 text-sm`} />
                      </div>
                      <div>
                        <span className="font-serif text-sm font-semibold text-charcoal-700">{item.amount}</span>
                        <p className="text-xs text-charcoal-600/60 leading-relaxed">{item.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-900 rounded-2xl p-6 md:p-8">
                <h3 className="font-serif text-lg text-cream-100 mb-4">{t('pages.donate.financialAccountability')}</h3>
                <div className="space-y-3 text-sm text-cream-100/60">
                  <p><i className="ri-check-line text-gold-400 mr-2" />{t('pages.donate.craCharity')}</p>
                  <p><i className="ri-check-line text-gold-400 mr-2" />{t('pages.donate.auditedSince')}</p>
                  <p><i className="ri-check-line text-gold-400 mr-2" />{t('pages.donate.percentProgram')}</p>
                  <p><i className="ri-check-line text-gold-400 mr-2" />{t('pages.donate.taxReceiptImmediate')}</p>
                  <p><i className="ri-check-line text-gold-400 mr-2" />{t('pages.donate.monthlyReports')}</p>
                </div>
                <Link
                  to="/about/annual-reports"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
                >
                  {t('pages.donate.viewAnnualReports')} <i className="ri-arrow-right-line text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}