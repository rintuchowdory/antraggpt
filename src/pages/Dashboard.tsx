import React from 'react';
import { ArrowRight, Clock, CheckCircle2, Loader, FileText, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formTemplates } from '../data/forms';
const statusConfig = {
  draft:      {label:{de:'Entwurf',en:'Draft'},          color:'#94a3b8'},
  submitted:  {label:{de:'Eingereicht',en:'Submitted'},   color:'#f59e0b'},
  processing: {label:{de:'In Bearbeitung',en:'Processing'},color:'#3b82f6'},
  complete:   {label:{de:'Abgeschlossen',en:'Complete'},  color:'#10b981'},
};
const Dashboard: React.FC = () => {
  const {lang,profile,applications,setView,setActiveForm} = useApp();
  const name = profile.givenName || (lang==='de'?'zurück':'back');
  const quickForms = formTemplates.filter(f=>!f.premium).slice(0,3);
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">{lang==='de'?`Hallo, ${profile.givenName||'👋'}`:`Hello, ${profile.givenName||'👋'}`}</h1>
          <p className="page-subtitle">{lang==='de'?'Was möchten Sie heute beantragen?':'What would you like to apply for today?'}</p>
        </div>
        <div className="header-stats">
          <div className="mini-stat"><strong>{applications.length}</strong><span>{lang==='de'?'Anträge':'Applications'}</span></div>
          <div className="mini-stat"><strong>{applications.filter(a=>a.status==='complete').length}</strong><span>{lang==='de'?'Fertig':'Done'}</span></div>
        </div>
      </div>
      <section className="dashboard-section">
        <div className="section-header">
          <h2>{lang==='de'?'Schnellstart':'Quick Start'}</h2>
          <button className="see-all" onClick={()=>setView('form')}>{lang==='de'?'Alle':'See all'} <ArrowRight size={14}/></button>
        </div>
        <div className="quick-grid">
          {quickForms.map(f=>(
            <button key={f.id} className="quick-card" onClick={()=>{setActiveForm(f);setView('form');}}>
              <div className="quick-icon">{f.icon}</div>
              <div className="quick-info"><strong>{f.title[lang]}</strong><span><Clock size={11}/> ~{f.estimatedTime} min</span></div>
              <ArrowRight size={16}/>
            </button>
          ))}
        </div>
      </section>
      <section className="dashboard-section">
        <div className="section-header">
          <h2>{lang==='de'?'Meine Anträge':'My Applications'}</h2>
          <button className="see-all" onClick={()=>setView('tracker')}>{lang==='de'?'Alle':'See all'} <ArrowRight size={14}/></button>
        </div>
        <div className="app-list">
          {applications.map(app=>{
            const cfg=statusConfig[app.status];
            return (
              <div key={app.id} className="app-row">
                <div className="app-icon">📄</div>
                <div className="app-info"><strong>{app.formTitle}</strong><span>{new Date(app.date).toLocaleDateString()}</span></div>
                <div className="app-status" style={{color:cfg.color}}>{cfg.label[lang]}</div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="ai-tip">
        <TrendingUp size={18}/>
        <div><strong>{lang==='de'?'Tipp':'Tip'}</strong><p>{lang==='de'?'Profil ausfüllen für automatisches Vorausfüllen.':'Complete profile for auto-fill.'}</p></div>
        <button className="ai-tip-btn" onClick={()=>setView('profile')}>{lang==='de'?'Profil':'Profile'}</button>
      </div>
    </div>
  );
};
export default Dashboard;
