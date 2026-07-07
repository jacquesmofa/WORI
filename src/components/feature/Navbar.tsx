import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const LANGUAGE_META: Record<string, { flag: string; native: string; code: string }> = {
  en: { flag: '🇬🇧', native: 'English', code: 'EN' },
  fr: { flag: '🇫🇷', native: 'Français', code: 'FR' },
  ar: { flag: '🇸🇦', native: 'العربية', code: 'AR' },
  am: { flag: '🇪🇹', native: 'አማርኛ', code: 'AM' },
  so: { flag: '🇸🇴', native: 'Soomaali', code: 'SO' },
  ti: { flag: '🇪🇷', native: 'ትግርኛ', code: 'TI' },
};

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      setLangOpen(false);
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
    },
    [i18n]
  );

  const navItems: NavItem[] = [
    {
      label: t('nav.about'),
      path: '/about',
      children: [
        { label: t('aboutMenu.aboutWori'), path: '/about' },
        { label: t('aboutMenu.missionVision'), path: '/about/mission' },
        { label: t('aboutMenu.executiveDirector'), path: '/about/executive-director' },
        { label: t('aboutMenu.boardManagement'), path: '/about/board' },
        { label: t('aboutMenu.annualReports'), path: '/about/annual-reports' },
      ],
    },
    {
      label: t('nav.settlement'),
      path: '/services/settlement',
      children: [
        { label: t('settlementMenu.ircc'), path: '/services/ircc' },
        { label: t('settlementMenu.languageMentorship'), path: '/services/language-mentorship' },
        { label: t('settlementMenu.privateSponsorship'), path: '/services/private-sponsorship' },
        { label: t('settlementMenu.languageServices'), path: '/services/language-services' },
        { label: t('settlementMenu.immigrantSettlement'), path: '/services/settlement' },
      ],
    },
    {
      label: t('nav.wellbeing'),
      path: '/services/mental-health',
      children: [
        { label: t('wellbeingMenu.mentalHealth'), path: '/services/mental-health' },
        { label: t('wellbeingMenu.employment'), path: '/services/employment' },
        { label: t('wellbeingMenu.housing'), path: '/services/housing' },
        { label: t('wellbeingMenu.womenEmpowerment'), path: '/services/women-empowerment' },
        { label: t('wellbeingMenu.seniors'), path: '/services/seniors' },
        { label: t('wellbeingMenu.foodSecurity'), path: '/services/food-security' },
      ],
    },
    {
      label: t('nav.news'),
      path: '/news',
      children: [
        { label: t('newsMenu.crisisCenter'), path: '/crisis-center' },
        { label: t('newsMenu.newsUpdates'), path: '/news' },
        { label: t('newsMenu.partners'), path: '/partners' },
      ],
    },
  ];

  const isRtl = i18n.language === 'ar';
  const currentLang = LANGUAGE_META[i18n.language] || LANGUAGE_META.en;

  // Transparency: ONLY on home page, at top, not scrolled. Otherwise solid.
  const isTransparent = isHomePage && !scrolled;

  const navTextClass = isTransparent
    ? 'text-cream-100/90 hover:text-white'
    : 'text-charcoal-700 hover:text-emerald-800';

  const navBgClass = isTransparent
    ? 'bg-gradient-to-b from-black/50 via-black/30 to-transparent'
    : 'bg-cream-100/95 shadow-sm backdrop-blur-xl';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="WORI Home"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-emerald-800 flex items-center justify-center">
                <span className="font-serif text-gold-500 font-bold text-base md:text-lg">
                  W
                </span>
              </div>
              <span
                className={`font-serif font-semibold text-base md:text-lg tracking-tight ${isTransparent ? 'text-cream-100' : 'text-charcoal-700'}`}
              >
                WORI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${navTextClass}`}
                  >
                    {item.label}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {item.children && activeMenu === item.label && (
                    <div
                      className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 w-72 bg-cream-100 rounded-xl shadow-lg border border-cream-300 overflow-hidden animate-fade-in`}
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-charcoal-700 hover:bg-emerald-800/5 hover:text-emerald-800 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Toggle — Prominent Pill */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border text-sm transition-all ${
                    isTransparent
                      ? 'border-cream-100/30 hover:border-cream-100/60 text-cream-100'
                      : 'border-cream-300 hover:border-emerald-800/30 text-charcoal-700'
                  }`}
                  aria-label="Select language"
                >
                  <span className="text-base leading-none">{currentLang.flag}</span>
                  <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
                    {currentLang.native}
                  </span>
                  <i className={`ri-arrow-down-s-line text-xs transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangOpen(false)}
                    />
                    <div
                      className={`absolute top-full ${isRtl ? 'left-0' : 'right-0'} mt-2 w-56 bg-cream-100 rounded-xl shadow-lg border border-cream-300 z-50 overflow-hidden animate-fade-in`}
                    >
                      <div className="p-1.5">
                        {Object.keys(LANGUAGE_META).map((lng) => (
                          <button
                            key={lng}
                            onClick={() => changeLanguage(lng)}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                              i18n.language === lng
                                ? 'bg-emerald-800/8 text-emerald-800 font-medium'
                                : 'text-charcoal-700 hover:bg-emerald-800/5'
                            }`}
                          >
                            <span className="text-lg leading-none">{LANGUAGE_META[lng].flag}</span>
                            <div className="text-left">
                              <div className="text-sm font-medium">{LANGUAGE_META[lng].native}</div>
                              <div className="text-[10px] text-charcoal-600/40">{LANGUAGE_META[lng].code}</div>
                            </div>
                            {i18n.language === lng && (
                              <i className="ri-check-line ml-auto text-emerald-800 text-sm" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Donate Button */}
              <Link
                to="/donate"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold rounded-full transition-all hover:shadow-md whitespace-nowrap"
              >
                {t('nav.donate')}
                <i className="ri-arrow-right-line text-sm" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isTransparent
                    ? 'text-cream-100 hover:bg-white/10'
                    : 'text-charcoal-700 hover:bg-charcoal-700/5'
                }`}
                aria-label="Toggle menu"
              >
                <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-cream-100 pt-20 px-6 pb-8 overflow-y-auto lg:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-cream-300/60">
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium text-charcoal-700"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 pb-3 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-sm text-charcoal-600 hover:text-emerald-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gold-500 text-emerald-900 text-sm font-semibold rounded-full"
              >
                {t('nav.donate')}
                <i className="ri-arrow-right-line text-sm" />
              </Link>
            </div>

            {/* Mobile Language Selector */}
            <div className="pt-4">
              <p className="text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-2">
                {t('lang.label')}
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(LANGUAGE_META).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors ${
                      i18n.language === lng
                        ? 'border-emerald-800 bg-emerald-800/8 text-emerald-800'
                        : 'border-cream-300 text-charcoal-600'
                    }`}
                  >
                    <span className="text-base">{LANGUAGE_META[lng].flag}</span>
                    <span className="text-sm font-medium">{LANGUAGE_META[lng].native}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}