import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/feature/PageLayout';
import { newsArticles } from '@/mocks/pagesData';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const article = newsArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <PageLayout
        title={t('pages.news.detail.notFound')}
        subtitle=""
        breadcrumb={[
          { label: t('nav.home'), path: '/' },
          { label: t('pages.news.breadcrumb'), path: '/news' },
          { label: t('pages.news.detail.notFound') },
        ]}
      >
        <section className="px-6 lg:px-10 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-cream-200/50">
              <i className="ri-file-unknow-line text-2xl text-charcoal-600/40" />
            </div>
            <h2 className="font-serif text-xl font-medium text-charcoal-700 mb-3">
              {t('pages.news.detail.notFound')}
            </h2>
            <p className="text-sm text-charcoal-600/60 mb-6">
              {t('pages.news.detail.notFoundDesc')}
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              <i className="ri-arrow-left-line" />
              {t('pages.news.detail.backToNews')}
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const bodyCount = parseInt(t(`pages.news.detail.${article.id}.bodyCount`, '0'), 10);
  const bodyParagraphs: string[] = [];
  for (let i = 0; i < bodyCount; i++) {
    const para = t(`pages.news.detail.${article.id}.body${i}`, '');
    if (para) bodyParagraphs.push(para);
  }

  return (
    <PageLayout
      title={t(`pages.news.articles.${article.id}.title`, article.title)}
      subtitle=""
      bgImage={article.image}
      breadcrumb={[
        { label: t('nav.home'), path: '/' },
        { label: t('pages.news.breadcrumb'), path: '/news' },
        { label: t(`pages.news.categoryNames.${article.category}`, article.category) },
      ]}
      seo={{
        title: `${t(`pages.news.articles.${article.id}.title`, article.title)} | WORI News`,
        description: t(`pages.news.articles.${article.id}.excerpt`, article.excerpt),
        keywords: `WORI news, ${article.category}, refugee services, immigrant community, Wadi-Kaja`,
        canonicalPath: `/news/${article.id}`,
      }}
    >
      <article className="px-6 lg:px-10 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md bg-emerald-800/8 text-emerald-800 text-[11px] font-semibold uppercase tracking-wider">
                {t(`pages.news.categoryNames.${article.category}`, article.category)}
              </span>
              <span className="text-sm text-charcoal-600/40">{article.date}</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal-700 leading-tight mb-6">
              {t(`pages.news.articles.${article.id}.title`, article.title)}
            </h1>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <img
              src={article.image}
              alt={t(`pages.news.articles.${article.id}.title`, article.title)}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {bodyParagraphs.length > 0 ? (
              bodyParagraphs.map((para, idx) => (
                <p key={idx} className="text-charcoal-600/80 leading-relaxed text-[15px] mb-5 font-sans">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-charcoal-600/60 italic">{t('pages.news.detail.noContent')}</p>
            )}
          </div>

          <div className="my-12 border-t border-cream-300/50" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal-700/15 hover:border-charcoal-700/40 text-charcoal-700 text-sm font-medium rounded-full transition-all"
            >
              <i className="ri-arrow-left-line" />
              {t('pages.news.detail.backToNews')}
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-600/40">{t('pages.news.detail.share')}</span>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-cream-300/50 hover:bg-cream-200/50 text-charcoal-600/60 hover:text-charcoal-700 transition-all cursor-pointer">
                <i className="ri-facebook-fill text-sm" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-cream-300/50 hover:bg-cream-200/50 text-charcoal-600/60 hover:text-charcoal-700 transition-all cursor-pointer">
                <i className="ri-twitter-x-fill text-sm" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-cream-300/50 hover:bg-cream-200/50 text-charcoal-600/60 hover:text-charcoal-700 transition-all cursor-pointer">
                <i className="ri-link text-sm" />
              </button>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-cream-200/30 text-center">
            <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
              {t('pages.news.detail.moreStories')}
            </h3>
            <p className="text-sm text-charcoal-600/60 mb-4">
              {t('pages.news.detail.moreStoriesDesc')}
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold rounded-full transition-all"
            >
              {t('pages.news.detail.viewAllNews')}
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}