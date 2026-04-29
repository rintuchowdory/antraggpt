import React from 'react';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
const Landing: React.FC = () => {
  const {lang,setLang,setView} = useApp();
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo"><div className="logo-mark">A</div><span>AntragGPT</span></div>
        <div className="landing-lang">
          {(['de','en'] as const).map(l=>(
            <button key={l} className={lang===l?'active':''} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </header>
      <section className="hero">
        <div className="hero-badge"><Sparkles size={13}/> {lang==='de'?'KI-gestützte Behördenhilfe':'AI-powered form assistance'}</div>
        <h1 className="hero-headline">{lang==='de'?'Deutsche Behörden. Einfach gemacht.':'German bureaucracy. Made simple.'}</h1>
        <p className="hero-sub">{lang==='de'?'Schritt für Schritt durch jeden Antrag – in Ihrer Sprache.':'Step by step through every form – in your language.'}</p>
        <button className="hero-cta" onClick={()=>setView('dashboard')}>
          {lang==='de'?'Kostenlos starten':'Get started free'} <ArrowRight size={18}/>
        </button>
        <div className="hero-stats">
          <div className="stat"><strong>6+</strong><span>{lang==='de'?'Antragstypen':'Form Types'}</span></div>
          <div className="stat-divider"/>
          <div className="stat"><strong>DE/EN</strong><span>{lang==='de'?'Sprachen':'Languages'}</span></div>
          <div className="stat-divider"/>
          <div className="stat"><strong>100%</strong><span>{lang==='de'?'Kostenlos':'Free'}</span></div>
        </div>
      </section>
      <section className="features">
        {[
          {icon:<Sparkles size={20}/>,title:lang==='de'?'KI-gestützt':'AI-Powered',text:lang==='de'?'Automatische Fehlererkennung':'Auto error detection'},
          {icon:<Shield size={20}/>,title:lang==='de'?'Datensicher':'Privacy First',text:lang==='de'?'Daten bleiben auf Ihrem Gerät':'Data stays on your device'},
          {icon:<Clock size={20}/>,title:lang==='de'?'Zeitersparnis':'Save Time',text:lang==='de'?'80% schneller als manuell':'80% faster than manually'},
        ].map(f=>(
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3><p>{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Landing;
