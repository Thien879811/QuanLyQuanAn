import createApiClient from "./api.service";
class orderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getTotal(data) {
        if(data) return (await this.api.get(`/total-sales/${data}`)).data;
        return (await this.api.get(`/total-sales`)).data;
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
    async search(id) {
        return (await this.api.get(`/search/${id}`)).data;
    }
}
export default new orderService();
