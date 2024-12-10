export default function FavoritesList({ favorites }) {
  return (
    <nav>
      {!favorites
        ? "no favorites"
        : favorites.map((f) => (
            <p key={f.playerData.username}>
              [{f.playerData.username}] {f.playerData.name}{" "}
              {f.playerData.is_streamer
                ? " is a streamer"
                : " is not a streamer"}
            </p>
          ))}
    </nav>
  );
}
