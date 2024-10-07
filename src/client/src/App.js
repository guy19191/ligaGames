import React, { useState } from 'react';
import './App.css';
import GameMenu from './Components/GameMenu';
import Game from './Components/MarketGame';
import Fifa from './Components/randomFifa';
import StarRating from "./Components/StarRating";

const App = () => {
    const [gameSelected, setGameSelected] = useState(false);

    const selectGame = (game) => {
        if (game) {
            setGameSelected(game);
        }
    };

    return (
        <div className="app">
            <h1>Game Hub</h1>
            {!gameSelected ? (
                <GameMenu onSelectGame={selectGame} />
            ) : gameSelected == "randomFifa25" ? ( <Fifa/>) :
                (
                <Game game={gameSelected}/>
            )}
        </div>
    );
};

export default App;