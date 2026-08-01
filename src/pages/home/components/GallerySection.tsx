import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { galleryCategories } from '@/mocks/galleryData';

// Show exactly 6 categories for clean 3x2 grid alignment
const HOME_CATEGORY_IDS = [
  'award-ceremony',
  'welcoming-refugees',
  'outreach-activities',
  'seniors-entertaining-program',
  'sharing-orphans-needy',
  'yoga-session',
];

const HOME_CATEGORIES = galleryCategories.filter((c) => HOME_CATEGORY_IDS.includes(c.id));

interface CategoryImageState {
  coverImage: string;
  previewIdx: number;
}

export default function GallerySection() {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageStates, setImageStates] = useState<Record<string, CategoryImageState>>({});

  // Initialize image states from gallery data
  useEffect(() => {
    const initial: Record<string, CategoryImageState> = {};
    HOME_CATEGORIES.forEach((cat) => {
      initial[cat.id] = {
        coverImage: cat.coverImage,
        previewIdx: 1,
      };
    });
    setImageStates(initial);
  }, []);

  // Dynamic random image rotation — each category on its own timer
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = [];

    HOME_CATEGORIES.forEach((cat) => {
      const delay = 2500 + Math.random() * 3000;
      const timer = setInterval(() => {
        setImageStates((prev) => {
          const current = prev[cat.id];
          if (!current) return prev;
          const randomIndex = Math.floor(Math.random() * cat.images.length);
          return {
            ...prev,
            [cat.id]: {
              ...current,
              coverImage: cat.images[randomIndex].url,
              previewIdx: Math.floor(Math.random() * Math.min(cat.images.length, 3)),
            },
          };
        });
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, []);

  return (
    <section className="py-10 md:py-14 bg-cream-100">
      <div className="px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-1">{t('events.communityMoments')}</p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800">
                {t('events.gallery.ourGallery')}
              </h2>
              <p className="text-sm text-charcoal-600/50 mt-1 max-w-md">
                {t('events.gallery.sectionDescription')}
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              {t('events.gallery.viewAllCategories')}
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        {/* Clean 3x2 Grid — perfectly aligned */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {HOME_CATEGORIES.map((cat) => {
            const isHovered = hoveredId === cat.id;
            const st = imageStates[cat.id];
            const displayImage = st?.coverImage || cat.coverImage;

            return (
              <Link
                key={cat.id}
                to="/events"
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-white border border-cream-300/40 hover:border-emerald-800/20 transition-all duration-500"
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={t('events.gallery.viewCategory', { name: cat.label })}
              >
                {/* Cover image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={displayImage}
                    alt={cat.label}
                    width="400"
                    height="300"
                    loading="lazy"
                    className={`w-full h-full object-cover object-center transition-all duration-700 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      opacity: isHovered ? 0.15 : 0.35,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.08), transparent)',
                    }}
                  />

                  {/* Image count badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold">
                      <i className="ri-image-line text-[10px]" />
                      {cat.images.length}
                    </span>
                  </div>

                  {/* Category name */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h3 className="font-serif text-sm font-semibold text-white leading-tight">
                      {cat.label}
                    </h3>
                    <p
                      className={`text-[10px] text-white/65 mt-0.5 line-clamp-1 transition-all duration-300 ${
                        isHovered ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0'
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <i className="ri-gallery-view-2 text-white text-lg" />
                    </div>
                  </div>
                </div>

                {/* Preview thumbnails */}
                <div className="flex gap-1 px-2.5 py-2">
                  {cat.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-cream-300/40"
                    >
                      <img
                        src={img.url}
                        alt={t('events.gallery.previewAlt', { name: cat.label, index: i + 1 })}
                        width="32"
                        height="32"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {cat.images.length > 3 && (
                    <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 bg-emerald-800/8 flex items-center justify-center border border-cream-300/40">
                      <span className="text-[9px] font-bold text-emerald-800 leading-tight text-center">
                        +{cat.images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Explore all CTA */}
        <div className="text-center mt-7 max-w-7xl mx-auto">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-bold rounded-full transition-all"
          >
            {t('events.gallery.exploreAllCategories')}
            <i className="ri-image-2-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}