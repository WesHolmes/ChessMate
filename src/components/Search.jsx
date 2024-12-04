import { useState, useEffect } from "react";

export default function Search({ setter }) {
  const [term, setTerm] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [playerName, setPlayerName] = useState(null);
  const [blitzRating, setBlitzRating] = useState(null);
  const [bulletRating, setBulletRating] = useState(null);

  function submit(e) {
    e.preventDefault();
    fetchPlayerData(term);
    fetchPlayerRating(term);
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
        const fullURL = data.url
        setPlayerName(fullURL.split('/').pop());
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

  async function fetchDailyPuzzle() {
    try {
      const response = await fetch("https://api.chess.com/pub/puzzle");
      if (response.ok) {
        const data = await response.json();
        setDailyPuzzle(data);
      }
    } catch (error) {
      console.error("Error fetching daily puzzle:", error);
      setDailyPuzzle(null);
    }
  }

  const handleShowPuzzle = () => {
    if (showPuzzle) {
      setShowPuzzle(false);
    } else {
      fetchDailyPuzzle();
      setShowPuzzle(true);
    }
  };

  async function fetchPlayerRating(username) {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
      if (response.ok) {
        const rating = await response.json();
        setBlitzRating(rating.chess_blitz.last.rating);
        setBulletRating(rating.chess_bullet.last.rating);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      alert("Failed to fetch player data");
    }
  }

  return (
    <div>
      <button onClick={handleShowPuzzle}>
        {showPuzzle ? "Hide Today's Puzzle" : "Show Today's Puzzle"}
      </button>

      {showPuzzle && dailyPuzzle && (
        <div>
          <h3>Today's Daily Puzzle</h3>
          <p>Title: <a href={dailyPuzzle.url} target="_blank" >{dailyPuzzle.title}</a></p>
          <img src={dailyPuzzle.image} alt="Daily Puzzle" className="daily-puzzle-image" />
        </div>
      )}

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Search Player..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      {playerData && (
        <div>
          <h2>{playerName}</h2>
          <img src={playerData.avatar} alt={playerData.username} className="avatar" />
          <p>Title: {playerData.title || "No title"}</p>
          <p>Country: {countryName || "Not provided"}</p>
          <p>Location: {playerData.location || "Not provided"}</p>
          <p>Blitz Rating: {blitzRating}</p>
          <p>Bullet Rating: {bulletRating}</p>
        </div>
      )}
    </div>
  );
}
