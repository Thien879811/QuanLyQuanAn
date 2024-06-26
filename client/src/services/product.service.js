import createApiClient from "./api.service";
class productService {
    constructor(baseUrl = "/api/product") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
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
    async getCategory(){
        return (await this.api.get(`/search`)).data;
    }
    async getDateSearch(data){
        return (await this.api.post(`/search`,data)).data;
    }
}
export default new productService();
