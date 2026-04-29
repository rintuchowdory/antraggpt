import React from 'react';
import { FileText, LayoutDashboard, User, ListChecks, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
const navItems = [
  { id:'dashboard' as AppView, icon:'📊', label:{de:'Übersicht',en:'Dashboard'} },
  { id:'form'      as AppView, icon:'📋', label:{de:'Anträge',en:'Forms'} },
  { id:'tracker'   as AppView, icon:'📌', label:{de:'Meine Anträge',en:'My Applications'} },
  { id:'profile'   as AppView, icon:'👤', label:{de:'Profil',en:'Profile'} },
];
const Layout: React.FC<{children:React.ReactNode}> = ({children}) => {
  const {lang,setLang,view,setView} = useApp();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo"><div className="logo-mark">A</div><span>AntragGPT</span></div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${view===item.id?'active':''}`} onClick={()=>setView(item.id)}>
              <span>{item.icon}</span><span>{item.label[lang]}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="lang-switch">
            <Globe size={13}/>
            {(['de','en'] as const).map(l=>(
              <button key={l} className={lang===l?'active':''} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <div className="plan-badge">
            <span className="plan-free">Free Plan</span>
            <button className="upgrade-btn">Upgrade ✦</button>
          </div>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};
export default Layout;
