import { useRef, useEffect, useState } from 'react';

const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto';

interface Partner {
  name: string;
  logo: string;
  url: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Jewish Immigrant Aid Services (JIAS)',
    logo: `${CLD}/v1784651020/Jias_logo_fdml3a.jpg`,
    url: 'https://www.jias.org/',
  },
  {
    name: 'Ontario Trillium Foundation (OTF)',
    logo: `${CLD}/v1784648708/OTF-logo_fmnmld.png`,
    url: 'https://otf.ca/',
  },
  {
    name: 'Dar-Wadai Organization',
    logo: `${CLD}/v1784562433/dar-wadai-logo_vzldqb.jpg`,
    url: 'https://www.darwadai.org/',
  },
  {
    name: 'YMCA Canada',
    logo: `${CLD}/v1784299325/ymca-logo_dxelcq.jpg`,
    url: 'https://www.ymca.ca/',
  },
  {
    name: 'All Generation Community Organization (AGCO)',
    logo: `${CLD}/v1784651020/Jias_logo_fdml3a.jpg`,
    url: 'https://www.agco.ca/',
  },
  {
    name: 'YMCA of Greater Toronto',
    logo: `${CLD}/v1784299318/ymcagta-logo_hipljy.jpg`,
    url: 'https://ymcagta.org/',
  },
  {
    name: 'Sudanese Community Association of Ontario',
    logo: `${CLD}/v1784299308/SCAON-logo_ngkjms.jpg`,
    url: 'https://www.scaon.ca/',
  },
  {
    name: 'Northern Lights Canada',
    logo: `${CLD}/v1784299294/northern-lights-canada-logo_nzq9yy.jpg`,
    url: 'https://northernlightscanada.ca/',
  },
  {
    name: 'Northern Lights',
    logo: `${CLD}/v1784299311/northern-lights-logo-150x150_shzcpl.png`,
    url: 'https://northernlightscanada.ca/',
  },
  {
    name: 'Masjid Alrisala',
    logo: `${CLD}/v1784299290/masjid-logo_x1ejfk.jpg`,
    url: 'https://www.masjidalrisala.com/',
  },
  {
    name: 'Flemingdon Health Center',
    logo: `${CLD}/v1784299283/flemingdon-health-centre-logo_xvphgg.jpg`,
    url: 'https://www.fhc-chc.com/',
  },
  {
    name: 'Catholic Crosscultural Services',
    logo: `${CLD}/v1784299273/cathcrosscultural-logo_cvczv0.jpg`,
    url: 'https://www.ccsyr.org/',
  },
  {
    name: 'Canadian Connections',
    logo: `${CLD}/v1784299266/canadian-connections-logo_q1hoi1.jpg`,
    url: 'https://www.canadianconnections.ca/',
  },
  {
    name: 'Government of Canada',
    logo: `${CLD}/v1784299259/canada-logo_hpp9nk.png`,
    url: 'https://www.canada.ca/',
  },
  {
    name: 'African Canadian Social Development Council',
    logo: `${CLD}/v1784299252/african-canadian-logo_dxfsyq.jpg`,
    url: 'https://www.acsdc.ca/',
  },
  {
    name: 'Afghan Women\'s Organization',
    logo: `${CLD}/v1784299245/afghanwomen-logo_xqsi9x.png`,
    url: 'https://www.afghanwomen.org/',
  },
  {
    name: 'YWCA',
    logo: `${CLD}/v1784299242/YWCA-logo_xwgjpk.jpg`,
    url: 'https://www.ywcacanada.ca/',
  },
];

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const SPEED = 0.6;

    const animate = (time: number) => {
      if (!paused && container) {
        const delta = time - lastTime;
        lastTime = time;
        scrollPosRef.current += SPEED * (delta / 16);
        const maxScroll = container.scrollWidth / 2;
        if (scrollPosRef.current >= maxScroll) {
          scrollPosRef.current = 0;
        }
        container.scrollLeft = scrollPosRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paused]);

  const duplicated = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="px-6 lg:px-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-2">Our Partners</p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal-700">
                Trusted By Leading Organizations
              </h2>
              <p className="text-sm text-charcoal-600/50 mt-1 max-w-md">
                Proudly collaborating with organizations that share our commitment to community service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling track */}
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
        >
          <div className="flex gap-8 md:gap-12 items-center whitespace-nowrap py-4">
            {duplicated.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-28 md:w-36 h-20 md:h-24 flex items-center justify-center p-3 rounded-xl bg-cream-100 hover:bg-cream-200/70 border border-cream-300/40 hover:border-emerald-800/20 transition-all cursor-pointer group"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  width="120"
                  height="80"
                  className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-white pointer-events-none z-10" />
      </div>

      <div className="text-center mt-8">
        <a
          href="/partners"
          className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer"
        >
          Become a Partner
          <i className="ri-arrow-right-line" />
        </a>
      </div>
    </section>
  );
}