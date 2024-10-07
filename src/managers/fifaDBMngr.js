import axios from 'axios';
import fs from 'fs'
export class fifaDBManager{
    _players;
    _clubs;
    _leagues
    _netionalties
    static instance;

    constructor(){
        this.leagues = ["nationality"]
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
        const teams = await fs.readFileSync("./fifa.txt")
        this.clubs = JSON.parse(teams);
    }
    async getAllTeams(){
        const Promises = [];
        const allList = await axios('https://drop-api.ea.com/rating/ea-sports-fc/filters?locale=en');
        allList.data.teamGroups.forEach(league => {
            this.leagues.push(league.label);
            league.teams.forEach(team => {
                Promises.push(axios(`https://drop-api.ea.com/rating/ea-sports-fc?locale=en&offset=0&limit=15&team=${team.id}`));
                this.clubs[team.id] = {
                    name: team.label,
                    imageUrl: team.imageUrl,
                    league: {
                        name: league.label,
                        gender: league.gender.id
                    },
                }
            })
        });
        const requestedPlayers = await Promise.allSettled(Promises);
        let i = 0;
        requestedPlayers.forEach(teamPlayers => {
            let combinedRating = 0;
            const players = teamPlayers?.value?.data?.items
            if(players) {
                players.forEach(player => combinedRating += player.overallRating);
                combinedRating /= players.length;
                this.clubs[players[0]?.team?.id].rating = combinedRating;
            }
            });
        fs.writeFileSync("./fifa.txt", JSON.stringify(this.clubs));
    }



}