import React,{useEffect,useState} from "react";
import { Calendar,Swords } from "lucide-react";
import { tournamentService } from '../services/api.js';
import MatchControlModal from "./MatchControlModal.jsx";

export default function MatchList({ tournamentId }) {
    const [matches, setMatches] = useState([]);

    //state for the referee modal
    const [selectedMatch,setSelectedMatch] = useState(null);
    const [isControlModalOpen, setIsControlModalOpen] = useState(false);

    const fetchMatches = (tournamentId)=>{
        tournamentService.getTournamentMatches(tournamentId)
            .then(setMatches)
            .catch(err => console.error(err));

    }

    useEffect(() => {
        fetchMatches(tournamentId);
    }, [tournamentId]);

    
    const handleGenerate = async ()=>{
            
            try{
                await tournamentService.generateTournamentMatches(tournamentId);
                fetchMatches(tournamentId);
                
            } catch (err){
                alert(err.message);
                console.error('Match generation failed', err);
            }
    
    };

    //Helper to open the referee modal for a specific match
    const openMatchControl = (match) => {
        setSelectedMatch(match);
        setIsControlModalOpen(true);
    }
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
            {/* //Referee modal */}
            <MatchControlModal
                isOpen={isControlModalOpen}
                onClose={()=> setIsControlModalOpen(false)}
                match={selectedMatch}
                onRefresh={fetchMatches}
            ></MatchControlModal>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Calendar size={18} className="text-emarald-600"/> Match Schedule
                </h3>

                {matches.length === 0 && (
                    <button 
                        onClick={handleGenerate}
                        className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Generate Fixtures
                    </button>
                )}
            </div>

            <div className="divide-y divide-slate-50">
                {matches.length ===0? (
                    <div className="p-8 text-center text-slate-400 text-sm italic">
                        No matches scheduled. Add teams and click Generate!
                    </div>
                ) : (
                    matches.map((match,index)=>(
                        <div key={match.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-mono">#{index + 1}</span>

                            <div className="flex items-center gap-4 flex-1 justify-center">
                                <span className="font-semibold text-slate-700 text-right w-1/3">{match.home_team}</span>
                                <div className="px-3 py-1 bg-slate-100 rounded text-slate-600 font-bold text-sm">
                                    {match.status === 'finished' ? `${match.home_score} - ${match.away_score}` : 'vs'}
                                </div>
                                <span className="font-semibold text-slate-700 text-left w-1/3">{match.away_team}</span>
                            </div>

                            <button 
                                className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded hover:bg-indigo-600 hover:text-white transition"
                                onClick={()=>openMatchControl(match)}>
                                Manage Match
                            </button>
                            
                        </div>
                    ))
                )}
            </div>

        </div>

        
    )
    
}