import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';

/* =============================================================================
   PREMIUM DONATION PAGE — Zeffy Embed + Clean Seamless Checkout
   ============================================================================= */

const ZEFFY_IFRAME_SRC = 'https://www.zeffy.com/embed/donation-form/support-our-mission-197';
const ZEFFY_SCRIPT_SRC = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';

export default function DonatePage() {
  const { t } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const zeffyContainerRef = useRef<HTMLDivElement>(null);

  /* Load Zeffy embed script */
  useEffect(() => {
    const existing = document.querySelector('script[data-zeffy-script]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = ZEFFY_SCRIPT_SRC;
    script.async = true;
    script.dataset.zeffyScript = 'true';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Do NOT remove — Zeffy may need it after unmount
    };
  }, []);

  const socialLinks = [
    {
      href: 'https://www.facebook.com/Wadi-Kaja-Organization-for-Refugee-and-Immigrant-108592454153210/',
      icon: 'ri-facebook-fill',
      label: 'Facebook',
    },
    { href: 'https://twitter.com/KajaWadi', icon: 'ri-twitter-x-fill', label: 'X (Twitter)' },
    {
      href: 'https://www.youtube.com/channel/UCy4W_QKNpQM-tgSQVjLbxDg/featured',
      icon: 'ri-youtube-fill',
      label: 'YouTube',
    },
    {
      href: 'https://www.instagram.com/ordera1643/',
      icon: 'ri-instagram-fill',
      label: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/nasseradin-abdullah-867b4a128/',
      icon: 'ri-linkedin-fill',
      label: 'LinkedIn',
    },
    { href: 'https://vt.tiktok.com/ZSmte2UVb/', icon: 'ri-tiktok-fill', label: 'TikTok' },
  ];

  return (
    <PageLayout
      title={t('donate.title')}
      subtitle={t('donate.supportMission')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784295210/IMG_20200424_121422_452_hunip7.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: t('nav.donate') },
      ]}
      seo={{
        title: 'Donate to WORI | Support Refugee & Immigrant Services in Canada',
        description: 'Make a tax-deductible donation to Wadi-Kaja Organization. Every gift funds settlement support, housing assistance, language mentorship, and emergency relief for refugees and newcomers.',
        keywords: 'donate WORI, refugee charity donation, immigrant support Canada, tax-deductible charity, Wadi-Kaja donation, newcomer settlement fund',
        canonicalPath: '/donate',
      }}
    >
      {/* ── Premium Hero Trust Bar ── */}
      <section className="bg-emerald-950 border-y border-emerald-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { icon: 'ri-shield-check-line', text: 'CRA Registered Charity' },
            { icon: 'ri-file-text-line', text: 'Tax Receipts Issued' },
            { icon: 'ri-lock-line', text: 'SSL Secure Checkout' },
            { icon: 'ri-verified-badge-line', text: '100% to Programs' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-xs font-medium text-cream-100/60">
              <i className={`${badge.icon} text-gold-400`} />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* ── Left Column — Mission Story ── */}
            <div className="lg:col-span-5 space-y-7">
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-gold-500/40 text-xs font-medium text-gold-500 uppercase tracking-wider mb-4">
                  Support Our Mission
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4 leading-tight">
                  Every Gift Builds Futures
                </h2>
                <div className="space-y-3 text-sm text-charcoal-600/70 leading-relaxed">
                  <p>
                    <strong>Wadi-Kaja Organization for Refugee and Immigrant (WORI)</strong>
                    {' '}is a registered Canadian charity dedicated to uplifting refugees,
                    newcomers, and vulnerable families.
                  </p>
                  <p>
                    Your generosity provides essential support to orphans, seniors,
                    at-risk women, and low-income households — offering hope, stability,
                    and access to vital resources.
                  </p>
                  <p>
                    We are committed to building a compassionate and inclusive
                    community where everyone has the opportunity to thrive.
                  </p>
                  <p className="text-charcoal-700 font-medium">
                    All donations are eligible for a tax receipt.<br />
                    Every contribution makes a meaningful impact.
                  </p>
                </div>
              </div>

              {/* Impact Tiers */}
              <div className="space-y-3">
                {[
                  { amount: '$50', impact: 'Provides one week of temporary housing support' },
                  { amount: '$150', impact: 'Funds a month of language mentorship for one newcomer' },
                  { amount: '$500', impact: 'Sponsors a full settlement package including housing, employment coaching, and mental health check-ins' },
                ].map((tier) => (
                  <div
                    key={tier.amount}
                    className="flex items-start gap-4 p-4 rounded-xl bg-cream-200/40 border border-cream-300/40 hover:border-gold-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0">
                      <i className="ri-heart-3-line text-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-700">{tier.amount}</p>
                      <p className="text-xs text-charcoal-600/60">{tier.impact}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Info */}
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
                  Charity Registration: 748873338RR0001
                </p>
              </div>

              {/* Donation Card Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/oqdvximy/image/upload/v1784655794/card-img_lsnedk.png"
                  alt="WORI donation card"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">
                  {t('footer.followUs')}
                </span>
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-cream-200/60 flex items-center justify-center text-charcoal-600/50 hover:bg-emerald-800 hover:text-cream-100 transition-all"
                  >
                    <i className={`${s.icon} text-sm`} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right Column — Zeffy Donation Card ── */}
            <div className="lg:col-span-7 space-y-6">
              {/* Zeffy Embed Container — clean, no loading spinner */}
              <div className="rounded-2xl overflow-hidden border border-cream-300/60 bg-white">
                <div
                  ref={zeffyContainerRef}
                  data-zeffy-embed=""
                  data-form-url="/embed/donation-form/support-our-mission-197"
                >
                  <div
                    style={{ display: scriptLoaded ? 'none' : 'block' }}
                    data-zeffy-embed-fallback=""
                  >
                    <div className="relative overflow-hidden" style={{ height: '680px' }}>
                      <iframe
                        src={ZEFFY_IFRAME_SRC}
                        title="Donate to WORI via Zeffy"
                        className="absolute inset-0 w-full h-full border-0"
                        allow="payment"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Icons */}
              <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                {[
                  { name: 'Visa', color: 'bg-blue-800' },
                  { name: 'Mastercard', color: 'bg-red-700' },
                  { name: 'Amex', color: 'bg-blue-600' },
                  { name: 'Interac', color: 'bg-orange-600' },
                  { name: 'PayPal', color: 'bg-blue-700' },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="px-3 py-1.5 rounded-md bg-charcoal-800/5 border border-charcoal-800/10 text-xs font-semibold text-charcoal-600/70 tracking-wide"
                  >
                    {method.name}
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2">
                {[
                  { icon: 'ri-shield-check-line', text: 'SSL Encrypted' },
                  { icon: 'ri-lock-line', text: 'Secure Payment' },
                  { icon: 'ri-file-text-line', text: 'Tax Receipt' },
                  { icon: 'ri-verified-badge-line', text: 'CRA Registered' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5 text-xs text-charcoal-600/40">
                    <i className={`${badge.icon} text-emerald-800/60`} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-cream-300/50" />
                <span className="text-xs text-charcoal-600/40 font-medium uppercase tracking-wider">
                  Other Ways to Give
                </span>
                <div className="flex-1 h-px bg-cream-300/50" />
              </div>

              {/* Alternative Payment Options */}
              <div className="space-y-3">
                {/* CanadaHelps */}
                <a
                  href="https://www.canadahelps.org/en/dn/122702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-cream-200/40 border border-cream-300 hover:border-emerald-800/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-government-line text-emerald-800 text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors">
                      CanadaHelps
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      Donate through Canada&apos;s trusted charity platform
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                </a>

                {/* PayPal → CanadaHelps (PayPal accepted there) */}
                <a
                  href="https://www.canadahelps.org/en/dn/122702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-cream-200/40 border border-cream-300 hover:border-blue-800/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-800/8 flex items-center justify-center shrink-0">
                    <i className="ri-paypal-line text-blue-800 text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-blue-800 transition-colors">
                      CanadaHelps (PayPal Accepted)
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      Donate via CanadaHelps — PayPal, credit card, and more
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-blue-800 group-hover:translate-x-1 transition-all" />
                </a>

                {/* E-Transfer */}
                <a
                  href="mailto:info@wadikajaorganization.org?subject=Interac%20e-Transfer%20Donation"
                  className="group flex items-center gap-4 w-full p-4 rounded-xl bg-cream-200/40 border border-cream-300 hover:border-gold-500/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0">
                    <i className="ri-bank-line text-gold-600 text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-charcoal-700 group-hover:text-gold-600 transition-colors">
                      Interac e-Transfer
                    </p>
                    <p className="text-xs text-charcoal-600/50">
                      Send directly to info@wadikajaorganization.org
                    </p>
                  </div>
                  <i className="ri-arrow-right-line text-charcoal-600/30 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              <p className="text-xs text-charcoal-600/40 text-center leading-relaxed">
                Secure payment processing powered by Zeffy. Tax receipts issued via email within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            Have Questions About Donating?
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-6 max-w-xl mx-auto">
            Our fundraising team is happy to discuss corporate partnerships, major gifts, legacy giving, or event sponsorships.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
          >
            Contact Fundraising Team
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}