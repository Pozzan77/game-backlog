import { useEffect, useState} from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import { Header } from './components/header/header.tsx'
import { GameCard } from './components/gameCard/gameCard.tsx'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [gridFilter, setGridFilter] = useState(true)

  useEffect (() => {
      getGames(activeSearch)
        .then(data => setGames(data))
        .catch(error => console.error(error))
  },[activeSearch])

  function handleSearchSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setActiveSearch(search)
  }

  function handleGrid() {
    setGridFilter(!gridFilter)
  }

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <button onClick={handleGrid}>Grid</button>
      {!gridFilter && (
        <div className='subtitles'>
            <p className='sub1'>Title</p>
            <p className='sub2'>Status</p>
            <p className='sub2'>Rating</p>
        </div>        
      )}
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
