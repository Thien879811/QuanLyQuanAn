<template>
    <v-app id="inspire">
       
          <SideBarLeft />

          <div v-if="product_edit"  class="page mt-5">
            <h4>Chỉnh sửa món ăn</h4>
            <ProductForm v-if="product_edit" v-bind:products="product_edit" @submit:product="update"/>
        </div>
          
          <v-container v-else class="container">
              <v-row class="mt-6">
                  <v-col cols="12" sm="4" v-for="product in product">
                      <v-hover v-slot="{ hover }" open-delay="200">
                          <v-card @click="addEditProduct(product)" class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
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
      </v-app>
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
            product: null,
            product_edit: null,
            message:"",
            actiProduct: true,
            id_table: null,
        }
    },
    methods:{
  
        async getProduct(){
              try{
                  this.product = await ProductService.getAll();
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