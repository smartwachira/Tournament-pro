import React, { useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import {  ChevronLeft,Users, Trophy, BarChart3, Calendar, Settings}  from 'lucide-react';
import { tournamentService } from "../services/api";
import  TeamList  from "../components/TeamList";
import  MatchList  from "../components/MatchList";
import RegisterTeamModal from "../components/RegisterTeamModal";


export default function TournamentDetails(){
    const { id } = useParams();
    const [tournament, setTournament] = useState([]);
    const [loading, setLoading ]= useState(true);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    
   
    useEffect(() => {
    // Wrap your logic in a try/catch block
        const fetchTournament = async () => {
            try {
                const data = await tournamentService.getOne(id);
                setTournament(data[0]);
                
            } catch (err) {
                console.error("Failed to fetch tournament:", err);
                // Stop the loading spinner even if it fails
            } finally {
                setLoading(false);
            }
        };

        fetchTournament()
    }, [id]);

    

    if (loading) return <div className="p-10 text-center font-bold animate-pulse">Scanning the pitch...</div>
    if (!tournament) return <div className="p-10 text-center text-red-500">Tournament not found.</div>
    
    !isRegModalOpen;
    return (
        
        <div className="min-h-screen bg-slate-50 p-8">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:underline">
                <ChevronLeft size={20}></ChevronLeft> Back to Dashboard
            </Link>

            {/* Header Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                <Trophy size={120} />
                </div>
        
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded">League Official</span>
                        <span className="text-slate-400 text-xs">ID: #{tournament.id}</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">{tournament.name}</h1>
                    <div className="flex flex-wrap gap-6 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-indigo-500" />
                            <span className="font-medium">Starts: {new Date(tournament.start_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <span className="font-bold uppercase tracking-widest text-xs">{tournament.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ManagementCard icon={<Users />} title="Teams" desc="Register & Manage Squads" color="bg-blue-50 text-blue-600" />
                <ManagementCard icon={<Trophy />} title="Standings" desc="Points & Fair Play" color="bg-amber-50 text-amber-600" />
                <ManagementCard icon={<Calendar />} title="Matches" desc="Schedule & Results" color="bg-emerald-50 text-emerald-600" />
                <ManagementCard icon={<Settings />} title="Settings" desc="Rules & AI Analysis" color="bg-slate-50 text-slate-600" />
            </div> 

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <TeamList 
                        tournamentId={id} 
                        onRegisterClick={()=>setIsRegModalOpen(true)}
                        refreshTrigger={refreshTrigger}
                    ></TeamList>
                    <MatchList 
                        tournamentId={id} 
                        
                    ></MatchList>
                    
                </div>
                <RegisterTeamModal 
                    isOpen={isRegModalOpen} 
                    onClose={()=>setIsRegModalOpen(false)}
                    tournamentId={id}
                    onRefresh={() => setRefreshTrigger(prev => prev + 1)}
                ></RegisterTeamModal>
                <div className="bg-slate-200 rounded-xl h-64 flex items-center justify-center text-slate-400 italic">
                    Match Schedule coming soon...
                </div>
            </div>
        </div>
    );
}

function ManagementCard({ icon, title, desc,color}){
    return(
        <button className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group">
            <div className={`p-3 rounded-lg w-fit mb-4 ${color} group-hover:scale-110 transition-transform `}>
                {icon}
            </div>
            <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
            <p className="text-xs text-slate-500">
                {desc}
            </p>
        </button>
    )
}