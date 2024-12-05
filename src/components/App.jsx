import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"
import DailyPuzzle from "./DailyPuzzle"
import { fetchPlayers } from '../services/searchService'
import { useAuthentication } from '../services/authService'
import { SignIn, SignOut } from './Auth'
import { addFavoritePlayer, removeFavoritePlayer, getFavoritePlayers } from "../services/favoritesService";



export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [players, setPlayers] = useState([])
  const[playerId, setPlayerId] = useState(null)
  const [playerDetails, setPlayerDetails] = useState(null)
  const user = useAuthentication()

  useEffect(() => {
    if (searchTerm) {
      fetchPlayers(encodeURIComponent(searchTerm))
        .then(setPlayers)
        .catch((err) => console.error("Error fetching players:", err))
    }
  }, [searchTerm])

  return (
    <>
      <h1>Chess App</h1>
      <Search setter={setSearchTerm} />
      {
        playerDetails ? (
          <div>
            <h1>{JSON.stringify(playerDetails,null, 2)}</h1>
            <h2>{playerDetails.username}</h2>
            <p>{playerDetails.location}, {playerDetails.status}</p>
            <img src={playerDetails.avatar} alt={playerDetails.username} />
            <p>{playerDetails.title}</p>
          </div>) : (      
            <Results players={players} action={setPlayers}/>
          )}



      <div className="App">
        <header>
          {!user ? <SignIn /> : <SignOut />}
        </header>
      </div>
    </>
  );
}