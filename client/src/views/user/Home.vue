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

        <v-app-bar-title @click="home()">ShopFood</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn @click="cart()">
          Giỏ hàng
        </v-btn>

        <v-btn>
          Đơn hàng
        </v-btn>

        <v-btn @click="logout">
          Log Out
        </v-btn>
      </v-app-bar>

      <v-main class="mt-5">
        <v-container>
          <v-row dense>
            <v-col
              v-for="product in products"
              :key="product._id"
              cols="3"
            >
            <v-card>
                <div class="d-flex flex-column justify-space-between align-center">
                    <img class="mt-6"  :src="product.image" height="180" max-width="180"></img>
                </div>
                <div>
                    <h5 class="ml-6 grey--text text-lighten-3">{{ product.productName }}</h5>
                    <v-chip class="ma-2" text-color="red" dense>
                        {{ product.price }}
                    </v-chip>
                    <v-chip class="ma-2 cart-btn" text-color="red" dense>
                        <button @click="addToCart(product)"><font-awesome-icon :icon="['fas', 'cart-shopping']" /></button>
                    </v-chip>           
                </div>
            </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

    </v-layout>
  </v-card>
</template>
<script>
  import ProductService from "@/services/product.service";
  import SideBarLeft from '@/components/SideBarLeft.vue';
  import ProductForm from '@/components/ProductForm.vue';

  
  export default {
    components: {
        SideBarLeft,
        ProductForm
    },
    data(){
        return {
            cartItems: JSON.parse(localStorage.getItem('cart')) || [],
            products: null,
            product_edit: null,
            message:"",
            actiProduct: true,
            id_table: null,
        }
    },
    methods:{
      logout(){
          this.$router.push('logout')
        },
  
        async getProduct(){
              try{
                  this.products = await ProductService.getAll();
              }catch(err){
                  console.log(err);
              }
        },

        async addEditProduct(product){
            this.product_edit = product
        },

        async update(data){
            try{
                this.product = await ProductService.update(data._id,data);
                confirm('Chỉnh sửa thành công')
                location.reload()
              }catch(err){
                  console.log(err);
              }
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

        cart(){
            this.$router.push('/cart')
        },
        home(){
            this.$router.push('/home-page')
        }
    
    },
    created(){
          this.getProduct();
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
</style>