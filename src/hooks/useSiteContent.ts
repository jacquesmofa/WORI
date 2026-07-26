import { useTranslation } from 'react-i18next';
import siteContent from '@/data/site-content.json';

export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface VisionContent {
  text: string;
}

export interface AboutContent {
  description: string;
  image: string;
}

export interface ImpactContent {
  label: string;
  title: string;
  description: string;
  image: string;
  cta: string;
}

export interface LangContent {
  hero: HeroContent;
  vision: VisionContent;
  about: AboutContent;
  impact: ImpactContent;
}

export type SiteContentMap = Record<string, LangContent>;

export function useSiteContent() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const map = siteContent as unknown as SiteContentMap;
  const content: LangContent = map[lang] || map['en'];

  /**
   * Get a text value by dot-path from the CMS JSON.
   * Falls back to i18n translation if value is empty or missing.
   */
  const getContent = (path: string): string => {
    const keys = path.split('.');
    let value: unknown = content;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[key];
      } else {
        value = undefined;
        break;
      }
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
    // Fallback to i18n
    const i18nVal = t(path);
    return i18nVal !== path ? i18nVal : '';
  };

  /**
   * Get an image URL by dot-path; if empty, return the fallback.
   */
  const getImage = (path: string, fallback: string): string => {
    const keys = path.split('.');
    let value: unknown = content;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[key];
      } else {
        value = undefined;
        break;
      }
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
    return fallback;
  };

  return { getContent, getImage, content, lang };
}