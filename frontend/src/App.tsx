import { useEffect, useState } from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import { Header } from './components/header/header.tsx'
import { GameCard } from './components/gameCard/gameCard.tsx'
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
      <Header
        search={search}
        setSearch={setSearch}
      />
      <div className='cardsPage'>
        {games.map(game => (
          <GameCard game={game} />
        ))}
      </div>
    </div>
  )
}
export default App
