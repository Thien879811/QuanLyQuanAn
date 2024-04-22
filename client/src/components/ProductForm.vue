<template>
    <Form
        @submit ='submit'
        :validation-schema="productShema"
    >
    <div class="form-group">
        <label for="name">Tên sản phẩm:</label>
        <Field
        name="productName"
        type="text"
        class="form-control"
        v-model="product.productName"
        />
        <ErrorMessage name="productName" class="error-feedback" />
    </div>
    
    <div class="form-group">
        <label for="price">Giá:</label>
        <Field
        name="price"
        type="text"
        class="form-control"
        v-model="product.price"
        />
        <ErrorMessage name="price" class="error-feedback" />
    </div>

    <div class="form-group">
        <label for="directory">Danh mục:</label>
        <select name="directory"class="form-control" v-model="product.directory">
            <option v-for="item in category" :key="item._id" :value="item._id">{{ item._id }}</option>
        </select>
        <ErrorMessage name="directory" class="error-feedback" />
    </div>

    <div class="form-group">
        <label for="image">Ảnh</label>
        <Field
        name="image"
        type="url"
        class="form-control"
        v-model="product.image"
        />
        <ErrorMessage name="image" class="error-feedback" />
    </div> 

    <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
    </div>

    </Form>
</template>
<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
import productService from "@/services/product.service";

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
        const productShema = yup.object().shape({
            productName: yup.string().required("Tên sản phẩm không được để trống"),
            price: yup.number().required("Giá sản phẩm không được để trống").integer("Giá phải là số nguyên"),
            image: yup.string().required("Không được để trống")
        })
        return {
            category: null,
            product : this.products,
            productShema
        };
    },
    methods: {
        async search(){
            try{
                this.category = await productService.getCategory();
            }catch(err){
                console.log(err)
            }
        },
        submit() {
            this.$emit("submit:product", this.product);
        },
    },
    created(){
        this.search()
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
