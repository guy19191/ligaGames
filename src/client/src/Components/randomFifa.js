import React, { useState, useEffect } from 'react';
import './MarketGame.css';
import Player from './Player';
import StarRating from "./StarRating";
import { checkBox } from 'lucide-react';
import StyledCheckbox from "./checkbox";
import MultiSelect from "./selectBox";


const Fifa = () => {
    const [team1, setTeam1] = useState(null);
    const [team2, setTeam2] = useState(null);
    const [rating, setRating] = useState("5");
    const [female, setFemale] = useState(false);
    const [nation, setNation] = useState(false);

    useEffect(() => {
    }, []);

    const getRandomPlayerId = (arr) => {
        const playerId = Math.floor(Math.random() * arr.length);
        return String(playerId);
    };

    const startGame = async () => {
        try {
            const response = await fetch(`http://localhost:3000/teams/randomTeams?minRating=${rating}&gender=${female}&nation=${nation}`);
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
                    <h2>Clubs Settings</h2>
                    <div className="final-player">
                            <span>Club Min Stars</span>
                    <div>
                        <StarRating ratingDefult={rating} onChange={(newRating) => setRating(newRating)} />
                    </div>
                        <div>
                        <div>
                        <StyledCheckbox
                            id="female-checkbox"
                            label="Allow Nation teams"
                            initialChecked={nation}
                            onChange={setNation}
                        />
                        </div>
                        <div>
                        <StyledCheckbox
                                id="female-checkbox"
                                label="Allow Female Clubs"
                                initialChecked={female}
                                onChange={setFemale}/>
                        </div>
                            </div>
                            <div>
                        </div>
                    </div>
                    <button onClick={restartGame}>Pick Teams</button>

                </div>
            )}
        </div>
    );
};

export default Fifa;