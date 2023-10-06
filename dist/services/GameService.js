"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var messages_1 = require("../messages");
var FirebaseUtil_1 = __importDefault(require("../utils/FirebaseUtil"));
var EncryptUtil_1 = __importDefault(require("../utils/EncryptUtil"));
var GameConfig_1 = __importDefault(require("../models/GameConfig"));
var ErrorModel_1 = __importDefault(require("../models/ErrorModel"));
var GameService = /** @class */ (function () {
    function GameService() {
        this.firebaseDB = FirebaseUtil_1.default.getFirebaseDB();
        this.encryptUtil = new EncryptUtil_1.default();
    }
    /**
     * constructLoginResponse
     * @param user
     */
    GameService.prototype.constructLoginResponse = function (user) {
        return {
            id: user.id,
            name: user.name,
            token: user.token,
            picUrl: user.picUrl
        };
    };
    /**
     * Method : constructQuestionResponse
     * @param question
     * @param user
     */
    GameService.prototype.constructQuestionResponse = function (question, user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this, userData, clues, gameConfig, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        userData = {
                            level: user.level
                        };
                        if (!(constants_1.CONSTANTS.GAME.PLAYING_STATUS == true && constants_1.CONSTANTS.GAME.MAINTENANCE_STATUS == false)) return [3 /*break*/, 2];
                        if (user.error) {
                            userData = {
                                error: user.error
                            };
                        }
                        else {
                            userData = __assign({}, userData, { isNextLevel: user.isNextLevel, isTeamNextLevel: user.isTeamNextLevel, isGameCompleted: user.isGameCompleted, livesCompleted: user.livesCompleted, remCoolingTime: user.remCoolingTime, nextZoneStartTime: user.nextZoneStartTime });
                        }
                        if (user.isNewUser) {
                            userData.isNewUser = true;
                        }
                        return [4 /*yield*/, _this.getClues(user.level)];
                    case 1:
                        clues = _a.sent();
                        if (question) {
                            if (clues && clues.length > 0)
                                question.clues = clues;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        // console.log("here");
                        question = undefined;
                        _a.label = 3;
                    case 3:
                        gameConfig = new GameConfig_1.default(constants_1.CONSTANTS.GAME.PLAYING_STATUS, constants_1.CONSTANTS.GAME.MAINTENANCE_STATUS);
                        game = {
                            question: question,
                            user: userData,
                            gameConfig: gameConfig
                        };
                        return [2 /*return*/, (game)];
                }
            });
        });
    };
    /**
     * Method : getQuestion
     * @param level
     */
    GameService.prototype.getQuestion = function (level) {
        if (level === void 0) { level = 1; }
        var ref = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.GAME).child("level_" + level);
        return new Promise(function (resolve, reject) {
            ref.once("value", function (snapshot) {
                // console.log(snapshot.val());
                var gameData = snapshot.val();
                if (gameData !== null) {
                    resolve(gameData.question);
                }
                else {
                    resolve(null);
                }
            });
        });
    };
    /**
     * Method : getUserLifeDetails
     * @param user
     * @param question
     */
    GameService.prototype.getUserLifeDetails = function (userData, question, isFromGetUserData) {
        if (isFromGetUserData === void 0) { isFromGetUserData = false; }
        var userAttempts = userData.attempts, livesCompleted = 1, hasLife = true, remCoolingTime;
        if (userAttempts) {
            livesCompleted = userAttempts.livesCompleted;
        }
        hasLife = userAttempts.livesCompleted < question.attempts.lives;
        if (!hasLife) {
            // Secondary check whether cooling period has elapsed
            var userLastAttemptTime = new Date(userData.attempts.timeStamp).getTime();
            var currentTime = new Date().getTime();
            var elapsedTime = userLastAttemptTime + question.attempts.coolingPeriod;
            if (elapsedTime < currentTime) {
                hasLife = true;
                livesCompleted = 0;
            }
            else {
                livesCompleted = question.attempts.lives - 1;
                remCoolingTime = elapsedTime - currentTime;
            }
        }
        else {
            if (userAttempts.livesCompleted === question.attempts.lives - 1 && !isFromGetUserData) {
                remCoolingTime = question.attempts.coolingPeriod;
            }
        }
        return {
            hasLife: hasLife, livesCompleted: livesCompleted, remCoolingTime: remCoolingTime
        };
    };
    /**
     * Method : incrementUserLevelAndFetchNextQuestion
     * Desc   : Incrementing User Level and Getting Next Question
     * @param user
     */
    GameService.prototype.incrementUserLevelAndFetchNextQuestion = function (user) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            user.isGameCompleted = false;
            user.isNextLevel = false;
            user.completedOn = (new Date()) + "";
            if (user.level === constants_1.CONSTANTS.GAME.LEVELS) {
                user.isGameCompleted = true;
            }
            else {
                user.isNextLevel = true;
            }
            // 1. Update Milestone
            _this.logMilestoneMeter(user);
            // 2. Update User
            user.level = Number(user.level) + 1;
            var ref = _this_1.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.USERS).child(user.id);
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
                var zonedLevel = constants_1.CONSTANTS.GAME.ZONES["level_" + user.level];
                if (zonedLevel !== undefined) {
                    // Check whether Zone is Open or not
                    if (new Date(zonedLevel) > new Date()) {
                        user.nextZoneStartTime = zonedLevel;
                        _this.constructQuestionResponse(undefined, user).then(function (result) {
                            resolve(result);
                        });
                    }
                }
                _this_1.getQuestion(user.level).then(function (question) {
                    user.livesCompleted = 0;
                    _this.constructQuestionResponse(question, user).then(function (result) {
                        resolve(result);
                    });
                });
            }
            else {
                _this_1.constructQuestionResponse(null, user).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    /**
     * Method logMilestoneMeter
     * @param userId
     * @param level
     */
    GameService.prototype.logMilestoneMeter = function (user) {
        var ref_milestone = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.MILESTONE).child("level_" + user.level);
        ref_milestone.push({
            id: user.id,
            name: user.name,
            picUrl: user.picUrl || "",
            completedOn: new Date() + ""
        });
    };
    /**
     * Method : getClues
     * @param level
     */
    GameService.prototype.getClues = function (level) {
        var ref = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.CLUES).child("level_" + level);
        return new Promise(function (resolve, reject) {
            ref.once("value", function (snapshot) {
                var clues = snapshot.val();
                resolve(clues);
            });
        });
    };
    /**
     * Method : filterUser
     * @param user
     */
    GameService.prototype.filterUser = function (user) {
        user.isSinglePlayer = true;
        if (constants_1.CONSTANTS.GAME.IS_TEAM_EVENT) {
            var ref_team = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.TEAMS);
            return new Promise(function (resolve, reject) {
                ref_team.once("value", function (snapshot) {
                    var teamData = snapshot.val();
                    if (teamData != null) {
                        teamData = Object.values(teamData);
                        for (var i = 0; i < teamData.length; i++) {
                            for (var j = 0; j < teamData[i].members.length; j++) {
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
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve(user);
            });
        }
    };
    /**
     * Method : getLoggedInUserData
     * @param user
     * @param isFromLogin - Optional, To be passed when called from login
     */
    GameService.prototype.getUserData = function (user, isFromLogin) {
        var _this = this;
        if (isFromLogin && isFromLogin === true) {
            // If Login, Search for encrypted id
            user.token = this.encryptUtil.encryptUser(user.id);
        }
        else {
            // If Not Login, get decrypted id
            user.id = this.encryptUtil.decryptUser(user.token);
        }
        return new Promise(function (resolve, reject) {
            _this.filterUser(user).then(function (user) {
                if (isFromLogin && isFromLogin === true) {
                    user.token = _this.encryptUtil.encryptUser(user.id);
                }
                // Comments: Doesn't matter whether it is a team or single player, in Firebase it is one user
                var ref = _this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.USERS).child(user.id);
                ref.once("value", function (snapshot) {
                    var userData = snapshot.val();
                    if (userData === null) {
                        if (isFromLogin) {
                            // 1. Add isGameCompleted, level to New User
                            user.isGameCompleted = false;
                            user.level = 1;
                            user.completedOn = (new Date()) + "";
                            user.attempts = {
                                livesCompleted: 0,
                                timeStamp: new Date() + ""
                            };
                            // 2. Push this User to Firebase
                            ref.set(user);
                            resolve(_this.constructLoginResponse(user));
                        }
                        else {
                            _this.constructQuestionResponse(undefined, {
                                error: new ErrorModel_1.default(messages_1.MESSAGES.ERROR.INVALID_TOKEN.CODE, messages_1.MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                            }).then(function (result) {
                                resolve(result);
                            });
                        }
                    }
                    else {
                        // Update token if it is a new login
                        if (isFromLogin && isFromLogin === true) {
                            ref.update({
                                token: user.token
                            });
                            userData.token = user.token;
                            resolve(_this.constructLoginResponse(userData));
                        }
                        else {
                            // If not login, check whether existing token matches else redirect to login
                            if (user.token !== userData.token) {
                                _this.constructQuestionResponse(undefined, {
                                    error: new ErrorModel_1.default(messages_1.MESSAGES.ERROR.INVALID_TOKEN.CODE, messages_1.MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                                }).then(function (result) {
                                    resolve(result);
                                });
                            }
                        }
                        userData.isNextLevel = false;
                        if (userData.isGameCompleted === false) {
                            var zonedLevel = constants_1.CONSTANTS.GAME.ZONES["level_" + userData.level];
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
                                var userLifeDetails = _this.getUserLifeDetails(userData, question, true);
                                userData = __assign({}, userData, userLifeDetails);
                                _this.constructQuestionResponse(question, userData).then(function (result) {
                                    resolve(result);
                                });
                            });
                        }
                        else {
                            _this.constructQuestionResponse({}, userData).then(function (result) {
                                resolve(result);
                            });
                        }
                    }
                });
            });
        });
    };
    /**
     * Method : checkAnswer
     * Desc   : Check Answer
     * @param params
     */
    GameService.prototype.checkAnswer = function (params) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            params.user.id = _this_1.encryptUtil.decryptUser(params.user.token);
            if (params.user.id.length > 0) {
                var ref = _this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.USERS).child(params.user.id);
                ref.once("value", function (snapshot) {
                    var userData = snapshot.val();
                    if (userData !== null && params.user.token === userData.token) {
                        var ref_game = _this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.GAME).child("level_" + userData.level);
                        ref_game.once("value", function (snapshot) {
                            var gameData = snapshot.val();
                            if (gameData && gameData.answers) {
                                // Check whether user has to wait till the cooling period has ended
                                var user = {
                                    level: userData.level,
                                    isNextLevel: false,
                                    isGameCompleted: false
                                };
                                var userLifeDetails = _this.getUserLifeDetails(userData, gameData.question);
                                if (userLifeDetails.hasLife) {
                                    var answers = gameData.answers;
                                    var correctAnswer = false;
                                    for (var i = 0; i < answers.length; i++) {
                                        if (answers[i] === params.game.answer) {
                                            correctAnswer = true;
                                            break;
                                        }
                                    }
                                    // Push Answer Log
                                    var answerLog = {
                                        id: userData.id,
                                        level: userData.level,
                                        ans: params.game.answer
                                    };
                                    var ref_answer = _this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.ANSWERS);
                                    ref_answer.push(answerLog);
                                    if (correctAnswer === true) {
                                        _this.incrementUserLevelAndFetchNextQuestion(userData).then(function (data) {
                                            resolve(data);
                                        });
                                    }
                                    else {
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
                                }
                                else {
                                    // User is in Cooling Period
                                    user = __assign({}, user, userLifeDetails);
                                    _this.constructQuestionResponse(gameData.question, user).then(function (result) {
                                        resolve(result);
                                    });
                                }
                            }
                            else {
                                userData.isNextLevel = false;
                                _this.constructQuestionResponse({}, userData).then(function (result) {
                                    resolve(result);
                                });
                            }
                        });
                    }
                    else {
                        _this.constructQuestionResponse(undefined, {
                            error: new ErrorModel_1.default(messages_1.MESSAGES.ERROR.INVALID_TOKEN.CODE, messages_1.MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                        }).then(function (result) {
                            resolve(result);
                        });
                    }
                });
            }
            else {
                _this.constructQuestionResponse(undefined, {
                    error: new ErrorModel_1.default(messages_1.MESSAGES.ERROR.INVALID_TOKEN.CODE, messages_1.MESSAGES.ERROR.INVALID_TOKEN.MESSAGE)
                }).then(function (result) {
                    resolve(result);
                });
            }
        });
    };
    /**
     * Method : getMilestoneBoard
     * Desc   : Get Milestone Board
     */
    GameService.prototype.getMilestoneBoard = function () {
        var ref = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.MILESTONE);
        return new Promise(function (resolve, reject) {
            var milestoneBoard = {};
            ref.once("value", function (snapshot) {
                var milestones = snapshot.val();
                for (var level in milestones) {
                    var mLevel = milestones[level];
                    milestoneBoard[level] = [];
                    for (var user in mLevel) {
                        milestoneBoard[level].push(mLevel[user]);
                    }
                }
                resolve(milestoneBoard);
            });
        });
    };
    /**
     * Method : getLeaderBoard
     * Desc   : Get Leader Board by Milestone
     * Code is Mess Need to Work On
     * Hot Fix
     */
    GameService.prototype._getLeaderBoardByMilestone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allMilestones, userList, rankedList, _loop_1, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMilestoneBoard()];
                    case 1:
                        allMilestones = _a.sent();
                        userList = {};
                        rankedList = [];
                        try {
                            _loop_1 = function (i) {
                                var levelObj = allMilestones['level_' + i];
                                if (levelObj) {
                                    var _loop_2 = function (j) {
                                        var existingItem = rankedList.filter(function (item) { return item.id == levelObj[j].id; });
                                        if (existingItem.length == 0) {
                                            levelObj[j].orderId = rankedList.length;
                                            rankedList.push(levelObj[j]);
                                        }
                                    };
                                    for (var j = 0; j < levelObj.length; j++) {
                                        _loop_2(j);
                                    }
                                }
                            };
                            for (i = constants_1.CONSTANTS.GAME.LEVELS; i > 0; i--) {
                                _loop_1(i);
                            }
                            for (i = 0; i < rankedList.length; i++) {
                                userList[rankedList[i].id] = rankedList[i];
                            }
                        }
                        catch (e) {
                        }
                        return [2 /*return*/, userList];
                }
            });
        });
    };
    /**
     * Method : getLeaderBoard
     * Desc   : Get Leader Board
     * Code is Mess Need to Work On
     * Hot Fix
     */
    GameService.prototype.getLeaderBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersListByMilestone, ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getLeaderBoardByMilestone()];
                    case 1:
                        usersListByMilestone = _a.sent();
                        ref = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.USERS);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var users, userList = [], rankedList = [];
                                ref.once("value", function (snapshot) {
                                    users = snapshot.val();
                                    for (var key in users) {
                                        if (users.hasOwnProperty(key)) {
                                            var user = users[key];
                                            if (usersListByMilestone[user.id]) {
                                                user.orderId = usersListByMilestone[user.id].orderId;
                                            }
                                            else {
                                                user.orderId = 99999;
                                            }
                                            userList.push(user);
                                        }
                                    }
                                    // Sort By Rankings
                                    userList.sort(function (a, b) {
                                        var val = b.level - a.level;
                                        // Sort By Level
                                        if (val !== 0) {
                                            return val;
                                        }
                                        // Sort By Date/Time
                                        var dateA = new Date(a.completedOn);
                                        var dateB = new Date(b.completedOn);
                                        if (dateA - dateB !== 0) {
                                            return dateA - dateB;
                                        }
                                        return a.orderId - b.orderId;
                                    });
                                    for (var i = 0; i < userList.length; i++) {
                                        var user = {
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
                            })];
                }
            });
        });
    };
    /**
     * Method : getAchievements
     */
    GameService.prototype.getAchievements = function () {
        return __awaiter(this, void 0, void 0, function () {
            var leaderBoard, milestoneBoard, i, mLevel, allMilestones, level;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        milestoneBoard = {};
                        if (!constants_1.CONSTANTS.GAME.ENABLE_LEADER_BOARD) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getLeaderBoard()];
                    case 1:
                        leaderBoard = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!constants_1.CONSTANTS.GAME.ENABLE_MILESTONE) return [3 /*break*/, 4];
                        for (i in constants_1.CONSTANTS.GAME.MILESTONE_LEVELS) {
                            mLevel = constants_1.CONSTANTS.GAME.MILESTONE_LEVELS[i];
                            milestoneBoard[mLevel] = [];
                        }
                        return [4 /*yield*/, this.getMilestoneBoard()];
                    case 3:
                        allMilestones = _a.sent();
                        for (level in allMilestones) {
                            if (constants_1.CONSTANTS.GAME.MILESTONE_LEVELS.indexOf(level) >= 0) {
                                milestoneBoard[level] = allMilestones[level];
                            }
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            leaderBoard: leaderBoard, milestoneBoard: milestoneBoard
                        }];
                }
            });
        });
    };
    /**
     * Method : getRules
     * Desc   : Get Rules
     */
    GameService.prototype.getRules = function () {
        var ref = this.firebaseDB.ref(constants_1.CONSTANTS.SERVICES.RULES);
        return new Promise(function (resolve, reject) {
            ref.once("value", function (snapshot) {
                var rules = snapshot.val();
                resolve(rules);
            });
        });
    };
    return GameService;
}());
exports.default = GameService;
