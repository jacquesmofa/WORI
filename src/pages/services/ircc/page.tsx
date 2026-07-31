import ServicePageTemplate from '../components/ServicePageTemplate';

const IRCC_SEO_TITLE = 'IRCC Resource Center & Citizenship Support | WORI';
const IRCC_SEO_DESC = 'Navigate Immigration, Refugees and Citizenship Canada (IRCC) forms, citizenship test preparation, work permits, PR card renewals, and legal settlement documentation with expert guidance at WORI.';

export default function IrccPage() {
  return <ServicePageTemplate serviceKey="ircc" seoTitle={IRCC_SEO_TITLE} seoDescription={IRCC_SEO_DESC} />;
}