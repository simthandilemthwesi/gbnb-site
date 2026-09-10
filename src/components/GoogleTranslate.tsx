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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors bg-white/10 border-white/20 text-white hover:bg-white/20 lg:bg-gray-100 lg:text-gray-700 lg:border-gray-200 lg:hover:bg-gray-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3 9h18M3 15h18M9 3a15 15 0 000 18M15 3a15 15 0 000 18" />
        </svg>
        Translate
        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
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
