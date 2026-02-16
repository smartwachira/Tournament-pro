import React, { useState} from "react";
import { X, Search, ShieldPlus } from 'lucide-react';
import { tournamentService } from '../services/api';


export default function RegisterTeamModal({ isOpen,onClose,tournamentId,onRefresh}){
    const [teamName,setTeamName] = useState('');
    

    if (!isOpen) return null;

    const handleRegister = async (e)=>{
        e.preventDefault();
        try{
            const team = tournamentService.createTeam(teamName)
            tournamentService.linkToTournament(tournamentId, team);
            onRefresh;
            onClose();
            setTeamName('');
            
        } catch (err){
            console.error('Registration failed', err);
        }

    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldPlus className="text-indigo-600"></ShieldPlus>
                        Add Team  to League
                    </h2>
                    <button onClick={()=>onClose()} className="text-slate-400 hover:text-slate-600"><X/></button>
                </div>

                <form onSubmit={handleRegister} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Team Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2 5 text-slate-400" size={18}/>
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-2 5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Search or create team..."
                                value={teamName} 
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                               
                        </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200">
                        Confirm Registration
                    </button>
                </form>
            </div>
        </div>
    )
}