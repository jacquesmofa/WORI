import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { programDirectories } from '@/mocks/homeData';

export default function ProgramsSection() {
  const { t } = useTranslation();

  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-800/90 to-emerald-800/60',
    gold: 'from-charcoal-700/90 to-charcoal-700/60',
    charcoal: 'from-charcoal-800/90 to-charcoal-800/60',
  };

  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="px-6 lg:px-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal-700 leading-tight mb-4">
            {t('programs.title')}{' '}
            <span className="text-gold-600">{t('programs.titleAccent')}</span>
          </h2>
          <p className="text-base text-charcoal-600/60 max-w-2xl mx-auto leading-relaxed">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Left Large Card */}
          <div className="md:row-span-2 relative rounded-2xl overflow-hidden group min-h-[300px] md:min-h-[520px]">
            <img
              src={programDirectories[0].image}
              alt={t(programDirectories[0].titleKey)}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[programDirectories[0].color]} transition-opacity duration-500`} />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-cream-100 mb-3">
                Directory 01
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-cream-100 font-medium mb-2">
                {t(programDirectories[0].titleKey)}
              </h3>
              <p className="text-sm text-cream-100/70 leading-relaxed max-w-sm">
                {t(programDirectories[0].descKey)}
              </p>
            </div>
            {/* Hover border shimmer */}
            <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Right Top */}
          <div className="relative rounded-2xl overflow-hidden group min-h-[240px] md:min-h-[250px]">
            <img
              src={programDirectories[1].image}
              alt={t(programDirectories[1].titleKey)}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[programDirectories[1].color]} transition-opacity duration-500`} />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <span className="inline-block px-3 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-cream-100 mb-2">
                Directory 02
              </span>
              <h3 className="font-serif text-lg md:text-xl text-cream-100 font-medium mb-1">
                {t(programDirectories[1].titleKey)}
              </h3>
              <p className="text-sm text-cream-100/70 leading-relaxed max-w-xs">
                {t(programDirectories[1].descKey)}
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Right Bottom - Two smaller cards side by side */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="relative rounded-2xl overflow-hidden group min-h-[200px] md:min-h-[250px]">
              <img
                src={programDirectories[2].image}
                alt={t(programDirectories[2].titleKey)}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[programDirectories[2].color]} transition-opacity duration-500`} />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-cream-100 mb-1.5">
                  03
                </span>
                <h3 className="font-serif text-base md:text-lg text-cream-100 font-medium mb-1 leading-tight">
                  {t(programDirectories[2].titleKey)}
                </h3>
                <p className="text-xs text-cream-100/70 leading-relaxed line-clamp-2">
                  {t(programDirectories[2].descKey)}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500 pointer-events-none" />
            </div>

            <div className="relative rounded-2xl overflow-hidden group min-h-[200px] md:min-h-[250px]">
              <img
                src={programDirectories[3].image}
                alt={t(programDirectories[3].titleKey)}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[programDirectories[3].color]} transition-opacity duration-500`} />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-cream-100 mb-1.5">
                  04
                </span>
                <h3 className="font-serif text-base md:text-lg text-cream-100 font-medium mb-1 leading-tight">
                  {t(programDirectories[3].titleKey)}
                </h3>
                <p className="text-xs text-cream-100/70 leading-relaxed line-clamp-2">
                  {t(programDirectories[3].descKey)}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/services/settlement"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
          >
            {t('programs.cta')}
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}