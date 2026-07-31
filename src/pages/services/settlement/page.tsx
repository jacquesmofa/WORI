import ServicePageTemplate from '../components/ServicePageTemplate';

const SEO_TITLE = 'Immigrant Settlement Services & Housing Support | WORI';
const SEO_DESC = 'Comprehensive settlement support for newcomers in Canada: emergency housing help, tenant rights guidance, community orientation, essential needs assistance, and referrals.';

export default function SettlementPage() {
  return <ServicePageTemplate serviceKey="settlement" seoTitle={SEO_TITLE} seoDescription={SEO_DESC} />;
}