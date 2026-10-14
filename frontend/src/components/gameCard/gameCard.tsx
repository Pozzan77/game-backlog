import './gameCard.css'
import type { Game } from '../../types/game'
import { useNavigate } from "react-router-dom";

interface GameCardProps {
    game: Game
    gridFilter:boolean
}

export function GameCard({game, gridFilter}: GameCardProps) {

    const navigate = useNavigate()

    return (
        <div>
            {!gridFilter ? (
                <div className='card-list' onClick={() => navigate(`/games/${game.slug}`)}>
                    <div className='title'>
                        <img src={game.cover?.url} alt={game.name} />
                        <p>{game.name}</p>
                    </div>
                    <p>Not Played</p>
                    <p>{game.rating ? (game.rating /20).toFixed(2) : 0}</p>
                </div>) : (
                <div className='background'>
                    <div className='card-grid' onClick={() => navigate(`/game/${game.slug}`)}>
                        <img src={game.cover?.url} alt={game.name} />
                    </div>
                </div>
                )
            }
        </div>

    )
}