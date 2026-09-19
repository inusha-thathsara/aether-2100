import React, { useState } from 'react';
import { X, Bot, Sparkles, Send, Volume2 } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function AICoPilotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings traveler. I am Oracle 2100, your universal transit co-pilot. How may I assist your journey across our autonomous bus, hyper-tube, sky-pod, or smart-road network today?'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    'How do I transfer at Nexus Central?',
    'Is step-free assistance available?',
    'How do eVTOL Sky-Pods handle wind?'
  ];

  const handleSend = (userText) => {
    const query = userText || input;
    if (!query.trim()) return;

    audioManager.playChime('click');
    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setInput('');

    // Simulated instant AI answer
    setTimeout(() => {
      let reply = "Oracle AI has synchronized your query with the city grid. All systems are operational.";
      if (query.toLowerCase().includes('nexus') || query.toLowerCase().includes('transfer')) {
        reply = "At Nexus Central Interchange, moving walkways connect Ground Level directly to Sub-Level -2 Platform 03 in under 2 minutes. Color-coded holographic paths on the floor guide you effortlessly.";
      } else if (query.toLowerCase().includes('step-free') || query.toLowerCase().includes('wheelchair') || query.toLowerCase().includes('elderly')) {
        reply = "100% of our fleet (Mag-Bus, Hyper-Tube, Sky-Pods, and Glide-Pods) feature automatic zero-threshold ramps, gimbal-stabilized seating, and dedicated companion zones. Human assistance escorts are also stationed at every platform.";
      } else if (query.toLowerCase().includes('wind') || query.toLowerCase().includes('skypod') || query.toLowerCase().includes('air')) {
        reply = "eVTOL Sky-Pods are guided by dynamic 3D LIDAR atmospheric grids. If wind exceeds 45 km/h, the AI automatically re-routes you to the subterranean Hyper-Tube corridor with zero travel delay.";
      }

      audioManager.playChime('arrival');
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  const handleSpeak = (text) => {
    audioManager.speak(text);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="copilot-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={22} color="var(--cyan-primary)" />
            <div>
              <h2 id="copilot-title" className="modal-title">Oracle AI Co-Pilot</h2>
              <div style={{ fontSize: '0.65rem', color: 'var(--emerald-accent)' }}>● City Transit Core Active</div>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close-modal" 
            onClick={onClose}
            aria-label="Close Oracle AI"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick prompt suggestions */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              className="hub-chip"
              style={{ minWidth: 'auto', fontSize: '0.72rem', padding: '6px 10px', whiteSpace: 'nowrap' }}
              onClick={() => handleSend(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat message history */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'user' ? 'var(--cyan-primary)' : 'var(--bg-card)',
                color: m.sender === 'user' ? '#030612' : '#ffffff',
                border: m.sender === 'user' ? 'none' : '1px solid var(--border-glass)',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                lineHeight: 1.4,
                position: 'relative'
              }}
            >
              <div>{m.text}</div>
              {m.sender === 'ai' && (
                <button
                  type="button"
                  onClick={() => handleSpeak(m.text)}
                  style={{ background: 'none', border: 'none', color: 'var(--cyan-primary)', cursor: 'pointer', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}
                  aria-label="Read AI response aloud"
                >
                  <Volume2 size={12} /> Read aloud
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Input box */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="input-field-custom"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '10px 14px', flex: 1 }}
            placeholder="Ask anything about routes or transfers..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            type="button"
            className="map-btn-tiny"
            style={{ width: '44px', height: '44px', borderRadius: '10px' }}
            onClick={() => handleSend()}
            aria-label="Send query"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
