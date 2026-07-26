import { Link } from 'react-router-dom';

export default function ActionCTASection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Consultation */}
      <div
        className="relative flex flex-col items-center justify-center py-16 md:py-20 px-8 text-center overflow-hidden"
        style={{ minHeight: '220px' }}
      >
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20social%20worker%20having%20a%20warm%20one-on-one%20consultation%20with%20a%20refugee%20family%20in%20a%20modern%20bright%20office%20in%20Toronto%20Canada%2C%20natural%20light%2C%20diverse%20participants%2C%20compassionate%20and%20focused%20atmosphere%2C%20warm%20cream%20and%20green%20color%20tones%2C%20editorial%20quality%20photography&width=800&height=500&seq=wori-cta-consultation&orientation=landscape"
          alt="Book a consultation at WORI"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-900/70" />
        <div className="relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5">
            Need Consultation
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-cream-100 text-emerald-900 text-sm font-bold rounded-full transition-all whitespace-nowrap"
          >
            Book Now
            <i className="ri-calendar-line" />
          </Link>
        </div>
      </div>

      {/* Volunteer */}
      <div
        className="relative flex flex-col items-center justify-center py-16 md:py-20 px-8 text-center overflow-hidden"
        style={{ minHeight: '220px' }}
      >
        <img
          src="https://readdy.ai/api/search-image?query=Enthusiastic%20diverse%20group%20of%20volunteers%20wearing%20green%20WORI%20t-shirts%20smiling%20together%20at%20a%20community%20event%20in%20Toronto%20Canada%2C%20outdoor%20setting%20with%20banners%2C%20cheerful%20and%20energetic%20atmosphere%2C%20bright%20sunny%20day%2C%20strong%20community%20spirit%20and%20inclusivity%2C%20documentary%20event%20photography&width=800&height=500&seq=wori-cta-volunteer&orientation=landscape"
          alt="Volunteer with WORI"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal-800/65" />
        <div className="relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5">
            Volunteer Application
          </h2>
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-bold rounded-full transition-all whitespace-nowrap"
          >
            Click Here
            <i className="ri-hand-heart-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}