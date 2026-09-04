import React from 'react';
import { Helmet } from 'react-helmet';

const Calendar: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Calendar | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/calendar" />
        <meta property="og:title" content="Calendar | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calendar | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
      </Helmet>

      <section className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
              George Bakhanyiselwa Nguwe Bawo Calendar
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View our monthly calendar of events and activities, and download the files below.
            </p>
          </div>

          {/* Embedded Calendar Preview */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-10">
            <iframe
              src="https://workdrive.zohoexternal.com/embed/a9gtjded82dc1ef8e473bb58c0c33b957aded?hidetheme=true&toolbar=true&layout=grid&appearance=light&themecolor=blue"
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              width="100%"
              height="600"
              title="GBNB Calendar"
              className="w-full"
              style={{ minHeight: 600 }}
            />
          </div>

          {/* Download Instructions */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Download Instructions</h2>
            <ol className="list-decimal ml-6 space-y-3 text-gray-700">
              <li>
                Click the <strong className="text-gray-900">Download Calendar (ZIP)</strong> button below.
              </li>
              <li>
                A <strong className="text-gray-900">ZIP file</strong> will be downloaded to your computer.
              </li>
              <li>
                Locate the ZIP file in your <em>Downloads</em> folder.
              </li>
              <li>
                Right‑click the ZIP file and choose <strong className="text-gray-900">Extract All</strong>.
              </li>
              <li>
                Open the extracted folder named <strong className="text-gray-900">George Bakhanyiselwa Nguwe Bawo Calendar</strong>.
              </li>
              <li>
                Inside, you will find two files:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Bakhanyiselwa_Nguwe_bawo_Calendar.jpg</code></li>
                  <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Bakhanyiselwa_Nguwe_bawo_Calendar.pdf</code></li>
                </ul>
              </li>
            </ol>

            {/* Download Button */}
            <div className="mt-8">
              <a
                href="https://workdrive.zohoexternal.com/file/a9gtjded82dc1ef8e473bb58c0c33b957aded?download=zip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Calendar (ZIP)
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Calendar;
