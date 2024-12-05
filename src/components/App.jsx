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

      <Results 
        players={players} 
        onAddFavorite={handleAddFavorite} 
        favorites={favorites} 
        onRemoveFavorite={handleRemoveFavorite} 
      />

      <div className="App">
        <header>
          {!user ? <SignIn /> : <SignOut />}
        </header>

        {user && (
          <>
            <h2>Your Favorites</h2>
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite.id}>
                  {favorite.name} - {favorite.rank}
                  <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
