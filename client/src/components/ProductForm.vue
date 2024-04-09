<template>
    <Form
        @submit ='submit'
    >
    <div class="form-group">
        <label for="name">Tên sản phẩm:</label>
        <input
        name="productName"
        type="text"
        class="form-control"
        v-model="product.productName"
        />
        <ErrorMessage name="product.productName" class="error-feedback" />
    </div>
    
    <div class="form-group">
        <label for="price">Giá:</label>
        <input
        name="price"
        type="text"
        class="form-control"
        v-model="product.price"
        />
        <ErrorMessage name="price" class="error-feedback" />
    </div>

    <div class="form-group">
        <label for="directory">Danh mục:</label>
        <input
        name="directory"
        type="text"
        class="form-control"
        v-model="product.directory"
        />
        <ErrorMessage name="directory" class="error-feedback" />
    </div>

    <div class="form-group">
        <label for="image">Ảnh</label>
        <input
        name="image"
        type="url"
        class="form-control"
        v-model="product.image"
        />
        <ErrorMessage name="price" class="error-feedback" />
    </div> 

    <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
    </div>

    </Form>
</template>
<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";

export default{
    components:{
        Form,
        Field,
        ErrorMessage,
    },
    props:{
        products: {default:{}}
    },
    emits: ["submit:product"],
    data(){
        return {
            product : this.products,
        };
    },
    methods: {
        submit() {
            this.$emit("submit:product", this.product);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
