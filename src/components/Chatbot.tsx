import React, { useState } from 'react';
import { MessageCircle, Send, Mic, X, Volume2 } from 'lucide-react';
import { Language } from '../App';

interface ChatbotProps {
  currentLanguage: Language;
  isVisible: boolean;
  onToggle: () => void;
}

const translations = {
  fr: {
    title: 'Assistant Spirituel',
    placeholder: 'Posez votre question...',
    send: 'Envoyer',
    voice: 'Message vocal',
    close: 'Fermer',
    greeting: 'Assalamu alaykum ! Comment puis-je vous aider aujourd\'hui ?'
  },
  ar: {
    title: 'المساعد الروحي',
    placeholder: 'اطرح سؤالك...',
    send: 'إرسال',
    voice: 'رسالة صوتية',
    close: 'إغلاق',
    greeting: 'السلام عليكم! كيف يمكنني مساعدتك اليوم؟'
  },
  wo: {
    title: 'Boroom yallal ruux',
    placeholder: 'Laaj sa lakk...',
    send: 'Yónn',
    voice: 'Baat bu dégg',
    close: 'Tëj',
    greeting: 'Assalamu alaykum! Naka mën nga maa dem?'
  },
  en: {
    title: 'Spiritual Assistant',
    placeholder: 'Ask your question...',
    send: 'Send',
    voice: 'Voice message',
    close: 'Close',
    greeting: 'Assalamu alaykum! How can I help you today?'
  }
};

const Chatbot: React.FC<ChatbotProps> = ({ currentLanguage, isVisible, onToggle }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot'}>>([]);
  const [isListening, setIsListening] = useState(false);
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user' as const
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: t.greeting,
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110`}
      >
        {isVisible ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isVisible && (
        <div className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-[70] w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-4">
            <div className="flex items-center justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm opacity-90">En ligne</p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-gray-600" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t.greeting}
                </p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.sender === 'bot' && (
                    <button className="mt-2 p-1 hover:bg-gray-200 rounded transition-colors">
                      <Volume2 className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={t.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
              
              <button
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={t.voice}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                onClick={sendMessage}
                className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors"
                title={t.send}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;