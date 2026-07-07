import { useTranslation } from 'react-i18next';
import { resourceCards } from '@/mocks/homeData';

export default function ResourcesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-cream-200/40">
      <div className="px-6 lg:px-10">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700 text-center mb-10 md:mb-14">
          {t('resources.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
          {resourceCards.map((card) => (
            <div
              key={card.id}
              className="group bg-cream-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <div className="relative p-4 pb-0">
                {card.tag && (
                  <span className="absolute top-6 left-6 z-10 inline-block px-2.5 py-1 rounded-md bg-emerald-800 text-xs font-medium text-cream-100">
                    {card.tag}
                  </span>
                )}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-cream-200/50">
                  <img
                    src={card.image}
                    alt={t(card.titleKey)}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-4 md:p-5 text-center">
                <h3 className="font-medium text-sm md:text-base text-charcoal-700 mb-1">
                  {t(card.titleKey)}
                </h3>
                <p className="text-xs text-charcoal-600/50">
                  {t('common.learnMore')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}