import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./header/header";
import { SideMenu } from "./sidemenu/sidemenu";
import { useState, useEffect, useRef } from "react";
import type { Game } from "../types/game";
import { getGames } from "../services/gameApi";

export default function Layout() {

    const [search, setSearch] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [suggestions,setSuggestions] = useState<Game[]>([])
    const [isSuggestionOpen,setIsSuggestionOpen] = useState(false)

    const navigate = useNavigate()

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

        const query = search.trim()
      
        if (!query) return
      
        navigate(`/?search=${encodeURIComponent(query)}`)
        
        setIsSuggestionOpen(false)
      }

      function handleSuggestionSelect(game: Game) {
        setSearch(game.name)
        setIsSuggestionOpen(false)
        navigate(`/?search=${encodeURIComponent(game.name)}`)
      }

    return(
        <div>
            <Header
                search={search}
                handleSearchSubmit={handleSearchSubmit}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                suggestions={suggestions}
                isSuggestionOpen={isSuggestionOpen}
                handleSearchChange={handleSearchChange}
                handleSuggestionSelect={handleSuggestionSelect}
            />
            {isMenuOpen && <SideMenu 
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />}
            <Outlet />
        </div>
    )
}