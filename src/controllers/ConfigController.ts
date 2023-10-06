import ConfigService from '../services/ConfigService';

export default class ConfigController{
    private configService: ConfigService;

    constructor(){
        this.configService = new ConfigService();
    }

    /**
     * Method : getUserData
     * @param user 
     * @param isFromLogin 
     */
    public async syncConfigurations(){
        let data = await this.configService.syncConfigurations();
        return data;
    }
}