import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"
import Details from "./Details"
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
      <Search setter={setSearchTerm} />
      {playerDetails ? (
        <Details details={playerDetails} />
      ) : (
        <Results players={players} action={setPlayerDetails}/>
      )}

      <div className="App">
        <header>
        <h1>ChessMate</h1>
        <h2>A Chess.com data site</h2>
          {!user ? <SignIn /> : <SignOut />}
        </header>
      </div>
    </>
  );
}
