import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import { galleryCategories, GalleryCategory, GalleryImage } from '@/mocks/galleryData';

const INITIAL_LOAD = 12;
const LOAD_MORE_COUNT = 12;

interface LightboxState {
  images: GalleryImage[];
  currentIndex: number;
  categoryLabel: string;
}

export default function EventsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [loadedCount, setLoadedCount] = useState(INITIAL_LOAD);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [captionVisible, setCaptionVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const captionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss caption after 3 seconds
  useEffect(() => {
    if (lightbox) {
      setCaptionVisible(true);
      if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
      captionTimerRef.current = setTimeout(() => setCaptionVisible(false), 3000);
    }
    return () => {
      if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
    };
  }, [lightbox?.currentIndex, lightbox]);

  // Reset zoom on image change
  useEffect(() => {
    setZoom(1);
  }, [lightbox?.currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 1));
    },
    [lightbox]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (images: GalleryImage[], index: number, categoryLabel: string) => {
    setLightbox({ images, currentIndex: index, categoryLabel });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    setZoom(1);
    document.body.style.overflow = '';
  };

  const goNext = () => {
    if (!lightbox) return;
    setLightbox((prev) =>
      prev ? { ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length } : null
    );
  };

  const goPrev = () => {
    if (!lightbox) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
          }
        : null
    );
  };

  const openCategory = (category: GalleryCategory) => {
    setSelectedCategory(category);
    setLoadedCount(INITIAL_LOAD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCategory = () => {
    setSelectedCategory(null);
    setLoadedCount(INITIAL_LOAD);
  };

  const currentImages = selectedCategory
    ? selectedCategory.images.slice(0, loadedCount)
    : [];
  const hasMore = selectedCategory
    ? loadedCount < selectedCategory.images.length
    : false;

  return (
    <PageLayout
      title={t('pages.events.title')}
      subtitle={t('pages.events.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298489/wori-awards-20-1536x1024_uqyztr.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: t('newsMenu.eventsGallery') },
      ]}
      seo={{
        title: 'Events & Photo Gallery | WORI Community Celebrations',
        description: 'Browse photo galleries from WORI events, award ceremonies, community celebrations, Canada Day gatherings, wellness sessions, and settlement workshops. See our impact in action.',
        keywords: 'WORI events, refugee community events, immigrant celebration photos, Wadi-Kaja gallery, settlement workshops Toronto',
        canonicalPath: '/events',
      }}
    >
      {/* ── CATEGORY VIEW (main pool) ── */}
      {!selectedCategory && (
        <>
          {/* Header */}
          <section className="px-6 lg:px-10 pt-10 pb-4">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm text-charcoal-600/60 leading-relaxed max-w-2xl">
                Browse our photo gallery organized by event and activity. Click any category to explore all images inside.
              </p>
            </div>
          </section>

          {/* Category Masonry Grid */}
          <section className="px-6 lg:px-10 py-6 md:py-10">
            <div className="max-w-6xl mx-auto">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                {galleryCategories.map((cat) => {
                  const previews = cat.images.slice(1, 5);
                  return (
                    <article
                      key={cat.id}
                      className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer bg-cream-100 border border-cream-300/40 hover:border-emerald-800/20 transition-all"
                      onClick={() => openCategory(cat)}
                    >
                      {/* Cover Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={cat.coverImage}
                          alt={cat.label}
                          width="600"
                          height="400"
                          loading="lazy"
                          className="w-full h-auto object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          style={{ aspectRatio: '3/2' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Image count badge */}
                        <div className="absolute top-3 right-3">
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
                            <i className="ri-image-line text-xs" />
                            {cat.images.length}
                          </span>
                        </div>

                        {/* Category title */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-serif text-base font-semibold text-white leading-tight">
                            {cat.label}
                          </h3>
                          <p className="text-xs text-white/70 mt-0.5 line-clamp-1">{cat.description}</p>
                        </div>

                        {/* View gallery icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
                            <i className="ri-gallery-view-2 text-white text-xl" />
                          </div>
                        </div>
                      </div>

                      {/* Preview thumbnails */}
                      {previews.length > 0 && (
                        <div className="flex gap-1.5 px-3 py-2.5">
                          {previews.map((img, i) => (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-cream-300/50"
                            >
                              <img
                                src={img.url}
                                alt={`${cat.label} preview ${i + 1}`}
                                width="48"
                                height="48"
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {cat.images.length > 5 && (
                            <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-emerald-800/10 flex items-center justify-center border border-cream-300/50">
                              <span className="text-[10px] font-bold text-emerald-800 leading-tight text-center">
                                +{cat.images.length - 5}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CATEGORY DETAIL VIEW ── */}
      {selectedCategory && (
        <>
          {/* Breadcrumb nav */}
          <section className="px-6 lg:px-10 pt-8 pb-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-charcoal-600/60 flex-wrap">
                <button
                  onClick={closeCategory}
                  className="flex items-center gap-1 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-s-line" />
                  <span>All Categories</span>
                </button>
                <span className="text-charcoal-600/30">/</span>
                <span className="font-medium text-charcoal-700">{selectedCategory.label}</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-medium text-charcoal-700">
                    {selectedCategory.label}
                  </h2>
                  <p className="text-sm text-charcoal-600/60 mt-1 max-w-xl leading-relaxed">
                    {selectedCategory.description}
                  </p>
                </div>
                <span className="text-xs text-charcoal-600/40 whitespace-nowrap">
                  Showing {Math.min(loadedCount, selectedCategory.images.length)} of {selectedCategory.images.length} photos
                </span>
              </div>
            </div>
          </section>

          {/* Image Masonry Pool */}
          <section className="px-6 lg:px-10 py-4 md:py-8">
            <div className="max-w-6xl mx-auto">
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {currentImages.map((img, i) => (
                  <button
                    key={i}
                    className="break-inside-avoid mb-3 block w-full overflow-hidden rounded-xl cursor-pointer group relative"
                    onClick={() => openLightbox(selectedCategory.images, i, selectedCategory.label)}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.title ?? `${selectedCategory.label} photo ${i + 1}`}
                      width="400"
                      height="300"
                      loading="lazy"
                      className="w-full h-auto object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center rounded-xl">
                      <i className="ri-zoom-in-line text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setLoadedCount((c) => c + LOAD_MORE_COUNT)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all cursor-pointer"
                  >
                    <i className="ri-add-line" />
                    Load More Photos
                    <span className="text-cream-100/60 text-xs">
                      ({selectedCategory.images.length - loadedCount} remaining)
                    </span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <i className="ri-close-line text-white text-xl" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.25, 1)); }}
              aria-label="Zoom out"
            >
              <i className="ri-zoom-out-line text-white text-sm" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.25, 3)); }}
              aria-label="Zoom in"
            >
              <i className="ri-zoom-in-line text-white text-sm" />
            </button>
            {zoom > 1 && (
              <button
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setZoom(1); }}
                aria-label="Reset zoom"
              >
                <i className="ri-refresh-line text-white text-sm" />
              </button>
            )}
          </div>

          {/* Prev arrow */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            <i className="ri-arrow-left-s-line text-white text-xl" />
          </button>

          {/* Next arrow */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            <i className="ri-arrow-right-s-line text-white text-xl" />
          </button>

          {/* Main image */}
          <div
            className="max-w-5xl w-full px-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.currentIndex].url}
              alt={lightbox.images[lightbox.currentIndex].title ?? `Photo ${lightbox.currentIndex + 1}`}
              className="max-h-[82vh] max-w-full object-contain rounded-lg transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
              draggable={false}
            />
          </div>

          {/* Auto-dismiss caption */}
          {lightbox.images[lightbox.currentIndex].title && (
            <div
              className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium transition-all duration-500 pointer-events-none ${
                captionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {lightbox.images[lightbox.currentIndex].title} &mdash; {lightbox.currentIndex + 1}/{lightbox.images.length}
            </div>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 px-4 max-w-lg overflow-x-auto pb-1">
            {lightbox.images
              .slice(
                Math.max(0, lightbox.currentIndex - 3),
                Math.min(lightbox.images.length, lightbox.currentIndex + 4)
              )
              .map((img, idx) => {
                const realIdx = Math.max(0, lightbox.currentIndex - 3) + idx;
                return (
                  <button
                    key={realIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) => prev ? { ...prev, currentIndex: realIdx } : null);
                    }}
                    className={`w-10 h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      realIdx === lightbox.currentIndex
                        ? 'border-white scale-110'
                        : 'border-white/20 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      width="40"
                      height="40"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Stay Connected CTA */}
      {!selectedCategory && (
        <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
              {t('pages.events.stayConnected')}
            </h2>
            <p className="text-sm text-charcoal-600/60 mb-8 max-w-xl mx-auto leading-relaxed">
              {t('pages.events.stayConnectedDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                {t('nav.volunteer')}
                <i className="ri-user-heart-line" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                {t('nav.donate')}
                <i className="ri-heart-line" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}