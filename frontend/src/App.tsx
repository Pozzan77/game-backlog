import { useEffect, useRef, useState} from 'react'
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
  const [suggestions,setSuggestions] = useState<Game[]>([])
  const [isSuggestionOpen,setIsSuggestionOpen] = useState(false)

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

  const searchRequestId = useRef(0)

  async function handleSearchChange(value:string) {
    setSearch(value)

    const requestId = ++searchRequestId.current

    if (value.trim().length < 2) {
      setSuggestions([])
      setIsSuggestionOpen(false)
      return
    }

    try {
      const results = await getGames(value, 1, 30, 'popularity')

      if (requestId !== searchRequestId.current) return
      
      setSuggestions(results)
      setIsSuggestionOpen(true)
    }
    catch (error) {
      console.log(error)
    }
    
  }

  function handleSearchSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    setActiveSearch(search)
    setSuggestions([])
    setIsSuggestionOpen(false)
  }

  return (
    <div>
      
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        suggestions={suggestions}
        isSuggestionOpen={isSuggestionOpen}
        setIsSuggestionOpen={setIsSuggestionOpen}
        handleSearchChange={handleSearchChange}
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
        <Sort 
          sort={sort}
          setSort={setSort}
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          setPage={setPage}
          />
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
