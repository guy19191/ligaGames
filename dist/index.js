"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playersDBManager_1 = require("./managers/playersDBManager");
const express_1 = __importDefault(require("express"));
const marketRoutes_1 = __importDefault(require("./routes/marketRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        //Start getting all players
        const playersDB = playersDBManager_1.playersDBManager.getInstance();
        yield playersDB.getAllPlayers();
        app.use('/market', marketRoutes_1.default);
        setInterval(playersDB.getAllPlayers, 1000 * 60 * 60);
    });
}
run();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
