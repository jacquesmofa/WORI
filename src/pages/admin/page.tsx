import { useState, useCallback } from 'react';
import defaultContent from '@/data/site-content.json';
import type { SiteContentMap } from '@/hooks/useSiteContent';

// =============================================================================
// CONFIGURATION — Update these values for your setup
// =============================================================================
const CLOUDINARY_CLOUD_NAME = 'oqdvximy';
const CLOUDINARY_UPLOAD_PRESET = 'wori_unsigned'; // ← Create this unsigned preset in your Cloudinary dashboard
const REPO_OWNER = 'jacquesmofa';
const REPO_NAME = 'WORI';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇷' },
];

const getStoredPwd = () => {
  if (typeof window !== 'undefined') return sessionStorage.getItem('wori_admin_pwd') || '';
  return '';
};

const hasStoredPwd = () => {
  if (typeof window !== 'undefined') return !!sessionStorage.getItem('wori_admin_pwd');
  return false;
};

const optimizeCdnUrl = (url: string, width = 600) => {
  if (!url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

export default function AdminPage() {
  const [auth, setAuth] = useState(getStoredPwd);
  const [isLoggedIn, setIsLoggedIn] = useState(hasStoredPwd);
  const [pwdInput, setPwdInput] = useState('');
  const [activeLang, setActiveLang] = useState('en');
  const [content, setContent] = useState<SiteContentMap>(defaultContent as SiteContentMap);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingImpact, setUploadingImpact] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const login = () => {
    sessionStorage.setItem('wori_admin_pwd', pwdInput);
    setAuth(pwdInput);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('wori_admin_pwd');
    setAuth('');
    setIsLoggedIn(false);
    setPwdInput('');
  };

  const updateField = useCallback(
    (section: 'hero' | 'impact' | 'vision' | 'about', field: string, value: string) => {
      setContent((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang],
          [section]: {
            ...(prev[activeLang][section] as Record<string, string>),
            [field]: value,
          },
        },
      }));
    },
    [activeLang]
  );

  const uploadImage = async (section: 'hero' | 'impact' | 'about', file: File) => {
    const setUploading = section === 'hero' ? setUploadingHero : setUploadingImpact;
    setUploading(true);
    setStatus(`Uploading ${section} image to Cloudinary...`);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      if (!res.ok) throw new Error('Cloudinary upload failed');
      const data = (await res.json()) as { secure_url: string };
      updateField(section, 'image', data.secure_url);
      setStatus(`${section} image uploaded and optimized.`);
    } catch (err) {
      setStatus(`Upload error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('Syncing changes with GitHub repository...');

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: auth,
          repoOwner: REPO_OWNER,
          repoName: REPO_NAME,
          updatedContent: content,
        }),
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Failed to commit content.');
      }

      setStatus('Published successfully! Your site will rebuild and go live in about 60 seconds.');
    } catch (err) {
      setStatus(`Save error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------------------------
  const langData = content[activeLang];

  // ---------------------------------------------------------------------------
  // Login Gate
  // ---------------------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-cream-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center">
              <span className="font-serif text-gold-500 font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold text-charcoal-700">WORI Admin</h1>
              <p className="text-xs text-charcoal-600/50">Content Management Portal</p>
            </div>
          </div>

          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Admin Password
          </label>
          <input
            type="password"
            value={pwdInput}
            onChange={(e) => setPwdInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Enter admin password"
            className="w-full bg-cream-100 border border-cream-300 rounded-lg px-4 py-3 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800/20 transition"
          />
          <button
            onClick={login}
            disabled={!pwdInput}
            className="w-full mt-4 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-cream-100 text-sm font-semibold transition disabled:bg-cream-300 disabled:text-charcoal-600/40 disabled:cursor-not-allowed"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-white border-b border-cream-300 sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center">
              <span className="font-serif text-gold-500 font-bold text-base">W</span>
            </div>
            <div>
              <h1 className="font-serif text-lg font-semibold text-charcoal-700">WORI Admin</h1>
              <p className="text-[11px] text-charcoal-600/50 uppercase tracking-wider">Content Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving || uploadingHero || uploadingImpact}
              className="px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold transition disabled:bg-cream-300 disabled:text-charcoal-600/40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {saving ? 'Publishing...' : 'Publish Changes'}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-lg border border-cream-300 text-charcoal-600 text-sm hover:bg-cream-200 transition whitespace-nowrap"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto">
        {/* Status Banner */}
        {status && (
          <div className="mb-6 bg-emerald-800/5 border border-emerald-800/15 rounded-xl p-4 text-sm text-emerald-800 leading-relaxed">
            {status}
          </div>
        )}

        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition border ${
                activeLang === lang.code
                  ? 'bg-emerald-800 text-cream-100 border-emerald-800'
                  : 'bg-white text-charcoal-700 border-cream-300 hover:border-emerald-800/30'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Editor */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-800/10 flex items-center justify-center">
                <i className="ri-home-smile-line text-emerald-800" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-charcoal-700">Hero Section</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={langData.hero.badge}
                  onChange={(e) => updateField('hero', 'badge', e.target.value)}
                  placeholder="e.g. Canadian Registered Charity"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Main Title
                </label>
                <input
                  type="text"
                  value={langData.hero.title}
                  onChange={(e) => updateField('hero', 'title', e.target.value)}
                  placeholder="Hero headline"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Subtitle
                </label>
                <textarea
                  rows={3}
                  value={langData.hero.subtitle}
                  onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                  placeholder="Supporting text below the headline"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                    Primary CTA
                  </label>
                  <input
                    type="text"
                    value={langData.hero.ctaPrimary}
                    onChange={(e) => updateField('hero', 'ctaPrimary', e.target.value)}
                    placeholder="Get Support"
                    className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                    Secondary CTA
                  </label>
                  <input
                    type="text"
                    value={langData.hero.ctaSecondary}
                    onChange={(e) => updateField('hero', 'ctaSecondary', e.target.value)}
                    placeholder="Donate Now"
                    className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Background Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImage('hero', f);
                    }}
                    className="text-sm text-charcoal-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-800 file:text-cream-100 hover:file:bg-emerald-700 cursor-pointer"
                  />
                  {uploadingHero && (
                    <span className="text-xs text-gold-600 animate-pulse">Uploading...</span>
                  )}
                </div>
                {langData.hero.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-cream-300">
                    <img
                      src={optimizeCdnUrl(langData.hero.image, 400)}
                      alt="Hero preview"
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <p className="px-3 py-2 text-[11px] text-charcoal-600/50 truncate bg-cream-100">
                      {langData.hero.image}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Impact Editor */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center">
                <i className="ri-bar-chart-box-line text-gold-600" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-charcoal-700">Impact Section</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Section Label
                </label>
                <input
                  type="text"
                  value={langData.impact.label}
                  onChange={(e) => updateField('impact', 'label', e.target.value)}
                  placeholder="e.g. Our Impact"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={langData.impact.title}
                  onChange={(e) => updateField('impact', 'title', e.target.value)}
                  placeholder="Impact section headline"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={langData.impact.description}
                  onChange={(e) => updateField('impact', 'description', e.target.value)}
                  placeholder="Paragraph describing the impact"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={langData.impact.cta}
                  onChange={(e) => updateField('impact', 'cta', e.target.value)}
                  placeholder="Learn more about us"
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Section Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImage('impact', f);
                    }}
                    className="text-sm text-charcoal-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-800 file:text-cream-100 hover:file:bg-emerald-700 cursor-pointer"
                  />
                  {uploadingImpact && (
                    <span className="text-xs text-gold-600 animate-pulse">Uploading...</span>
                  )}
                </div>
                {langData.impact.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-cream-300">
                    <img
                      src={optimizeCdnUrl(langData.impact.image, 400)}
                      alt="Impact preview"
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <p className="px-3 py-2 text-[11px] text-charcoal-600/50 truncate bg-cream-100">
                      {langData.impact.image}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vision + About Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Vision Editor */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-800/10 flex items-center justify-center">
                <i className="ri-eye-line text-emerald-800" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-charcoal-700">Vision Statement</h2>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                Vision Text
              </label>
              <textarea
                rows={4}
                value={(langData as unknown as Record<string, Record<string, string>>)?.vision?.text || ''}
                onChange={(e) => updateField('vision', 'text', e.target.value)}
                placeholder="Our vision statement..."
                className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition resize-none"
              />
            </div>
          </div>

          {/* About Editor */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center">
                <i className="ri-building-line text-gold-600" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-charcoal-700">About Organization</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  Organization Description
                </label>
                <textarea
                  rows={4}
                  value={(langData as unknown as Record<string, Record<string, string>>)?.about?.description || ''}
                  onChange={(e) => updateField('about', 'description', e.target.value)}
                  placeholder="Organization description..."
                  className="w-full bg-cream-100 border border-cream-300 rounded-lg px-3 py-2.5 text-sm text-charcoal-700 placeholder-charcoal-600/30 focus:outline-none focus:border-emerald-800 transition resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-600 uppercase tracking-wider mb-1.5">
                  About Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImage('about', f);
                    }}
                    className="text-sm text-charcoal-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-800 file:text-cream-100 hover:file:bg-emerald-700 cursor-pointer"
                  />
                </div>
                {(langData as unknown as Record<string, Record<string, string>>)?.about?.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-cream-300">
                    <img
                      src={optimizeCdnUrl((langData as unknown as Record<string, Record<string, string>>)?.about?.image, 400)}
                      alt="About preview"
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (footer) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || uploadingHero || uploadingImpact}
            className="px-8 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-emerald-900 text-sm font-semibold transition disabled:bg-cream-300 disabled:text-charcoal-600/40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {saving ? 'Publishing to GitHub...' : 'Publish All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}