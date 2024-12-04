import { db, auth } from "../firebaseConfig";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

/**
 * Add a player to favorites.
 * @param {string} playerId - The player's ID.
 * @param {Object} playerData - Details of the player (e.g., name, rank).
 */
export async function addFavoritePlayer(playerId, playerData) {
  const user = auth.currentUser;
  if (!user) {
    throw Error("User is not signed in.");
  }

  const playerRef = doc(db, "users", user.uid, "favorites", playerId);
  await setDoc(playerRef, playerData);
}

/**
 * Remove a player from favorites.
 * @param {string} playerId - The player's ID.
 */
export async function removeFavoritePlayer(playerId) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not signed in.");
  }

  const playerRef = doc(db, "users", user.uid, "favorites", playerId);
  await deleteDoc(playerRef);
}

/**
 * Get all favorite players for the signed-in user.
 * @returns {Array<Object>} - A list of favorite players.
 */
export async function getFavoritePlayers() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not signed in.");
  }

  const favoritesRef = collection(db, "users", user.uid, "favorites");
  const querySnapshot = await getDocs(favoritesRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
