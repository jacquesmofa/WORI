import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function TestimonialSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="px-6 lg:px-10">
        <div className="relative bg-emerald-800 rounded-3xl overflow-visible">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left: Portrait Image - protruding */}
            <div className="w-full md:w-2/5 lg:w-1/3 relative z-10 md:-ml-6 lg:-ml-10 my-8 md:my-10">
              <div className="w-full h-64 md:h-full md:min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Portrait%20of%20a%20confident%20refugee%20woman%20in%20her%2030s%20wearing%20elegant%20modest%20clothing%2C%20warm%20natural%20light%2C%20soft%20cream%20background%2C%20genuine%20smile%20of%20hope%20and%20strength%2C%20editorial%20portrait%20photography%2C%20high-end%20magazine%20style%2C%20shallow%20depth%20of%20field%2C%20emerald%20and%20warm%20tones&width=500&height=700&seq=portrait1&orientation=portrait"
                  alt="Amina H., WORI settlement client"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right: Quote Content */}
            <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 md:py-14 flex flex-col justify-center">
              {/* Quote Mark */}
              <div className="text-6xl md:text-7xl font-serif text-gold-500/40 leading-none mb-4 select-none">
                &ldquo;
              </div>

              <blockquote className="font-serif text-lg md:text-xl lg:text-2xl text-cream-100 leading-relaxed mb-8 text-balance">
                {t('testimonial.quote')}
              </blockquote>

              <div className="mb-8">
                <div className="font-serif text-base md:text-lg text-cream-100 font-medium mb-1">
                  {t('testimonial.name')}
                </div>
                <div className="text-sm text-cream-100/60">
                  {t('testimonial.role')}
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 self-start px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all"
              >
                {t('testimonial.cta')}
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative organic line on background */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-[0.04] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M10 90 C30 70 20 40 50 30 S80 10 90 50" stroke="#0F4C3A" strokeWidth="1" />
          <path d="M20 90 C40 65 30 35 55 25 S75 15 85 45" stroke="#0F4C3A" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}