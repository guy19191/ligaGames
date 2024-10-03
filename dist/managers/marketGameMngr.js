"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketGames = void 0;
const playersDBManager_1 = require("./playersDBManager");
class marketGames {
    constructor() {
        const playersDB = playersDBManager_1.playersDBManager.getInstance();
        this.players = playersDB.players;
    }
    getRandomPlayer() {
        const playerRandomNum = Math.floor(Math.random() * this.players.length);
        this.playerHidden = this.players[playerRandomNum];
        delete this.players[playerRandomNum];
        return this.playerHidden.name;
    }
    answer(answer) {
        switch (answer) {
            case 'equle':
                return this.playerReveled.marketValue.toNumber() == this.playerHidden.marketValue.toNumber();
            case 'higher':
                return this.playerReveled.marketValue.toNumber() > this.playerHidden.marketValue.toNumber();
            case 'lower':
                return this.playerReveled.marketValue.toNumber() < this.playerHidden.marketValue.toNumber();
        }
    }
    changePlayers() {
        this.playerReveled = this.playerHidden;
        return this.playerReveled;
    }
}
exports.marketGames = marketGames;
