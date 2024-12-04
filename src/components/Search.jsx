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
          fetchCountryName(data.country); // Pass only the country code (e.g., "US")
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

  // Fetch the full country name using the country code
  async function fetchCountryName(countryCode) {
    try {
      const response = await fetch(`${countryCode}`); // Correct the URL here
      if (response.ok) {
        const data = await response.json();
        setCountryName(data.name); // Set the full country name
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

        </div>
      )}
    </div>
  );
}
