import React from 'react';
import {CheckCircle2,Clock,Loader,FileText} from 'lucide-react';
import {useApp} from '../context/AppContext';
const statusConfig={
  draft:     {label:{de:'Entwurf',en:'Draft'},          color:'#94a3b8',bg:'#f1f5f9'},
  submitted: {label:{de:'Eingereicht',en:'Submitted'},   color:'#d97706',bg:'#fef3c7'},
  processing:{label:{de:'In Bearbeitung',en:'Processing'},color:'#2563eb',bg:'#dbeafe'},
  complete:  {label:{de:'Abgeschlossen',en:'Complete'},  color:'#059669',bg:'#d1fae5'},
};
const Tracker:React.FC=()=>{
  const {lang,applications}=useApp();
  return (
    <div className="page-content">
      <div className="page-header"><div>
        <h1 className="page-title">{lang==='de'?'Meine Anträge':'My Applications'}</h1>
        <p className="page-subtitle">{lang==='de'?'Status Ihrer Anträge':'Status of your applications'}</p>
      </div></div>
      {applications.length===0?(<div className="empty-state"><FileText size={48}/><h3>{lang==='de'?'Noch keine Anträge':'No applications yet'}</h3></div>):(
        <div className="tracker-list">
          {applications.map(app=>{
            const cfg=statusConfig[app.status];
            const order=['draft','submitted','processing','complete'];
            const cur=order.indexOf(app.status);
            return (
              <div key={app.id} className="tracker-card">
                <div className="tracker-icon">📄</div>
                <div className="tracker-info"><h3>{app.formTitle}</h3><span>{new Date(app.date).toLocaleDateString()}</span></div>
                <div className="tracker-status" style={{color:cfg.color,background:cfg.bg}}>{cfg.label[lang]}</div>
                <div className="tracker-timeline">
                  {order.map((s,i)=>(
                    <React.Fragment key={s}>
                      <div className={`tl-dot ${i<=cur?'done':''}`}/>
                      {i<3&&<div className={`tl-line ${i<cur?'done':''}`}/>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Tracker;
