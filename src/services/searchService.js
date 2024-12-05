export async function fetchPlayers(query) {
    return fetch(`https://api.chess.com/pub/player/${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data.stats
        })
}

export async function fetchPlayerById(id) {
    if (!id) {
        return null
    }
    id = encodeURIComponent(id)
    return fetch(`https://api.chess.com/pub/player/${username}`)
    .then((response) => response.json)
    .then((data) => {
        return data.stats?.[0]
})
}