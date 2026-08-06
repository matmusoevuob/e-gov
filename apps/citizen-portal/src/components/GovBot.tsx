import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Language, translations } from '../locales/i18n';

interface GovBotProps {
  lang: Language;
}

export const GovBot: React.FC<GovBotProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: t.botWelcomeMessage }
  ]);
  const [input, setInput] = useState('');

  // Update initial bot greeting if language changes and only initial message exists
  React.useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([{ sender: 'bot', text: t.botWelcomeMessage }]);
    }
  }, [lang]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = t.defaultReply;
      const lower = userText.toLowerCase();

      if (lower.includes('passport') || lower.includes('пасп') || lower.includes('паспорт')) {
        reply = t.passportReply;
      } else if (lower.includes('business') || lower.includes('llc') || lower.includes('бизнес') || lower.includes('ҷдмм') || lower.includes('mchj')) {
        reply = t.businessReply;
      } else if (lower.includes('tax') || lower.includes('солиқ') || lower.includes('андоз') || lower.includes('налог')) {
        reply = t.taxReply;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 999,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--gov-blue)',
            border: 'none',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(29, 78, 216, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          title={t.botName}
        >
          <Bot size={26} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="gov-card"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 999,
            width: '370px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '14px 18px', background: 'var(--bg-header)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '6px', borderRadius: '6px', background: 'var(--gov-blue)', color: '#fff' }}>
                <Bot size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{t.botName}</h4>
                <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600 }}>{t.botOnlineStatus}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-main)' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.sender === 'user' ? 'var(--gov-blue)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  fontWeight: msg.sender === 'user' ? 600 : 400,
                  fontSize: '0.85rem'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div style={{ padding: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px', background: 'var(--bg-card)' }}>
            <input
              type="text"
              placeholder={t.botInputPlaceholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="gov-input"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
            />
            <button className="btn-gov-primary" onClick={handleSend} style={{ padding: '8px 12px' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
