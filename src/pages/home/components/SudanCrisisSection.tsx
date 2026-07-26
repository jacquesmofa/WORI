import { Link } from 'react-router-dom';

const CLD = 'https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto';

export default function SudanCrisisSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="px-6 lg:px-12 max-w-3xl mx-auto text-center">
        {/* Crisis Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
          <i className="ri-alert-line text-red-600 text-sm" />
          <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">
            Active Crisis Response
          </span>
        </div>

        {/* Two images side by side */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <img
              src={`${CLD}/v1784649813/sudan-img_d04jwo.png`}
              alt="Sudan crisis map"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <img
              src={`${CLD}/v1784649810/no-war-sudan_qdsabk.png`}
              alt="No War in Sudan"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal-700 mb-4">
          Stand With Sudan
        </h2>

        <p className="text-base text-charcoal-600/70 leading-relaxed max-w-xl mx-auto mb-8">
          WORI is actively responding to the ongoing conflict in Sudan — supporting displaced families, documenting human rights concerns, and advocating for peace and justice.
        </p>

        <Link
          to="/crisis-center"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-bold rounded-full transition-all whitespace-nowrap"
        >
          Read More
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </section>
  );
}