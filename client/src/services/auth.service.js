import userApiClient from "./api.service";

class userService{
    constructor (baseURL = "/api/user"){
        this.api = userApiClient(baseURL);
    }

    async login(data){
        return (await this.api.post("/login",data)).data;
    }
}

export default new userService();