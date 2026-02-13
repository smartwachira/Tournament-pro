import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TournamentDetails from './pages/TournamentsDetails.jsx'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/tournament/:id' element={<TournamentDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
