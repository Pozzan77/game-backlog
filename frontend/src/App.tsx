import { useEffect, useState } from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect (() => {
      getGames()
        .then(data => setGames(data.results))
        .catch(error => console.error(error))
  })

  return (
    <div>
      {games.map(game => (
        <p key={game.id}>{game.name}</p>
      ))}
    </div>
  )
}
export default App
