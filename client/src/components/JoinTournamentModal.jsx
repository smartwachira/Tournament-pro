import React, {useState} from 'react';
import {X,KeyRound} from 'lucide-react';
import { tournamentService} from '../services/api';

export default function JoinTournamentModal({isOpen, onClose, onRefresh}){
    const [code,setCode] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    if (!isOpen) return null;

    const handleJoin = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const result = await tournamentService.join(code);
            setSuccess(result.message);
            onRefresh();
            setTimeout(()=>{
                onClose();
                setCode('');
                setSuccess('');
            }, 2000);
        } catch (err){
            setError(err.message);
        };
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <KeyRound className="text-emarald-500"></KeyRound>Join League
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X></X></button>
                </div>

                <form onSubmit={handleJoin} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                            6-Digit Passcode
                        </label>
                        <input 
                            className="w-full text-center text-3xl font-black tracking"
                            required
                            maxLength={6}
                            placeholder='XXXXXX'
                            value={code}
                            onChange={(e)=>setCode(e.target.value.toUpperCase())}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-semibold text-center">{error}</p> }
                    {success && <p className="text-emerald-500 text-sm font-semibold text-center">{success}</p>}

                    <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200/50">
                        Enter Stadium
                    </button>
                </form>
            </div>
        </div>
    );
} 