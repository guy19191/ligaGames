import {playersDBManager} from './playersDBManager.js';

export class marketGames{
     players;
     playerReveled;
     playerHidden;
     player;
     whatGame;
     instance;
    constructor() {

    }

    static getInstance() {
        if (!marketGames.instance) {
            marketGames.instance = new marketGames();
        }
        return marketGames.instance;
    }

     getRandomPlayer(){
        const playerRandomNum = Math.floor(Math.random() * this.players.length);
        this.playerHidden = this.players[playerRandomNum];
        delete this.players[playerRandomNum];
        return {name : this.playerHidden.name};
    }
    
     getAnswer(answer, aId, bId, stats){
         stats = stats === 'marketValue' ? 'value' : stats;
        const playerHidden = this.players[aId][stats];
        const playerReveled = this.players[bId][stats];
         switch (answer) {
            case 'higher':
                return playerHidden <= playerReveled
            case 'lower':
                return playerHidden >= playerReveled
        }
    }

     changePlayers(){
        this.playerReveled = this.playerHidden;
        return this.playerReveled;
    }

    getPlayersArr(whatGame){
        const playersDB = playersDBManager.getInstance();
        this.players = {};
        const playersId = [];
        switch (whatGame){
            case 'marketValue':
                for (let id in playersDB.players){
                    if(playersDB.players[id].value && playersDB.players[id].value >= 200){
                        this.players[id] = playersDB.players[id];
                        playersId.push(id);
                    }
                }
                break;
            case 'totalGoals':
                for (let id in playersDB.players){
                    if(playersDB.players[id].totalGoals && playersDB.players[id].totalGoals >= 13){
                        this.players[id] = playersDB.players[id];
                        playersId.push(id);
                    }
                }
                break;
        }
        return playersId
    }


}