import LoginService from '../services/LoginService';
import GameController from './GameController';
import User from '../models/User';
import SiriusWalletUserModel from '../models/SiriusWalletUserModel';
import { CONSTANTS } from '../constants';

export default class LoginController{
    private loginService: LoginService;
    private gameController: GameController;

    constructor(){
        this.loginService = new LoginService();
        this.gameController = new GameController();
    }

    /**
     * Method : loginUser
     * @param params 
     */
    public async loginUser(params: SiriusWalletUserModel){
        let user : SiriusWalletUserModel = { 
            userId: params.userId, 
            pin: params.pin 
        };
        let loginResponse = await this.loginService.loginUser(user);
        if(loginResponse.isSuccess){
            // Authentication Success
            let user: User = {
                id: loginResponse.data.user.userId,
                name: loginResponse.data.user.name,
                picUrl: CONSTANTS.SIRIUS_WALLET_IP + "/" + loginResponse.data.user.avatar
            };

            // Send Question
            let data = await this.gameController.getUserData(user, true);
            return data;
        }
        else{
            // Authentication Failure
            return loginResponse;
        }
    }
}