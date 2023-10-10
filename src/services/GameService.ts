import { CONSTANTS } from "../constants";
import { MESSAGES } from "../messages";
import FirebaseUtil from '../utils/FirebaseUtil';
import EncryptUtil from '../utils/EncryptUtil';
import GameConfig from "../models/GameConfig";
import Game from "../models/Game";
import Question from "../models/Question";
import ErrorModel from "../models/ErrorModel";
import User from "../models/User";

export default class GameService {
    private firebaseDB: any;
    private encryptUtil: any;

    constructor() {
        this.firebaseDB = FirebaseUtil.getFirebaseDB();
        this.encryptUtil = new EncryptUtil();

    }

    /**
     * constructLoginResponse
     * @param user 
     */
    constructLoginResponse(user) {
        return {
            id: user.id,
            name: user.name,
            token: user.token,
            picUrl: user.picUrl
        };
    }

    /**
     * Method : constructQuestionResponse
     * @param question 
     * @param user 
     */
    private async constructQuestionResponse(question: Question | undefined, user) {
        let _this = this;

        let userData: User = {
            level: user.level
        };

        if (CONSTANTS.GAME.PLAYING_STATUS == true && CONSTANTS.GAME.MAINTENANCE_STATUS == false) {
            if (user.error) {
                userData = {
                    error: user.error
                }
            } else {
                userData = {
                    ...userData,
                    isNextLevel: user.isNextLevel,
                    isTeamNextLevel: user.isTeamNextLevel,
                    isGameCompleted: user.isGameCompleted,
                    livesCompleted: user.livesCompleted,
                    remCoolingTime: user.remCoolingTime,
                    nextZoneStartTime: user.nextZoneStartTime
                }
            }

            if (user.isNewUser) {
                userData.isNewUser = true;
            }

            let clues: any = await _this.getClues(user.level);
            if (question) {
                if (clues && clues.length > 0)
                    question.clues = clues;
            }

        } else {
            question = undefined;
        }

        let gameConfig = new GameConfig(
            CONSTANTS.GAME.PLAYING_STATUS,
            CONSTANTS.GAME.MAINTENANCE_STATUS);

        let game: Game = {
            question: question,
            user: userData,
            gameConfig: gameConfig
        }

        return (game);

    }

    /**
     * Method : getQuestion
     * @param level 
     */
    private getQuestion(level: Number = 1) {
        var ref = this.firebaseDB.ref(CONSTANTS.SERVICES.GAME).child("level_" + level);
        return new Promise((resolve, reject) => {
            ref.once("value", function (snapshot: any) {
                let gameData = snapshot.val();
                if (gameData !== null) {
                    resolve(gameData.question);
                } else {
                    resolve(null);
                }
            });
        });
    }

    /**
     * Method : getUserLifeDetails
     * @param user 
     * @param question 
     */
    private getUserLifeDetails(userData, question, isFromGetUserData: Boolean = false) {

        let userAttempts = userData.attempts, livesCompleted = 1, hasLife = true, remCoolingTime;

        if (userAttempts) {
            livesCompleted = userAttempts.livesCompleted;
        }

        hasLife = userAttempts.livesCompleted < question.attempts.lives;

        if (!hasLife) {
            // Secondary check whether cooling period has elapsed
            let userLastAttemptTime = new Date(userData.attempts.timeStamp).getTime();
            let currentTime = new Date().getTime();
            let elapsedTime = userLastAttemptTime + question.attempts.coolingPeriod;
            if (elapsedTime < currentTime) {
                hasLife = true;
                livesCompleted = 0;
            } else {
                livesCompleted = question.attempts.lives - 1;
                remCoolingTime = elapsedTime - currentTime;
            }
        } else {
            if (userAttempts.livesCompleted === question.attempts.lives - 1 && !isFromGetUserData) {
                remCoolingTime = question.attempts.coolingPeriod;
            }
        }



        return {
            hasLife, livesCompleted, remCoolingTime
        }
    }

    /**
     * Method : incrementUserLevelAndFetchNextQuestion
     * Desc   : Incrementing User Level and Getting Next Question
     * @param user 
     */
    private incrementUserLevelAndFetchNextQuestion(user) {
        let _this = this;
        return new Promise((resolve, reject) => {
            user.isGameCompleted = false;
            user.isNextLevel = false;
            user.completedOn = (new Date()) + "";

            if (user.level === CONSTANTS.GAME.LEVELS) {
                user.isGameCompleted = true;
            } else {
                user.isNextLevel = true;
            }

            // 1. Update Milestone
            _this.logMilestoneMeter(user);

            // 2. Update User
            user.level = Number(user.level) + 1;
            let ref = this.firebaseDB.ref(CONSTANTS.SERVICES.USERS).child(user.id);
            ref.update({
                isGameCompleted: user.isGameCompleted,
                completedOn: user.completedOn,
                level: user.level,
                attempts: {
                    livesCompleted: 0,
                    timeStamp: new Date() + ""
                }
            });

            // 3. Fetch Next Level Question
            if (user.isGameCompleted === false) {
                let zonedLevel = CONSTANTS.GAME.ZONES["level_" + user.level];
                if (zonedLevel !== undefined) {
                    // Check whether Zone is Open or not
                    if (new Date(zonedLevel) > new Date()) {
                        user.nextZoneStartTime = zonedLevel;
                        _this.constructQuestionResponse(undefined, user).then(function (result) {
                            resolve(result);
                        });
                    }

                }
                this.getQuestion(user.level).then(function (question) {
                    user.livesCompleted = 0;
                    _this.constructQuestionResponse(question, user).then(function (result) {
                        resolve(result);
                    });
                });
            } else {
                this.constructQuestionResponse(null, user).then(function (result) {
                    resolve(result);
                });
            }
        });
    }

    /**
     * Method logMilestoneMeter
     * @param userId 
     * @param level 
     */
    private logMilestoneMeter(user) {
        let ref_milestone = this.firebaseDB.ref(CONSTANTS.SERVICES.MILESTONE).child("level_" + user.level);
        ref_milestone.push({
            id: user.id,
            name: user.name,
            picUrl: user.picUrl || "",
            completedOn: new Date() + ""
        });
    }

    /**
     * Method : getClues
     * @param level 
     */
    private getClues(level: Number) {
        let ref = this.firebaseDB.ref(CONSTANTS.SERVICES.CLUES).child("level_" + level);
        return new Promise((resolve, reject) => {
            ref.once("value", function (snapshot) {
                let clues = snapshot.val();
                resolve(clues);
            });
        });
    }

    /**
     * Method : filterUser
     * @param user 
     */
    private filterUser(user) {
        user.isSinglePlayer = true;
        if (CONSTANTS.GAME.IS_TEAM_EVENT) {
            var ref_team = this.firebaseDB.ref(CONSTANTS.SERVICES.TEAMS);
            return new Promise((resolve, reject) => {
                ref_team.once("value", function (snapshot) {
                    let teamData = snapshot.val();
                    if (teamData != null) {
                        teamData = Object.values(teamData);
                        for (let i = 0; i < teamData.length; i++) {
                            for (let j = 0; j < teamData[i].members.length; j++) {
                                if (user.id == teamData[i].members[j].id) {
                                    user = teamData[i];
                                    user.isSinglePlayer = false;
                                    break;
                                }
                            }
                        }
                    }
                    resolve(user);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve(user);
            });
        }
    }

    /**
     * Method : getLoggedInUserData
     * @param user 
     * @param isFromLogin - Optional, To be passed when called from login
     */
    public getUserData(user, isFromLogin: Boolean) {
        let _this = this;
        if (isFromLogin && isFromLogin === true) {
            // If Login, Search for encrypted id
            user.token = this.encryptUtil.encryptUser(user.id);
        } else {
            // If Not Login, get decrypted id
            user.id = this.encryptUtil.decryptUser(user.token);
        }

        return new Promise((resolve, reject) => {
            _this.filterUser(user).then(function (user: User) {
                if (isFromLogin && isFromLogin === true) {
                    user.token = _this.encryptUtil.encryptUser(user.id);
                }
                // Comments: Doesn't matter whether it is a team or single player, in Firebase it is one user
                var ref = _this.firebaseDB.ref(CONSTANTS.SERVICES.USERS).child(user.id);
                ref.once("value", function (snapshot) {
                    let userData = snapshot.val();
                    if (userData === null) {
                        if (isFromLogin) {
                            // 1. Add isGameCompleted, level to New User
                            user.isGameCompleted = false;
                            user.level = 1;
                            user.completedOn = (new Date()) + "";
                            user.attempts = {
                                livesCompleted: 0,
                                timeStamp: new Date() + ""
                            }

                            // 2. Push this User to Firebase
                            ref.set(user);

                            resolve(_this.constructLoginResponse(user));

                        } else {
                            _this.constructQuestionResponse(undefined, {
                                error: new ErrorModel(MESSAGES.ERROR.INVALID_TOKEN.CODE, MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                            }).then(function (result) {
                                resolve(result);
                            });
                        }
                    } else {
                        // Update token if it is a new login
                        if (isFromLogin && isFromLogin === true) {
                            ref.update({
                                token: user.token
                            });

                            userData.token = user.token;
                            resolve(_this.constructLoginResponse(userData));
                        } else {
                            // If not login, check whether existing token matches else redirect to login
                            if (user.token !== userData.token) {
                                _this.constructQuestionResponse(undefined, {
                                    error: new ErrorModel(MESSAGES.ERROR.INVALID_TOKEN.CODE, MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                                }).then(function (result) {
                                    resolve(result);
                                });
                            }
                        }

                        userData.isNextLevel = false;

                        if (userData.isGameCompleted === false) {
                            let zonedLevel = CONSTANTS.GAME.ZONES["level_" + userData.level];
                            if (zonedLevel !== undefined) {
                                // Check whether Zone is Open or not
                                if (new Date(zonedLevel) > new Date()) {
                                    userData.nextZoneStartTime = zonedLevel;
                                    _this.constructQuestionResponse(undefined, userData).then(function (result) {
                                        resolve(result);
                                    });
                                }
                            }

                            _this.getQuestion(userData.level).then(function (question) {
                                let userLifeDetails = _this.getUserLifeDetails(userData, question, true);
                                userData = { ...userData, ...userLifeDetails };
                                _this.constructQuestionResponse(question, userData).then(function (result) {
                                    resolve(result);
                                });
                            });
                        } else {
                            _this.constructQuestionResponse({}, userData).then(function (result) {
                                resolve(result);
                            });
                        }
                    }
                });
            });
        });
    }

    /**
     * Method : checkAnswer
     * Desc   : Check Answer
     * @param params 
     */
    public checkAnswer(params) {
        let _this = this;
        return new Promise((resolve, reject) => {
            params.user.id = this.encryptUtil.decryptUser(params.user.token);
            if (params.user.id.length > 0) {
                var ref = _this.firebaseDB.ref(CONSTANTS.SERVICES.USERS).child(params.user.id);
                ref.once("value", function (snapshot) {
                    let userData = snapshot.val();
                    if (userData !== null && params.user.token === userData.token) {
                        let ref_game = _this.firebaseDB.ref(CONSTANTS.SERVICES.GAME).child("level_" + userData.level);
                        ref_game.once("value", function (snapshot) {
                            let gameData = snapshot.val();

                            if (gameData && gameData.answers) {
                                // Check whether user has to wait till the cooling period has ended

                                let user: User = {
                                    level: userData.level,
                                    isNextLevel: false,
                                    isGameCompleted: false
                                }

                                let userLifeDetails = _this.getUserLifeDetails(userData, gameData.question);
                                if (userLifeDetails.hasLife) {
                                    let answers = gameData.answers;

                                    let correctAnswer = false;
                                    for (let i = 0; i < answers.length; i++) {
                                        if (answers[i] === params.game.answer) {
                                            correctAnswer = true;
                                            break;
                                        }
                                    }

                                    // Push Answer Log
                                    let answerLog = {
                                        id: userData.id,
                                        level: userData.level,
                                        ans: params.game.answer
                                    }
                                    let ref_answer = _this.firebaseDB.ref(CONSTANTS.SERVICES.ANSWERS);
                                    ref_answer.push(answerLog);

                                    if (correctAnswer === true) {
                                        _this.incrementUserLevelAndFetchNextQuestion(userData).then(function (data) {
                                            resolve(data);
                                        });
                                    } else {
                                        // Update Lives for User
                                        if (userLifeDetails.livesCompleted != undefined) {
                                            userLifeDetails.livesCompleted = Number(userLifeDetails.livesCompleted) + 1;
                                            user.livesCompleted = userLifeDetails.livesCompleted;
                                            if (userLifeDetails.remCoolingTime) {
                                                user.remCoolingTime = userLifeDetails.remCoolingTime;
                                            }
                                        }

                                        // Update Firebase : async
                                        ref.update({
                                            attempts: {
                                                livesCompleted: userLifeDetails.livesCompleted,
                                                timeStamp: new Date() + ""
                                            }
                                        });


                                        if (!userData.isSinglePlayer && userData.level > params.game.level) {
                                            if (params.game.answer != "*") {
                                                user.isTeamNextLevel = true;
                                            }
                                        }

                                        _this.constructQuestionResponse(gameData.question, user).then(function (result) {
                                            resolve(result);
                                        });
                                    }
                                } else {
                                    // User is in Cooling Period
                                    user = { ...user, ...userLifeDetails };
                                    _this.constructQuestionResponse(gameData.question, user).then(function (result) {
                                        resolve(result);
                                    });
                                }
                            } else {
                                userData.isNextLevel = false;

                                _this.constructQuestionResponse({}, userData).then(function (result) {
                                    resolve(result);
                                });
                            }

                        });
                    } else {

                        _this.constructQuestionResponse(undefined, {
                            error: new ErrorModel(MESSAGES.ERROR.INVALID_TOKEN.CODE, MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                        }).then(function (result) {
                            resolve(result);
                        });
                    }
                });
            } else {
                _this.constructQuestionResponse(undefined, {
                    error: new ErrorModel(MESSAGES.ERROR.INVALID_TOKEN.CODE, MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                }).then(function (result) {
                    resolve(result);
                });
            }
        });
    }

    /**
     * Method : getMilestoneBoard
     * Desc   : Get Milestone Board
     */
    public getMilestoneBoard() {
        var ref = this.firebaseDB.ref(CONSTANTS.SERVICES.MILESTONE);
        return new Promise((resolve, reject) => {
            let milestoneBoard: any = {};
            ref.once("value", function (snapshot: any) {
                let milestones = snapshot.val();
                for (let level in milestones) {
                    let mLevel = milestones[level];
                    milestoneBoard[level] = [];
                    for (let user in mLevel) {
                        milestoneBoard[level].push(mLevel[user]);
                    }
                }
                resolve(milestoneBoard);
            });
        });
    }


    /**
     * Method : getLeaderBoard
     * Desc   : Get Leader Board by Milestone
     * Code is Mess Need to Work On 
     * Hot Fix
     */
    public async _getLeaderBoardByMilestone() {
        let allMilestones: Object = await this.getMilestoneBoard();

        let userList = {};
        let rankedList = [];

        try {
            for (let i = CONSTANTS.GAME.LEVELS; i > 0; i--) {
                let levelObj = allMilestones['level_' + i];
                if (levelObj) {
                    for (let j = 0; j < levelObj.length; j++) {
                        let existingItem = rankedList.filter(item => item.id == levelObj[j].id);
                        if (existingItem.length == 0) {
                            levelObj[j].orderId = rankedList.length;
                            rankedList.push(levelObj[j]);
                        }
                    }
                }
            }

            for (let i = 0; i < rankedList.length; i++) {
                userList[rankedList[i].id] = rankedList[i]
            }

        } catch (e) {

        }

        return userList;
    }

    /**
     * Method : getLeaderBoard
     * Desc   : Get Leader Board
     * Code is Mess Need to Work On 
     * Hot Fix
     */
    private async getLeaderBoard() {

        const usersListByMilestone = await this._getLeaderBoardByMilestone();

        var ref = this.firebaseDB.ref(CONSTANTS.SERVICES.USERS);
        return new Promise((resolve, reject) => {
            let users: any, userList: any = [], rankedList: any = [];
            ref.once("value", function (snapshot: any) {
                users = snapshot.val();
                for (let key in users) {
                    if (users.hasOwnProperty(key)) {
                        let user = users[key];
                        if (usersListByMilestone[user.id]) {
                            user.orderId = usersListByMilestone[user.id].orderId;
                        } else {
                            user.orderId = 99999;
                        }

                        userList.push(user);
                    }
                }


                // Sort By Rankings
                userList.sort(function (a: any, b: any) {
                    let val = b.level - a.level;

                    // Sort By Level
                    if (val !== 0) {
                        return val;
                    }

                    // Sort By Date/Time
                    let dateA: any = new Date(a.completedOn);
                    let dateB: any = new Date(b.completedOn);

                    if (dateA - dateB !== 0) {
                        return dateA - dateB;
                    }

                    return a.orderId - b.orderId

                });

                for (let i = 0; i < userList.length; i++) {
                    let user = {
                        name: userList[i].name,
                        rank: i + 1,
                        level: userList[i].level,
                        picUrl: userList[i].picUrl,
                        isGameCompleted: userList[i].isGameCompleted,
                        id: userList[i].id,
                        members: []
                    };

                    if (!userList[i].isSinglePlayer) {
                        user.members = userList[i].members;
                    }
                    rankedList.push(user);
                }
                resolve(rankedList);
            });
        });
    }



    /**
     * Method : getAchievements
     */
    public async getAchievements() {
        let leaderBoard, milestoneBoard: any = {};
        if (CONSTANTS.GAME.ENABLE_LEADER_BOARD) {
            leaderBoard = await this.getLeaderBoard();
        }
        if (CONSTANTS.GAME.ENABLE_MILESTONE) {
            for (let i in CONSTANTS.GAME.MILESTONE_LEVELS) {
                let mLevel = CONSTANTS.GAME.MILESTONE_LEVELS[i];
                milestoneBoard[mLevel] = [];
            }
            let allMilestones: Object = await this.getMilestoneBoard();

            for (let level in allMilestones) {
                if (CONSTANTS.GAME.MILESTONE_LEVELS.indexOf(level) >= 0) {
                    milestoneBoard[level] = allMilestones[level];
                }
            }
        }
        return {
            leaderBoard, milestoneBoard
        }
    }

    /**
     * Method : getRules
     * Desc   : Get Rules
     */
    public getRules() {
        var ref = this.firebaseDB.ref(CONSTANTS.SERVICES.RULES);
        return new Promise((resolve, reject) => {
            ref.once("value", function (snapshot: any) {
                let rules = snapshot.val();
                resolve(rules);
            });
        });
    }
}