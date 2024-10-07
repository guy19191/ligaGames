import {playersDBManager} from "./src/managers/playersDBManager.js"
import {fifaDBManager} from "./src/managers/fifaDBMngr.js"

import express from 'express';
import marketRoutes from './src/routes/marketRoutes.js'
const PORT = process.env.PORT || 3000;
const offline = process.env.OFFLINE || false;
import cors from 'cors';
import * as path from "path";
const app = express();
app.use(cors());
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import teamsRoutes from "./src/routes/teamsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run(){
    //Start getting all players
    const playersDB = playersDBManager.getInstance();
    const fifaDB = fifaDBManager.getInstance();

    offline ? await playersDB.getOfflinePlayers() : await playersDB.getAllPlayers();
    offline ? await fifaDB.getOfflineTeams() : await fifaDB.getAllTeams();
    app.use('/market', marketRoutes);
    app.use('/teams', teamsRoutes);
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'src/client/build')));

// Handle requests for routes not handled by static files
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'src/client/build', 'index.html'));
    });
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    !offline && setInterval(playersDB.getAllPlayers, 1000 * 60 * 60);
}
run();

