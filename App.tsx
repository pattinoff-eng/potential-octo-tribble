
import React, { useState, useEffect } from 'react';
import { TimeEntry, Project, Worker, WorkType, User, MaterialCost } from './types';
import { INITIAL_PROJECTS, INITIAL_WORKERS } from './constants';
import Dashboard from './components/Dashboard';
import SettingsPanel from './components/SettingsPanel';
import ProjectLogDetail from './components/ProjectLogDetail';
import ReportedSummary from './components/ReportedSummary';
import AuthPage from './components/AuthPage';
import ProfilePanel from './components/ProfilePanel';
import MaterialPanel from './components/MaterialPanel';
import Logo from './components/Logo';
import { LayoutDashboard, Settings, LogOut, Search, Menu, X, ChevronLeft, Calendar as CalendarIcon, User as UserIcon, HardHat, Package } from 'lucide-react';

const App: React.FC = () => {
  // Session Persistence
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bygg_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Project Persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('bygg_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Worker Persistence
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('bygg_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });
  
  // Time Entries Persistence
  const [entries, setEntries] = useState<TimeEntry[]>(() => {
    const saved = localStorage.getItem('bygg_entries');
    return saved ? JSON.parse(saved) : [];
  });

  // Material Costs Persistence
  const [materialCosts, setMaterialCosts] = useState<MaterialCost[]>(() => {
    const saved = localStorage.getItem('bygg_materials');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('bygg_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('bygg_materials', JSON.stringify(materialCosts));
  }, [materialCosts]);

  useEffect(() => {
    localStorage.setItem('bygg_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bygg_workers', JSON.stringify(workers));
  }, [workers]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reported' | 'reports' | 'materials' | 'dashboard' | 'settings' | 'profile'>('reported');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('bygg_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bygg_session');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('bygg_session', JSON.stringify(updatedUser));
  };

  // Handlers
  const handleAddEntry = (newEntry: Omit<TimeEntry, 'id'>) => {
    setEntries(prev => [{ ...newEntry, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const handleAddMaterial = (newMaterial: Omit<MaterialCost, 'id'>) => {
    setMaterialCosts(prev => [{ ...newMaterial, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterialCosts(prev => prev.filter(m => m.id !== id));
  };

  const navItems = [
    { id: 'reported', label: 'Tidkalender', icon: CalendarIcon },
    { id: 'materials', label: 'Material', icon: Package },
    { id: 'reports', label: 'Projektlogg', icon: Search },
    { id: 'dashboard', label: 'Statistik', icon: LayoutDashboard },
    { id: 'settings', label: 'Administration', icon: Settings },
    { id: 'profile', label: 'Min Profil', icon: UserIcon },
  ];

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    if (tab !== 'reports') setSelectedProjectId(null);
  };

  if (!currentUser) return <AuthPage onLogin={handleLogin} />;

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'profile': return 'Medarbetarprofil';
      case 'settings': return 'Administration';
      case 'dashboard': return 'Projektstatistik';
      case 'reports': return 'Projektlogg';
      case 'reported': return 'Tidkalender';
      case 'materials': return 'Materialkostnader';
      default: return 'ByggKoll Management';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white text-[#102A50] p-3 border-b border-slate-200 sticky top-0 z-[60] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tighter">PRBYGG</span>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-x-0 top-0 z-[55] bg-white border-r border-slate-200 text-slate-600 transition-all duration-300 ease-in-out md:relative md:w-64 md:min-h-screen md:translate-y-0 md:flex md:flex-col ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:opacity-100'} pt-16 md:pt-0 shadow-xl md:shadow-none`}>
        <div className="p-6 md:flex-1">
          <div className="hidden md:flex flex-col items-center mb-10 mt-4">
            <Logo size="sm" className="scale-75" />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-[#102A50] text-white font-bold shadow-lg translate-x-1' : 'hover:bg-slate-100 text-slate-500 font-medium'}`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-sm uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
          <div className="mb-4 px-2">
             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Inloggad Proffs</p>
             <p className="text-sm font-bold text-[#102A50] truncate">{currentUser.name}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-slate-400 hover:text-red-600 group border border-transparent hover:border-red-100">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest">Logga ut</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isMenuOpen ? 'opacity-20 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
        <div className="h-28 bg-[#102A50] w-full flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap gap-10">
              {[...Array(20)].map((_, i) => <HardHat key={i} className="w-16 h-16 text-white" />)}
           </div>
           <span className="text-white font-black text-2xl uppercase tracking-[0.2em] drop-shadow-md z-10">
             {getHeaderTitle()}
           </span>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto -mt-10 relative z-20">
          <div className="space-y-8">
            {activeTab === 'reported' && (
              <ReportedSummary 
                entries={entries} 
                projects={projects}
                workers={workers}
                onAddEntry={handleAddEntry}
                onUpdateEntry={(id, updates) => setEntries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))}
                onDeleteEntry={(id) => setEntries(prev => prev.filter(e => e.id !== id))}
              />
            )}

            {activeTab === 'materials' && (
              <MaterialPanel 
                costs={materialCosts}
                projects={projects}
                workers={workers}
                onAdd={handleAddMaterial}
                onDelete={handleDeleteMaterial}
              />
            )}

            {activeTab === 'dashboard' && (
              <Dashboard 
                entries={entries} 
                projects={projects} 
                materialCosts={materialCosts} 
              />
            )}

            {activeTab === 'reports' && (
              selectedProjectId ? (
                <div className="space-y-4">
                  <button onClick={() => setSelectedProjectId(null)} className="flex items-center gap-2 text-[#102A50] hover:bg-[#102A50] hover:text-white px-4 py-2 rounded-xl border-2 border-[#102A50] font-black transition-all">
                    <ChevronLeft className="w-5 h-5" /> TILLBAKA
                  </button>
                  <ProjectLogDetail 
                    project={projects.find(p => p.id === selectedProjectId)!}
                    entries={entries.filter(e => e.projectId === selectedProjectId)}
                    materialCosts={materialCosts.filter(m => m.projectId === selectedProjectId)}
                    onDeleteEntry={(id) => setEntries(prev => prev.filter(e => e.id !== id))}
                    onUpdateEntry={(id, updates) => setEntries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {projects.map(p => (
                    <div key={p.id} onClick={() => setSelectedProjectId(p.id)} className="p-6 bg-white border-b-4 border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#102A50] transition-all cursor-pointer group">
                      <h4 className="font-black text-xl text-[#102A50] group-hover:translate-x-1 transition-transform mb-2 uppercase">{p.name}</h4>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-300 uppercase">Totaltid</span>
                        <span className="text-xl font-black text-[#102A50]">{entries.filter(e => e.projectId === p.id).reduce((a, b) => a + b.hours, 0)} h</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'settings' && (
              <SettingsPanel 
                projects={projects} 
                workers={workers}
                entries={entries}
                materialCosts={materialCosts}
                onAddProject={(p) => setProjects(prev => [...prev, { ...p, id: Math.random().toString(36).substr(2, 9) }])}
                onRemoveProject={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
                onAddWorker={(name) => setWorkers(prev => [...prev, { id: 'w-' + Math.random().toString(36).substr(2, 5), name }])}
                onRemoveWorker={(id) => setWorkers(prev => prev.filter(w => w.id !== id))}
              />
            )}

            {activeTab === 'profile' && <ProfilePanel user={currentUser} onUpdateUser={handleUpdateUser} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
