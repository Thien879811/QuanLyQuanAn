import createApiClient from "./api.service";
class storeService {
    constructor(baseUrl = "/api/store") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getDate() {
        return (await this.api.get("/store-date/get")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async getAllByDate(date) {
        return (await this.api.get(`/${date}`)).data;
    }
}
export default new storeService();
