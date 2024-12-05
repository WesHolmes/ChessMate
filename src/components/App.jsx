import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"
import DailyPuzzle from "./DailyPuzzle"
import { fetchPlayerById, fetchPlayers } from '../services/searchService'
import { useAuthentication } from '../services/authService'
import { SignIn, SignOut } from './Auth'


export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [players, setPlayers] = useState([])
  const[playerId, setPlayerId] = useState(null)
  const [playerDetails, setPlayerDetails] = useState(null)
  const user = useAuthentication()

  useEffect(() => {
    setPlayerDetails(null)
      fetchPlayers(searchTerm).then(setPlayers)
  }, [searchTerm])

  useEffect(() => {
    fetchPlayerById(playerId).then(setPlayerDetails)
  }, [playerId])

  return (
    <>
      <h1>Chess App</h1>
      <Search setter={setSearchTerm} />
      {playerDetails ? (
        <div>
          <h2>{playerDetails.username}</h2>
          <p>
            {playerDetails.rank},{playerDetails.league}
          </p>
          <img src={playerDetails.avatar} alt={playerDetails.username}/>
          <p>{playerDetails.location}</p>
        </div>
      ) : (

      <Results 
        players={players} 
        action={setPlayerId}
      />
      )}

      <div className="App">
        <header>
          {!user ? <SignIn /> : <SignOut />}
        </header>
      </div>
    </>
  );
}
