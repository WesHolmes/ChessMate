import {db} from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { loggedInUserId } from "./authService"

export function getMyFavorites() {
  return []
}

export async function saveFavorite(playerId) {

  const userId = loggedInUserId()

  const result = await setDoc(doc(db, "favorites", `${playerId}.${userId}`), {
    playerId, 
    userId, 
  })

  console.log("favorite saved", result)
  return True
  
}