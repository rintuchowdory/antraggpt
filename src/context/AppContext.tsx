import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, UserProfile, AppView, FormTemplate } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDarkMode } from '../hooks/useDarkMode';
export interface Application {
  id: string; formId: string; formTitle: string;
  status: 'draft' | 'submitted' | 'processing' | 'complete';
  date: string; data: Record<string, string>;
}
interface AppContextType {
  lang: Lang; setLang: (l: Lang) => void;
  view: AppView; setView: (v: AppView) => void;
  profile: UserProfile; setProfile: (p: UserProfile) => void;
  activeForm: FormTemplate | null; setActiveForm: (f: FormTemplate | null) => void;
  applications: Application[]; addApplication: (a: Application) => void;
  dark: boolean; setDark: (d: boolean) => void;
  sidebarOpen: boolean; setSidebarOpen: (o: boolean) => void;
}
const defaultProfile: UserProfile = {
  surname:'',givenName:'',birthDate:'',birthPlace:'',
  nationality:'',maritalStatus:'',address:'',email:'',phone:'',
};
const AppContext = createContext<AppContextType>(null!);
export const useApp = () => useContext(AppContext);
export const AppProvider: React.FC<{children:ReactNode}> = ({children}) => {
  const [lang, setLang]             = useLocalStorage<Lang>('ag-lang', 'de');
  const [view, setView]             = useState<AppView>('landing');
  const [profile, setProfile]       = useLocalStorage<UserProfile>('ag-profile', defaultProfile);
  const [activeForm, setActiveForm] = useState<FormTemplate|null>(null);
  const [applications, setApplications] = useLocalStorage<Application[]>('ag-apps', [
    {id:'1',formId:'anmeldung',formTitle:'Anmeldung',status:'complete',date:'2025-03-10',data:{}},
    {id:'2',formId:'kindergeld',formTitle:'Kindergeld',status:'processing',date:'2025-04-01',data:{}},
  ]);
  const [dark, setDark]             = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const addApplication = (a: Application) => setApplications((p: Application[]) => [a, ...p]);
  return (
    <AppContext.Provider value={{lang,setLang,view,setView,profile,setProfile,activeForm,setActiveForm,applications,addApplication,dark,setDark,sidebarOpen,setSidebarOpen}}>
      {children}
    </AppContext.Provider>
  );
};
