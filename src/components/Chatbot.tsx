import React, { useState, useEffect, useRef } from 'react';
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

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    instruction: '',
    welcome: "Hello! I'm SIM-BOT, the AI assistant for George Bakhanyiselwa Nguwe Bawo NPC. Ask me anything about our programs, volunteering, donations, or how to get in touch."
  },
  {
    code: 'af',
    name: 'Afrikaans',
    flag: '🇿🇦',
    instruction: 'Please respond in Afrikaans.',
    welcome: 'Hallo! Ek is SIM-BOT, die KI-assistent vir George Bakhanyiselwa Nguwe Bawo NPC. Vra enigiets oor ons programme, vrywilligerswerk, skenkings of kontak.'
  },
  {
    code: 'zu',
    name: 'Zulu',
    flag: '🇿🇦',
    instruction: 'Please respond in Zulu.',
    welcome: 'Sawubona! Ngingu SIM-BOT, umsizi we-AI we George Bakhanyiselwa Nguwe Bawo NPC. Buza noma yini ngezinhlelo zethu, ukuzinikela, iminikelo noma ukuxhumana.'
  },
  {
    code: 'xh',
    name: 'Xhosa',
    flag: '🇿🇦',
    instruction: 'Please respond in Xhosa.',
    welcome: 'Molo! Ndingu SIM-BOT, umncedisi we-AI we George Bakhanyiselwa Nguwe Bawo NPC. Buza nantoni na ngeenkqubo zethu, ukuzinikela, iminikelo okanye unxibelelwano.'
  }
];

const quickReplies = [
  { label: 'Programs', question: 'What programs does George Bakhanyiselwa Nguwe Bawo NPC offer?' },
  { label: 'Volunteer', question: 'How can I volunteer with you?' },
  { label: 'Donate', question: 'How can I make a donation?' },
  { label: 'Contact', question: 'How can I contact you?' }
];

const fallbackResponses: Record<string, string> = {
  programs:
    'George Bakhanyiselwa Nguwe Bawo NPC offers: Faith & Worship Unity, Community Development, Youth Empowerment, and Digital Ministry. Would you like more detail on any of these?',
  volunteer:
    "We'd love your help! Visit our Get Involved page or email info.gbnb@gmail.com. You can also call +27 785 78 6134.",
  donate:
    'Thank you for considering a donation! Visit our Get Involved page to see how to support our mission. Every contribution helps our community.',
  contact:
    'Reach us at:\n📧 info.gbnb@gmail.com\n📞 +27 785 78 6134\n🌐 bakhanyiselwa.web.app',
  about:
    "George Bakhanyiselwa Nguwe Bawo NPC (GBNB) is a faith-based nonprofit. Our motto is 'Yizani Sakhe Udonga Lwe Jerusalem' (Come and Build the Wall of Jerusalem).",
  default:
    "Thank you for your message! For specific inquiries, contact us at info.gbnb@gmail.com or call +27 785 78 6134. You can also visit our Contact page."
};

function getFallbackResponse(userMessage: string): string {
  const m = userMessage.toLowerCase();
  if (m.includes('program') || m.includes('service') || m.includes('offer')) return fallbackResponses.programs;
  if (m.includes('volunteer') || m.includes('join') || m.includes('help')) return fallbackResponses.volunteer;
  if (m.includes('donate') || m.includes('donation') || m.includes('give')) return fallbackResponses.donate;
  if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('call')) return fallbackResponses.contact;
  if (m.includes('about') || m.includes('who') || m.includes('gbnb')) return fallbackResponses.about;
  return fallbackResponses.default;
}

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

    const prompt = lang.instruction ? `${lang.instruction}\n${trimmed}` : trimmed;
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

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-700 rotate-90' : 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
        }`}
        aria-label="Chat with SIM-BOT"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 md:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">SIM-BOT</h3>
                <p className="text-xs text-blue-100">AI Assistant</p>
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
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                  SB
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  message.isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
              >
                {message.text && <p className="text-sm whitespace-pre-line">{message.text}</p>}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-3 flex justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2">SB</div>
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
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white transition-colors"
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
