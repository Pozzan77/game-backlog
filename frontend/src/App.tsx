import { useEffect, useState } from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')

  useEffect (() => {
      getGames(search)
        .then(data => setGames(data.results))
        .catch(error => console.error(error))
  },[search])

  return (
    <div>
      <div>
        <input 
          type="text"
          value={search} 
          onChange={(event) => {setSearch(event.target.value)}}
          placeholder='Search Games...'
        />
      </div>
      <div>
        {games.map(game => (
          <p key={game.id}>{game.name}</p>
        ))}
      </div>
    </div>
  )
}
export default App
