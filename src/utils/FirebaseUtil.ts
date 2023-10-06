
const FIREBASE = require("firebase-admin");
import { CONSTANTS } from "../constants";

export default class FirebaseUtil{
    private static firebaseDB : any = undefined;
    
    constructor(){
        
    }

    /**
     * Method : getFirebaseDB
     * Desc   : Return Firebase DB instance
     */
    public static getFirebaseDB(){
        if(FirebaseUtil.firebaseDB === undefined){
            FIREBASE.initializeApp({
                credential: FIREBASE.credential.cert(CONSTANTS.FIREBASE_SDK),
                databaseURL: CONSTANTS.FIREBASE_URL
            });
            FirebaseUtil.firebaseDB = FIREBASE.database();
        }
        return FirebaseUtil.firebaseDB;
        
    }
}