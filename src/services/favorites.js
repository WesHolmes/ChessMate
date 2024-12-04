import { db, auth } from "../firebaseConfig";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

export async function addFavoritePlayer(playerId, playerData) {
  const user = auth.currentUser;
  if (!user) {
    throw Error("User is not signed in.");
  }

  const playerRef = doc(db, "users", user.uid, "favorites", playerId);
  await setDoc(playerRef, playerData);
}

export async function removeFavoritePlayer(playerId) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not signed in.");
  }

  const playerRef = doc(db, "users", user.uid, "favorites", playerId);
  await deleteDoc(playerRef);
}

export async function getFavoritePlayers() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not signed in.");
  }

  const favoritesRef = collection(db, "users", user.uid, "favorites");
  const querySnapshot = await getDocs(favoritesRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
