import GameService from "../services/GameService";
import UserAuthModel from "../models/SiriusWalletUserModel";

export default class GameController{
    private gameService : any;

    constructor(){
        this.gameService = new GameService();
    }

    /**
     * Method : getUserData
     * @param user 
     * @param isFromLogin 
     */
    public async getUserData(user : Object, isFromLogin : Boolean){
        let data = await this.gameService.getUserData(user, isFromLogin);
        return data;
    }

    /**
     * Method : checkAnswer
     * @param params 
     */
    public async checkAnswer(params){
        let data = await this.gameService.checkAnswer(params);
        return data;
    }

    /**
     * Method : getAchievements
     */
    public async getAchievements(){
        let data = await this.gameService.getAchievements();
        return data;
    }

    /**
     * Method : getRules
     */
    public async getRules(){
        let data = await this.gameService.getRules();
        return data;
    }
}