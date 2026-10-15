import { useEffect, useRef, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { getGames } from '../../services/gameApi.ts'
import type { Game } from '../../types/game.ts'
import { Header } from '../../components/header/header.tsx'
import { GameCard } from '../../components/gameCard/gameCard.tsx'
import { Sort } from '../../components/sort/sort.tsx'
import { SideMenu } from '../../components/sidemenu/sidemenu.tsx'
import { LayoutGrid } from 'lucide-react'
import { List } from 'lucide-react'
import './Home.css'

function App() {
  const [games, setGames] = useState<Game[]>([])

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popularity')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const activeSearch = searchParams.get('search') ?? ''
  const [gridFilter, setGridFilter] = useState(true)



  useEffect (() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      getGames(activeSearch, page, gridFilter ? 70 : 30, sort)
        .then(data => setGames(data))
        .catch(error => console.error(error))
  },[activeSearch,page,gridFilter, sort])






  return (
    <div>
      <div className='filters'>
        <p>Display:</p>
        <div className='layout'>
          <button className={gridFilter ? "selected" : ""} onClick={() => setGridFilter(true)}><LayoutGrid /></button>
          <button className={!gridFilter ? "selected" : ""} onClick={() => setGridFilter(false)}><List /></button>
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
