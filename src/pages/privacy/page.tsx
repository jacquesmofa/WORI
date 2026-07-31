import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Your Privacy"
      subtitle="We respect your privacy and are committed to protecting your personal information."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'Your Privacy' },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">
            <p>Last updated: July 2026</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">1. Information We Collect</h2>
            <p>When you visit our website, contact us, fill out a form, or make a donation, we may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Your name and contact details (email address, phone number)</li>
              <li>Information you provide through our contact forms, volunteer applications, or donation forms</li>
              <li>Website usage data such as pages visited and time spent on the site (anonymized)</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">2. How We Use Your Information</h2>
            <p>We use your information only for the purposes you have agreed to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>To respond to your inquiries and provide the services you requested</li>
              <li>To process donations and issue tax receipts</li>
              <li>To send occasional newsletters or updates (only if you subscribed)</li>
              <li>To improve our website and services</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information only:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>With trusted service providers who help us operate our website and process donations</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">4. Data Security</h2>
            <p>We take reasonable precautions to protect your personal information. Our website uses secure connections (HTTPS), and donation processing is handled through secure third-party platforms (Zeffy, CanadaHelps, PayPal).</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">5. Cookies</h2>
            <p>Our website may use cookies to improve your browsing experience. You can disable cookies in your browser settings at any time.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Request access to the personal information we hold about you</li>
              <li>Ask us to correct or delete your information</li>
              <li>Unsubscribe from our communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or how we handle your data, please contact us:</p>
            <p>
              Email: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              Phone: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a><br />
              Address: 10 Milner Business Court Suite 306, Scarborough, ON M1B 3C6
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