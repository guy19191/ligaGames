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
exports.playersDBManager = void 0;
const axios_1 = __importDefault(require("axios"));
class playersDBManager {
    constructor() {
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
    getAllPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            const players = [];
            this.clubs = yield (0, axios_1.default)('https://transfermarkt-api.fly.dev/competitions/ISR1/clubs');
            const promiseArr = this.clubs.map((club) => (0, axios_1.default)(`https://transfermarkt-api.fly.dev/clubs/${club.id}/players`));
            const playersByClub = yield Promise.all(promiseArr);
            this.players = playersByClub.map((players) => players.players).map(player => player);
        });
    }
}
exports.playersDBManager = playersDBManager;
