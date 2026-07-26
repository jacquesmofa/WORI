import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function HeroSection() {
  const { t } = useTranslation();
  const { getContent, getImage } = useSiteContent();

  const heroImage = getImage(
    'hero.image',
    'https://readdy.ai/api/search-image?query=Aerial%20drone%20photograph%20of%20a%20welcoming%20Canadian%20landscape%20at%20golden%20hour%2C%20showing%20vast%20green%20forests%20meeting%20a%20calm%20lake%2C%20with%20a%20small%20diverse%20community%20gathering%20visible%20on%20the%20shore%2C%20warm%20golden%20light%2C%20cinematic%20composition%2C%20rich%20emerald%20green%20and%20gold%20tones%2C%20prestigious%20documentary%20photography%20style%2C%20no%20text%2C%20no%20watermarks&width=1920&height=1080&seq=hero1&orientation=landscape'
  );

  return (
    <section className="relative min-h-[100dvh] flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Welcoming Canadian landscape representing WORI's community"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-10">
        <div className="max-w-3xl animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-100/25 bg-white/5 backdrop-blur-sm mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-xs md:text-sm font-medium text-cream-100/90 tracking-wide uppercase">
              {getContent('hero.badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-cream-100 leading-[1.1] mb-6 md:mb-8 text-balance">
            {getContent('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-cream-100/75 leading-relaxed max-w-xl mb-8 md:mb-10 font-light">
            {getContent('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <Link
              to="/services/settlement"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/20 whitespace-nowrap"
            >
              {getContent('hero.ctaPrimary')}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-cream-100/30 hover:border-cream-100/60 text-cream-100 text-sm font-medium rounded-full transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10 whitespace-nowrap"
            >
              {getContent('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}