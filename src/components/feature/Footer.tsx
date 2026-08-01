import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const quickLinks = [
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.donate'), path: '/donate' },
    { label: t('nav.volunteer'), path: '/volunteer' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const serviceLinks = [
    { label: t('settlementMenu.ircc'), path: '/services/ircc' },
    { label: t('wellbeingMenu.employment'), path: '/services/employment' },
    { label: t('wellbeingMenu.mentalHealth'), path: '/services/mental-health' },
    { label: t('wellbeingMenu.housing'), path: '/services/housing' },
  ];

  const socialLinks = [
    { icon: 'ri-facebook-fill', label: 'Facebook', href: 'https://www.facebook.com/Wadi-Kaja-Organization-for-Refugee-and-Immigrant-108592454153210/' },
    { icon: 'ri-instagram-line', label: 'Instagram', href: 'https://www.instagram.com/ordera1643/' },
    { icon: 'ri-twitter-x-line', label: 'X', href: 'https://twitter.com/KajaWadi' },
    { icon: 'ri-linkedin-fill', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nasseradin-abdullah-867b4a128/' },
    { icon: 'ri-youtube-fill', label: 'YouTube', href: 'https://www.youtube.com/channel/UCy4W_QKNpQM-tgSQVjLbxDg/featured' },
    { icon: 'ri-tiktok-fill', label: 'TikTok', href: 'https://vt.tiktok.com/ZSmte2UVb/' },
  ];

  return (
    <footer className="bg-emerald-900 text-cream-100" role="contentinfo">
      {/* Upper Section */}
      <div className="px-6 lg:px-10 py-14 md:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784294788/WORI-logo2_j6w6nu.jpg"
                  alt="WORI Logo"
                  width="40"
                  height="40"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif font-semibold text-lg text-cream-100 group-hover:text-gold-400 transition-colors">
                WORI
              </span>
            </Link>
            <p className="text-sm text-cream-200/70 leading-relaxed mb-3 max-w-xs">
              {t('footer.description')}
            </p>
            <p className="text-xs text-gold-500/80 font-medium mb-3">
              {t('footer.charityInfo')}
            </p>
            <div className="space-y-1.5 text-xs text-cream-200/60">
              <div className="flex items-start gap-2">
                <i className="ri-map-pin-line text-gold-500/70 mt-0.5" />
                <span>10 Milner Business Court Suite 306, Scarborough, ON M1B 3C6</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-phone-line text-gold-500/70" />
                <a href="tel:+16477778322" className="hover:text-gold-400 transition-colors">+1-647-777-8322</a>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-mail-line text-gold-500/70" />
                <a href="mailto:info@wadikajaorganization.org" className="hover:text-gold-400 transition-colors">info@wadikajaorganization.org</a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream-200/60 mb-4">
              {t('newsletter.title')}
            </h4>
            <form onSubmit={handleSubmit} className="flex items-stretch gap-0 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                required
                maxLength={254}
                className="flex-1 bg-transparent border-b border-cream-200/25 px-0 py-2.5 text-sm text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2.5 border-b border-cream-200/25 text-cream-100 hover:text-gold-500 transition-colors"
                aria-label="Subscribe"
              >
                <i className="ri-arrow-right-line text-lg" />
              </button>
            </form>
            {submitted && (
              <p className="text-xs text-gold-400 animate-fade-in">
                {t('common.success')}
              </p>
            )}
            <p className="text-xs text-cream-200/40 mt-2">
              {t('newsletter.privacy')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream-200/60 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-200/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream-200/60 mb-4">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-2.5 mb-6">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-200/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cream-100/8 text-cream-200/60 hover:bg-gold-500/15 hover:text-gold-400 transition-all"
                >
                  <i className={`${social.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Typography Mark */}
      <div className="border-t border-cream-100/8 px-6 lg:px-10 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-200/35">
            &copy; {new Date().getFullYear()} WORI. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-cream-200/35 hover:text-cream-200/70 transition-colors"
            >
              {t('footer.yourPrivacy')}
            </Link>
            <Link
              to="/terms"
              className="text-xs text-cream-200/35 hover:text-cream-200/70 transition-colors"
            >
              {t('footer.terms')}
            </Link>
            <Link
              to="/accessibility"
              className="text-xs text-cream-200/35 hover:text-cream-200/70 transition-colors"
            >
              {t('footer.accessibility')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}