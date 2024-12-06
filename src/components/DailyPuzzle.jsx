import React, { useState } from "react";
import { fetchDailyPuzzle } from "../services/searchService";

export default function DailyPuzzle() {
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);

  const handleShowPuzzle = () => {
    if (showPuzzle) {
      setShowPuzzle(false);
    } else {
      fetchDailyPuzzle()
        .then(setDailyPuzzle)
        .catch((error) => console.error("Error fetching daily puzzle:", error));
      setShowPuzzle(true);
    }
  };

  return (
    <div>
      <button onClick={handleShowPuzzle}>
        {showPuzzle ? "Hide Today's Puzzle" : "Show Today's Puzzle"}
      </button>

      {showPuzzle && dailyPuzzle && (
        <div>
          <h3>Today's Daily Puzzle</h3>
          <p>
            Title: <a href={dailyPuzzle.url} target="_blank" rel="noopener noreferrer">{dailyPuzzle.title}</a>
          </p>
          <img src={dailyPuzzle.image} alt="Daily Puzzle" className="daily-puzzle-image" />
        </div>
      )}
    </div>
  );
}



// async function fetchDailyPuzzle() {
//   try {
//     const response = await fetch("https://api.chess.com/pub/puzzle");
//     if (response.ok) {
//       const data = await response.json();
//       setDailyPuzzle(data);
//     }
//   } catch (error) {
//     console.error("Error fetching daily puzzle:", error);
//     setDailyPuzzle(null);
//   }
// }

// const handleShowPuzzle = () => {
//   if (showPuzzle) {
//     setShowPuzzle(false);
//   } else {
//     fetchDailyPuzzle();
//     setShowPuzzle(true);
//   }
// };
