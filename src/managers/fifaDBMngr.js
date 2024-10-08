import axios from 'axios';
import fs from 'fs'
export class fifaDBManager{
    _players;
    _clubs;
    _leagues
    _netionalties
    static instance;

    constructor(){
        this.leagues = []
        this.clubs = {};
    }

    static getInstance() {
        if (!fifaDBManager.instance) {
            fifaDBManager.instance = new fifaDBManager();
        }
        return fifaDBManager.instance;
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

    get leagues() {
        return this._leagues;
    }

    set leagues(leagues) {
        this._leagues = leagues;
    }

    async getOfflineTeams(){
        const teams = await fs.readFileSync("./fifa.txt");
        const leagues = await fs.readFileSync("./leagues.txt")
        this.leagues = JSON.parse(leagues);
        this.clubs = JSON.parse(teams);
    }
    async getAllTeams(){
        const Promises = [];
        const allList = await axios('https://drop-api.ea.com/rating/ea-sports-fc/filters?locale=en');
        allList.data.teamGroups.forEach(league => {
            this.leagues.push({id: league.id,
            name: league.label,
                gender: league.gender.id
            });
            league.teams.forEach(team => {
                Promises.push(axios(`https://drop-api.ea.com/rating/ea-sports-fc?locale=en&offset=0&limit=15&team=${team.id}`));
                if (league.gender.id){
                    team.label = team.label + ' .F'
                }
                this.clubs[team.id] = {
                    name: team.label,
                    imageUrl: team.imageUrl,
                    league: {
                        id: league.id,
                        name: league.label,
                        gender: league.gender.id
                    },
                }
            });
        });
        this.leagues.push({id: "0",
            name: 'nationality',
            gender: 0
        });
        const promise2 = []
        allList.data.nationality.forEach(nationality => {
            promise2.push(axios(`https://drop-api.ea.com/rating/ea-sports-fc?locale=en&offset=0&limit=15&nationality=${nationality.id}&gender=0`));
                    this.clubs[`0${nationality.id}`] = {
                        name: nationality.label,
                        imageUrl: nationality.imageUrl,
                        league: {
                            id: '0',
                            name: 'Nationality',
                            gender: 0
                        },
                    }
        });
        fs.writeFileSync("./leagues.txt", JSON.stringify(this.leagues));
        const requestedPlayers = await Promise.allSettled(Promises);
            const requestedPlayersNations = await Promise.allSettled(promise2);
        requestedPlayers.forEach(teamPlayers => {
            let combinedRating = 0;
            const players = teamPlayers?.value?.data?.items
            if(players && players.length !=0 && players.length > 10) {
                players.forEach(player => combinedRating += player.overallRating);
                combinedRating /= players.length;
                this.clubs[players[0]?.team?.id].rating = combinedRating;
                this.clubs[players[0]?.team?.id].fifaStarRatings = fifaStarRatings(combinedRating);
            }
            });
        requestedPlayersNations.forEach(teamPlayers => {
            let combinedRating = 0;
            const players = teamPlayers?.value?.data?.items
            if(players && players.length !=0 && players.length > 10) {
                players.forEach(player => combinedRating += player.overallRating);
                combinedRating /= players.length;
                this.clubs[`0${players[0]?.nationality?.id}`].rating = combinedRating;
                this.clubs[`0${players[0]?.nationality?.id}`].fifaStarRatings = fifaStarRatings(combinedRating);
            }
        });
        fs.writeFileSync("./fifa.txt", JSON.stringify(this.clubs));

    }
}

function fifaStarRatings(rating){
        if (rating >=82)
            return "5";
    else if (rating >=80)
            return "4.5"
        else if ( rating >=76)
            return "4"
else if ( rating >= 70)
            return "3.5"
else if ( rating >= 65)
            return "3"
else if ( rating >= 60)
            return "2.5"
else if ( rating >= 55)
            return "2"
        else
            return "0"
}