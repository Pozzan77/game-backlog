import "./GamePage.css";
import { getGamesBySlug } from "../../services/gameSlugApi";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import type { Game } from "../../types/game";
import { GameDetails } from "../../components/gameDetails/gameDetails.tsx";
import { Header } from "../../components/header/header.tsx";

function GamePage() {

  const { slug } = useParams<{slug: string}>()

  const [game, setGame] = useState<Game>()

  useEffect(() => {
    if (!slug) return

    getGamesBySlug(slug)
      .then(data => setGame(data))
      .catch(error => console.log(error))
  }, [slug])

  if (!game) {
    return <p>Loading game...</p>;
}

  return (
    <div>
      <GameDetails game={game}/>
    </div>
  );
}

export default GamePage;