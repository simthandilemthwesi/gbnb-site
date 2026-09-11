import { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'xh', label: 'isiXhosa' },
  { code: 'st', label: 'Sesotho' },
  { code: 'tn', label: 'Setswana' },
  { code: 'nso', label: 'Sepedi' },
  { code: 've', label: 'Tshivenda' },
  { code: 'ts', label: 'Xitsonga' },
  { code: 'ss', label: 'siSwati' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
];

const GoogleTranslate: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: LANGUAGES.map(l => l.code).join(','), layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
        'google_translate_element'
      );
    };
    const s = document.createElement('script');
    s.id = 'google-translate-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const selectLanguage = (code: string) => {
    const sel = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (sel) {
      sel.value = code;
      sel.dispatchEvent(new Event('change'));
    } else if (code !== 'en') {
      window.location.hash = `#googtrans(en|${code})`;
      window.location.reload();
    } else {
      window.location.hash = '';
      window.location.reload();
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-1.5 px-2.5 min-[420px]:px-3 py-1.5 rounded-full border text-xs font-medium transition-colors bg-white/10 border-white/20 text-white hover:bg-white/20 lg:bg-gray-100 lg:text-gray-700 lg:border-gray-200 lg:hover:bg-gray-200 flex-shrink-0"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8v.1l3.5 2.7h.1c2.2-2 3.8-5.1 3.8-8.5z" />
          <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5h-.1l-3.6 2.8v.1c1.9 3.9 5.9 6.7 10.5 6.7z" />
          <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4v-.1L1.6 6.7l-.1.1C.5 8.7 0 10.2 0 12s.5 3.3 1.4 4.7l3.8-2.3z" />
          <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.5 0 3.5 2.7 1.4 6.8l3.8 2.9c1-2.9 3.7-5 6.8-5z" />
        </svg>
        <span className="hidden min-[420px]:inline">Translate</span>
        <svg className="w-3 h-3 opacity-70 hidden min-[420px]:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 max-h-72 overflow-auto">
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => selectLanguage(l.code)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              {l.label}
            </button>
          ))}
        </div>
      )}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
};

export default GoogleTranslate;
