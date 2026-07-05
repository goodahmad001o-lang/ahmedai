"use client";
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>AhmedAI 🚀</h1>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{ background: m.role === 'user' ? '#007bff' : '#eee', color: m.role === 'user' ? '#fff' : '#000', padding: '5px 10px', borderRadius: '10px', display: 'inline-block' }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p>در حال تایپ...</p>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="چیزی بپرس..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', cursor: 'pointer', background: '#000', color: '#fff', borderRadius: '5px' }}>ارسال</button>
      </div>
    </div>
  );
          }
            
