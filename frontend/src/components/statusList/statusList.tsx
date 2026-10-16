import './statusList.css'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'

interface StatusListProps {
    status:string
    setStatus: (value:string) => void
    isStatusOpen: boolean
    setIsStatusOpen: (value:boolean) => void
}

export function StatusList({status, setStatus, isStatusOpen, setIsStatusOpen}:StatusListProps) {

    const statusOptions:string[] = ["Played", "Playing", "Wishlist"]


    return (
        <div className='status-select'>
            <button className='status-btn' onClick={() => setIsStatusOpen(!isStatusOpen)}>
                <span>{status === '' ? "Add to List" : status}</span>
                <span className="arrow">
                    {isStatusOpen ? <ChevronUp/> : <ChevronDown/>}
                </span> 
            </button>
            
            {status !== '' && !isStatusOpen && (
                <button className='remove-status-btn' onClick={() => setStatus("")}>
                    Remove Game
                </button>)
            }

            {isStatusOpen && (
                <div className='status-options'>
                    {statusOptions.map((option) => (
                        <div key={option} className='option' onClick={() => {
                            setStatus(option)
                            setIsStatusOpen(false)
                        }}> 
                        {option}
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}