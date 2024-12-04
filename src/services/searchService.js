export async function fetchPlayers(query) {
    return fetch(`https://api.chess.com/pub/player/${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data.stats
        })
}
