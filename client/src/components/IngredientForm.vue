<template>
<Form @submit="submit">
    <div class="form">
        <Field style="width: 50%;"  placeholder="Tên nguyên liệu" name="productName" type="text" class="form-control form-control-customer" v-model="product.productName"/>
        <Field style="width: 25%;"  placeholder="giá mua" name="bayPrice" type="number" class="form-control form-control-customer" v-model="product.bayPrice"/>
        <Field style="width: 25%;"  placeholder="số lượng" name="quantity" type="number" class="form-control form-control-customer" v-model="product.quantity"/>
    </div>
    <button class="btn btn-primary mt-2 ">Lưu</button>
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
        products:{
            default:{
            }
        }
    },

    emits: ["submit:product"],

    data(){
        return {
            product: this.products
        }
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

.form{
    display: flex;
}

.btn{
    float: right;
}
</style>
