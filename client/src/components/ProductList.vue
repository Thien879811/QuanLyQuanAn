<template>
   
    <v-table height="600px"  fixed-header>
        <thead>
        <tr >
            <th class="text-left">
            Name
            </th>
            <th class="text-left">
            Price
            </th>
            <th class="text-left">
            Quantity
            </th>
            <th class="text-left">
            Total
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="product in productTable">
                <td>{{ product.productName }}</td>
                <td>{{ product.price }}</td>
                <td>
                    <button class="btn"@click="disincreased(product)">-</button>
                    {{ product.quantity }}
                    <button class="btn" @click="increased(product)">+</button>
                </td>
                <td>{{ product.quantity*product.price }}</td>
            </tr>
        </tbody>
       
    </v-table>
    
    <div class="tongcong">
        <h4> Tổng cộng : {{ sumOrder }}</h4>
        <div>
        <button @click="updataOrder()" class="btn btn-primary mt-2 btn-thanhtoan">Thanh toán</button>
        </div>
    </div>
</template>
<script>
import orderService from "@/services/order.service";
    export default{
        props:{
            table_id: { type: String},
        },
        watch:{
            table_id(){
                this.getOrder();
            },
        },
        data(){
            return{
                orders: null,
                productTable:null,
                message:'',
                sumOrder:0,
            }
        },
        methods:{

                async getOrder(){
                    try{
                        console.log(this.table_id);
                        this.orders = await orderService.search(this.table_id);
                        this.productTable = this.orders.product;
                        console.log(this.productTable)
                    }catch(err){
                        this.productTable=[];
                        console.log(err);
                    }

                    this.sumOrders()
                },

                async increased(product){

                    this.orders.product.forEach(pd => {
                       if(pd._id === product._id){
                        pd.quantity ++;
                        return;
                       }
                    });

                    try{
                        await order.updata(this.orders._id,this.orders)
                    }catch(err){
                        console.log(err)
                    }

                    this.sumOrders();
                },

                async disincreased(product){

                    this.orders.product.forEach(pd => {
                        if(pd._id === product._id){
                            if(pd.quantity == 1){
                                return;
                            }
                            pd.quantity --;
                            return;
                        }
                    });

                    try{
                        await order.updata(this.orders._id,this.orders)
                    }catch(err){
                        console.log(err)
                    }

                    this.sumOrders();
                },

                sumOrders(){
                    let sum = 0;
                    this.orders.product.forEach(pd => {
                       
                        let Total = pd.quantity * pd.price
                        sum = sum + Total
                       
                    });

                    this.sumOrder = sum;
                },


                async updataOrder(){
                    try{
                        this.orders.status = true;

                        let docoment = await orderService.update(this.orders._id, this.orders)
                        console.log(docoment)
                    }catch(err){
                        console.log(err)
                    }
                }

            },
        created(){
                this.getOrder()
        }
    }

</script>
<style>
.btn-thanhtoan{
    float: right; 
}
.tongcong{
    float: right;
}
</style>
