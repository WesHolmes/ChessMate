export default function Results({ players, action }) {
  console.log("Players:", players)
  return (
    <section id="results">
      {players && 
        players.map((player) => (
        <article onClick={action} key={player.id}>
          <img src={players.avatar} alt={players.username} />
          <h2>{players.username}</h2>
        </article>

      ))}
    </section>
  )
}
