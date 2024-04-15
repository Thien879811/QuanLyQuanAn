<template>
  <v-app id="inspire">
     
        <SideBarLeft/>
        <SideBarRight v-model:active="active"/>
        <div v-if="activeTable()">
            <ProductList :table_id="active" />
            <v-btn color="green" @click="addOrder()">
                Thêm món
            </v-btn>
        </div>

      
        <v-container v-else class="container">
            <v-tool-bar flat>
                <v-toolbar flat class="">
                    <v-row>
                        <v-col cols="12" sm="10">
                            <v-text-field label="Search"  flatbackground-color="grey lighten-3"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="2">
                            <v-btn class="">
                                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-toolbar>
            
                <v-row class="mt-9">
                    <v-col cols="12" sm="6" >
                        <v-toolbar class="" flat>
                            <h6 class="green--text" @click="addProduct()">Thêm sản phẩm</h6>
                        </v-toolbar>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-toolbar class="" flat >
                        </v-toolbar>
                    </v-col> 
                     
                </v-row>
            </v-tool-bar>


            <v-row class="mt-6">
                <v-col cols="12" sm="4" v-for="product in product">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card @click="addOrderProduct(product)" class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
                            <div class="d-flex flex-column justify-space-between align-center">
                                <img class="mt-6"  :src="product.image" height="180" max-width="180"></img>
                            </div>
                            <div>
                                <h5 class="ml-6 grey--text text-lighten-3">{{ product.productName }}</h5>
                                <v-chip class="ma-2" color="grey lighten-3" text-color="red" dense>
                                    {{ product.price }}
                                </v-chip> 
                                
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
        {{ message }}

        
    </v-app>
</template>
<script>
import ProductService from "@/services/product.service";
import SideBarLeft from '@/components/SideBarLeft.vue';
import SideBarRight from '@/components/SideBarRight.vue';
import ProductList from '@/components/ProductList.vue';
import orderService from '@/services/order.service'
import { createApp } from "vue";

export default {
    components: {
      SideBarLeft,
      SideBarRight,
      ProductList
    },
    data(){
        return {
            productOrder:null,
            product: null,
            active: null,
            message:"",
            actiProduct: true,
            id_table: null,
        }
    },
    watch:{
        active(){
            this.activeTable();
        },
    },
    methods:{

        async getProduct(){
            try{
                this.product = await ProductService.getAll();
            }catch(err){
                console.log(err);
            }
        },

        activeTable(value = true) {
            if (this.active) {
                this.actiProduct = false;
                return value;
            };
            return false;
        },

        async addProduct(data){
            this.$router.push({name:'addproduct'})
        }, 

        addOrderProduct(product){

            if(this.id_table){
                this.productOrder = product;
                this.create();
                return;
            }
            confirm('Vui long chon ban truoc')
        },

        async addOrder(){
            this.id_table = this.active;
            this.active = null  
        },

        async create(){

            const order = {

                customer: this.id_table,
                product:[this.productOrder],
                status: false
            }

            try{
                const docoment = await orderService.create(order);
                if(docoment){
                    confirm("Them thanh cong")
                }
            }catch(err){
                console.log(err)
            }
        }

    },
    created(){
        this.getProduct();
        this.active = null;
        this.message = "";
        this.actiProduct = true; 
    }
}
</script>

<style>
@media only screen and (max-width: 1960px) {
    .container{
        max-width: 1000px;
    }
}

</style>