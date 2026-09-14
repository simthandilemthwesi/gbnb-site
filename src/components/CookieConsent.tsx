import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface ConsentChoices {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const STORAGE_KEY = 'gbnb-cookie-consent';

const applyConsent = (c: ConsentChoices) => {
  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      functionality_storage: c.preferences ? 'granted' : 'denied',
    });
  } catch {
    /* analytics unavailable — choice is still stored locally */
  }
};

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>({ analytics: false, marketing: false, preferences: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        applyConsent(JSON.parse(stored));
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (c: ConsentChoices) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* storage unavailable — still apply for this session */
    }
    applyConsent(c);
    setVisible(false);
  };

  if (!visible) return null;

  const toggle = (key: keyof ConsentChoices) => setChoices((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">We value your privacy 🍪</h2>
        <p className="text-sm text-gray-600 mb-3">
          We use cookies to keep our site working and to understand how it is used. You choose what to allow:
        </p>
        <ul className="list-disc ml-5 mb-4 text-sm text-gray-600 space-y-1">
          <li><strong className="text-gray-900">Essential</strong> — keeps the site working properly (always on).</li>
          <li><strong className="text-gray-900">Analytics</strong> — helps us understand how people use our site.</li>
          <li><strong className="text-gray-900">Marketing</strong> — helps show you relevant ads.</li>
          <li><strong className="text-gray-900">Preferences</strong> — remembers your settings for next time.</li>
        </ul>

        {customizing && (
          <div className="mb-4 space-y-2 rounded-xl bg-gray-50 p-4">
            {(
              [
                { key: 'analytics', label: 'Analytics cookies' },
                { key: 'marketing', label: 'Marketing cookies' },
                { key: 'preferences', label: 'Preference cookies' },
              ] as { key: keyof ConsentChoices; label: string }[]
            ).map((opt) => (
              <label key={opt.key} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={choices[opt.key]}
                  onChange={() => toggle(opt.key)}
                  className="w-4 h-4 rounded accent-blue-700"
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => save({ analytics: true, marketing: true, preferences: true })}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:brightness-110"
            style={{ backgroundColor: '#1800ad' }}
          >
            Accept All
          </button>
          <button
            onClick={() => save({ analytics: false, marketing: false, preferences: false })}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Reject Non-Essential
          </button>
          {customizing ? (
            <button
              onClick={() => save(choices)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Save My Choices
            </button>
          ) : (
            <button
              onClick={() => setCustomizing(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Customize
            </button>
          )}
          <Link to="/privacy" className="px-3 py-2.5 text-sm font-semibold text-blue-700 underline">
            More Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
