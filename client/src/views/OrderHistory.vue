
<template>
    <v-app id="inspire">

        <Form @submit="submitForm">
            <v-row>
                <v-col cols="12" sm="11">
                    <v-select
                    v-if="items"  
                    label="Chọn"
                    :items="items"
                    v-model="date"
                    >
                    </v-select>
                </v-col>
                <v-col class="mt-1">
                    <button type="submit">Tìm</button>
                </v-col>
            </v-row>
        </Form>
        <SideBarLeft/>
        <OrderDetail v-if="order_detail" v-bind:order="order_detail"/>
        
        <div v-if="!order_detail" >
            <div>
                <br>
                <font-awesome-icon :icon="['fas', 'print']" /> In hóa đơn
                <br>
                <font-awesome-icon :icon="['fas', 'eye']" /> Xem chi tiết
            </div>
            
            {{ message }}
            <v-table height="600px"  fixed-header>
            <thead>
            <tr >
                <th class="text-left">
                    Bàn
                </th>
                <th class="text-left">
                    Trạng thái
                </th>
                <th class="text-left">
                    Ngày tạo
                </th>
                <th class="text-left">
                    Chọn
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-if="orders && orders.length === 0">
                    <td colspan="3">No orders found</td>
                </tr>
                <tr v-else v-for="order in orders">
                    <td>{{ order.customerName }}</td>
                    <td v-if="order.status">Đã tính</td>
                    <td v-else>Chưa tính</td>
                    <td>{{ order.createdAt }}</td>
                    <td>
                        <button @click="print()" class="mr-2"><font-awesome-icon :icon="['fas', 'print']" /></button>
                        <button @click="orderDetail(order)"><font-awesome-icon :icon="['fas', 'eye']" /></button>
                    </td>
                </tr>
            </tbody>
            </v-table>
        </div>

    </v-app>
</template>
<script>
import {Form, Field, ErrorMessage} from "vee-validate";
    
import orderService from '@/services/order.service';
import SideBarLeft from '@/components/SideBarLeft.vue';
import OrderDetail from "@/components/OrderDetail.vue";
import tableService from "@/services/table.service";
    
    export default {
      components:{
        Form,
        Field,
        ErrorMessage,
        SideBarLeft,
        OrderDetail,
      },
    data() {
        return {
            // item select
            order_detail:null,
            items:null,
            date:'',
            orders:null,
            message:'',
            data:null
        }
    },
    methods:{
      // lay du lieu order theo lua chon
        async getOrderDate(data){
          if(!data) data = new Date();
          try{
            this.orders = await orderService.getOrderByDate(data)
            console.log(this.orders)
          }catch(err){
            console.log(err)
          }
        },

        submitForm(){
          this.getOrderDate(this.date);
        },

        async getTotal(){
            this.data = await orderService.getTotal();
            if (this.data) {
                this.updateItemSelect();
            }
        },

        updateItemSelect(){
            this.items = this.data.map(item => ([ item._id]));
        },

        async getOrder(){
            try{
                this.orders = await orderService.getAll()
            }catch(err){
                console.log(err)
            }
        },

        async table(id){
            const table = await tableService.get(id);
            return table.tableName;
        },
        orderDetail(order){
            this.order_detail = order;
        },
        print(){
            confirm("Vui lòng kết nối với máy in")
        }
    },
    
    created(){
        this.getOrder()
        this.getTotal();
    }
      
}
</script>