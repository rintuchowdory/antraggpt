import React,{useState} from 'react';
import {Save,CheckCircle2,Sparkles} from 'lucide-react';
import {useApp} from '../context/AppContext';
import {UserProfile} from '../types';
const Profile:React.FC=()=>{
  const {lang,profile,setProfile}=useApp();
  const [local,setLocal]=useState<UserProfile>({...profile});
  const [saved,setSaved]=useState(false);
  const fields:[{key:keyof UserProfile;label:{de:string;en:string};type:string}]=[
    {key:'surname',label:{de:'Familienname',en:'Surname'},type:'text'},
    {key:'givenName',label:{de:'Vorname(n)',en:'Given Name(s)'},type:'text'},
    {key:'birthDate',label:{de:'Geburtsdatum',en:'Date of Birth'},type:'date'},
    {key:'birthPlace',label:{de:'Geburtsort',en:'Place of Birth'},type:'text'},
    {key:'nationality',label:{de:'Staatsangehörigkeit',en:'Nationality'},type:'text'},
    {key:'maritalStatus',label:{de:'Familienstand',en:'Marital Status'},type:'text'},
    {key:'address',label:{de:'Adresse',en:'Address'},type:'text'},
    {key:'email',label:{de:'E-Mail',en:'Email'},type:'email'},
    {key:'phone',label:{de:'Telefon',en:'Phone'},type:'tel'},
  ] as any;
  const filled=Object.values(local).filter(v=>v.trim()).length;
  const pct=Math.round((filled/9)*100);
  const save=()=>{setProfile(local);setSaved(true);setTimeout(()=>setSaved(false),2500);};
  return (
    <div className="page-content">
      <div className="page-header"><div>
        <h1 className="page-title">{lang==='de'?'Mein Profil':'My Profile'}</h1>
        <p className="page-subtitle">{lang==='de'?'Daten werden automatisch in Anträge eingetragen':'Data is auto-filled into your applications'}</p>
      </div></div>
      <div className="profile-completion">
        <div className="pc-header"><strong>{lang==='de'?'Vollständigkeit':'Completion'}</strong><span className="pc-pct">{pct}%</span></div>
        <div className="pc-bar"><div className="pc-fill" style={{width:`${pct}%`}}/></div>
        {pct<100&&<p className="pc-tip"><Sparkles size={12}/>{lang==='de'?'Mehr Felder = schnellere Antragsausfüllung':'More fields = faster auto-fill'}</p>}
      </div>
      <div className="profile-card">
        <div className="profile-grid">
          {fields.map((f:any)=>(
            <div key={f.key} className="field-group">
              <label className="field-label">{f.label[lang]}</label>
              <input className="field-input" type={f.type} value={local[f.key]} onChange={e=>setLocal(p=>({...p,[f.key]:e.target.value}))}/>
            </div>
          ))}
        </div>
        <div className="profile-actions">
          <button className={`btn-primary ${saved?'saved':''}`} onClick={save}>
            {saved?<><CheckCircle2 size={16}/>{lang==='de'?'Gespeichert!':'Saved!'}</>:<><Save size={16}/>{lang==='de'?'Speichern':'Save'}</>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
