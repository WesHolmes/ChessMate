import React, { useState } from "react";
import Details from "../services/Details";
import DailyPuzzle from "./DailyPuzzle";
import { fetchPlayers, fetchPlayerById } from "../services/searchService";

export default function Search({ setter }) {
  const [term, setTerm] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [blitzRating, setBlitzRating] = useState("N/A");
  const [bulletRating, setBulletRating] = useState("N/A");
  const [error, setError] = useState(null);

  async function fetchPlayer(username) {
    try {
      const player = await fetchPlayers(username);
      setPlayerData(player);
      const fullURL = player.url;
      setPlayerName(fullURL.split("/").pop());
      const stats = await fetchPlayerById(username);
      setBlitzRating(stats?.chess_blitz?.last?.rating || "N/A");
      setBulletRating(stats?.chess_bullet?.last?.rating || "N/A");
      setError(null);
    } catch (err) {
      console.error("Error fetching player:", err.message);
      setError(err.message);
      setPlayerData(null);
      setBlitzRating("N/A");
      setBulletRating("N/A");
    }
  }

  function submit(e) {
    e.preventDefault();
    if (term.trim()) {
      fetchPlayer(term.trim());
      setTerm("");
    } else {
      setError("Please enter a valid username.");
    }
  }

  return (
    <div className="search-component">
      <DailyPuzzle />

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Search Player..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {playerData && (
                <Details
                    playerName={playerName}
                    playerData={playerData}
                    blitzRating={blitzRating}
                    bulletRating={bulletRating}
                />
            )}
        </div>
    );
}
