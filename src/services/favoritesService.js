import {db} from "../firebaseConfig"
import { doc, orderBy, setDoc, getDocs, query, collection, limit, where } from "firebase/firestore"
import { loggedInUserId } from "./authService"

export async function getMyFavorites() {
  const snapshot = await getDocs(
    query(collection(db, "favorites"), where('username', '==', loggedInUserId()), orderBy("playerId"), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    username: doc.data().playerId,

  }))
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