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
          src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784299336/event-img_k9xxzv.jpg"
          alt="Book a consultation at WORI"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-900/70" />
        <div className="relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5">
            Need Consultation
          </h2>
          <Link
            to="/booking"
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
          src="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784650812/23_e4w8zr.jpg"
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