import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    // Honeypot check
    const honeypot = (data.get('website_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      return;
    }

    const emailVal = (data.get('email') as string || '').trim();
    if (!emailVal) return;

    setStatus('loading');
    setErrorMsg('');

    const params = new URLSearchParams();
    data.forEach((val, key) => {
      if (key !== 'website_alt' && typeof val === 'string') {
        params.append(key, val);
      }
    });

    try {
      const response = await fetch('https://readdy.ai/api/form/d9cf26t64bc39gr2pk0g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string } } = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = {};
      }

      const serverMsg = parsed?.meta?.message || parsed?.meta?.detail || responseText;

      if (response.ok && parsed?.code === 'OK') {
        setStatus('success');
        formRef.current?.reset();
      } else if (typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('spam')) {
        setStatus('error');
        setErrorMsg(serverMsg);
      } else {
        setStatus('error');
        setErrorMsg(serverMsg || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <section className="py-14 md:py-20 bg-emerald-800">
      <div className="px-6 lg:px-12 max-w-3xl mx-auto text-center">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-xs font-semibold text-gold-400 uppercase tracking-widest">
            Newsletter
          </span>
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-cream-100 mb-3 mt-3">
          {t('newsletter.title')}
        </h2>

        <p className="text-base text-cream-200/70 mb-8 leading-relaxed max-w-xl mx-auto">
          {t('newsletter.description')}
        </p>

        {status === 'success' ? (
          <div className="flex items-center gap-3 justify-center py-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/20 border border-gold-500/30">
              <i className="ri-check-line text-gold-400 text-lg" />
            </div>
            <p className="text-cream-100 font-medium">
              {t('common.success')} You&apos;re now subscribed.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            data-readdy-form
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
          >
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
              <input
                type="text"
                name="website_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
              />
            </div>

            <input
              type="email"
              name="email"
              required
              placeholder={t('newsletter.placeholder')}
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-cream-100 placeholder-cream-200/50 focus:outline-none focus:border-gold-500/60 transition"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-bold rounded-full transition-all whitespace-nowrap disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing...' : t('newsletter.button')}
            </button>
          </form>
        )}

        {status === 'error' && errorMsg && (
          <p className="mt-3 text-sm text-red-300">{errorMsg}</p>
        )}

        <p className="text-xs text-cream-200/40 mt-4">
          {t('newsletter.privacy')}
        </p>
      </div>
    </section>
  );
}