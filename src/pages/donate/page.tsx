import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';

export default function DonatePage() {
  const { t } = useTranslation();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <PageLayout
      title={t('donate.title')}
      subtitle={t('donate.supportMission')}
      bgImage="https://readdy.ai/api/search-image?query=Warm%20emotional%20close-up%20of%20hands%20exchanging%20a%20donation%20envelope%20in%20a%20bright%20community%20center%2C%20golden%20light%2C%20compassionate%20gesture%2C%20cream%20and%20emerald%20green%20tones%2C%20documentary%20photography%20style%2C%20high-end%20editorial%20quality&width=1920&height=600&seq=donatehero2&orientation=landscape"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: t('nav.donate') },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Left Column — Mission & Trust */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
                  {t('donate.supportMission')}
                </h2>
                <div className="space-y-3 text-sm text-charcoal-600/70 leading-relaxed">
                  <p>
                    Wadi-Kaja Organization for Refugee and Immigrant (WORI)
                    is a registered charity supporting refugees, newcomers,
                    and vulnerable families.
                  </p>
                  <p>
                    Your donation helps provide essential assistance to refugees,
                    orphans, seniors, at-risk women, and low-income families,
                    giving them hope, stability, and access to vital resources.
                  </p>
                  <p>
                    We are committed to building a compassionate and inclusive
                    community where everyone has the opportunity to thrive.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-cream-300/50 space-y-3">
                <p className="text-sm font-medium text-charcoal-700">
                  {t('donate.taxReceipt')}
                </p>
                <p className="text-sm text-charcoal-600/60 italic">
                  {t('donate.thankYou')}
                </p>
              </div>

              {/* Office Info Card */}
              <div className="bg-cream-200/40 rounded-xl p-5 border border-cream-300/40">
                <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                  {t('donate.headOffice')}
                </p>
                <p className="text-sm text-charcoal-600/70 leading-relaxed">
                  10 Milner Business Court Suite 306
                  <br />
                  Scarborough, ON M1B 3C6
                </p>
                <p className="text-sm text-charcoal-600/50 mt-2">
                  {t('donate.charityNumber')}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">
                  {t('footer.followUs')}
                </span>
                <a
                  href="https://facebook.com/wadikaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                >
                  <i className="ri-facebook-fill text-sm" />
                </a>
                <a
                  href="https://twitter.com/wadikaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                >
                  <i className="ri-twitter-x-fill text-sm" />
                </a>
                <a
                  href="https://youtube.com/@wadikaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                >
                  <i className="ri-youtube-fill text-sm" />
                </a>
                <a
                  href="https://instagram.com/wadikaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                >
                  <i className="ri-instagram-fill text-sm" />
                </a>
                <a
                  href="https://linkedin.com/company/wadikaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                >
                  <i className="ri-linkedin-fill text-sm" />
                </a>
              </div>
            </div>

            {/* Right Column — Payment Form */}
            <div className="lg:col-span-7 space-y-6">

              {/* Zeffy Iframe Container */}
              <div className="bg-white rounded-2xl overflow-hidden border border-cream-300/60">
                {!iframeLoaded && (
                  <div className="flex items-center justify-center h-48">
                    <div className="flex flex-col items-center gap-3">
                      <i className="ri-loader-4-line text-2xl text-emerald-800/40 animate-spin" />
                      <span className="text-sm text-charcoal-600/40">
                        {t('common.loading')}
                      </span>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://www.zeffy.com/embed/donation-form/YOUR_FORM_SLUG_HERE"
                  title="Donate to WORI via Zeffy"
                  width="100%"
                  height="950px"
                  style={{ border: 'none', display: iframeLoaded ? 'block' : 'none' }}
                  allow="payment"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>

              {/* Zeffy Trust Note */}
              <div className="flex items-start gap-3 bg-emerald-800/5 rounded-xl p-4 border border-emerald-800/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="ri-lightbulb-line text-emerald-800 text-sm" />
                </div>
                <p className="text-sm text-charcoal-600/70 leading-relaxed">
                  {t('donate.zeffyNote')}
                </p>
              </div>

              {/* Other Ways to Give */}
              <div className="bg-cream-200/40 rounded-2xl p-6 border border-cream-300/50">
                <h3 className="font-serif text-lg text-charcoal-700 mb-4">
                  {t('donate.otherWays')}
                </h3>

                {/* CanadaHelps — Secondary */}
                <a
                  href="https://www.canadahelps.org/en/dn/122702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-white border border-cream-300 hover:border-emerald-800/30 transition-all mb-3"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-government-line text-emerald-800 text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors">
                      {t('donate.canadahelps')}
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      {t('donate.canadahelpsDesc')}
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                </a>

                {/* PayPal — Tertiary */}
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=WORI_PAYPAL_BUTTON_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-white border border-cream-300 hover:border-[#003087]/30 transition-all mb-3"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#003087]/8 flex items-center justify-center shrink-0">
                    <i className="ri-paypal-line text-[#003087] text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-[#003087] transition-colors">
                      {t('donate.paypal')}
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      {t('donate.paypalDesc')}
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-[#003087] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Stripe — Tertiary */}
                <a
                  href="https://donate.stripe.com/test_WORI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-white border border-cream-300 hover:border-[#635BFF]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#635BFF]/8 flex items-center justify-center shrink-0">
                    <i className="ri-bank-card-line text-[#635BFF] text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-[#635BFF] transition-colors">
                      {t('donate.stripe')}
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      {t('donate.stripeDesc')}
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-[#635BFF] group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2">
                <div className="flex items-center gap-1.5 text-xs text-charcoal-600/40">
                  <i className="ri-shield-check-line text-emerald-800/60" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-600/40">
                  <i className="ri-lock-line text-emerald-800/60" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-600/40">
                  <i className="ri-file-text-line text-emerald-800/60" />
                  <span>Tax Receipt</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-600/40">
                  <i className="ri-verified-badge-line text-emerald-800/60" />
                  <span>CRA Registered</span>
                </div>
              </div>

              <p className="text-xs text-charcoal-600/40 text-center leading-relaxed">
                {t('donate.secure')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}