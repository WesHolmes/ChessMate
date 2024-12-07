import { login } from "./authService"
import { addFavorite } from "./favoritesService"

export default function Details({ user, details }) {
  return (
    <section id="Details">
      {details && (
      <div>
      <h2>{playerDetails.username}</h2>
      <p>
        {playerDetails.rank},{playerDetails.league}
        </p>
        <img src={playerDetails.avatar} alt={playerDetails.username}/>
        <p>{playerDetails.location}</p>
        {user ? (<button onClick={() => addFavorite(details.username)}>Save</button> 
        ) : (
        <p onClick={login}>login to save</p>
        )}
      </div>
      )}
    </section>
    )
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