import {db} from "../firebaseConfig"
import { doc, orderBy, setDoc, getDocs, query, collection, limit, where } from "firebase/firestore"
import { loggedInUserId } from "./authService"

export async function getMyFavorites() {
  const userId = loggedInUserId()
  if (!userId) {
    throw new Error("user is not authenticated")
  }
  const snapshot = await getDocs(

    query(collection(db, "favorites"), where('userId', '==', userId), orderBy("playerId"), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    username: doc.data().playerId,

  }))
}

export async function saveFavorite(playerData) {
  const userId = loggedInUserId()
  console.log(playerData)
  console.log(playerData.username)

  const result = await setDoc(doc(db, "favorites", `${playerData.playerData.username}:${userId}`), 
    playerData,  
  )

  console.log("favorite saved", result)
  return true
}