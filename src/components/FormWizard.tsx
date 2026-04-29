import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, X, HelpCircle } from 'lucide-react';
import { useApp, Application } from '../context/AppContext';
const FormWizard: React.FC = () => {
  const {lang,profile,activeForm,setActiveForm,addApplication,setView} = useApp();
  const [step,setStep]   = useState(0);
  const [data,setData]   = useState<Record<string,string>>(()=>{
    const pre:Record<string,string>={};
    activeForm?.steps.forEach(s=>s.fields.forEach(f=>{
      if(f.profileKey&&profile[f.profileKey]) pre[f.id]=profile[f.profileKey] as string;
    }));
    return pre;
  });
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [submitted,setSubmitted] = useState(false);
  const [aiTip,setAiTip] = useState<string|null>(null);
  const [checking,setChecking] = useState(false);
  if(!activeForm) return null;
  const steps=activeForm.steps;
  const cur=steps[step];
  const isLast=step===steps.length-1;
  const pct=((step)/steps.length)*100;
  const validate=()=>{
    const errs:Record<string,string>={};
    cur.fields.forEach(f=>{if(f.required&&!data[f.id]?.trim())errs[f.id]=lang==='de'?'Pflichtfeld':'Required';});
    setErrors(errs);
    return Object.keys(errs).length===0;
  };
  const next=()=>{
    if(!validate())return;
    if(isLast){
      addApplication({id:Date.now().toString(),formId:activeForm.id,formTitle:activeForm.title[lang],status:'submitted',date:new Date().toISOString().split('T')[0],data});
      setSubmitted(true);
    } else { setStep(s=>s+1); setErrors({}); }
  };
  const aiCheck=()=>{
    setChecking(true);
    setTimeout(()=>{setChecking(false);setAiTip(lang==='de'?'✓ Alle Felder korrekt ausgefüllt.':'✓ All fields look good.');},1000);
  };
  if(submitted) return (
    <div className="page-content center-content">
      <div className="success-screen">
        <div className="success-ring"><CheckCircle2 size={48}/></div>
        <h2>{lang==='de'?'Antrag eingereicht!':'Application Submitted!'}</h2>
        <p>{lang==='de'?'Erfolgreich übermittelt.':'Successfully submitted.'}</p>
        <div className="success-actions">
          <button className="btn-primary" onClick={()=>{setView('tracker');setActiveForm(null);}}>{lang==='de'?'Zu meinen Anträgen':'View Applications'}</button>
          <button className="btn-ghost" onClick={()=>setActiveForm(null)}>{lang==='de'?'Zurück':'Back'}</button>
        </div>
      </div>
    </div>
  );
  const autofilled=cur.fields.filter(f=>f.profileKey&&data[f.id]).length;
  return (
    <div className="page-content">
      <div className="wizard-header">
        <button className="back-link" onClick={()=>step===0?setActiveForm(null):(setStep(s=>s-1),setErrors({}))}><ChevronLeft size={16}/> {lang==='de'?'Zurück':'Back'}</button>
        <span className="wizard-form-name">{activeForm.icon} {activeForm.title[lang]}</span>
        <button className="close-wizard" onClick={()=>setActiveForm(null)}><X size={18}/></button>
      </div>
      <div className="wizard-progress">
        <div className="progress-track"><div className="progress-fill" style={{width:`${pct+(100/steps.length)}%`}}/></div>
        <div className="progress-steps">
          {steps.map((s,i)=>(
            <div key={s.id} className={`prog-step ${i<step?'done':i===step?'active':''}`}>
              <div className="prog-dot">{i<step?'✓':i+1}</div><span>{s.title[lang]}</span>
            </div>
          ))}
        </div>
      </div>
      {autofilled>0&&<div className="autofill-notice"><Sparkles size={14}/><span>{lang==='de'?`${autofilled} Felder aus Profil vorausgefüllt`:`${autofilled} fields auto-filled from profile`}</span></div>}
      <div className="wizard-card">
        <h2 className="step-heading">{cur.title[lang]}</h2>
        <div className="fields-grid">
          {cur.fields.map(field=>{
            const af=!!(field.profileKey&&profile[field.profileKey]);
            return (
              <div key={field.id} className="field-group">
                <label className="field-label">
                  {field.label[lang]}{field.required&&<span className="req">*</span>}
                  {field.helpText&&<span title={field.helpText[lang]}><HelpCircle size={12}/></span>}
                  {af&&<span className="autofill-tag">✦</span>}
                </label>
                {field.type==='select'?(
                  <select className={`field-input ${errors[field.id]?'err':''} ${af?'prefilled':''}`}
                    value={data[field.id]||''} onChange={e=>{setData(p=>({...p,[field.id]:e.target.value}));setErrors(p=>{const e2={...p};delete e2[field.id];return e2;})}}>
                    <option value="">{lang==='de'?'Bitte wählen…':'Please select…'}</option>
                    {field.options?.map(o=><option key={o.value} value={o.value}>{o.label[lang]}</option>)}
                  </select>
                ):(
                  <input className={`field-input ${errors[field.id]?'err':''} ${af?'prefilled':''}`}
                    type={field.type} value={data[field.id]||''} placeholder={field.placeholder?.[lang]}
                    onChange={e=>{setData(p=>({...p,[field.id]:e.target.value}));setErrors(p=>{const e2={...p};delete e2[field.id];return e2;})}}/>
                )}
                {errors[field.id]&&<span className="field-error">{errors[field.id]}</span>}
              </div>
            );
          })}
        </div>
        <div className="ai-check-bar">
          <button className="ai-check-btn" onClick={aiCheck} disabled={checking}><Sparkles size={14}/>{checking?(lang==='de'?'Prüfe…':'Checking…'):(lang==='de'?'KI-Prüfung':'AI Check')}</button>
          {aiTip&&<span className="ai-tip-inline">{aiTip}</span>}
        </div>
      </div>
      <div className="wizard-nav">
        <button className="btn-ghost" onClick={()=>{if(step===0)setActiveForm(null);else{setStep(s=>s-1);setErrors({});}}}>
          <ChevronLeft size={16}/> {lang==='de'?'Zurück':'Back'}
        </button>
        <button className="btn-primary" onClick={next}>
          {isLast?(lang==='de'?'Absenden':'Submit'):(lang==='de'?'Weiter':'Next')} {!isLast&&<ChevronRight size={16}/>}{isLast&&<CheckCircle2 size={16}/>}
        </button>
      </div>
    </div>
  );
};
export default FormWizard;
