
<template>
  <v-app id="inspire">
     
     <SideBarLeft />
     <SideBarRight v-model:active="active"/>
     <v-container class="container">
             <div class="page mt-5">
                <h4>Thêm món ăn mới</h4>
                <ProductForm
                    v-bind:product="product"
                    @submit:product="addProduct"
                />
            </div>
     </v-container>
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
            
            product:{},
            message:"",
        }
    },

    methods: {
        async search(){
            try{
                this.category = await ProductService.getCategory();
            }catch(err){
                console.log(err)
            }
        },
        async addProduct(data) {
            try {
                const document = await ProductService.create(data);
                if(document){
                    confirm("Thêm thành công")
                }
                location.reload();
            } catch (error) {
                console.log(error);
            }
        },

    },
}
</script>