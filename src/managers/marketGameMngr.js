import {playersDBManager} from './playersDBManager.js';

export class marketGames{
     players;
     playerReveled;
     playerHidden;
     player;

    constructor() {
        const playersDB = playersDBManager.getInstance();
        this.players = playersDB.players;
    }
    
     getRandomPlayer(){
        const playerRandomNum = Math.floor(Math.random() * this.players.length);
        this.playerHidden = this.players[playerRandomNum];
        delete this.players[playerRandomNum];
        return {name : this.playerHidden.name};
    }
    
     getAnswer(answer, aId ,bId){
        const playerHidden = bId ? this.players[Number(aId)]: this.playerReveled;
        const playerReveled = aId ? this.players[Number(bId)]: this.playerHidden;
        const multiplyB = playerHidden.marketValue.includes('m') ? 1000 : 1;
        const multiplyA = playerReveled.marketValue.includes('m') ? 1000 : 1;
        const b = Number(playerHidden.marketValue.replace(/\D/g, "")) *multiplyB;
        const a = Number(playerReveled.marketValue.replace(/\D/g, "")) * multiplyA;

         switch (answer) {
            case 'equle':
                return a == b;
            case 'higher':
                return a > b
            case 'lower':
                return a < b
        }
    }

     changePlayers(){
        this.playerReveled = this.playerHidden;
        return this.playerReveled;
    }

    getPlayersArr(){
        const playersId = [];
        for (let i=0; i < this.players.length ; i++){

            playersId.push(i++);
        }
        return playersId
    }


}