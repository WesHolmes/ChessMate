import './App.css'
import Search from "./Search"
import Results from "./Results"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [chess, setChess] = useState("")

  useEffect(() => {
    const query = encodeURIComponent(searchTerm)
    fetch(
      'https://api.chess.com/pub/player/${query}'
    ).then((response) => response.json())
    .then((data) => {
      setChess(data.results)
    })
  }
  return (
    <>
      <h1>Chess app</h1>
      <Search/>
      <Results/>
    </>
  );
}

export default App
