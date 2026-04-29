import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';
interface Message { role: 'user' | 'assistant'; content: string; }
const GROQ_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || '';
const AIAssistant: React.FC = () => {
  const { lang } = useApp();
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages]);
  const systemPrompt = lang==='de'
    ? 'Du bist ein Assistent fuer deutsche Behoerdenantraege. Antworte kurz auf Deutsch. Hilf bei Anmeldung, Aufenthaltserlaubnis, Kindergeld, Steuer, Elterngeld, Gewerbeanmeldung.'
    : 'You are an assistant for German government applications. Answer briefly in English. Help with Anmeldung, residence permits, child benefits, tax returns, parental leave, business registration.';
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role:'user', content:input.trim() };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      if (!GROQ_KEY) {
        await new Promise(r => setTimeout(r, 800));
        const demo = lang==='de'
          ? 'Fuer die Anmeldung benoetigen Sie: Personalausweis/Reisepass, Wohnungsgeberbestaetigung und das ausgefuellte Formular. Der Termin dauert ca. 15 Minuten.'
          : 'For Anmeldung you need: ID/passport, landlord confirmation, and completed form. The appointment takes about 15 minutes.';
        setMessages(p => [...p, {role:'assistant', content:demo}]);
        setLoading(false);
        return;
      }
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${GROQ_KEY}`},
        body: JSON.stringify({
          model:'llama3-70b-8192',
          messages:[{role:'system',content:systemPrompt},...messages,{role:'user',content:userMsg.content}],
          max_tokens:400,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || (lang==='de'?'Fehler aufgetreten.':'Error occurred.');
      setMessages(p => [...p, {role:'assistant', content:reply}]);
    } catch {
      setMessages(p => [...p, {role:'assistant', content:lang==='de'?'Verbindungsfehler.':'Connection error.'}]);
    }
    setLoading(false);
  };
  const suggestions = lang==='de'
    ? ['Was brauche ich fuer die Anmeldung?','Wie beantrage ich Kindergeld?','Welche Dokumente fuer Aufenthaltserlaubnis?']
    : ['What do I need for Anmeldung?','How do I apply for child benefit?','What documents for residence permit?'];
  return (
    <>
      <button className={`ai-fab ${open?'open':''}`} onClick={() => setOpen(o=>!o)}>
        {open ? <X size={22}/> : <><Sparkles size={22}/><span className="ai-fab-label">{lang==='de'?'KI-Assistent':'AI Assistant'}</span></>}
      </button>
      {open && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-title"><Sparkles size={16}/><span>{lang==='de'?'KI-Assistent':'AI Assistant'}</span></div>
            <div className="ai-chat-sub">{lang==='de'?'Behoerden-Experte':'Government Expert'}</div>
          </div>
          <div className="ai-chat-body">
            {messages.length===0 && (
              <div className="ai-welcome">
                <div className="ai-avatar"><Sparkles size={20}/></div>
                <p>{lang==='de'?'Hallo! Ich helfe bei deutschen Behoerdenantraegen. Was moechten Sie wissen?':'Hello! I help with German government applications. What would you like to know?'}</p>
                <div className="ai-suggestions">
                  {suggestions.map(s=>(
                    <button key={s} className="ai-suggestion" onClick={()=>setInput(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m,i)=>(
              <div key={i} className={`ai-msg ${m.role}`}>
                {m.role==='assistant' && <div className="ai-msg-avatar"><Sparkles size={12}/></div>}
                <div className="ai-msg-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg assistant">
                <div className="ai-msg-avatar"><Sparkles size={12}/></div>
                <div className="ai-msg-bubble typing"><span/><span/><span/></div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          <div className="ai-chat-input">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={lang==='de'?'Frage stellen...':'Ask a question...'}/>
            <button onClick={send} disabled={!input.trim()||loading}>
              {loading?<Loader size={16}/>:<Send size={16}/>}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default AIAssistant;
