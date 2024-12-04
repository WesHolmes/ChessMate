import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"


export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [player, setPlayer] = useState("")

  useEffect(() => {
    const query = encodeURIComponent(searchTerm)
    fetch(`https://api.chess.com/pub/player/${query}`)
    .then((response) => response.json())
    .then((data) => {
      setPlayer(data.results)
    })
  }, [searchTerm])
  return (
    <>
      <h1>Chess App</h1>
      <Search setter={setSearchTerm}/>
      <Results player={player}/>
    </>
  )
}
