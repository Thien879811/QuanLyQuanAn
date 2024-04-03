<template>
  <v-app id="inspire">
     
     <SideBarLeft />
     <SideBarRight />
  
      
        <v-container class="container">
            <v-tool-bar flat>
                <v-toolbar flat class="">
                    <v-row>
                        <v-col cols="12" sm="10">
                            <v-text-field label="Search"  flatbackground-color="grey lighten-3"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="2">
                            <v-btn class="">
                                <v-icon></v-icon> Filter
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-toolbar>
            
                <v-row class="mt-9">
                    <v-col cols="12" sm="6" >
                        <v-toolbar class="" flat >
                            <h5>My Filtres:</h5>
                            <v-icon class="ml-1" small></v-icon>
                            <h5 class="ml-1">First Meal</h5>
                            <v-chip class="ma-2" color="green" text-color="white" dense>
                                <v-avatar left>
                                    <v-icon></v-icon>
                                </v-avatar>
                                After Training
                            </v-chip>
                            <v-spacer></v-spacer>
                            <h6 class="green--text" @click="addProduct()">Thêm sản phẩm</h6>
                        </v-toolbar>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-toolbar class="" flat >
                            <h5>Popular Filtres:</h5>
                            <v-icon class="ml-1" small></v-icon>
                            <h5 class="ml-1">Slim Waist</h5>
                            <v-spacer></v-spacer>
                            <v-icon class="ml-1" small></v-icon>
                            <h5 class="ml-1">Diet</h5>
                        </v-toolbar>
                    </v-col>  
                </v-row>
            </v-tool-bar>


            <v-row class="mt-6">
                <v-col cols="12" sm="4" v-for="product in product">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
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

                <v-col cols="12" sm="4">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
                            <div class="d-flex flex-column justify-space-between align-center">
                                <img class="mt-6"src="https://cdn.tgdd.vn/2020/10/CookProduct/1260-1200x676-59.jpg" height="180" max-width="180"></img>
                            </div>
                            <div>
                                <h5 class="ml-6 grey--text text-lighten-3">Cabage Salad</h5>
                                <v-chip class="ma-2" color="grey lighten-3" text-color="red" dense>
                                    $4.99
                                </v-chip> 
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
                            <div class="d-flex flex-column justify-space-between align-center">
                                <img class="mt-6"src="https://cdn.tgdd.vn/2020/10/CookProduct/1260-1200x676-59.jpg" height="180" max-width="180"></img>
                            </div>
                            <div>
                                <h5 class="ml-6 grey--text text-lighten-3">Cabage Salad</h5>
                                <v-chip class="ma-2" color="grey lighten-3" text-color="red" dense>
                                    $4.99
                                </v-chip> 
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <ProductList/>

            
            
             
        </v-container>
    </v-app>
</template>
<script>
import ProductService from "@/services/product.service";
import SideBarLeft from '@/components/SideBarLeft.vue';
import SideBarRight from '@/components/SideBarRight.vue';
import ProductList from '@/components/ProductList.vue';
import { date } from "yup";

export default {
    components: {
      SideBarLeft,
      SideBarRight,
      ProductList
    },
    data(){
        return {
            product:null,
        }
    },
    methods:{
        async getProduct(){
            try{
                this.product = await ProductService.getAll();
                console.log(this.product)
            }catch(err){
                console.log(err);
            }
        },

        async addProduct(data){
            this.$router.push({name:'addproduct'})
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

</style>