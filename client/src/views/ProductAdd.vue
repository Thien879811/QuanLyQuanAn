
<template>
    <div v-if="product" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ProductForm
            :product="product"
            @submit:product="addProduct"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";

export default{
    components:{
        ProductForm,
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