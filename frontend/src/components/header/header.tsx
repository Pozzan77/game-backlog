import './header.css'
import searchIMG from '../../assets/search.png'
import menuIMG from '../../assets/menu.png'
import type { Game } from '../../types/game.ts'

export interface HeaderProps {
    search:string
    setSearch:(value:string) => void
    handleSearchSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
    isMenuOpen:boolean
    setIsMenuOpen: (value:boolean) => void
    suggestions:Game[]
    isSuggestionOpen:boolean
    setIsSuggestionOpen:(value:boolean) => void
    handleSearchChange: (value: string) => void | Promise<void>
}

export function Header({
        search, 
        setSearch, 
        handleSearchSubmit, 
        isMenuOpen, 
        setIsMenuOpen, 
        suggestions, 
        isSuggestionOpen, 
        setIsSuggestionOpen,
        handleSearchChange}
    :
        HeaderProps) {
     return (
        <div className="header">
            <button className='open-menu' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={menuIMG} alt="" />
            </button>
            <h1 className='logo'>
                Game Catalog
            </h1>
            <div className='search-container'>
                <form className='search-bar' onSubmit={handleSearchSubmit}>
                    <img src={searchIMG} alt="search"/>
                    <input 
                        type="search"
                        placeholder='Search Games...'
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        />
                </form>
                {isSuggestionOpen && suggestions.length > 0 && (
                    <div className='suggestions'>
                        {suggestions.map((game) => 
                                <button
                                    key={game.id}
                                    onClick={() => {
                                        setSearch(game.name)
                                        setIsSuggestionOpen(false)
                                    }}    
                                >
                                    {game.name}
                                </button>
                        )}
                    </div>
                )}    
            </div>          
            <div className='user'>
                <button>Log In</button>
                <button>Sign In</button>    
            </div>  
        </div>
     )
}