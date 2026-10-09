import './header.css'
import searchIMG from '../../assets/search.png'
import menuIMG from '../../assets/menu.png'
import { SideMenu } from '../sidemenu/sidemenu'

export interface HeaderProps {
    search:string
    setSearch:(value:string) => void
    handleSearchSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
    isMenuOpen:boolean
    setIsMenuOpen: (value:boolean) => void
}

export function Header({search, setSearch, handleSearchSubmit, isMenuOpen, setIsMenuOpen}:HeaderProps) {
     return (
        <div className="header">
            <button className='open-menu' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={menuIMG} alt="" />
            </button>
            <h1 className='logo'>
                Game Catalog
            </h1>
            <div>
                <form className='search-bar' onSubmit={handleSearchSubmit}>
                    <img src={searchIMG} alt="search"/>
                    <input 
                        type="search"
                        placeholder='Search Games...'
                        value={search}
                        onChange={(event) => {setSearch(event.target.value)}}
                        />
                </form>    
            </div>          
            <div className='user'>
                <button>Log In</button>
                <button>Sign In</button>    
            </div>  
        </div>
     )
}