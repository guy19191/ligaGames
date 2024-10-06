import React from 'react';

const GameControls = ({ handleGuess }) => {
    return (
        <div className="buttons">
            <button onClick={() => handleGuess('higher')}>Higher</button>
            <button onClick={() => handleGuess('lower')}>Lower</button>
        </div>
    );
};

export default GameControls;