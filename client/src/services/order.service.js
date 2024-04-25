import createApiClient from "./api.service";
class orderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getProductChart(){
        return (await this.api.get(`/count-product`)).data;
    }
    async getTotal() {
        return (await this.api.get(`/total-sales-chart`)).data;
    }
    async getTotalByDate(data) {
        return (await this.api.get(`/total-sales/${data}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async createOrderUser(data) {
        return (await this.api.post("/add-order-user", data)).data;
    }
    async getOrderUser(data) {
        console.log(data)
        if(data){
            return (await this.api.get(`/add-order-user/${data}`)).data;
        }
        return (await this.api.get("/add-order-user")).data;
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
        return (await this.api.delete(`/product/${id}`)).data;
    }
    async search(id) {
        return (await this.api.get(`/search/${id}`)).data;
    }
    async getOrderByDate(id) {
        return (await this.api.get(`/orderbydate/${id}`)).data;
    }
}
export default new orderService();
