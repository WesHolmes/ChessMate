export async function fetchPlayers(username) {
    username = encodeURIComponent(username)
    return fetch(`https://api.chess.com/pub/player/${username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Player not found")
            }
            return response.json()
        })
        .then((data) => data)
}

export async function fetchPlayerById(username) {
    if (!username) {
        return null
    }
    username = encodeURIComponent(username)
    return fetch(`https://api.chess.com/pub/player/${username}/stats`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Stats not found")
        }
        return response.json()
    })
}

export async function fetchDailyPuzzle() {
    const response = await fetch("https://api.chess.com/pub/puzzle");
    if (response.ok) {
      return await response.json();
    }
    throw Error("Error fetching daily puzzle");
  }