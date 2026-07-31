import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { galleryCategories } from '@/mocks/galleryData';

// Show specific categories on home page — including Past Events and Upcoming Events
const HOME_CATEGORY_IDS = [
  'past-events',
  'upcoming-events',
  'award-ceremony',
  'outreach-activities',
  'outreach-activity',
  'seniors-entertaining-program',
  'seniors-entertaining-p',
  'sharing-orphans-needy',
  'welcoming-refugees',
  'yoga-session',
];

const HOME_CATEGORIES = galleryCategories.filter((c) => HOME_CATEGORY_IDS.includes(c.id));

interface CategoryImageState {
  coverImage: string;
  previewIdx: number;
}

export default function GallerySection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Track dynamic images per category
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
      const delay = 2500 + Math.random() * 3000; // 2.5–5.5 second random delay
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
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-1">Community Moments</p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal-700">
                Our Gallery
              </h2>
              <p className="text-sm text-charcoal-600/50 mt-1 max-w-md">
                Real moments from WORI events, programs, and community — click any category to explore.
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              View All Categories
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        {/* Category Grid — compact masonry */}
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-3">
          {HOME_CATEGORIES.map((cat) => {
            const isHovered = hoveredId === cat.id;
            const st = imageStates[cat.id];
            const displayImage = st?.coverImage || cat.coverImage;

            return (
              <Link
                key={cat.id}
                to="/events"
                className="break-inside-avoid mb-3 block group relative overflow-hidden rounded-xl cursor-pointer bg-white border border-cream-300/40 hover:border-emerald-800/20 transition-all duration-500"
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`View ${cat.label} gallery`}
              >
                {/* Cover image with crossfade transition */}
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
                    style={{
                      animationName: 'none',
                    }}
                  />

                  {/* Fading pop-up / pop-off effect */}
                  <div
                    className="absolute inset-0 bg-black/20 transition-opacity duration-700"
                    style={{
                      opacity: isHovered ? 0.15 : 0.35,
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/8 to-transparent transition-opacity duration-500" />

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

                {/* Preview thumbnails — smaller */}
                <div className="flex gap-1 px-2.5 py-2">
                  {cat.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-cream-300/40"
                    >
                      <img
                        src={img.url}
                        alt={`${cat.label} preview ${i + 1}`}
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
            Explore All 13 Categories
            <i className="ri-image-2-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}