import { useTranslation } from 'react-i18next';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function VisionSection() {
  const { t } = useTranslation();
  const { getContent } = useSiteContent();

  const visionText = getContent('vision.text') ||
    'Refugees and immigrants, especially those who have experienced wars and persecution, leading self-sufficient and dignified lives in a socially inclusive society.';

  const missionText = getContent('vision.mission') ||
    'To improve the quality of life of Refugees and Immigrants, through programs and services to promote their social and economic inclusion to enable them to become contributing members of Canadian society and to live in dignity.';

  return (
    <section className="py-12 md:py-16 bg-white border-b border-cream-200">
      <div className="px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
            {t('pages.mission.ourVision')}
          </h2>
          <p className="text-base md:text-lg text-charcoal-600/75 leading-relaxed max-w-2xl mx-auto">
            {visionText}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-charcoal-600/75 leading-relaxed max-w-2xl mx-auto">
            {missionText}
          </p>
        </div>
      </div>
    </section>
  );
}