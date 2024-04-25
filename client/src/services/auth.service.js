import userApiClient from "./api.service";

class userService{
    constructor (baseURL = "/api/user"){
        this.api = userApiClient(baseURL);
    }

    async login(data){
        return (await this.api.post("/login",data)).data;
    }

    async signup(data){
        return (await this.api.post("/register",data)).data;
    }

    async current(token) {
        try {
            // Gửi token về máy chủ trong phần header
            const response = await this.api.get("/current", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error occurred during fetching current user:", error);
            throw error;
        }
    }
}

export default new userService();