"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncryptUtil = /** @class */ (function () {
    function EncryptUtil() {
        /**
         * Variable : hashMap
         * Desc   : Mapping Key for Encryption
         */
        this.hashMap = new Map([
            ["0", "n54ir"],
            ["1", "y7ml3"],
            ["2", "zer1f"],
            ["3", "2zx3u"],
            ["4", "dp0se"],
            ["5", "60imr"],
            ["6", "1k3aq"],
            ["7", "mz54r"],
            ["8", "h1y3a"],
            ["9", "c9y8a"]
        ]);
        /**
         * Variable : reverseHashMap
         * Desc     : For storing reverse map, easy to get data
         */
        this.reverseHashMap = new Map();
        this.constructReverseHashMap();
    }
    /**
     * Method : constructReverseHashMap
     * Desc   : Construct Reverse Hash Map from the existing map to decrypt values
     * Why    : Space Complexity is better than Time here, instead of iterating everytime
     */
    EncryptUtil.prototype.constructReverseHashMap = function () {
        var keys = Array.from(this.hashMap.keys());
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.reverseHashMap.set(this.hashMap.get(key), key);
        }
    };
    /**
     * Method : encryptUser
     * Desc   : Encrypt User ID
     */
    EncryptUtil.prototype.encryptUser = function (userId) {
        var encryptedWord = (Math.floor(Math.random() * 90000) + 10000).toString();
        for (var i = 0; i < userId.length; i++) {
            encryptedWord += this.hashMap.get(userId.charAt(i));
        }
        // Append Random 10 Digits
        encryptedWord += Math.floor(Math.random() * 9000000000) + 1000000000;
        return encryptedWord;
    };
    /**
     * Method : decryptUser
     * @param encryptedWord
     */
    EncryptUtil.prototype.decryptUser = function (encryptedWord) {
        var decryptedWord = "";
        // Removing first 5 and last 10 digits as they are random numbers
        for (var i = 5; i < encryptedWord.length - 10; i) {
            var j = 0;
            var hashValue = "";
            while (j < 5) {
                hashValue += encryptedWord[i];
                i++;
                j++;
            }
            decryptedWord += this.reverseHashMap.get(hashValue);
        }
        return decryptedWord;
    };
    return EncryptUtil;
}());
exports.default = EncryptUtil;
