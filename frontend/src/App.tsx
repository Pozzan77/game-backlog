import { useEffect, useState} from 'react'
import { getGames } from './services/gameApi'
import type { Game } from './types/game'
import { Header } from './components/header/header.tsx'
import { GameCard } from './components/gameCard/gameCard.tsx'
import { Sort } from './components/sort/sort.tsx'
import { SideMenu } from './components/sidemenu/sidemenu.tsx'
import './App.css'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popularity')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [activeSearch, setActiveSearch] = useState('')
  const [gridFilter, setGridFilter] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect (() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      getGames(activeSearch, page, gridFilter ? 70 : 30, sort)
        .then(data => setGames(data))
        .catch(error => console.error(error))
  },[activeSearch,page,gridFilter, sort])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
  
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  function handleSearchSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    setActiveSearch(search)
  }

  return (
    <div>
      
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {isMenuOpen && <SideMenu 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
      />}
      <div className='filters'>
        <p>Display:</p>
        <div className='layout'>
          <button onClick={() => setGridFilter(true)}>Grid</button>
          <button onClick={() => setGridFilter(false)}>List</button>
        </div>
        Sorted By:
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
