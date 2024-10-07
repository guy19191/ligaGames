import express, {query} from 'express';
import fs from "fs";
import {fifaDBManager} from "../managers/fifaDBMngr.js";

const router = express.Router();

router.get('/randomTeams', async (req, res) => {
    const{ minRating } = req.query
    let mininumRating = minRating ? minRating : 3;
    const fifaDB = fifaDBManager.getInstance();
    switch (mininumRating) {
        case "5":
        mininumRating = 82;
        break;
        case "4.5":
        mininumRating  = 80;
        break;
    case "4":
        mininumRating  = 76;
        break;
    case "3.5":
        mininumRating = 70
        break;
     default:
        mininumRating = 50;
        break;
        }
    res.json(Object.values(fifaDB.clubs).filter(club => club.rating >= mininumRating && club.league.gender === 0));
});

export default router;
