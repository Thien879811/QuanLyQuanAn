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
  
          <v-app-bar-title @click="home()"><button @click="home()">FoodShop</button></v-app-bar-title>
  
          <v-spacer></v-spacer>
  
          <v-btn>
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
          <v-container v-if="!action">
            <h5>Giỏ hàng</h5>
              <v-card class="mt-3"  v-for="(product,index) in cartItems" :key="product._id">
                <v-row>
                    <v-col cols="1" class="d-flex justify-content-center">
                        <input type="checkbox" :value="product" v-model="select">
                    </v-col>
                    <v-col>
                        <div class="d-flex flex-column justify-space-between align-center">
                            <img :src="product.image" height="64" max-width="64"></img>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="ma-2" text-color="red" dense>
                            <h5 class="ml-6 grey--text text-lighten-3">{{ product.productName }}</h5>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="ma-2">
                          {{ product.price }}
                        </div>
                    </v-col>
                    <v-col>
                        <div class="ma-2">
                            <button @click="giam(index)">-</button>
                            {{ product.quantity }}
                            <button @click="tang(index)">+</button>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="ma-2" text-color="red" dense>
                          {{ product.quantity *  product.price  }}
                        </div>
                    </v-col>
                </v-row>
              </v-card>
              <button class="btn btn-cus" @click="addProduct()">Đặt hàng</button>
          </v-container>

          <v-container v-if="action">
            <UserForm @submit:user="addInfoUser"/>
          </v-container>
          <pre>{{ message }}</pre>
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
              message:""
          }
      },
      methods:{
        logout(){
          this.$router.push('logout')
        },

          async addProduct(){
            const user = JSON.parse(localStorage.getItem('user'))
            if(!this.infoUser){
              confirm("Vui lòng nhập thông tin trước khi đặt hàng")
              this.action=true
              return;
            }
            const order ={
                customerName: this.infoUser.name,
                customer: user._id,
                product: this.cartItems,
                status: false
            }
            const res = await orderService.createOrderUser(order)
            if(res){
              confirm("Đặt hàng thành công")
              this.cartItems=[],
              this.saveCart()
            }
          
          },
        async tang(index){
            this.cartItems[index].quantity++;
            this.saveCart()
        },
        async giam(index){
            this.cartItems[index].quantity--;
            this.saveCart()
        },
  
    
        addToCart(item){
            const existingItem = this.cartItems.find(i => i._id === item._id)
            if (existingItem) {
                existingItem.quantity++
                confirm("Sản phẩm đã có trong giỏ hàng")
            } else {
                this.cartItems.push({ ...item, quantity: 1 })
                confirm("Sản phẩm đã có trong giỏ hàng")
            }
            this.saveCart()
        },
  
        removeItem(item) {
            this.cartItems = this.cartItems.filter(i => i.id !== item.id)
            this.saveCart()
        },
  
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems))
        },
  
        checkout() {
            this.checkoutComplete = true
            this.saveCart()
        },

        addInfoUser(data){
          this.infoUser=data;
          this.addProduct();
          this.action=false;
        },
        order(){
            this.$router.push('/order')
        },
        home(){
            this.$router.push('/home-page')
        },
      
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