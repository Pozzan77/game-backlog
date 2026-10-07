import { use, useEffect, useState} from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import { Header } from './components/header/header.tsx'
import { GameCard } from './components/gameCard/gameCard.tsx'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [activeSearch, setActiveSearch] = useState('')
  const [gridFilter, setGridFilter] = useState(true)

  useEffect (() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      getGames(activeSearch, page, gridFilter ? 70 : 30)
        .then(data => setGames(data))
        .catch(error => console.error(error))
  },[activeSearch,page,gridFilter])

  function handleSearchSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    setActiveSearch(search)
  }

  function handleGrid() {
    setGridFilter(true)
  }

  function handlelist() {
    setGridFilter(false)
  }

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <div className='filters'>
        <p>Display:</p>
        <div className='layout'>
          <button onClick={handleGrid}>Grid</button>
          <button onClick={handlelist}>List</button>
        </div>
      </div>
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
      <div className='page-change'>
        <button onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => {setPage(page + 1)}}>
          Next
        </button>
      </div>
    </div>
  )
}
export default App
