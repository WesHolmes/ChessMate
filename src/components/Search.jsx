import { useState } from "react";

export default function Search({ setter }) {
  const [term, setTerm] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [countryName, setCountryName] = useState("");

  function submit(e) {
    e.preventDefault();
    fetchPlayerData(term);
    setTerm("");
  }

  async function fetchPlayerData(username) {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}`);
      if (response.ok) {
        const data = await response.json();
        setPlayerData(data);
        if (data.country) {
          fetchCountryName(data.country);
        } else {
          setCountryName("Not provided");
        }
      } else {
        alert("Player not found");
        setPlayerData(null);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      alert("Failed to fetch player data");
    }
  }


  async function fetchCountryName(countryCode) {
    try {
      const response = await fetch(`${countryCode}`);
      if (response.ok) {
        const data = await response.json();
        setCountryName(data.name);
      } else {
        setCountryName("Unknown");
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
      setCountryName("Unknown");
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Search..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      {playerData && (
        <div>
          <h2>{playerData.username}</h2>
          <img src={playerData.avatar} alt={playerData.username} className="avatar"/>
          <p>Title: {playerData.title || "No title"}</p>
          <p>Country: {countryName || "Not provided"}</p>
          <p>Location: {playerData.location || "Not provided"}</p>
          {playerData.stats && (
            <div>
              <p>Puzzle Rating: {playerData.stats.puzzle ? playerData.stats.puzzle.rating : "Not available"}</p>
              <p>Blitz Rating: {playerData.stats.blitz ? playerData.stats.blitz.rating : "Not available"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
