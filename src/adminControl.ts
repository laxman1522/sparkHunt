import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { CONSTANTS } from './constants';
import LoginController from './controllers/LoginController';
import GameController from './controllers/GameController';
import ConfigController from './controllers/ConfigController';
import FirebaseUtil from './utils/FirebaseUtil';

// Create Controllers
const loginController = new LoginController();
const gameController = new GameController();
const configController = new ConfigController();

// Get Initial Configurations on Application Start
configController.syncConfigurations();

const firebaseDB = FirebaseUtil.getFirebaseDB();

let clearAnswers = () => {
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.ANSWERS);
    ref.remove();
}

let clearClues = () => {
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.CLUES);
    ref.remove();
}

let setConfig = () => {
    let config = {
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
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.CONFIG);
    ref.remove();
    ref.set(config);
}

let setGame = () => {

}


let clearMilestones = () => {
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.MILESTONE);
    ref.remove();
}

let setRules = () => {

}

let addTeam = function () {
    let teamData = {
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
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.TEAMS);
    ref.remove();
    ref.set(teamData);
}

let clearUser = () => {
    const ref = firebaseDB.ref(CONSTANTS.SERVICES.USERS);
    ref.remove();
}

let cleanAllAndSetConfig = () => {
    clearAnswers();
    clearClues();
    clearMilestones();
    clearUser();
    setConfig();
}

cleanAllAndSetConfig();
console.log("Completed!")