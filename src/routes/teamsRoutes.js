import express, {query} from 'express';
import fs from "fs";
import {fifaDBManager} from "../managers/fifaDBMngr.js";

const router = express.Router();

router.get('/randomTeams', async (req, res) => {
    const{ minRating, gender, leagues, nation } = req.query;
    const minimumRating = minRating ? minRating : 3;
    const genderChoice = gender == 'true' ? 1 : 0;
    const nationsChoice = nation == 'true' ? false : true;
    const leaguesChoice = leagues ? leagues : [];
    const fifaDB = fifaDBManager.getInstance();
    let clubs = Object.values(fifaDB.clubs).filter(club => Number(club.fifaStarRatings) >= Number(minimumRating));
    if (leaguesChoice.length !== 0){
        clubs = clubs.filter(club => leaguesChoice.includes(club.league.id));
    }
    else {
        if (genderChoice === 0){
            clubs = clubs.filter(club => club.league.gender === 0);
        }
        if (nationsChoice){
            clubs = clubs.filter(club => club.league.id !== "0");
        }
    }
    res.json(clubs);
});

router.get('/getLeagues', async (req, res) => {
    const{gender} = req.query;
    const genderChoice = gender == 'true' ? 1 : 0;
    const fifaDB = fifaDBManager.getInstance();
    let leagues = fifaDB.leagues;
    if (genderChoice === 0){
        leagues =leagues.filter(league => league.gender === 0);
    }
    res.json(leagues);
});

export default router;
