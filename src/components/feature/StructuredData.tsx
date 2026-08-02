interface StructuredDataProps {
  type?: 'NGO' | 'WebPage' | 'Article' | 'FAQPage' | 'ContactPage' | 'Organization';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type = 'NGO', data }: StructuredDataProps) {
  const schemas: Record<string, Record<string, unknown>> = {
    NGO: {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      'name': 'Wadi-Kaja Organization for Refugee and Immigrant Services',
      'alternateName': 'WORI',
      'url': 'https://wadikajaorganization.org',
      'logo': 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784294788/WORI-logo2_j6w6nu.jpg',
      'taxID': '74887 3338 RR0001',
      'foundingDate': '2008',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '10 Milner Business Court, Suite 306',
        'addressLocality': 'Scarborough',
        'addressRegion': 'ON',
        'postalCode': 'M1B 3C6',
        'addressCountry': 'CA',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-647-777-8322',
        'contactType': 'Customer Support',
        'availableLanguage': [
          'English', 'Arabic', 'French', 'Amharic', 'Farsi', 'Hebrew',
          'Swahili', 'Tigrinya', 'Urdu', 'Somali', 'Oromo', 'Hausa',
        ],
      },
      'sameAs': [
        'https://www.facebook.com/Wadi-Kaja-Organization-for-Refugee-and-Immigrant-108592454153210/',
        'https://twitter.com/KajaWadi',
        'https://www.linkedin.com/in/nasseradin-abdullah-867b4a128/',
      ],
    },
    WebPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': data?.name || 'Wadi-Kaja Organization',
      'description': data?.description || '',
      'url': data?.url || 'https://wadikajaorganization.org',
    },
    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': data?.questions || [],
    },
    ContactPage: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': data?.name || 'Contact WORI',
      'description': data?.description || '',
      'url': data?.url || 'https://wadikajaorganization.org/contact',
    },
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Wadi-Kaja Organization for Refugee and Immigrant Services',
      'alternateName': 'WORI',
      'url': 'https://wadikajaorganization.org',
      'logo': 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784294788/WORI-logo2_j6w6nu.jpg',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '10 Milner Business Court, Suite 306',
        'addressLocality': 'Scarborough',
        'addressRegion': 'ON',
        'postalCode': 'M1B 3C6',
        'addressCountry': 'CA',
      },
    },
  };

  const schemaData = type === 'NGO' ? schemas.NGO : data
    ? { ...schemas[type] || schemas.WebPage, ...data }
    : schemas[type] || schemas.NGO;

  const scriptContent = JSON.stringify(schemaData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}