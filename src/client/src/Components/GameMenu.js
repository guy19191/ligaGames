import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GameMenu = ({ onSelectGame }) => {
    const games = [
        { id: 'marketValue', name: 'Market Value Game', description: 'נחש את המחיר של שחקני ליגת העל' },
        { id: 'totalGoals', name: 'Goals Game', description: 'נחש את השערים של שחקני ליגת העל' },
        { id: 'randomFifa25', name: 'Fifa Random Club', description: 'Random Teams in fifa 25' }

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextGame = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    const prevGame = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
    };

    const currentGame = games[currentIndex];

    return (
        <div className="game-menu">
            <h2>Choose a Game</h2>
            <div className="carousel">
                <button className="carousel-button" onClick={prevGame}>
                    <ChevronLeft />
                </button>
                <div className="game-card">
                    <h3>{currentGame.name}</h3>
                    <p>{currentGame.description}</p>
                    <button className="play-button" onClick={() => onSelectGame(currentGame.id)}>
                        Play Now
                    </button>
                </div>
                <button className="carousel-button" onClick={nextGame}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default GameMenu;