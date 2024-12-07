import {db} from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { loggedInUserId } from "./authService"
export function getMyFavorites() {
  return []
}

export async function addFavorite(playerId) {
  console.log("adding favorite", playerId)
  const docRef = await addDoc(collection(db, "favorites", ""), {
    playerId: playerId, 
    userId: loggedInUserId(), 
  })

  return True
  
}