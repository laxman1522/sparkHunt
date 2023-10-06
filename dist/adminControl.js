"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var LoginController_1 = __importDefault(require("./controllers/LoginController"));
var GameController_1 = __importDefault(require("./controllers/GameController"));
var ConfigController_1 = __importDefault(require("./controllers/ConfigController"));
var FirebaseUtil_1 = __importDefault(require("./utils/FirebaseUtil"));
// Create Controllers
var loginController = new LoginController_1.default();
var gameController = new GameController_1.default();
var configController = new ConfigController_1.default();
// Get Initial Configurations on Application Start
configController.syncConfigurations();
var firebaseDB = FirebaseUtil_1.default.getFirebaseDB();
var clearAnswers = function () {
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.ANSWERS);
    ref.remove();
};
var clearClues = function () {
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.CLUES);
    ref.remove();
};
var setConfig = function () {
    var config = {
        "enableLeaderBoard": true,
        "enableMilestone": true,
        "gameLevels": 50,
        "isTeamEvent": true,
        "maintenanceStatus": false,
        "milestoneLevels": ["level_2", "level_3", "level_4", "level_5"],
        "playingStatus": true,
        "zones": {
            "level_1": "16 Apr 2020 06:29"
        }
    };
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.CONFIG);
    ref.remove();
    ref.set(config);
};
var setGame = function () {
};
var clearMilestones = function () {
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.MILESTONE);
    ref.remove();
};
var setRules = function () {
};
var addTeam = function () {
    var teamData = {
        "1": {
            id: "1",
            picUrl: "https://firebasestorage.googleapis.com/v0/b/siriussuperquest.appspot.com/o/team.png?alt=media&token=a3b26216-8718-41b1-bbf2-7b75c67d942e",
            name: "Team A",
            members: [
                { id: '1355' },
                { id: '1360' }
            ]
        }
    };
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.TEAMS);
    ref.remove();
    ref.set(teamData);
};
var clearUser = function () {
    var ref = firebaseDB.ref(constants_1.CONSTANTS.SERVICES.USERS);
    ref.remove();
};
var cleanAllAndSetConfig = function () {
    clearAnswers();
    clearClues();
    clearMilestones();
    clearUser();
    setConfig();
};
cleanAllAndSetConfig();
console.log("Completed!");
