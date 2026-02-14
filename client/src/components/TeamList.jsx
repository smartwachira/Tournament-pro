import React, { useEffect, useState} from "react";
import { Shield, Plus } from "lucide-react";
import { tournamentService } from '../services/api.js';
import RegisterTeamModal from "./RegisterTeamModal.jsx";

export default function TeamList({ tournamentId }) {
    

    const [teams, setTeams] = useState([]);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    const fetchTournamentTeams = () => {
        tournamentService.getTournamentTeams(tournamentId)
          .then(setTeams)
          .catch(err => console.error(err));
    };

    useEffect(()=>{
    fetchTournamentTeams();
    }, []);

    if (!teams) return <div className="p-10 text-center text-red-500">Teams not found.</div>
    
    !isRegModalOpen;
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Shield size={18} className="text-indigo-500">Registered Teams</Shield>
                </h3>
                <button onClick={()=>setIsRegModalOpen(true)} className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">Register Team </button>
            </div>

            <div className="divide-y divide-slate-50">
                {teams.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm italic">
                        No teams registered yet. Ready for Kickoff?
                    </div>
                ) : (
                    teams.map(team =>(
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                                    {team.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-slate-700">{team.name}</span>

                            </div>
                            <span className="text-xs text-slate-400">Squad: 0 Players</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}