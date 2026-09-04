import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
        'google_translate_element'
      );
    };
    const s = document.createElement('script');
    s.id = 'google-translate-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary-900 text-white flex items-center justify-end gap-2 px-4 py-1.5 text-xs">
      <span className="hidden sm:inline opacity-80">Translate:</span>
      <div id="google_translate_element" className="[&>div]:!p-0 [&_select]:!text-xs [&_select]:!py-1" />
    </div>
  );
};

export default GoogleTranslate;
