import React, { useState } from "react";
import playerDetails from "./Details";
import DailyPuzzle from "./DailyPuzzle";
import { fetchPlayers, fetchPlayerById } from "../services/searchService";

export default function Search({ setter }) {
  const [term, setTerm] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [blitzRating, setBlitzRating] = useState(null);
  const [bulletRating, setBulletRating] = useState(null);

  function submit(e) {
    e.preventDefault();
    fetchPlayer(term);
    setTerm("");
  }

  async function fetchPlayer(username) {
    try {
      const player = await fetchPlayers(username);
      setPlayerData(player);

      const fullURL = player.url;
      setPlayerName(fullURL.split("/").pop());

      const stats = await fetchPlayerById(username);
      setBlitzRating(stats.chess_blitz?.last?.rating || "N/A");
      setBulletRating(stats.chess_bullet?.last?.rating || "N/A");
    } catch (error) {
      console.error(error.message);
      setPlayerData(null);
    }
  }

  return (
    <div>
      <DailyPuzzle />

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Search Player..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <PlayerDetails
        playerData={playerData}
        playerName={playerName}
        blitzRating={blitzRating}
        bulletRating={bulletRating}
      />
    </div>
  );
}
