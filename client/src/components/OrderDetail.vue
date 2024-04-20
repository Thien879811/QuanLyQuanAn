<template>
    <v-card variant="outlined" class="mx-auto" max-width="400">
        <v-card-item>
            <div class="btn-icon"><button @click="exit()"><font-awesome-icon :icon="['fas', 'xmark']" /></button></div>
            <v-row>
                <v-col>
                    <h3>Hóa đơn</h3>
                </v-col>

                <v-col>
                    <h3>FoodShop</h3>
                </v-col>
            </v-row>
        </v-card-item>
        <v-card-text>Khách hàng: Bàn {{ order_local.customerName }}</v-card-text>
        <v-card-text>Ngày tạo: {{ order_local.createdAt }}</v-card-text>
        <v-table>
            <thead>
                <tr>
                <th class="text-left">Tên</th>
                <th class="text-left">Số lượng</th>
                <th class="text-left">Đơn giá</th>
                <th class="text-left">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.productName }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.price * item.quantity }}</td>
                </tr>
            </tbody>
        </v-table>
        <v-card-text><h4>Tổng cộng: {{ total_order }} VND</h4></v-card-text>
    </v-card>
</template>
<script>
  export default {
    props:{
        order: {require: true},
    },
    data() {
        return {
            order_local: this.order,
            desserts: this.order.product,
            total_order: null,
        }
    },
    // computed: {
    //     total() {
    //         this.total_order = this.order_local.product.reduce((acc, item) => acc + item.quantity * item.price, 0)
    //     }
    // },

    methods:{
        total() {
            this.total_order = this.order_local.product.reduce((acc, item) => acc + item.quantity * item.price, 0)
        },
        exit(){
           location.reload()
        }
    },

    created(){
        this.total()
    }
  }
  </script>
<style>
.btn-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    float: right;
    border: 2px solid rgb(49, 48, 48);
    border-radius: 50%;
}
</style>