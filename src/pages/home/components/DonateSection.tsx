import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function DonateSection() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row min-h-[450px] lg:min-h-[520px]">
        {/* Left: Image Side */}
        <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-full">
          <img
            src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784649626/Day23_img23_o2ph1n.jpg"
            alt="WORI community support and impact"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.04) 65%, transparent 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
            <span className="text-xs font-medium text-cream-100/85 uppercase tracking-wider mb-2 block drop-shadow-sm">
              {t('donate.makeImpact')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-cream-100 leading-tight drop-shadow-md">
              {t('donate.everyGift')}
              <br />
              <span className="text-gold-400">{t('donate.buildsFutures')}</span>
            </h2>
          </div>
        </div>

        {/* Right: Clean Donation Side */}
        <div className="w-full lg:w-1/2 bg-cream-100 flex items-center justify-center p-8 md:p-10 lg:p-14">
          <div className="w-full max-w-md text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-emerald-900 mb-3">
              {t('donate.title')}
            </h2>
            <p className="text-sm text-charcoal-600/60 mb-8 leading-relaxed max-w-xs mx-auto">
              {t('donate.description')}
            </p>

            {/* Simple impact text */}
            <div className="space-y-2 mb-8 text-left">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-cream-200">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gold-500/20 text-gold-600 shrink-0">
                  <i className="ri-check-line text-xs" />
                </div>
                <p className="text-sm text-charcoal-700">
                  <strong>$50</strong> — {t('donate.impact50')}
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-cream-200">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gold-500/20 text-gold-600 shrink-0">
                  <i className="ri-check-line text-xs" />
                </div>
                <p className="text-sm text-charcoal-700">
                  <strong>$150</strong> — {t('donate.impact150')}
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-cream-200">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gold-500/20 text-gold-600 shrink-0">
                  <i className="ri-check-line text-xs" />
                </div>
                <p className="text-sm text-charcoal-700">
                  <strong>$500</strong> — {t('donate.impact500')}
                </p>
              </div>
            </div>

            <Link
              to="/donate"
              className="flex items-center justify-center gap-2 w-full px-7 py-4 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-bold rounded-full transition-all mb-4 whitespace-nowrap"
            >
              {t('donate.cta')}
              <i className="ri-arrow-right-line" />
            </Link>

            <p className="text-xs text-charcoal-600/40 leading-relaxed">
              {t('donate.secure')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}