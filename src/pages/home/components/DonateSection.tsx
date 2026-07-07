import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { donationTiers } from '@/mocks/homeData';

export default function DonateSection() {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
        {/* Left: Image Side */}
        <div className="w-full lg:w-1/2 relative min-h-[280px] lg:min-h-full">
          <img
            src="https://readdy.ai/api/search-image?query=Warm%20emotional%20photograph%20of%20a%20volunteer%20handing%20food%20supplies%20to%20a%20refugee%20family%20in%20a%20bright%20modern%20food%20bank%2C%20genuine%20smiles%20and%20gratitude%2C%20warm%20natural%20lighting%2C%20cream%20and%20emerald%20green%20tones%2C%20compassionate%20community%20support%2C%20documentary%20photography%20style%2C%20high-end%20editorial%20quality&width=900&height=700&seq=donate1&orientation=landscape"
            alt="WORI community support and donation impact"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-emerald-900/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="text-xs font-medium text-cream-100/70 uppercase tracking-wider mb-2 block">
              Make an Impact
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-cream-100 leading-tight">
              Every Gift
              <br />
              <span className="text-gold-400">Builds Futures</span>
            </h2>
          </div>
        </div>

        {/* Right: Donation Form Side */}
        <div className="w-full lg:w-1/2 bg-cream-100 flex items-center justify-center p-6 md:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-emerald-900 text-center mb-3">
              {t('donate.title')}
            </h2>
            <p className="text-sm text-charcoal-600/60 text-center mb-8 leading-relaxed">
              {t('donate.description')}
            </p>

            {/* Donation Tiers */}
            <div className="space-y-3 mb-6">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTier === tier.amount
                      ? 'border-gold-500 bg-gold-500/5'
                      : 'border-cream-300 hover:border-emerald-800/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                        selectedTier === tier.amount
                          ? 'border-gold-500 bg-gold-500'
                          : 'border-cream-300'
                      }`}
                    >
                      {selectedTier === tier.amount && (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-check-line text-cream-100 text-xs" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-serif text-lg font-semibold text-charcoal-700">
                        ${tier.amount}
                      </span>
                      <p className="text-xs text-charcoal-600/60 mt-0.5 leading-relaxed">
                        {t(tier.descKey)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              {/* Custom Amount */}
              <button
                onClick={() => setSelectedTier(0)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedTier === 0
                    ? 'border-gold-500 bg-gold-500/5'
                    : 'border-cream-300 hover:border-emerald-800/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                      selectedTier === 0
                        ? 'border-gold-500 bg-gold-500'
                        : 'border-cream-300'
                    }`}
                  >
                    {selectedTier === 0 && (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-check-line text-cream-100 text-xs" />
                      </div>
                    )}
                  </div>
                  <span className="font-serif text-lg font-semibold text-charcoal-700">
                    {t('donate.tierCustom')}
                  </span>
                </div>
              </button>
            </div>

            {/* CTA */}
            <Link
              to="/donate"
              className="flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all mb-4"
            >
              {t('donate.cta')}
              <i className="ri-arrow-right-line" />
            </Link>

            <p className="text-xs text-charcoal-600/40 text-center leading-relaxed">
              {t('donate.secure')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}