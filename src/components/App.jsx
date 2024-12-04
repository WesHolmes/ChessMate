import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"
import { fetchPlayers } from '../services/searchService'
import { useAuthentication } from '../services/authService'
import { SignIn, SignOut } from './Auth'



export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [player, setPlayers] = useState("")
  const user = useAuthentication()

  useEffect(() => {
    fetchPlayers(encodeURIComponent(searchTerm)).then(setPlayers)
  }, [searchTerm])
  return (
    <>
      <h1>Chess App</h1>
      <Search setter={setSearchTerm}/>
      <Results player={player}/>

      <div className="App">
        <header>
          Chess
          {user && <button onClick={() => setWriting(true)}>New Article</button>}
          {!user ? <SignIn /> : <SignOut />}
        </header>

        {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

        {!user ? (
          ""
        ) : writing ? (
          <ArticleEntry addArticle={addArticle} />
        ) : (
          <Article article={article} />
        )}
        </div>
    </>

  )
}