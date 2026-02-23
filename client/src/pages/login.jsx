import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { LogIn,Trophy } from 'lucide-react';
import { tournamentService } from '../services/api';

export default function  Login(){
    const [formData, setFormData] = useState({ email: '',password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            
            await tournamentService.login;

            navigate('/');
        } catch (err){
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
                        <Trophy size={32}></Trophy>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Tournament Pro</h1>
                    <p className="text-slate-500">Sign in to manage your leagues</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        value={formData.email}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder='Email Address'
                        onChange={(e)=> setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <input 
                        type="password"
                        value={formData.password} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e)=>setFormData({ ...formData, password: e.target.value})}
                        required 
                    />
                    {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                    <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        Sign In
                    </button>

                    <p className="mt-6 text-center text-slate-500 text-sm">
                        New here? <Link to="/register" className='text-indigo-600 font-bold'>Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}