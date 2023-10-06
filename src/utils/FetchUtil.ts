import fetch from 'isomorphic-unfetch';

export default class Fetch{
    /**
     * Method get
     * @param url 
     * @param jsonToStringify 
     */
    static async get(url: any, req: any){
        let options: any = {
            method: 'GET',
            credentials: 'include'
        };

        return await fetch(url, options);
    }

    /**
     * Method post
     * @param url 
     * @param jsonToStringify 
     */
    static async post(url: any, jsonToStringify: any)
    {
        let options: any = {
            method:'POST',
            body: JSON.stringify(jsonToStringify),
            headers: {
                "Content-Type": "application/json"
            }
        };

        return await fetch(url, options);
    }
}