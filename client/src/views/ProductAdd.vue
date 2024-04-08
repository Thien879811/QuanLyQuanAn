
<template>
  <v-app id="inspire">
     
     <SideBarLeft />
     <SideBarRight v-model:active="active"/>
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
             <div v-if="product" class="page mt-5">
                <h4>Thêm sản món ăn</h4>
                <ProductForm
                    :product="product"
                    @submit:product="addProduct"
                />
                <p>{{ message }}</p>
            </div>
         </v-tool-bar>
     </v-container>
     {{ message }}
 </v-app>

</template>
<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";
import SideBarLeft from '@/components/SideBarLeft.vue';
import SideBarRight from '@/components/SideBarRight.vue';

export default{
    components:{
        ProductForm,
        SideBarLeft,
        SideBarRight,
    },

    props: {
        id: { type: String, required: true },
    },
    
    data(){
        return {
            product: { },
            message:"",
        }
    },

    methods: {
        async addProduct(data) {
            try {
                const document = await ProductService.create(data);
                console.log(document)
                this.message = "Liên hệ được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

    },
}
</script>