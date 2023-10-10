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
            email: params.email, 
            password: params.password 
        };
        let loginResponse = await this.loginService.loginUser(user);
        if(loginResponse.isSuccess){
            // Authentication Success
            let user: User = {
                id: loginResponse.employeeId.toString(),
                name: loginResponse.name,
                // picUrl: CONSTANTS.SIRIUS_WALLET_IP + "/" + loginResponse.data.user.avatar
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