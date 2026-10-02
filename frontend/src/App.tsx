import { useEffect, useState } from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import { Header } from './components/header/header.tsx'
import { GameCard } from './components/gameCard/gameCard.tsx'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [gridFilter, setGridFilter] = useState(true)

  useEffect (() => {
      getGames(search)
        .then(data => setGames(data))
        .catch(error => console.error(error))
  },[search])

  function handleGrid() {
    setGridFilter(!gridFilter)
  }

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
      />
      <button onClick={handleGrid}>Grid</button>
      <div className={gridFilter ? 'cardsPage' : 'cardList'}>
        {games.map(game => (
          <GameCard
            key={game.id} 
            game={game}
            gridFilter={gridFilter}
             />
        ))}
      </div>
    </div>
  )
}
export default App
