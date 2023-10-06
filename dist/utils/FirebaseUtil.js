"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FIREBASE = require("firebase-admin");
var constants_1 = require("../constants");
var FirebaseUtil = /** @class */ (function () {
    function FirebaseUtil() {
    }
    /**
     * Method : getFirebaseDB
     * Desc   : Return Firebase DB instance
     */
    FirebaseUtil.getFirebaseDB = function () {
        if (FirebaseUtil.firebaseDB === undefined) {
            FIREBASE.initializeApp({
                credential: FIREBASE.credential.cert(constants_1.CONSTANTS.FIREBASE_SDK),
                databaseURL: constants_1.CONSTANTS.FIREBASE_URL
            });
            FirebaseUtil.firebaseDB = FIREBASE.database();
        }
        return FirebaseUtil.firebaseDB;
    };
    FirebaseUtil.firebaseDB = undefined;
    return FirebaseUtil;
}());
exports.default = FirebaseUtil;
