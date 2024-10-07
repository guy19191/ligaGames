import axios from 'axios';
import fs from 'fs'
export class playersDBManager{
     _players;
     _clubs;
     static instance;

     constructor(){
    }

     static getInstance() {
        if (!playersDBManager.instance) {
            playersDBManager.instance = new playersDBManager();
        }
        return playersDBManager.instance;
    }

     get players() {
        return this._players;
    }

     set players(players) {
        this._players = players;
    }
    
     get clubs() {
        return this._clubs;
    }
    
     set clubs(clubs) {
        this._clubs = clubs;
    }
    async getOfflinePlayers(){
         const playersString = await fs.readFileSync("./players.txt")
        this.players = JSON.parse(playersString);
    }
     async getAllPlayers(){
        const clubsList = await axios('http://localhost:8000/competitions/ISR1/clubs');
         const clubsProfilesPromise = clubsList.data.clubs.map(club => axios(`http://localhost:8000/clubs/${club.id}/profile`));
         const clubsProfilesData = await Promise.all(clubsProfilesPromise);
         const promiseArr = clubsList.data.clubs.map(club => axios(`http://localhost:8000/clubs/${club.id}/players`));
         const playersByClub = await Promise.all(promiseArr);
        const playersIds = playersByClub.map(players => players.data.players).flat().map(player => player.id);
        const playersPromises = playersIds.map(playerId => axios(`http://localhost:8000/players/${playerId}/profile`));
         const playersStatPromises = playersIds.map(playerId => axios(`http://localhost:8000/players/${playerId}/stats`))
         const requestPlayers = await Promise.all(playersPromises);
         const requestStatPlayers = await Promise.all(playersStatPromises);
         this.players = {};
         let i = 0
        requestPlayers.forEach(player => {
             const clubId = player?.data?.club?.id;
             const club = clubsProfilesData.find(club => club?.data?.id === clubId);
             player.data.club = club?.data ? club?.data : player.data.club;
             if (player.data.marketValue)
             player.data.value = player.data.marketValue.includes('m') ? 1000 *Number(player.data.marketValue.replace(/\D/g, ""))  : Number(player.data.marketValue.replace(/\D/g, "")) ;
            let goals = 0;
            if(requestStatPlayers[i]?.data?.stats)
                requestStatPlayers[i].data?.stats.filter(comp => comp.goals && comp.competitionID === 'ISR1').forEach(comp => goals += Number(comp.goals));
            this.players[player.data?.id] = {
                 name: player.data?.name,
                 value: player.data?.value,
                 marketValue: player.data?.marketValue,
                 imageURL: player.data?.imageURL,
                 club: {
                     image: player.data?.club?.image
                 },
                totalGoals: goals
             }
             i++;
         });
             fs.writeFileSync("./players.txt", JSON.stringify(this.players));
         }



}