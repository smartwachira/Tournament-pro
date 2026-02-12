import React, { useEffect, useState } from 'react';
import AddTournamentModal from './components/AddTournamentModal';
import { tournamentService } from './services/api';
import { Trophy, Calendar, Plus, Users } from 'lucide-react';

function App() {
  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTournaments = () => {
    tournamentService.getAll()
      .then(setTournaments)
      .catch(err => console.error(err));
  };
  useEffect(()=>{fetchTournaments();});

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <AddTournamentModal
        isOpen={isModalOpen}
        onClose={()=> setIsModalOpen(false)}
        onRefresh={fetchTournaments}
      ></AddTournamentModal>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tournament Pro</h1>
          <p className="text-slate-500">Manage your leagues and stats</p>
        </div>
        <button onClick={()=>setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          <Plus size={20} /> New Tournament
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Trophy className="text-amber-600" size={24} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 bg-green-100 text-green-700 rounded-full">
                {t.status || 'Active'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t.name}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar size={16} />
                <span>Starts: {new Date(t.start_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Users size={16} />
                <span>12 Teams Registered</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;