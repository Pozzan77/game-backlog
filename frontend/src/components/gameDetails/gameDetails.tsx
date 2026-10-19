import { useState } from 'react'
import './gameDetails.css'
import type { GameSlug } from '../../types/game'
import { StatusList } from '../statusList/statusList'
import { Heart } from 'lucide-react'

interface GameDetailsProps {
    game: GameSlug
}

export function GameDetails({ game }: GameDetailsProps) {

    const [status, setStatus] = useState('')
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const [banner] = useState(() => {
        const screenshots = game.screenshots ?? []

        return screenshots.length
            ? screenshots[Math.floor(Math.random() * screenshots.length)]
            : undefined
    })



    return (
        <>
            <div className="game-banner">
                <img
                    src={
                        banner?.url
                            ? `https:${banner.url.replace(
                                /t_[^/]+(?=\/[^/]+$)/,
                                't_1080p'
                            )}`
                            : '/no-image.png'
                    }
                    alt={`${game.name} screenshot`}
                />
            </div>
            <div className='main-details'>
                <div className='left-collumn'>
                    <div className='cover-log'>
                        <img className='cover' 
                            src={
                                game.cover?.url
                                    ? `https:${game.cover.url.replace(
                                        /t_[^/]+(?=\/)/,
                                        't_cover_big'
                                    )}`
                                    : '/no-image.png'
                            } 
                            alt={`${game.name} cover`}  />
                            <div className='log'>
                                <StatusList 
                                    status={status}
                                    setStatus={setStatus}
                                    isStatusOpen={isStatusOpen}
                                    setIsStatusOpen={setIsStatusOpen}
                                />
                                <button className='favorite-btn' onClick={() => setIsFavorite(!isFavorite)}>
                                    <Heart color='#DDDDDD' fill={isFavorite ? "#DDDDDD" : "#B83838"}/>
                                </button>
                            </div>
                    </div>
                </div>
                <div className='right-collumn'>
                        <div className='name-company'>
                            <p className='game-name'>{game.name}</p>
                            <div className="company-name">
                                by: {game.involved_companies?.find((company) => 
                                company.developer)?.company.name}, 
                                {game.involved_companies?.find((company) => 
                                    company.publisher)?.company.name}
                            </div>
                        </div>
                        <div className='release'>
                            <b>Released</b>
                            {game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString("en-GD") : "unknown"}
                        </div>
                </div>
            </div>
        </>
    )
}