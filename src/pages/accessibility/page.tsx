import PageLayout from '@/components/feature/PageLayout';
import { Link } from 'react-router-dom';

export default function AccessibilityPage() {
  return (
    <PageLayout
      title="Accessibility"
      subtitle="We are committed to making our website accessible to everyone, including people with disabilities."
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: 'Home', path: '/' },
        { label: 'Accessibility' },
      ]}
    >
      <section className="px-6 lg:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-6 leading-relaxed">

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">Our Commitment</h2>
            <p>Wadi-Kaja Organization for Refugees and Immigrants (WORI) is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the accessibility and usability of our website and in doing so adhere to many of the available standards and guidelines.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">Standards We Follow</h2>
            <p>This website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities, and user-friendly for everyone.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">What We Are Doing</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Using clear, readable fonts and sufficient color contrast throughout the website</li>
              <li>Providing text alternatives for images where possible</li>
              <li>Ensuring the website can be navigated using a keyboard alone</li>
              <li>Using semantic HTML to help screen readers understand page structure</li>
              <li>Providing consistent navigation across all pages</li>
              <li>Supporting browser zoom functionality up to 200% without loss of content</li>
              <li>Making forms accessible with proper labels and error messages</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">Language Support</h2>
            <p>Our website supports multiple languages to serve our diverse community. You can switch languages using the language selector in the top navigation bar. Available languages include English, French, Arabic, Amharic, Somali, Tigrinya, Swahili, Oromo, and Hausa.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">Limitations</h2>
            <p>While we strive to make every part of our website accessible, some older documents (such as PDF reports) may not be fully accessible. We are working to improve these materials. If you need any document in an alternative format, please contact us.</p>

            <h2 className="font-serif text-xl font-semibold text-charcoal-700 mt-8 mb-3">Feedback &amp; Assistance</h2>
            <p>We welcome your feedback on the accessibility of this website. If you experience any difficulty accessing any part of our website, or if you have suggestions for improvement, please let us know:</p>
            <p>
              Email: <a href="mailto:info@wadikajaorganization.org" className="text-emerald-800 hover:text-gold-600 underline">info@wadikajaorganization.org</a><br />
              Phone: <a href="tel:+16477778322" className="text-emerald-800 hover:text-gold-600">+1-647-777-8322</a><br />
              Address: 10 Milner Business Court Suite 306, Scarborough, ON M1B 3C6
            </p>
            <p>We aim to respond to accessibility feedback within 5 business days.</p>
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