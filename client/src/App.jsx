import React, { useEffect, useState} from "react";
import { tournamentService } from "./services/api";
import { Trophy, Calendar } from 'lucide-react';

function App(){
  const [tournaments, setTournaments] = useState([]);

  useEffect(()=>{
     tournamentService.getAll()
     .then(data=>setTournaments(data))
     .catch(err=> console.error("Error fetching tournaments:",err));
  },[]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>⚽ Tournament Pro Dashboard</h1>
      <hr />

      <div style={{ display: 'grid',gap: '1rem', marginTop: '2rem'}}>
        {tournaments.length === 0? (
          <p>No tournaments found. Create your first one in the backend!</p>
        ) : (
          tournaments.map(t => (
            <div key={t.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius:'8px'}}>
              <div style={{display: "flex", alignItems: 'center', gap: '0.5rem'}}>
                <Trophy size={20} color="#facc15"></Trophy>
                <h3 style={{margin: 0}}>{t.name}</h3>
              </div>
              <p style={{ color: '#666'}}>
                <Calendar size={14}></Calendar> {new Date(t.start_date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;