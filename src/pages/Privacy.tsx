import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="Privacy and cookie policy for George Bakhanyiselwa Nguwe Bawo NPC — what we collect, cookies we use, and your choices." />
        <link rel="canonical" href="https://bakhanyiselwa.web.app/privacy" />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/privacy" />
        <meta property="og:title" content="Privacy Policy | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="Privacy and cookie policy for George Bakhanyiselwa Nguwe Bawo NPC." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero — blue to match other pages */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link to="/" className="text-white hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/80">How we protect your information and respect your choices</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">What we collect</h2>
              <p>
                When you use our forms (volunteer, donation, contact, photo submission), we collect the details you
                provide — such as your name, email address, and message — so our team can respond and serve you.
                Submissions are stored securely in our database and emailed to info.gbnb@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">How we use it</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Responding to your messages, applications, and prayer requests.</li>
                <li>Organising volunteers, donations, and community outreach.</li>
                <li>Improving our programs and website experience.</li>
              </ul>
              <p className="mt-2">We never sell your personal information.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies we use</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li><strong className="text-gray-900">Essential cookies</strong> — keep the site working properly (always on).</li>
                <li><strong className="text-gray-900">Analytics cookies</strong> — help us understand how people use our site.</li>
                <li><strong className="text-gray-900">Marketing cookies</strong> — help show you relevant ads.</li>
                <li><strong className="text-gray-900">Preference cookies</strong> — remember your settings for next time.</li>
              </ul>
              <p className="mt-2">
                Choose <strong className="text-gray-900">Accept All</strong>, <strong className="text-gray-900">Reject Non-Essential</strong>,
                or <strong className="text-gray-900">Customize</strong> in our cookie banner. Your choice is saved on your
                device and you can change your mind anytime by clearing your site data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Third-party services</h2>
              <p>
                We use trusted services to run this site: Firebase/Google (hosting, database, analytics),
                Web3Forms (form email delivery), and Zoho (calendar). Google services follow{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact us</h2>
              <p>
                Questions about your privacy? Email <strong className="text-gray-900">info.gbnb@gmail.com</strong> or
                call/WhatsApp <strong className="text-gray-900">+27 785 78 6134</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
