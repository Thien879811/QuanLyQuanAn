
<template>
    <v-app id="inspire">
        <SideBarLeft/>
        <IngredientsList v-if="product" v-bind:product="product"/>
        <button v-if="!active" class="btn mt-2" @click="action()">Thêm</button>
        <IngredientsForm v-if="active" @submit:product="addProduct"/>
   </v-app>
  
  </template>
<script>
import SideBarLeft from '@/components/SideBarLeft.vue';
import IngredientsList from '@/components/IngredientsList.vue';
import IngredientsForm from '@/components/IngredientForm.vue';
import storeService from '@/services/store.service';
  
  export default{
    components:{
        SideBarLeft,
        IngredientsList,
        IngredientsForm
    },

    data(){
      return{
        product:null,
        active:false
      }
    },
    methods: {

      async addProduct(data){
        console.log(data)
        try{
          let docoment = await storeService.create(data);
          if(docoment){
            this.product = await storeService.getAll();
            console.log(this.product)
            confirm("Thêm thành công")
            location.reload()
            this.active = false
          }
        }catch(err){
          console.log(err)
        }
      },

      async getProduct(){
        try{
            this.product = await storeService.getAll();
            console.log(this.product)
        }catch(err){
          console.log(err)
        }
      },

      action(){
        this.active = true
      },

      exit(){
        this.active = false
      }
    },
    created(){
      this.getProduct();
    }
  }
  </script>