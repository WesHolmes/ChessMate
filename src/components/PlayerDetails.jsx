import { useState } from "react";
import {login} from "../services/authService"
import { saveFavorite } from "../services/favoritesService";

export default function PlayerDetails({ user, playerData, playerName, blitzRating, bulletRating }) {

  const [saving,setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const country = playerData.country.split("/").pop()
  
  async function save() {
    setSaving(true)
    await saveFavorite(details.username)
    setSaving(false)
    setSaved(true)
  }

  console.log(user)
  return (
    <div>
      <h2>{playerName}</h2>
      <img src={playerData.avatar} alt={playerData.username} className="avatar" />
      <p>Title: {playerData.title || "No title"}</p>
      <p>Country: {country || "Not provided"}</p>
      <p>Location: {playerData.location || "Not provided"}</p>
      <p>Blitz Rating: {blitzRating}</p>
      <p>Bullet Rating: {bulletRating}</p>
      {!user ? (
        <button onClick={login}>Login to save</button>
      ) : saving ? ( 
        <button disabled>Saving...</button> 
      ) : saved ? (
        <button disabled>Saved!</button>
      ) : ( 
        <button onClick={save}>Save</button>
      )}
    </div>
  )}
