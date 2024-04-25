<template>
    <v-card class="mx-auto" color="grey-lighten-3" max-width="1980">
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
            ></v-img>
          </template>
  
          <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>
  
          <v-app-bar-title><button @click="home()">FoodShop</button></v-app-bar-title>
  
          <v-spacer></v-spacer>
  
            <v-btn @click="cart()">
            Giỏ hàng
            </v-btn>
  
          <v-btn @click="order()">
            Đơn hàng
          </v-btn>
  
            <v-btn v-if="user" @click="logout">
            Log Out
            </v-btn>
            <v-btn v-else @click="login()">
            Log in
            </v-btn>
        </v-app-bar>
  
        <v-main class="mt-5">
          <v-container >
            <h5>Đơn hàng</h5>
  
              <v-card class="mt-3"  v-for="(product,index) in orders" :key="product._id">
                <v-row>
                    <v-col>
                        <div class="ma-2" text-color="red" dense>
                            <h5 class="ml-6 grey--text text-lighten-3">{{ product.customerName }}</h5>
                        </div>
                    </v-col>

                    <v-col>
                        <div class="ma-2">
                            {{ product.createdAt }}    
                        </div>
                    </v-col>
                    <v-col v-if="product.status">
                        <div class="ma-2" text-color="red" dense>
                           Đã thanh toán
                        </div>
                    </v-col>
                    <v-col v-else>
                        <div class="ma-2" text-color="red" dense>
                           Đã thanh toán
                        </div>
                    </v-col>
                </v-row>
              </v-card>
              <div v-if="orders.length == 0">Không có đơn hàng</div>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </template>
<script>
import orderService from '@/services/order.service';
import UserForm from '@/components/UserFrom.vue'

    export default {
      components:{
        UserForm,
      },
      data(){
          return {
            user: JSON.parse(localStorage.getItem('user')) || null,
            action: false,
            infoUser: null,
            cartItems: JSON.parse(localStorage.getItem('cart')) || [],
            products: null,
            select: [],
            message:"",
            orders:null,
          }
      },
      methods:{
        cart(){
            this.$router.push('/cart')
        },
            logout(){
            this.$router.push('logout')
            },

            async getUserOrder(){
                this.orders= await orderService.getOrderUser(this.user._id)
            },

            home(){
                this.$router.push('/home-page')
            },
            order(){
                this.$router.push('/order')
            },
        login(){
            this.$router.push('/')
        },
    },
    created(){
        this.getUserOrder();
    }

}
</script>
    
<style>
    @media only screen and (max-width: 1960px) {
        .container{
            max-width: 1000px;
        }
    }
    .cart-btn{
      float: right;
    }

    .btn-cus{
      color: aliceblue;
      margin-top: 20px;
      border-radius: 10px ;
      background-image: linear-gradient(rgba(19,84,122,.8), rgba(128,208,199,.8));
    }

</style>