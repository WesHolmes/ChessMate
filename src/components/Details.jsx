import {login} from "../services/authService"
import { saveFavorite } from "../services/favoritesService";



export default function PlayerDetails({ user, playerData, playerName, blitzRating, bulletRating }) {
  function save() {
    saveFavorite(details.username)

  }
  if (!playerData) {
    return null;
  }
  const country = playerData.country.split("/").pop()
  



  return (
    <div>
      <h2>{playerName}</h2>
      <img src={playerData.avatar} alt={playerData.username} className="avatar" />
      <p>Title: {playerData.title || "No title"}</p>
      <p>Country: {country || "Not provided"}</p>
      <p>Location: {playerData.location || "Not provided"}</p>
      <p>Blitz Rating: {blitzRating}</p>
      <p>Bullet Rating: {bulletRating}</p>
      {user ? <button onClick={() => {save}}>Save</button> : <button onClick={login}>Login to save</button>}
    </div>
  );
}

//     return (
//         <section id="details">
//             {details && (
//                 <div>
//                     <h2>{playerDetails.username}</h2>
//                     <p>
//                     {playerDetails.rank},{playerDetails.league}
//                     </p>
//                     <img src={playerDetails.avatar} alt={playerDetails.username}/>
//                     <p>{playerDetails.location}</p>
//                     <button>button</button>
//                 </div>
//             )}
//         </section>

//     )
// }

// {playerData && (
//     <div>
//       <h2>{playerName}</h2>
//       <img src={playerData.avatar} alt={playerData.username} className="avatar" />
//       <p>Title: {playerData.title || "No title"}</p>
//       <p>Country: {countryName || "Not provided"}</p>
//       <p>Location: {playerData.location || "Not provided"}</p>
//       <p>Blitz Rating: {blitzRating}</p>
//       <p>Bullet Rating: {bulletRating}</p>
//     </div>
  
//   )}