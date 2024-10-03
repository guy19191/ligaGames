"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marketGameMngr_1 = require("../managers/marketGameMngr");
const router = express_1.default.Router();
const games = [];
router.get('/startMarketGame', (req, res) => {
    const gameId = games.length;
    games.push(new marketGameMngr_1.marketGames);
    games[gameId].getRandomPlayer();
    res.json({ gameId: gameId });
});
router.get('/getRandomPlayer', (req, res) => {
    const { id } = req.body;
    res.json(games[id].changePlayers());
});
router.get('/getReveldPlayer', (req, res) => {
    const { id } = req.body;
    res.json(games[id].getRandomPlayer());
});
router.get('checkAnswer', (req, res) => {
    const { id, answer } = req.body;
    res.json({ answer: games[id].checkAnswer(answer) });
});
exports.default = router;
