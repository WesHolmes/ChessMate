export default function Results({ players, onAddFavorite, favorites, onRemoveFavorite }) {
    // Debugging: Display players and favorites in a readable format
    console.log("Players:", players);
    console.log("Favorites:", favorites);
  
    return (
      <div>
  
        <ul>
          {players && players.length > 0 ? (
            players.map((player) => (
              <li key={player.id}>
                {player.name} - {player.rank}
                {favorites.some((fav) => fav.id === player.id) ? (
                  <button onClick={() => onRemoveFavorite(player.id)}>Remove Favorite</button>
                ) : (
                  <button onClick={() => onAddFavorite(player)}>Add to Favorites</button>
                )}
              </li>
            ))
          ) : (
            <p>No players found. Please try searching again.</p>
          )}
        </ul>
      </div>
    );
  }
  