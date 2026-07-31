import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Use"
      subtitle="By using our website, you agree to these terms. Please read them carefully."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'Terms' },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">
            <p>Last updated: July 2026</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Wadi-Kaja Organization for Refugees and Immigrants (WORI) website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">2. Website Content</h2>
            <p>All content on this website, including text, images, logos, and documents, is the property of WORI unless otherwise stated. You may not reproduce, distribute, or use our content for commercial purposes without our written permission.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">3. Donations</h2>
            <p>All donations made through our website are processed through secure third-party platforms (Zeffy, CanadaHelps, PayPal). WORI is a registered Canadian charity (CRN: 748873338RR0001). All donations are eligible for a tax receipt. Donations are non-refundable unless a processing error occurs.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">4. External Links</h2>
            <p>Our website may contain links to external websites and resources. WORI is not responsible for the content, accuracy, or practices of any third-party websites. Visiting external links is at your own risk.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">5. Service Availability</h2>
            <p>While we strive to keep our website available and up to date, we do not guarantee uninterrupted access. We may update, modify, or discontinue parts of the website without prior notice.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">6. Limitation of Liability</h2>
            <p>WORI shall not be held liable for any damages arising from the use or inability to use this website. The information on this website is provided for general informational purposes and should not be considered professional advice.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">7. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Use at any time. Changes will be posted on this page with the updated date. Continued use of the website after changes constitutes acceptance of the new terms.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">8. Contact</h2>
            <p>
              For questions about these terms, contact us at:<br />
              Email: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              Phone: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a>
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              Contact Us
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}