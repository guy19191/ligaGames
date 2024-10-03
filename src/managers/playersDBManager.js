import axios from 'axios';

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
    
     async getAllPlayers(){
        const clubsList = await axios('https://transfermarkt-api.fly.dev/competitions/ISR1/clubs');
         const clubsProfilesPromise = clubsList.data.clubs.map(club => axios(`https://transfermarkt-api.fly.dev/clubs/${club.id}/profile`));
         const clubsProfilesData = await Promise.all(clubsProfilesPromise);
         const promiseArr = clubsList.data.clubs.map(club => axios(`https://transfermarkt-api.fly.dev/clubs/${club.id}/players`));
         const playersByClub = await Promise.all(promiseArr);
        const playersIds = playersByClub.map(players => players.data.players).flat().filter(player => player?.marketValue).map(player => player.id)
        const playersPromises = playersIds.map(playerId => axios(`https://transfermarkt-api.fly.dev/players/${playerId}/profile`))
        const requestPlayers = await Promise.all(playersPromises);
         this.players = requestPlayers.map(player => {
             const clubId = player.data.club.id;
             const club = clubsProfilesData.find(club => club.data.id === clubId);
             player.data.club = club?.data ? club?.data : player.data.club;
             return player.data;
         });
     }



}