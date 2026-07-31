import ServicePageTemplate from '../components/ServicePageTemplate';

const SEO_TITLE = 'Multi-Lingual Translation & Interpretation Services | WORI';
const SEO_DESC = 'Professional translation and interpretation services in Arabic, Farsi, Amharic, Tigrinya, French, Swahili, Somali, Urdu, Hausa, and Oromo for newcomers navigating Canadian systems.';

export default function LanguageServicesPage() {
  return <ServicePageTemplate serviceKey="language-services" seoTitle={SEO_TITLE} seoDescription={SEO_DESC} />;
}