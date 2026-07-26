import { useState, useRef, useEffect, useCallback } from 'react';
import { eventsData, type WoriEvent } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function sortUpcoming(events: WoriEvent[]): WoriEvent[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function sortPast(events: WoriEvent[]): WoriEvent[] {
  return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const VISIBLE_COUNT = 3;
const PEEK_WIDTH = 60;

export default function EventsSection() {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // Automatically split upcoming vs past based on current date
  const [upcoming, setUpcoming] = useState<WoriEvent[]>(() => {
    const up = eventsData.upcoming
      .filter((e) => e.date >= todayStr)
      .concat(eventsData.past.filter((e) => e.date >= todayStr));
    return sortUpcoming(up);
  });

  const [past, setPast] = useState<WoriEvent[]>(() => {
    const pa = eventsData.past
      .filter((e) => e.date < todayStr)
      .concat(eventsData.upcoming.filter((e) => e.date < todayStr));
    return sortPast(pa);
  });

  // Re-check every 60 seconds so events auto-move from upcoming→past when their date passes
  useEffect(() => {
    const interval = setInterval(() => {
      const checkNow = new Date();
      const checkStr = checkNow.toISOString().split('T')[0];
      const all = [...eventsData.upcoming, ...eventsData.past];
      const newUp = all.filter((e) => e.date >= checkStr);
      const newPa = all.filter((e) => e.date < checkStr);
      setUpcoming(sortUpcoming(newUp));
      setPast(sortPast(newPa));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Upcoming Carousel ---
  const [upcomingIdx, setUpcomingIdx] = useState(0);
  const upcomingMax = Math.max(0, upcoming.length - VISIBLE_COUNT);

  const nextUpcoming = useCallback(() => {
    setUpcomingIdx((prev) => Math.min(prev + 1, upcomingMax));
  }, [upcomingMax]);

  const prevUpcoming = useCallback(() => {
    setUpcomingIdx((prev) => Math.max(prev - 1, 0));
  }, []);

  // Swipe for upcoming
  const upcomingTrackRef = useRef<HTMLDivElement>(null);
  const swipeUpcoming = useRef({ startX: 0, dragging: false });

  const handleUpcomingTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    swipeUpcoming.current.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    swipeUpcoming.current.dragging = true;
  };

  const handleUpcomingTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipeUpcoming.current.dragging) return;
    swipeUpcoming.current.dragging = false;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = swipeUpcoming.current.startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextUpcoming();
      else prevUpcoming();
    }
  };

  // --- Past Carousel ---
  const [pastIdx, setPastIdx] = useState(0);
  const pastMax = Math.max(0, past.length - VISIBLE_COUNT);

  const nextPast = useCallback(() => {
    setPastIdx((prev) => Math.min(prev + 1, pastMax));
  }, [pastMax]);

  const prevPast = useCallback(() => {
    setPastIdx((prev) => Math.max(prev - 1, 0));
  }, []);

  const swipePast = useRef({ startX: 0, dragging: false });

  const handlePastTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    swipePast.current.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    swipePast.current.dragging = true;
  };

  const handlePastTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipePast.current.dragging) return;
    swipePast.current.dragging = false;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = swipePast.current.startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPast();
      else prevPast();
    }
  };

  // Card width calculation
  const cardWidth = `calc((100% - ${PEEK_WIDTH}px) / ${VISIBLE_COUNT})`;

  return (
    <section className="py-14 md:py-20 bg-cream-200/30 overflow-hidden">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/10 border border-emerald-800/20 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-3">
            Events
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal-700">
            Past &amp; Upcoming Events
          </h2>
          <p className="text-sm text-charcoal-600/50 mt-2 max-w-lg mx-auto">
            Join us at our community events — from fundraisers to settlement workshops, every gathering strengthens our mission.
          </p>
        </div>

        {/* === UPCOMING EVENTS ROW === */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-charcoal-700">
                Upcoming Events
              </h3>
              <p className="text-xs text-charcoal-600/50 mt-0.5">
                Mark your calendar — join us at our next community gathering
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prevUpcoming}
                disabled={upcomingIdx === 0}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal-700/15 hover:border-emerald-800/30 hover:bg-emerald-800/5 text-charcoal-600 hover:text-emerald-800 transition-all disabled:opacity-25 disabled:cursor-default cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-lg" />
              </button>
              <button
                onClick={nextUpcoming}
                disabled={upcomingIdx >= upcomingMax}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal-700/15 hover:border-emerald-800/30 hover:bg-emerald-800/5 text-charcoal-600 hover:text-emerald-800 transition-all disabled:opacity-25 disabled:cursor-default cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-lg" />
              </button>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-cream-300/40">
              <i className="ri-calendar-event-line text-charcoal-600/30 text-3xl mb-2 block" />
              <p className="text-sm text-charcoal-600/50">No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            <div
              ref={upcomingTrackRef}
              className="relative w-full"
              onMouseDown={handleUpcomingTouchStart}
              onMouseUp={handleUpcomingTouchEnd}
              onTouchStart={handleUpcomingTouchStart}
              onTouchEnd={handleUpcomingTouchEnd}
            >
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${upcomingIdx * (100 / VISIBLE_COUNT)}%)` }}
                >
                  {upcoming.map((evt, i) => (
                    <div
                      key={evt.id}
                      className="flex-shrink-0 group cursor-pointer"
                      style={{ width: cardWidth }}
                    >
                      <Link to="/events" className="block">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-3 border border-cream-300/40 group-hover:border-emerald-800/20 transition-all group-hover:shadow-lg">
                          <img
                            src={evt.flyer}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Date badge */}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-sm">
                            <span className="block text-xs font-bold text-emerald-800 uppercase leading-tight">
                              {new Date(evt.date + 'T00:00:00').toLocaleDateString('en-CA', { month: 'short' })}
                            </span>
                            <span className="block text-lg font-black text-charcoal-700 leading-tight">
                              {new Date(evt.date + 'T00:00:00').getDate()}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-1">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-charcoal-600/50 flex items-center gap-1">
                          <i className="ri-map-pin-line" />
                          {evt.location}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right peek indicator */}
              {upcomingIdx < upcomingMax && (
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream-200/40 to-transparent pointer-events-none" />
              )}
            </div>
          )}
        </div>

        {/* === PAST EVENTS ROW === */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-charcoal-700">
                Past Events
              </h3>
              <p className="text-xs text-charcoal-600/50 mt-0.5">
                Relive the moments and milestones from our recent gatherings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prevPast}
                disabled={pastIdx === 0}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal-700/15 hover:border-emerald-800/30 hover:bg-emerald-800/5 text-charcoal-600 hover:text-emerald-800 transition-all disabled:opacity-25 disabled:cursor-default cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-lg" />
              </button>
              <button
                onClick={nextPast}
                disabled={pastIdx >= pastMax}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal-700/15 hover:border-emerald-800/30 hover:bg-emerald-800/5 text-charcoal-600 hover:text-emerald-800 transition-all disabled:opacity-25 disabled:cursor-default cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-lg" />
              </button>
            </div>
          </div>

          {past.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-cream-300/40">
              <i className="ri-history-line text-charcoal-600/30 text-3xl mb-2 block" />
              <p className="text-sm text-charcoal-600/50">No past events to display yet.</p>
            </div>
          ) : (
            <div
              className="relative w-full"
              onMouseDown={handlePastTouchStart}
              onMouseUp={handlePastTouchEnd}
              onTouchStart={handlePastTouchStart}
              onTouchEnd={handlePastTouchEnd}
            >
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${pastIdx * (100 / VISIBLE_COUNT)}%)` }}
                >
                  {past.map((evt, i) => (
                    <div
                      key={evt.id}
                      className="flex-shrink-0 group cursor-pointer"
                      style={{ width: cardWidth }}
                    >
                      <Link to="/events" className="block">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-3 border border-cream-300/40 group-hover:border-emerald-800/20 transition-all group-hover:shadow-lg">
                          <img
                            src={evt.flyer}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                            loading="lazy"
                          />
                          {/* Date badge */}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-sm">
                            <span className="block text-xs font-bold text-charcoal-500 uppercase leading-tight">
                              {new Date(evt.date + 'T00:00:00').toLocaleDateString('en-CA', { month: 'short' })}
                            </span>
                            <span className="block text-lg font-black text-charcoal-700 leading-tight">
                              {new Date(evt.date + 'T00:00:00').getDate()}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-charcoal-700 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-1">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-charcoal-600/50 flex items-center gap-1">
                          <i className="ri-map-pin-line" />
                          {evt.location}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right peek indicator */}
              {pastIdx < pastMax && (
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream-200/40 to-transparent pointer-events-none" />
              )}
            </div>
          )}
        </div>

        {/* View All Events CTA */}
        <div className="text-center mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer"
          >
            View All Events
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}