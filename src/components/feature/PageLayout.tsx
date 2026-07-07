import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  bgImage?: string;
  bgOverlay?: string;
  breadcrumb?: { label: string; path?: string }[];
}

export default function PageLayout({
  children,
  title,
  subtitle,
  bgImage,
  bgOverlay = 'from-emerald-900/90 via-emerald-800/70 to-emerald-900/50',
  breadcrumb,
}: PageLayoutProps) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Page Hero Header */}
      <div className="relative pt-20 md:pt-24">
        <div className="relative overflow-hidden bg-emerald-900 min-h-[220px] md:min-h-[280px] flex items-end">
          {bgImage && (
            <>
              <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${bgOverlay}`} />
            </>
          )}

          <div className="relative z-10 w-full px-6 lg:px-10 py-10 md:py-14">
            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-xs text-cream-100/60">
                  {breadcrumb.map((crumb, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {idx > 0 && (
                        <i className={isRtl ? 'ri-arrow-left-s-line text-cream-100/30' : 'ri-arrow-right-s-line text-cream-100/30'} />
                      )}
                      {crumb.path ? (
                        <Link
                          to={crumb.path}
                          className="hover:text-cream-100/90 transition-colors"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-cream-100/90">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-cream-100 leading-tight max-w-4xl text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 md:mt-4 text-sm md:text-base text-cream-100/60 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}