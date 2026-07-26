import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto';

const HERO_SLIDES = [
  {
    id: 1,
    image: `${CLD}/v1784298489/wori-awards-20-1536x1024_uqyztr.jpg`,
    label: 'WORI Awards 2025',
    sublabel: 'Celebrating Resilience, Leadership & Community Across Canada',
    cta: 'View Gallery',
    ctaPath: '/events',
  },
  {
    id: 2,
    image: `${CLD}/v1784649535/Arrived-Refugee-Photos-page-001_grvjts.jpg`,
    label: 'Welcoming Refugees',
    sublabel: 'Supporting displaced families and newcomers arriving in Canada',
    cta: 'Learn More',
    ctaPath: '/services/settlement',
  },
  {
    id: 3,
    image: `${CLD}/v1784295067/IMG-20201006-WA0115_xhjjlt.jpg`,
    label: 'Community Outreach',
    sublabel: 'Providing essential services to vulnerable families across Toronto',
    cta: 'Get Involved',
    ctaPath: '/volunteer',
  },
  {
    id: 4,
    image: `${CLD}/v1784648568/yoga-session-img1_vnjmwh.jpg`,
    label: 'Seniors Wellness',
    sublabel: 'Weekly yoga and wellness sessions promoting health and connection',
    cta: 'View Events',
    ctaPath: '/events',
  },
  {
    id: 5,
    image: `${CLD}/v1784298487/wori-awards-19-2048x1365_dba7yz.jpg`,
    label: 'Community Excellence',
    sublabel: 'Honoring outstanding contributions from volunteers and partners',
    cta: 'View Gallery',
    ctaPath: '/events',
  },
  {
    id: 6,
    image: `${CLD}/v1784646872/Photo-1_idgega.jpg`,
    label: 'Senior Entertainment',
    sublabel: 'Bringing joy, music, and dance to seniors across the GTA',
    cta: 'Learn More',
    ctaPath: '/services/seniors',
  },
  {
    id: 7,
    image: `${CLD}/v1784649688/Day23_img28_jqixge.jpg`,
    label: 'New Beginnings',
    sublabel: 'Refugee families finding hope and home in our community',
    cta: 'Learn More',
    ctaPath: '/services/settlement',
  },
  {
    id: 8,
    image: `${CLD}/v1784650837/Canada-Day-2022_uvumg9.jpg`,
    label: 'Canada Day Celebration',
    sublabel: 'Celebrating together as Canadians — new and old',
    cta: 'See Events',
    ctaPath: '/events',
  },
  {
    id: 9,
    image: `${CLD}/v1784298464/wori-awards-16-2048x1585_aklmvs.jpg`,
    label: 'Award Ceremony',
    sublabel: 'Recognizing the extraordinary dedication that transforms lives',
    cta: 'View Gallery',
    ctaPath: '/events',
  },
  {
    id: 10,
    image: `${CLD}/v1784295210/IMG_20200424_121422_452_hunip7.jpg`,
    label: 'Sharing For Orphans',
    sublabel: 'Bringing nourishment and hope to orphans and families in need',
    cta: 'Donate Now',
    ctaPath: '/donate',
  },
  {
    id: 11,
    image: `${CLD}/v1784649567/Arrived-Refugee-Photos-page-011_rtygf7.jpg`,
    label: 'Warm Welcome',
    sublabel: 'Every refugee deserves a dignified and compassionate arrival',
    cta: 'Learn More',
    ctaPath: '/services/settlement',
  },
  {
    id: 12,
    image: `${CLD}/v1784648638/yoga-session-img33_azsblr.jpg`,
    label: 'Wellness Programs',
    sublabel: 'Free fitness and wellness sessions for newcomer seniors',
    cta: 'View Events',
    ctaPath: '/events',
  },
  {
    id: 13,
    image: `${CLD}/v1784295065/IMG-20201006-WA0158_zszvac.jpg`,
    label: 'Food Security',
    sublabel: 'Ensuring no family goes hungry in our community',
    cta: 'Donate Now',
    ctaPath: '/donate',
  },
  {
    id: 14,
    image: `${CLD}/v1784295063/IMG-20201006-WA0121_ekdr3z.jpg`,
    label: 'Senior Programs',
    sublabel: 'Music, dance, and community connection for our elders',
    cta: 'Get Involved',
    ctaPath: '/volunteer',
  },
  {
    id: 15,
    image: `${CLD}/v1784298377/wori-awards-1-2048x1365_m59hir.jpg`,
    label: 'WORI Gala',
    sublabel: 'An evening of celebration, gratitude, and community impact',
    cta: 'View Gallery',
    ctaPath: '/events',
  },
];

export default function HeroSlider() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 500);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '600px', minHeight: '480px' }}>
      {/* Slide Image with crossfade */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={slide.image}
          alt={slide.label}
          className="w-full h-full object-cover object-top"
          loading={current === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end pb-16 md:pb-20">
        <div className="w-full px-6 lg:px-12 max-w-5xl">
          <div className={`transition-all duration-600 ${animating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500 mb-5">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                {slide.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl mb-5 text-balance">
              {slide.sublabel}
            </h1>

            {/* CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to={slide.ctaPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-cream-100 text-emerald-900 text-sm font-bold rounded-full transition-all whitespace-nowrap"
              >
                {slide.cta}
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-bold rounded-full transition-all whitespace-nowrap"
              >
                {t('donate.cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-all border border-white/20"
      >
        <i className="ri-arrow-left-s-line text-xl" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-all border border-white/20"
      >
        <i className="ri-arrow-right-s-line text-xl" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all rounded-full ${
              i === current
                ? 'w-6 h-2 bg-gold-500'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 md:right-10">
        <span className="text-xs font-medium text-white/50">
          {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}