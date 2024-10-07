import React, { useState, useEffect } from 'react';
import './MarketGame.css';
import Player from './Player';
import GameControls from './GameControls';
import StarRating from "./StarRating";


const Fifa = () => {
    const [team1, setTeam1] = useState(null);
    const [team2, setTeam2] = useState(null);
    const [rating, setRating] = useState({});

    useEffect(() => {
    }, []);

    const getRandomPlayerId = (arr) => {
        const playerId = Math.floor(Math.random() * arr.length);
        return String(playerId);
    };

    const startGame = async () => {
        try {
            filter();
            const response = await fetch(`teams/randomTeams?minRating=${rating}`);
            const arr = await response.json();
            const a = getRandomPlayerId(Object.keys(arr));
            let b = getRandomPlayerId(Object.keys(arr));
            while(arr[a] == arr[b])
            {
                b = getRandomPlayerId(Object.keys(arr));
            }
            setTeam1(arr[a]);
            setTeam2(arr[b]);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    const filter = () => {
        //league

        //rating

        return {

        }
    };

    const restartGame =async () => {
        await startGame();
    };
    const restartAll = () => {
        setTeam1(null);
        setTeam2(null);
    };

    return (
        <div className="game-container">
            {team1 && team2 ? (
                    <>
                        <div className="next-team">
                            <h2>Home</h2>
                            <Player playerName={team1?.name} playerStat={Math.floor(team1.rating)} playerImg={team1?.imageUrl} />
                        </div>
                        <div className="next-team">
                            <h2>Away</h2>
                            <Player playerName={team2?.name} playerStat={Math.floor(team2.rating)} playerImg={team2?.imageUrl} />
                        </div>
                        <div className="buttons">
                        <button onClick={restartGame}>Restart Teams</button>
                            <button onClick={restartAll}>Change Settings</button>
                        </div>
                    </>

                ) : (
                <div className="game-over">
                    <h2>Minimal Rating</h2>
                    <div className="final-player">
                        <StarRating onChange={(newRating) => setRating(newRating)} />
                    </div>
                    <button onClick={restartGame}>Pick Teams</button>
                </div>
                )}

        </div>
    );
};

export default Fifa;