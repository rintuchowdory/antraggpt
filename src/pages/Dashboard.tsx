import React from 'react';
import { ArrowRight, Clock, CheckCircle2, Loader, FileText, TrendingUp, Zap, Calendar, Bell, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formTemplates } from '../data/forms';

const statusConfig = {
  draft:      {label:{de:'Entwurf',en:'Draft'},          color:'#94a3b8', bg:'#f1f5f9'},
  submitted:  {label:{de:'Eingereicht',en:'Submitted'},   color:'#d97706', bg:'#fef3c7'},
  processing: {label:{de:'In Bearbeitung',en:'Processing'},color:'#2563eb', bg:'#dbeafe'},
  complete:   {label:{de:'Abgeschlossen',en:'Complete'},  color:'#059669', bg:'#d1fae5'},
};

const Dashboard: React.FC = () => {
  const {lang, profile, applications, setView, setActiveForm} = useApp();
  const quickForms = formTemplates.filter(f => !f.premium).slice(0, 3);
  const done    = applications.filter(a => a.status === 'complete').length;
  const pending = applications.filter(a => a.status === 'processing' || a.status === 'submitted').length;
  const greeting = lang === 'de' ? 'Guten Tag' : 'Good day';
  const name = profile.givenName || (lang === 'de' ? 'Nutzer' : 'User');

  const tips = [
    { de: 'Reisepass für Termine bereithalten', en: 'Have your passport ready for appointments' },
    { de: 'Anmeldung muss innerhalb von 14 Tagen nach Umzug erfolgen', en: 'Registration must be done within 14 days of moving' },
    { de: 'Originaldokumente + Kopien mitbringen', en: 'Bring original documents + copies' },
  ];
  const tip = tips[new Date().getDate() % tips.length];

  const deadlines = [
    { label:{de:'Steuererklärung Frist',en:'Tax return deadline'},    date:'31. Juli 2025', urgent:true  },
    { label:{de:'Kindergeld Überprüfung',en:'Child benefit review'},  date:'15. Mai 2025',  urgent:false },
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <p className="dash-greeting">{greeting},</p>
          <h1 className="page-title">{name} 👋</h1>
          <p className="page-subtitle">{lang==='de'?'Hier ist Ihre Übersicht für heute.':'Here is your overview for today.'}</p>
        </div>
        <div className="header-stats">
          <div className="mini-stat"><strong>{applications.length}</strong><span>{lang==='de'?'Anträge':'Total'}</span></div>
          <div className="mini-stat success"><strong>{done}</strong><span>{lang==='de'?'Fertig':'Done'}</span></div>
          <div className="mini-stat warn"><strong>{pending}</strong><span>{lang==='de'?'Offen':'Pending'}</span></div>
        </div>
      </div>

      {/* Progress overview */}
      <div className="progress-overview">
        <div className="po-bar-wrap">
          <div className="po-label">
            <span>{lang==='de'?'Profilvollständigkeit':'Profile completion'}</span>
            <strong>{Math.round((Object.values(profile).filter(v=>v.trim()).length/9)*100)}%</strong>
          </div>
          <div className="po-bar"><div className="po-fill" style={{width:`${Math.round((Object.values(profile).filter(v=>v.trim()).length/9)*100)}%`}}/></div>
        </div>
        <button className="po-action" onClick={()=>setView('profile')}>
          {lang==='de'?'Profil vervollständigen':'Complete profile'} <ArrowRight size={13}/>
        </button>
      </div>

      <div className="dash-grid">
        {/* Left column */}
        <div className="dash-col">
          {/* Quick start */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><Zap size={15}/>{lang==='de'?'Schnellstart':'Quick Start'}</div>
              <button className="see-all" onClick={()=>setView('form')}>{lang==='de'?'Alle':'All'} <ArrowRight size={13}/></button>
            </div>
            <div className="quick-grid">
              {quickForms.map(f=>(
                <button key={f.id} className="quick-card" onClick={()=>{setActiveForm(f);setView('form');}}>
                  <div className="quick-icon">{f.icon}</div>
                  <div className="quick-info">
                    <strong>{f.title[lang]}</strong>
                    <span><Clock size={11}/> ~{f.estimatedTime} min</span>
                  </div>
                  <ArrowRight size={15}/>
                </button>
              ))}
            </div>
          </div>

          {/* Recent applications */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><FileText size={15}/>{lang==='de'?'Meine Anträge':'My Applications'}</div>
              <button className="see-all" onClick={()=>setView('tracker')}>{lang==='de'?'Alle':'All'} <ArrowRight size={13}/></button>
            </div>
            <div className="app-list">
              {applications.map(app=>{
                const cfg = statusConfig[app.status];
                return (
                  <div key={app.id} className="app-row">
                    <div className="app-icon">📄</div>
                    <div className="app-info">
                      <strong>{app.formTitle}</strong>
                      <span>{new Date(app.date).toLocaleDateString(lang==='de'?'de-DE':'en-GB')}</span>
                    </div>
                    <div className="app-badge" style={{color:cfg.color,background:cfg.bg}}>{cfg.label[lang]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="dash-col">
          {/* Stats */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><BarChart2 size={15}/>{lang==='de'?'Statistiken':'Statistics'}</div>
            </div>
            <div className="stats-grid">
              <div className="stat-box"><div className="stat-box-num">{applications.length}</div><div className="stat-box-label">{lang==='de'?'Gesamt':'Total'}</div></div>
              <div className="stat-box green"><div className="stat-box-num">{done}</div><div className="stat-box-label">{lang==='de'?'Abgeschlossen':'Completed'}</div></div>
              <div className="stat-box blue"><div className="stat-box-num">{pending}</div><div className="stat-box-label">{lang==='de'?'In Bearbeitung':'Processing'}</div></div>
              <div className="stat-box gold"><div className="stat-box-num">{formTemplates.filter(f=>!f.premium).length}</div><div className="stat-box-label">{lang==='de'?'Verfügbar':'Available'}</div></div>
            </div>
            <div className="completion-bar-wrap">
              <div className="cb-label"><span>{lang==='de'?'Abschlussrate':'Completion rate'}</span><strong>{applications.length>0?Math.round((done/applications.length)*100):0}%</strong></div>
              <div className="cb-track"><div className="cb-fill" style={{width:`${applications.length>0?Math.round((done/applications.length)*100):0}%`}}/></div>
            </div>
          </div>

          {/* Deadlines */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><Calendar size={15}/>{lang==='de'?'Wichtige Fristen':'Important Deadlines'}</div>
            </div>
            <div className="deadlines">
              {deadlines.map((d,i)=>(
                <div key={i} className={`deadline-row ${d.urgent?'urgent':''}`}>
                  <div className="deadline-dot"/>
                  <div className="deadline-info">
                    <strong>{d.label[lang]}</strong>
                    <span>{d.date}</span>
                  </div>
                  {d.urgent&&<div className="deadline-badge">{lang==='de'?'Bald':'Soon'}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* AI Tip */}
          <div className="dash-card tip-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><TrendingUp size={15}/>{lang==='de'?'Tipp des Tages':'Tip of the Day'}</div>
            </div>
            <p className="tip-text">{tip[lang]}</p>
            <button className="tip-btn" onClick={()=>setView('form')}>
              {lang==='de'?'Antrag starten':'Start application'} <ArrowRight size={13}/>
            </button>
          </div>

          {/* Notifications */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title"><Bell size={15}/>{lang==='de'?'Benachrichtigungen':'Notifications'}</div>
              <span className="notif-count">2</span>
            </div>
            <div className="notif-list">
              <div className="notif-row">
                <div className="notif-dot blue"/>
                <div className="notif-info"><strong>{lang==='de'?'Kindergeld wird bearbeitet':'Kindergeld is being processed'}</strong><span>{lang==='de'?'Vor 2 Tagen':'2 days ago'}</span></div>
              </div>
              <div className="notif-row">
                <div className="notif-dot green"/>
                <div className="notif-info"><strong>{lang==='de'?'Anmeldung abgeschlossen':'Anmeldung completed'}</strong><span>{lang==='de'?'Vor 7 Wochen':'7 weeks ago'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
