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
    const [leagues, setLeagues] = useState([]);
    const [chosenLeagues, setChosenLeagues] = useState([]);
    const [minRating, setMinRating] = useState("0");
    const [female, setFemale] = useState(false);
    const [nation, setNation] = useState(false);

    useEffect(() => {
        getLeagues();
    }, []);

    const getRandomPlayerId = (arr) => {
        const playerId = Math.floor(Math.random() * arr.length);
        return String(playerId);
    };

    const getLeagues = async () => {
        const response = await fetch(`/teams/getLeagues?gender=${female}`);
        const leaguesRaw = await response.json()
        const leagues = leaguesRaw.map(league => {
            return {
                value: league.id,
                label: league.name
            }
        });
        setLeagues(leagues);
    }
    const startGame = async () => {
        try {
            const response = await fetch(`/teams/randomTeams?minRating=${minRating}&gender=${female}&nation=${nation}&leagues=${chosenLeagues}`);
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

        // ... rest of the component logic remains the same

    return (
        <div className="game-container">
            {team1 && team2 ? (
                <div className="teams-wrapper">
                    <div className="teams-container">
                        <div className="team home">
                            <h2>Home</h2>
                            <Player playerName={team1?.name} playerStat={Math.floor(team1.rating)} playerImg={team1?.imageUrl} />
                        </div>
                        <div className="team away">
                            <h2>Away</h2>
                            <Player playerName={team2?.name} playerStat={Math.floor(team2.rating)} playerImg={team2?.imageUrl} />
                        </div>
                    </div>
                    <div className="buttons">
                        <button onClick={restartGame}>Restart Teams</button>
                        <button onClick={restartAll}>Change Settings</button>
                    </div>
                </div>
            ) : (
                <div className="game-settings">
                    <h2>Clubs Settings</h2>
                    <div className="settings-container">
                        <div className="setting">
                            <span>League Limit</span>
                            <MultiSelect options={leagues} defult={leagues.filter(league => chosenLeagues.includes(league.value))} onChange={(leagues) => setChosenLeagues(leagues.map(league => league.value))}></MultiSelect>
                        </div>
                        <div className="setting">
                            <span>Club Min Stars</span>
                            <StarRating ratingDefult={minRating} onChange={(rating) => setMinRating(rating)} />
                        </div>
                        <div className="setting">
                            <StyledCheckbox
                                id="nation-checkbox"
                                label="Allow Nation teams"
                                initialChecked={nation}
                                onChange={setNation}
                            />
                        </div>
                        <div className="setting">
                            <StyledCheckbox
                                id="female-checkbox"
                                label="Allow Female Clubs"
                                initialChecked={female}
                                onChange={(female => {
                                    setFemale(female)
                                    getLeagues();
                                })}
                            />
                        </div>
                    </div>
                    <button onClick={restartGame}>Pick Teams</button>
                </div>
            )}
        </div>
    );
};

export default Fifa;