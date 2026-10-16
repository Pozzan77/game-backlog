import './sidemenu.css'
import { User } from 'lucide-react'
import { NotebookPen } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Users } from 'lucide-react'
import { LogOut } from 'lucide-react'

interface SideMenuProps {
    isMenuOpen:boolean
    setIsMenuOpen:(value:boolean) => void
}

export function SideMenu({isMenuOpen, setIsMenuOpen}:SideMenuProps) {
    return (
        <>
            <div
                className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            />
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <button className='text-btn'>
                    <p>My Profile</p>
                    <User size={65} />
                </button>
                <div className='status-menu'>
                    <button>Playing</button>
                    <button>Played</button>
                    <button>Backlog</button>
                    <button>Wishlist</button>
                </div>
                <button className='text-btn'>
                    <p className='med'>Journal</p>
                    <NotebookPen size={55} />
                </button>
                <button className='text-btn'>
                    <p className='med'>Friends</p>
                    <Users size={55} />
                </button>
                <div className='status-menu'>
                    <button>Following</button>
                    <button>Followers</button>

                </div>
                <button className='text-btn'>
                    <p className='med'>Settings</p>
                    <Settings size={55} />
                </button>
                <button className='text-btn'>
                    <p className='logout'>Log Out</p>
                    <LogOut size={55} color='#b12e2e'/>
                </button>
            </div>
        </>
    )
}