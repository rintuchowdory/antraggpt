import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import AIAssistant from './components/AIAssistant';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FormSelector from './pages/FormSelector';
import Profile from './pages/Profile';
import Tracker from './pages/Tracker';
import './index.css';
const AppInner: React.FC = () => {
  const { view } = useApp();
  if (view === 'landing') return <Landing />;
  return (
    <Layout>
      {view === 'dashboard' && <Dashboard />}
      {view === 'form'      && <FormSelector />}
      {view === 'profile'   && <Profile />}
      {view === 'tracker'   && <Tracker />}
      <AIAssistant />
    </Layout>
  );
};
export default function App() { return <AppProvider><AppInner /></AppProvider>; }
