import React, {useState} from 'react';
import {X, Activity, CircleFadingArrowUp } from 'lucide-react';
import { matchEventService } from '../services/api';

export default function MatchControlModal({isOpen, onClose, match, onRefresh}){
    const [formData, setFormData]= useState({
        event_type: 'goal',
        event_minute: '',
        team_id: '',
        player_id: '' // For now, the ref types the ID. Later we make this a dropdown.
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen || !match) return null;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await matchEventService.logEvent({
                match_id: match.id,
                team_id: parseInt(formData.team_id),
                player_id: parseInt(formData.player_id),
                event_type: formData.event_type,
                event_minute: parseInt(formData.event_minute)
            });

            setMessage('Event logged successfully!');
            onRefresh();
            setTimeout(()=>{
                setMessage('');
                setFormData({...formData, event_minute: '',player_id:'',team_id:'',})
            }, 2000);
        } catch (err){
            setMessage(`Error: ${err.message}`);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border-2 border-slate-800">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="text-emarald-400"></Activity> Referee Notebook
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition"><X></X></button>
                </div>

                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center font-bold text-slate-700">
                    <span>{match.home_team}</span>
                    <span className="px-3 py-1 bg-slate-900 text-white rounded text-xl">{match.home_score} - {match.away_score}</span>
                    <span>{match.away_team}</span>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="" className="block text-xs font-bold uppercase text-slate-500 mb-1">Event Type</label>
                            <select 
                                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                                value={formData.event_type}
                                onChange={(e) => setFormData({...formData, event_type: e.target.value})}

                            >
                                <option value="goal">⚽ Goal</option>
                                <option value="yellow_card">🟨 Yellow Card</option>
                                <option value="red_card">🟥 Red Card</option>
                            </select>
                        </div>
                        <div>
                            <label  className="block text-xs font-bold uppercase text-slate-500 mb-1">Minute</label>
                            <input 
                                type="number" 
                                required 
                                min="1"
                                max='120'
                                placeholder='e.g.,45'
                                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                                value={formData.event_minute} 
                                onChange={(e)  => setFormData({...formData, event_minute: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="block text-xs font-bold uppercase text-slate-500 mb-1">Select Team</label>
                        <select 
                            required
                            id="" 
                            className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                            value={formData.team_id}
                            onChange={(e)=> setFormData({...formData, team_id: e.target.value})}
                        >
                            <option value="">-- Choose Team --</option>
                            <option value={match.home_team_id}>{match.home_team} (Home)</option>
                            <option value={match.away_team_id}>{match.away_team} (Away)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Player ID</label>
                        <input 
                            type="number"
                            required
                            placeholder="Enter Player ID..."
                            className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                            value={formData.player_id}
                            onChange={(e) => setFormData({...formData, player_id: e.target.value})}
                        />
                    </div>

                    {message && (
                        <div className={`p-3 rounded text-sm font-bold text-center ${message.includes('Error') ? 'bg-red-100 text-red-600': 'bg-emerald-100 text-emerald-700'}`}>
                            {message}
                        </div>
                    )}

                    <button className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-all">
                        <CircleFadingArrowUp size={20}/> {loading ? 'Logging...' : 'Log Event'}
                    </button>

                </form>
            </div>
        </div>
    )

}