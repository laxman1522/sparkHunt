import FetchUtil from '../utils/FetchUtil';
import { CONSTANTS } from '../constants';
import SiriusWalletUserModel from '../models/SiriusWalletUserModel';

export default class LoginService{
    
    constructor(){
       
    }

    /**
     * Method : loginUser
     * Desc   : Login with Sirius Wallet Credentials
     * @param user 
     */
    public async loginUser(user: SiriusWalletUserModel){
        let authenticationResponse = await FetchUtil.post(CONSTANTS.SERVICES.LOGIN, user);
        let authenticationResponseJson = await authenticationResponse.json();
      
        return authenticationResponseJson;
    }
}