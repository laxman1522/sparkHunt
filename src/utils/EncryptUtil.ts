export default class EncryptUtil{
    /**
     * Variable : hashMap
     * Desc   : Mapping Key for Encryption
     */
    private hashMap = new Map([
        [ "0" , "n54ir"],
        [ "1" , "y7ml3"],
        [ "2" , "zer1f"],
        [ "3" , "2zx3u"],
        [ "4" , "dp0se"],
        [ "5" , "60imr"],
        [ "6" , "1k3aq"],
        [ "7" , "mz54r"],
        [ "8" , "h1y3a"],
        [ "9" , "c9y8a"]
    ]);

    /**
     * Variable : reverseHashMap
     * Desc     : For storing reverse map, easy to get data 
     */
    private reverseHashMap = new Map();

    constructor(){
        this.constructReverseHashMap();
    }

    /**
     * Method : constructReverseHashMap
     * Desc   : Construct Reverse Hash Map from the existing map to decrypt values
     * Why    : Space Complexity is better than Time here, instead of iterating everytime
     */
    private constructReverseHashMap(){
        let keys = Array.from(this.hashMap.keys());
        for (let key of keys) {
            this.reverseHashMap.set(this.hashMap.get(key), key);
        }
    }

    /**
     * Method : encryptUser
     * Desc   : Encrypt User ID
     */
    public encryptUser(userId : String){
        let encryptedWord = (Math.floor(Math.random() * 90000) + 10000).toString();
        for(let i = 0 ; i < userId.length ; i++){
            encryptedWord += this.hashMap.get(userId.charAt(i));
        }
        
        // Append Random 10 Digits
        encryptedWord += Math.floor(Math.random() * 9000000000) + 1000000000;

        return encryptedWord;
    }

    /**
     * Method : decryptUser
     * @param encryptedWord 
     */
    public  decryptUser(encryptedWord: String){
        let decryptedWord = "";
        // Removing first 5 and last 10 digits as they are random numbers
        for(let i = 5 ; i < encryptedWord.length - 10 ; i){
            let j = 0;
            let hashValue = "";
            while(j < 5){
                hashValue += encryptedWord[i];
                i++; j++;
            }
            decryptedWord += this.reverseHashMap.get(hashValue);
        }
        return decryptedWord;
    }
}