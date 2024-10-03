import React from 'react';

const Player = ({ player }) => {
    return (
        <div className="player">
            {player?.imageURL ? (<img src={player?.imageURL} alt={player?.name} />) : (<img src={player?.club?.image} alt={player?.club?.name} />)}
                <div className="player-info">
                <div className="player-name">{player?.name}</div>
                {player?.marketValue ? (<div className="player-value">{player?.marketValue}</div>):(<div className="player-value">?</div>)
                    }
            </div>
        </div>
    );
};

export default Player;