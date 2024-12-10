export default function FavoritesList({ favorites }) {
  return (
    <nav>
      {!favorites
        ? "no favorites"
        : favorites.map((f) => (
            <p key={f.playerData.username} className="favoriteList">
              <img src={f.playerData.avatar || "/default-avatar.png"}
              className="avatarSmall"
              />
              <span className="favoriteUsername">[{f.playerData.username}]</span>{" - "}
              {f.playerData.name || "Name not given"}{" "}
            </p>
          ))}
    </nav>
  );  
}
