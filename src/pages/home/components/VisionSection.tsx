import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function VisionSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const visionText = getContent('vision.text') || t('booking.vision.text');

  const missionText = getContent('vision.mission') || t('booking.vision.mission');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white border-b border-cream-200 overflow-hidden">
      <div className="px-6 lg:px-12 max-w-4xl mx-auto">
        {/* Vision — slides from left */}
        <div
          className={`mb-10 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
          }`}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
            {t('pages.mission.ourVision')}
          </h2>
          <p className="text-base md:text-lg text-charcoal-600/75 leading-relaxed max-w-2xl mx-auto">
            {visionText}
          </p>
        </div>

        {/* Mission — slides from right */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
          }`}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
            {t('pages.mission.ourMission')}
          </h2>
          <p className="text-base md:text-lg text-charcoal-600/75 leading-relaxed max-w-2xl mx-auto">
            {missionText}
          </p>
        </div>
      </div>
    </section>
  );
}