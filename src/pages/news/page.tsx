import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { newsArticles } from '@/mocks/pagesData';
import { Link } from 'react-router-dom';

export default function NewsPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(newsArticles.map((a) => a.category)))];
  const filtered = activeCategory === 'All'
    ? newsArticles
    : newsArticles.filter((a) => a.category === activeCategory);

  return (
    <PageLayout
      title={t('pages.news.title')}
      subtitle={t('pages.news.subtitle')}
      bgImage="https://res.cloudinary.com/oqdvximy/image/upload/f_auto,q_auto,e_improve/v1784298421/wori-awards-10-2048x1365_zzvzlm.jpg"
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.news.breadcrumb') },
      ]}
      seo={{
        title: 'News & Community Updates | Wadi-Kaja Organization',
        description: 'Press releases, award announcements, program launches, and emergency community alerts from WORI. Stay informed about refugee and immigrant services in Canada.',
        keywords: 'WORI news, refugee services updates, immigrant community news, Wadi-Kaja announcements, settlement program updates',
        canonicalPath: '/news',
      }}
    >
      {/* Categories */}
      <section className="px-6 lg:px-10 pt-10 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-800 text-cream-100'
                    : 'bg-cream-200/50 text-charcoal-600 hover:bg-cream-200'
                }`}
              >
                {cat === 'All' ? t('common.all') : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 lg:px-10 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="group bg-cream-100 rounded-2xl overflow-hidden border border-cream-300/50 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-800/8 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-charcoal-600/40">{article.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2 leading-tight group-hover:text-emerald-800 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-charcoal-600/60 leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-cream-300/40">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800 group-hover:text-emerald-700 transition-colors">
                      {t('pages.news.readFullStory')} <i className="ri-arrow-right-line text-xs" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-14 md:py-20 bg-cream-200/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-700 mb-4">
            {t('pages.news.haveStory')}
          </h2>
          <p className="text-sm text-charcoal-600/60 mb-6 max-w-xl mx-auto leading-relaxed">
            {t('pages.news.haveStoryDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              {t('pages.news.contactCommunications')}
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/crisis-center"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              {t('pages.news.crisisAlerts')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}