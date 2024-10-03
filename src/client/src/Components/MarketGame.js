import React, { useState, useEffect } from 'react';
import './MarketGame.css';
import Player from './Player';
import GameControls from './GameControls';


const Game = () => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [nextPlayer, setNextPlayer] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playersArr, setPlayersArr] = useState([]);
    const [currentPlayerId, setCurrentPlayerId] = useState(0);
    const [nextPlayerId, setNextPlayerId] = useState(0);

    useEffect(() => {
        startGame();
        }, []);

    const getRandomPlayerId = (arr) => {
        const playerId = Math.floor(Math.random() * arr.length);
        return playerId;
    };



    const startGame = async () => {
        try {
            const response = await fetch(`/market/v2/startMarketGame`);
            const data = await response.json();
            const arr = data.playersArr;
            const a = getRandomPlayerId(arr)
            arr.splice(a, 1);
            let b = getRandomPlayerId(arr);
            while(a == b)
            {
                b = getRandomPlayerId(arr);
            }
            arr.splice(b, 1)
            await fetchPlayers(a, b);
            setPlayersArr(arr);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const fetchPlayers = async (reveledPlayerId, hiddinPlayerId) => {
        try {
            const response = await fetch(`/market/v2/getTwoPlayers?reveledPlayerId=${reveledPlayerId}&hiddinPlayerId=${hiddinPlayerId}`);
            const data = await response.json();
            setCurrentPlayer(data.reveledPlayer);
            setNextPlayer(data.hiddinPlayer);
            setCurrentPlayerId(reveledPlayerId);
            setNextPlayerId(hiddinPlayerId);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };
    const getAnswer = async (guess) => {
        try {
            const response = await fetch(`/market/v2/checkAnswer?guess=${guess}&reveledPlayerId=${currentPlayerId}&hiddinPlayerId=${nextPlayerId}`);
            const data = await response.json();
            return data.answer;
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };
    const handleGuess = async (guess) => {
        const ans = await getAnswer(guess);
        if (ans) {
            setScore(score + 1);
            const a = getRandomPlayerId(playersArr)
            playersArr.splice(a, 1);
            setPlayersArr(playersArr);
            await fetchPlayers(nextPlayerId, a);
        } else {
            await fetchPlayers(nextPlayerId, nextPlayerId);
            await setGameOver(true);
        }
    };

    const restartGame =async () => {
        setScore(0);
        setGameOver(false);
        await startGame();
    };

    return (
        <div className="game-container">
            {gameOver ? (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <div className="final-player">
                        <Player player={currentPlayer} />
                    </div>
                    <p>Your score: {score}</p>
                    <button onClick={restartGame}>Play Again</button>
                </div>
            ) : (
                <>
                    <div className="next-player">
                        <h2>Player</h2>
                        <Player player={currentPlayer} />
                        <p>Your score: {score}</p>
                    </div>
                    <div className="next-player">
                        <h2>Player</h2>
                        <Player player={nextPlayer} />
                        <GameControls handleGuess={handleGuess} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;