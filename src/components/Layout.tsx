import React, { useEffect } from 'react';
import { Globe, Moon, Sun, Menu, X, LayoutDashboard, FileText, ListChecks, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
const navItems: {id: AppView; icon: React.ReactNode; label: {de:string;en:string}}[] = [
  { id:'dashboard', icon:<LayoutDashboard size={17}/>, label:{de:'\u00dcbersicht',en:'Dashboard'} },
  { id:'form',      icon:<FileText size={17}/>,        label:{de:'Antr\u00e4ge',en:'Forms'} },
  { id:'tracker',   icon:<ListChecks size={17}/>,      label:{de:'Meine Antr\u00e4ge',en:'My Applications'} },
  { id:'profile',   icon:<User size={17}/>,            label:{de:'Profil',en:'Profile'} },
];
const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {lang,setLang,view,setView,dark,setDark,sidebarOpen,setSidebarOpen} = useApp();
  useEffect(() => { setSidebarOpen(false); }, [view]);
  const navigate = (v: AppView) => { setView(v); setSidebarOpen(false); };
  return (
    <div className="app-shell">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">A</div>
          <span>AntragGPT</span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={18}/></button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${view===item.id?'active':''}`} onClick={() => navigate(item.id)}>
              {item.icon}<span>{item.label[lang]}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-controls">
            <div className="lang-switch">
              <Globe size={13}/>
              {(['de','en'] as const).map(l => (
                <button key={l} className={lang===l?'active':''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <button className="dark-toggle" onClick={() => setDark(!dark)}>
              {dark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
          </div>
          <div className="plan-badge">
            <span className="plan-free">Free Plan</span>
            <button className="upgrade-btn">Upgrade \u2726</button>
          </div>
        </div>
      </aside>
      <div className="main-wrapper">
        <header className="mobile-topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}><Menu size={22}/></button>
          <div className="mobile-logo"><div className="logo-mark sm">A</div><span>AntragGPT</span></div>
          <button className="dark-toggle mobile" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
