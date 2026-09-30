import './header.css'
import searchIMG from '../../assets/search.png'
import type { Search } from "../../types/game"

export function Header({search, setSearch}:Search) {
     return (
        <div className="header">
            <button className='open-menu'>

            </button>
            <h1 className='logo'>
                Game Catalog
            </h1>
            <div className='search-bar'>
                <img src={searchIMG} alt="" />
                <input 
                type="text"
                value={search} 
                onChange={(event) => {setSearch(event.target.value)}}
                placeholder='Search Games...'
                />
            </div>          
            <div className='user'>
                <button>Log In</button>
                <button>Sign In</button>    
            </div>  
        </div>
     )
}