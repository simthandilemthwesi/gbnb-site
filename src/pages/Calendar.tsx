import React from 'react';
import { Helmet } from 'react-helmet';

const Calendar: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Calendar | George Bakhanyiselwa Nguwe Bawo NPC</title>
        <meta name="description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
        <link rel="canonical" href="https://bakhanyiselwa.web.app/calendar" />
        <link rel="alternate" hrefLang="en" href="https://bakhanyiselwa.web.app/calendar" />
        <link rel="alternate" hrefLang="xh" href="https://bakhanyiselwa.web.app/calendar" />
        <link rel="alternate" hrefLang="x-default" href="https://bakhanyiselwa.web.app/calendar" />
        <meta property="og:url" content="https://bakhanyiselwa.web.app/calendar" />
        <meta property="og:title" content="Calendar | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta property="og:description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calendar | George Bakhanyiselwa Nguwe Bawo NPC" />
        <meta name="twitter:description" content="View our monthly calendar of events and activities. Download the GBNB calendar." />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Event","name":"GBNB Calendar Events","description":"Monthly calendar of George Bakhanyiselwa Nguwe Bawo NPC events","organizer":{"@type":"Organization","name":"George Bakhanyiselwa Nguwe Bawo NPC","url":"https://bakhanyiselwa.web.app"},"eventStatus":"https://schema.org/EventScheduled","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","location":{"@type":"Place","name":"Thembalethu, George, South Africa","address":"Thembalethu, George, 6529, South Africa"}})}</script>
      </Helmet>

      {/* Hero — blue to match other pages */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <a href="/" className="text-white hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Calendar</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">George Bakhanyiselwa Nguwe Bawo Calendar</h1>
          <p className="text-xl text-white/80">View our monthly calendar of events and activities, and download the files below</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Download Instructions</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">📥 Option 1: Download ZIP (Both Files Together)</h3>
              <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                <li>Click the <strong className="text-gray-900">Download Calendar (ZIP)</strong> button in the preview toolbar above.</li>
                <li>A ZIP file will be saved to your phone or computer.</li>
                <li>Locate the file in your <em>Downloads</em> folder.</li>
                <li>Right‑click and select <strong className="text-gray-900">Extract All</strong>.</li>
                <li>Open the extracted folder named <strong className="text-gray-900">George Bakhanyiselwa Nguwe Bawo Calendar</strong>.</li>
                <li>Inside, you will find:
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Bakhanyiselwa_Nguwe_bawo_Calendar.jpg</code></li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Bakhanyiselwa_Nguwe_bawo_Calendar.pdf</code></li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">📄 Option 2: Download PDF or Image Only</h3>
              <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                <li>In the calendar preview above, click directly on the PDF or Image file.</li>
                <li>The file will open in a viewer.</li>
                <li>Look at the top corner of the viewer.</li>
                <li>Click the <strong className="text-gray-900">Download</strong> button.</li>
                <li>This will download the selected file alone (either the PDF or the JPG image).</li>
              </ol>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Calendar;
