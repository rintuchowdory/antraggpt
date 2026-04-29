import React, { useState } from 'react';
import { Clock, Lock, ArrowRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formTemplates, categories } from '../data/forms';
import FormWizard from '../components/FormWizard';
const FormSelector: React.FC = () => {
  const {lang,activeForm,setActiveForm} = useApp();
  const [search,setSearch] = useState('');
  const [cat,setCat] = useState('all');
  if (activeForm) return <FormWizard/>;
  const filtered = formTemplates.filter(f=>{
    const ms = f.title[lang].toLowerCase().includes(search.toLowerCase());
    const mc = cat==='all'||f.category===cat;
    return ms&&mc;
  });
  return (
    <div className="page-content">
      <div className="page-header">
        <div><h1 className="page-title">{lang==='de'?'Antragsformulare':'Application Forms'}</h1>
        <p className="page-subtitle">{lang==='de'?'Wählen Sie den passenden Antrag':'Choose the right form'}</p></div>
      </div>
      <div className="search-bar"><Search size={16}/>
        <input type="text" placeholder={lang==='de'?'Suchen…':'Search…'} value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="cat-filter">
        <button className={cat==='all'?'active':''} onClick={()=>setCat('all')}>{lang==='de'?'Alle':'All'}</button>
        {Object.entries(categories).map(([id,c])=>(
          <button key={id} className={cat===id?'active':''} onClick={()=>setCat(id)}>{c[lang]}</button>
        ))}
      </div>
      <div className="form-grid">
        {filtered.map(f=>{
          const c=categories[f.category];
          return (
            <div key={f.id} className={`form-card ${f.premium?'premium':''}`}>
              <div className="form-card-header">
                <div className="form-emoji">{f.icon}</div>
                {f.premium&&<div className="premium-badge"><Lock size={11}/> Premium</div>}
              </div>
              <div className="form-cat-tag" style={{color:c.color,background:c.color+'22'}}>{c[lang]}</div>
              <h3>{f.title[lang]}</h3><p>{f.description[lang]}</p>
              <div className="form-card-footer">
                <span className="form-time"><Clock size={12}/> ~{f.estimatedTime} min</span>
                <button className={`start-btn ${f.premium?'locked':''}`} onClick={()=>!f.premium&&setActiveForm(f)}>
                  {f.premium?(lang==='de'?'Upgrade':'Upgrade'):(lang==='de'?'Starten':'Start')}
                  {!f.premium&&<ArrowRight size={14}/>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FormSelector;
