import ServicePageTemplate from '../components/ServicePageTemplate';

const SEO_TITLE = 'Newcomer Language Mentorship Program | WORI';
const SEO_DESC = 'Build English language confidence through conversational circles, peer mentorship, and tailored language learning for newcomers and refugees in Toronto at WORI.';

export default function LanguageMentorshipPage() {
  return <ServicePageTemplate serviceKey="language-mentorship" seoTitle={SEO_TITLE} seoDescription={SEO_DESC} />;
}