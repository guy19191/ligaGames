import React from 'react';

const Player = ({ playerName, playerStat, playerImg }) => {
    return (
        <div className="player">
            <img src={playerImg} alt={playerName} />
                <div className="player-info">
                <div className="player-name">{playerName}</div>
                {playerStat ? (<div className="player-value">{playerStat}</div>):(<div className="player-value">?</div>)
                    }
            </div>
        </div>
    );
};

export default Player;