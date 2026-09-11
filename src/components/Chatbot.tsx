import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { queryText, AssistantResponse } from '../services/assistantService';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  instruction: string;
  welcome: string;
}

const SIMBOT_SYSTEM_PROMPT = `You are Simbot, the official intelligent assistant and receptionist of George Bakhanyiselwa Nguwe Bawo NPC (GBNB NPC) — a faith-based nonprofit based in Thembalethu, George, Western Cape, South Africa, founded in 2023 by Mama Mthwesi. Always refer to yourself as Simbot, never another name. Answer every question about the NPC fully and helpfully using the knowledge below.
Tone: warm, friendly, professional, encouraging — like a helpful community host. First-person ("I", "we"), conversational, South African and community-minded. Short clear paragraphs, bold for key facts, bullet lists only when steps/options are needed. Match the user's language where possible (English, isiXhosa, Afrikaans, isiZulu). End encouragingly (e.g. "Stay blessed, and let's rise together in unity through Christ.").
Motto: "Yizani Sakhe Udonga Lwe Jerusalem" (Come, let us build the wall of Jerusalem). Vision: empower communities through fellowship, outreach programs, and digital ministry. Mission: spread faith, uplift youth, strengthen communities through spiritual growth and service.
Location: Thembalethu, George, 6529, Western Cape, South Africa (see the map on our Contact page). We serve communities across South Africa, including the Eastern Cape (closing the year in Thundergate, Ntabethemba, Komani).
History & outreach: 3rd anniversary celebrated February 2026. Fire relief: donated clothes, accessories and temporary shelter with local churches after the Zone 8 fire (June 15, 2025, 39 structures destroyed) and the Zone 9 fire (October 27, 2025) in Thembalethu, George.
Services: fellowship gatherings, youth empowerment, community development, spiritual growth programs, outreach and fire-relief drives, prayer support, testimonies.
Programs page: Faith & Worship, Coding & Robotics, Intro to AI, Generative AI, Digital Literacy, Web Dev, Psycho-Soul Therapy, Community Development.
Key pages: Home (/) with announcements, stats and FAQ, About (/about), Programs (/programs), Gallery (/gallery + photo submission + testimonials), Calendar (/calendar — Zoho monthly events preview + ZIP/PDF/JPG downloads), Get Involved (/get-involved — Volunteer form, Donation form with FNB bank details, Partnership via JotForm), Contact (/contact — contact form emails info.gbnb@gmail.com, map, socials).
How to take part: volunteer or donate via Get Involved; request prayer or share a testimony via Contact or WhatsApp; find gatherings on the Calendar page; partner or sponsor by contacting us.
Contact: phone +27 785 78 6134, email info.gbnb@gmail.com, site https://bakhanyiselwa.web.app, Facebook https://www.facebook.com/GeorgeBakhanyiselwaNguweBawo/, TikTok https://www.tiktok.com/@georgebakhanyiselwanguwe, YouTube https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo, WhatsApp https://wa.me/27785786134.
Rules: only use these facts, never invent programs/contacts/availability. Keep answers concise and practical. Never request or discuss passwords/admin credentials. You are Simbot, an AI assistant, not human. If outside scope or sensitive, escalate via WhatsApp https://wa.me/27785786134 or email info.gbnb@gmail.com. When you don't know, be honest and direct the user to the right channel.`;

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    instruction: '',
    welcome: "Hello! I'm Simbot, the GBNB NPC assistant 😊 How can I help you shine brighter today? Ask me about our programs, calendar, volunteering, donations, or how to get in touch."
  },
  {
    code: 'af',
    name: 'Afrikaans',
    flag: '🇿🇦',
    instruction: 'Please respond in Afrikaans.',
    welcome: 'Hallo! Ek is Simbot, die GBNB NPC-assistent 😊 Hoe kan ek jou vandag help? Vra oor ons programme, kalender, vrywilligerswerk, skenkings of kontak.'
  },
  {
    code: 'zu',
    name: 'Zulu',
    flag: '🇿🇦',
    instruction: 'Please respond in Zulu.',
    welcome: 'Sawubona! Ngingu Simbot, umsizi we-GBNB NPC 😊 Ngingakusiza kanjani namuhla? Buza ngezinhlelo, ikhalenda, ukuzinikela, iminikelo noma ukuxhumana.'
  },
  {
    code: 'xh',
    name: 'Xhosa',
    flag: '🇿🇦',
    instruction: 'Please respond in Xhosa.',
    welcome: 'Molo! Ndingu Simbot, umncedisi we-GBNB NPC 😊 Ndingakunceda njani namhlanje? Buza ngeenkqubo, ikhalenda, ukuzinikela, iminikelo okanye unxibelelwano.'
  }
];

const quickReplies = [
  { label: "What's happening at GBNB?", question: "What's happening at GBNB?" },
  { label: 'Where are you?', question: 'Where are you located?' },
  { label: 'Request a prayer', question: 'I would like to request a prayer.' },
  { label: 'Support GBNB NPC', question: 'How can I support GBNB NPC?' },
  { label: 'Calendar', question: 'Where can I find your events calendar?' },
  { label: 'Connect With Us', question: 'How can I connect with you?' },
  { label: 'Share a testimony', question: 'How can I share a testimony?' }
];

const fallbackResponses: Record<string, string> = {
  programs:
    'We offer: **Faith & Worship, Coding & Robotics, Intro to AI, Generative AI, Digital Literacy, Web Dev, Psycho-Soul Therapy, and Community Development.** See the full list on our Programs page (/programs) — which one speaks to your heart?',
  volunteer:
    "We'd love your help! Fill in the **Volunteer form on our Get Involved page (/get-involved)**, or email **info.gbnb@gmail.com** / call **+27 785 78 6134**. Stay blessed, and let's rise together in unity through Christ.",
  donate:
    'Thank you for your generosity! Use the **Donation form on our Get Involved page (/get-involved)** (FNB bank details are listed there). Every contribution uplifts our community. Stay blessed!',
  partner:
    'Thank you for wanting to partner with us! Use the **Partnership option on our Get Involved page (/get-involved)**, or reach us at **info.gbnb@gmail.com** / **+27 785 78 6134** so we can grow the impact together.',
  contact:
    'Connect with us:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n💬 WhatsApp: https://wa.me/27785786134\n🌐 https://bakhanyiselwa.web.app\n📍 Thembalethu, George, Western Cape',
  location:
    'You’ll find us in **Thembalethu, George, 6529, Western Cape, South Africa** — see the map on our Contact page (/contact). We serve communities across South Africa, including the Eastern Cape.',
  calendar:
    'Find our full calendar of services, outreaches and fellowship events on our **Calendar page (/calendar)** — preview it online and download the ZIP, PDF or JPG. Never miss a gathering!',
  prayer:
    'Thank you for trusting us with this. Please share your prayer request via our **Contact page (/contact)** or WhatsApp **https://wa.me/27785786134**, and our fellowship will stand with you in prayer. Stay blessed.',
  testimony:
    'We would be honoured to hear your story! Share it via our **Contact page (/contact)** or email **info.gbnb@gmail.com**, and it may encourage others in our Gallery testimonials.',
  social:
    'Follow our journey:\n👍 Facebook: https://www.facebook.com/GeorgeBakhanyiselwaNguweBawo/\n🎵 TikTok: https://www.tiktok.com/@georgebakhanyiselwanguwe\n▶️ YouTube: https://www.youtube.com/@GeorgeBakhanyiselwaNguweBawo',
  about:
    "I'm Simbot, assistant to **George Bakhanyiselwa Nguwe Bawo NPC (GBNB)** — a faith-based nonprofit from **George, Western Cape**, founded in 2023. Our motto is **'Yizani Sakhe Udonga Lwe Jerusalem'** (Come and build the wall of Jerusalem).",
  default:
    "Thank you for reaching out! I'm Simbot — I can help with our programs, calendar, location, volunteering, donations, partnerships, prayer requests and testimonies. For anything specific, email **info.gbnb@gmail.com**, WhatsApp **https://wa.me/27785786134**, or visit our Contact page (/contact). Stay blessed!"
};

function getFallbackResponse(userMessage: string): string {
  const m = userMessage.toLowerCase();
  if (m.includes('where') || m.includes('location') || m.includes('located') || m.includes('address') || m.includes('directions') || m.includes('thembalethu') || m.includes('george')) return fallbackResponses.location;
  if (m.includes('calendar') || m.includes('event') || m.includes('happening') || m.includes('when is') || m.includes('gathering') || m.includes('service times')) return fallbackResponses.calendar;
  if (m.includes('prayer') || m.includes('pray')) return fallbackResponses.prayer;
  if (m.includes('testimony') || m.includes('testimonial') || m.includes('share')) return fallbackResponses.testimony;
  if (m.includes('program') || m.includes('service') || m.includes('offer') || m.includes('course') || m.includes('coding') || m.includes('robotics') || m.includes('ai')) return fallbackResponses.programs;
  if (m.includes('partner') || m.includes('sponsor')) return fallbackResponses.partner;
  if (m.includes('volunteer') || m.includes('join') || m.includes('help') || m.includes('support')) return fallbackResponses.volunteer;
  if (m.includes('donate') || m.includes('donation') || m.includes('give') || m.includes('bank') || m.includes('fire') || m.includes('zone 8') || m.includes('zone 9') || m.includes('relief')) return fallbackResponses.donate;
  if (m.includes('facebook') || m.includes('tiktok') || m.includes('youtube') || m.includes('social') || m.includes('follow')) return fallbackResponses.social;
  if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('call') || m.includes('whatsapp') || m.includes('connect') || m.includes('number')) return fallbackResponses.contact;
  if (m.includes('about') || m.includes('who') || m.includes('gbnb') || m.includes('motto') || m.includes('mission') || m.includes('vision') || m.includes('founder')) return fallbackResponses.about;
  return fallbackResponses.default;
}

const LINK_RE = /((?:https?:\/\/|www\.)[^\s()]+|[\w.+-]+@[\w-]+\.[\w.]+|\+\d[\d\s.\-]*\d|\/(?:calendar|contact|get-involved|programs|gallery|about|thank-you)(?:[^\s]*)?)/g;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: languages[0].welcome, isUser: false, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lang = languages.find((l) => l.code === selectedLang) || languages[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const changeLanguage = (code: string) => {
    setSelectedLang(code);
    const next = languages.find((l) => l.code === code) || languages[0];
    setMessages([{ id: Date.now(), text: next.welcome, isUser: false, timestamp: new Date() }]);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now() + 1, text, isUser: false, timestamp: new Date() }]);
  };

  const handleTextResponse = (res: AssistantResponse) => {
    const text =
      typeof res.result === 'string'
        ? res.result
        : JSON.stringify(res.result, null, 2);
    addBotMessage(text);
  };

  const sendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { id: Date.now(), text: trimmed, isUser: true, timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);

    const prompt = `${SIMBOT_SYSTEM_PROMPT}\n\nUser language: ${lang.name}.${lang.instruction ? ` ${lang.instruction}` : ''}\nUser message: ${trimmed}`;
    try {
      const res = await queryText(prompt);
      handleTextResponse(res);
    } catch (err: any) {
      addBotMessage(getFallbackResponse(trimmed));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendText(inputValue);
    }
  };

  const linkify = (text: string, keyPrefix: string): React.ReactNode[] => {
    return text.split(LINK_RE).map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      let core = part;
      let trail = '';
      if (/^(https?:\/\/|www\.|\+|[\w.+-]+@)/.test(part)) {
        const m = part.match(/[.,;:!?)]+$/);
        if (m) {
          core = part.slice(0, -m[0].length);
          trail = m[0];
        }
      }
      if (/^(https?:\/\/|www\.)/.test(core) && core.length > 4) {
        const href = core.startsWith('http') ? core : `https://${core}`;
        return (
          <span key={key}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline break-all">{core}</a>
            {trail}
          </span>
        );
      }
      if (/^\+\d[\d\s.\-]*\d$/.test(core)) {
        const tel = core.replace(/[\s.\-]/g, '');
        return (
          <span key={key}>
            <a href={`tel:${tel}`} className="font-medium text-blue-700 underline whitespace-nowrap">{core}</a>
            {trail}
          </span>
        );
      }
      if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(core)) {
        return (
          <span key={key}>
            <a href={`mailto:${core}`} className="font-medium text-blue-700 underline break-all">{core}</a>
            {trail}
          </span>
        );
      }
      if (core.startsWith('/')) {
        return (
          <span key={key}>
            <Link to={core} onClick={() => setIsOpen(false)} className="font-semibold text-blue-700 underline">{core}</Link>
          </span>
        );
      }
      return <span key={key}>{part}</span>;
    });
  };

  const renderBotText = (text: string): React.ReactNode => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, ci) => {
      if (/^\*\*[^*]+\*\*$/.test(chunk)) {
        return <strong key={ci}>{linkify(chunk.slice(2, -2), `b${ci}`)}</strong>;
      }
      return <span key={ci}>{linkify(chunk, `t${ci}`)}</span>;
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-700 rotate-90' : 'hover:brightness-110'
        }`}
        style={isOpen ? undefined : { backgroundColor: '#1800ad' }}
        aria-label="Chat with SIM-BOT"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img src="/simbot_ai_icon_outline.png" alt="Open Simbot chat" className="w-9 h-9 object-contain" />
        )}
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-4 md:right-6 z-50 w-[95vw] md:w-96 max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="text-white p-3 md:p-4" style={{ backgroundColor: '#1800ad' }}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/simbot_ai_icon.png" alt="Simbot" className="w-8 h-8 md:w-10 md:h-10 object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base text-white">SIM-BOT</h3>
                <p className="text-xs text-white/80">AI Assistant</p>
              </div>
            </div>
            <select
              value={selectedLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-white text-blue-800 rounded-lg px-2 py-1.5 border-none outline-none cursor-pointer font-medium"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[40vh] md:h-80 overflow-y-auto p-3 md:p-4 bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
          {messages.map((message) => (
            <div key={message.id} className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 overflow-hidden" style={{ backgroundColor: '#1800ad' }}>
                  <img src="/simbot_ai_icon.png" alt="Simbot" className="w-8 h-8 object-cover" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  message.isUser ? 'text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
                style={message.isUser ? { backgroundColor: '#1800ad' } : undefined}
              >
                {message.text && (
                  <p className="text-sm whitespace-pre-line">
                    {message.isUser ? message.text : renderBotText(message.text)}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-3 flex justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 overflow-hidden" style={{ backgroundColor: '#1800ad' }}><img src="/simbot_ai_icon.png" alt="Simbot typing" className="w-8 h-8 object-cover" /></div>
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-3 bg-white border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => sendText(reply.question)}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              maxLength={200}
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => sendText(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white transition-colors hover:brightness-110"
              style={{ backgroundColor: '#1800ad' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
