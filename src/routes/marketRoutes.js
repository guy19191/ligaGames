import express from 'express';
import {marketGames} from '../managers/marketGameMngr.js';

const router = express.Router();


router.post('/startMarketGame', (req, res) => {
    marketGame.getRandomPlayer();
    res.json({gameId: gameId});
});
router.get('/v2/startMarketGame', (req, res) => {
    const {whatGame} = req.query;
    const marketGame = marketGames.getInstance();
    const playersId = marketGame.getPlayersArr(whatGame);
    res.json({playersArr: playersId});
});
router.get('/v2/getTwoPlayers', (req, res) => {
    const marketGame = marketGames.getInstance();
    const {reveledPlayerId, hiddinPlayerId} = req.query;
    res.json({reveledPlayer: marketGame.players[reveledPlayerId], hiddinPlayer: {
        name: marketGame.players[hiddinPlayerId].name,
        imageURL: marketGame.players[hiddinPlayerId].imageURL,
            club: marketGame.players[hiddinPlayerId].club
        }
    });
});
router.get('/getRandomPlayer', (req, res) => {
    res.json(marketGame.getRandomPlayer());
});

router.get('/getReveldPlayer', (req, res) => {
    res.json(marketGame.changePlayers());
});

router.get('/checkAnswer', (req, res) => {
    const {guess, stat} = req.query;
    res.json({answer: marketGame.getAnswer(guess, stat)});
});

router.get('/v2/checkAnswer', (req, res) => {
    const marketGame = marketGames.getInstance();
    const {reveledPlayerId, hiddinPlayerId, guess, whatGame} = req.query;
    res.json({answer: marketGame.getAnswer(guess, reveledPlayerId, hiddinPlayerId, whatGame), hiddinPlayer: marketGame.players[hiddinPlayerId]});
});

export default router;
