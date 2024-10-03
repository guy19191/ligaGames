import React, { useState } from 'react';
import './App.css';
import GameMenu from './Components/GameMenu';
import Game from './Components/MarketGame';

const App = () => {
    const [gameSelected, setGameSelected] = useState(false);

    const selectGame = (game) => {
        if (game === 'market-value') {
            setGameSelected(true);
        }
    };

    return (
        <div className="app">
            <h1>Game Hub</h1>
            {!gameSelected ? (
                <GameMenu onSelectGame={selectGame} />
            ) : (
                <Game />
            )}
        </div>
    );
};

export default App;