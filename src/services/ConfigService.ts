import FirebaseUtil from '../utils/FirebaseUtil';
import { CONSTANTS } from "../constants";

export default class ConfigService{
    private firebaseDB: any;
    constructor(){
        this.firebaseDB = FirebaseUtil.getFirebaseDB();
    }

    /**
     * Method : syncConfigurations
     * Desc   : Sync Local Configurations with Firebase Data
     */
    public async syncConfigurations(){
        var configRef = this.firebaseDB.ref(CONSTANTS.SERVICES.CONFIG);
        return new Promise((resolve, reject) => {
            configRef.once("value", async (snapshot) => {
                let configData = snapshot.val();
                
                CONSTANTS.GAME = {
                    PLAYING_STATUS: configData.playingStatus,
                    MAINTENANCE_STATUS: configData.maintenanceStatus,
                    LEVELS: configData.gameLevels,
                    IS_TEAM_EVENT: configData.isTeamEvent,
                    ENABLE_MILESTONE: configData.enableMilestone,
                    ENABLE_LEADER_BOARD: configData.enableLeaderBoard,
                    MILESTONE_LEVELS: configData.milestoneLevels,
                    ZONES: configData.zones
                }

                resolve(CONSTANTS.GAME);
            });
        });
    }
}