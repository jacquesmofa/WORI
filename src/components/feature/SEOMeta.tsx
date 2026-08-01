import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import i18n from '@/i18n';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'Wadi-Kaja Organization (WORI)';
const BASE_URL = 'https://wadikajaorganization.org';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/v1784294788/WORI-logo2_j6w6nu.jpg';

const SUPPORTED_LANGS = ['en', 'ar', 'am', 'fa', 'fr', 'he', 'ti', 'ur', 'so', 'sw', 'om', 'ha'];

function updateMeta(id: string, attr: string, value: string) {
  let el = document.getElementById(id) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.id = id;
    if (attr === 'name' || attr === 'property') {
      el.setAttribute(attr, value.includes('og:') ? 'og:' + value.split(':')[1] : '');
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function removeMeta(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function upsertMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function cleanupHreflangs() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
}

export default function SEOMeta({
  title,
  description,
  keywords,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Document title
    document.title = title;

    // 2. Meta description
    upsertMeta('description', description);

    // 3. Meta keywords
    if (keywords) {
      upsertMeta('keywords', keywords);
    }

    // 4. Canonical URL
    const canonicalUrl = canonicalPath
      ? `${BASE_URL}${canonicalPath}`
      : `${BASE_URL}${location.pathname}`;
    upsertLink('canonical', canonicalUrl);

    // 5. Hreflang tags — all supported languages
    cleanupHreflangs();
    const currentLang = (i18n.language || 'en').split('-')[0];
    SUPPORTED_LANGS.forEach(lang => {
      const langPath = lang === 'en'
        ? (canonicalPath || location.pathname)
        : `/${lang}${canonicalPath || location.pathname}`;
      const langUrl = `${BASE_URL}${langPath}`;
      upsertLink('alternate', langUrl, lang);
      // x-default
      if (lang === 'en') {
        upsertLink('alternate', langUrl, 'x-default');
      }
    });

    // 6. Open Graph
    const finalOgTitle = ogTitle || title;
    const finalOgDesc = ogDescription || description;
    const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
    upsertMeta('og:title', finalOgTitle, true);
    upsertMeta('og:description', finalOgDesc, true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertMeta('og:type', ogType, true);
    upsertMeta('og:site_name', SITE_NAME, true);
    upsertMeta('og:image', finalOgImage, true);
    upsertMeta('og:image:width', '1200', true);
    upsertMeta('og:image:height', '630', true);
    upsertMeta('og:image:alt', finalOgTitle, true);

    // 7. Twitter Card
    upsertMeta('twitter:card', 'summary_large_image', false);
    upsertMeta('twitter:title', finalOgTitle, false);
    upsertMeta('twitter:description', finalOgDesc, false);
    upsertMeta('twitter:image', finalOgImage, false);

    // 8. Robots
    if (noIndex) {
      upsertMeta('robots', 'noindex, nofollow');
    } else {
      upsertMeta('robots', 'index, follow');
      // Remove noindex if switching from a noIndex page
      const robotEl = document.querySelector('meta[name="robots"]');
      if (robotEl) robotEl.setAttribute('content', 'index, follow');
    }

    // 9. Description (ensure it stays)
    upsertMeta('description', finalOgDesc);
  }, [title, description, keywords, canonicalPath, ogTitle, ogDescription, ogImage, ogType, noIndex, location.pathname]);

  return null;
}