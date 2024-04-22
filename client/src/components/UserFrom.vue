<template>
    <div class="login-group">
        <Form
            @submit ='submit'
        >
        <div class="form-group">
            <label for="name">Họ tên</label>
            <Field
            name="name"
            type="text"
            class="form-control"
            v-model="user.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="email">Địa chỉ</label>
            <Field
            name="address"
            type="text"
            class="form-control"
            v-model="user.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

         
        <div class="form-group">
            <label for="email">Số điện thoại</label>
            <Field
            name="phone"
            type="text"
            class="form-control"
            v-model="user.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
    
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
        </Form>
    </div>
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
    
        emits: ["submit:user"],

        data(){
            return {
                user:{
                    name:"",
                    address:"",
                    phone:"",
                },
            };
        },
        methods: {
            submit() {
                this.$emit("submit:user", this.user);
            },
        },
    };
    </script>
    <style scoped>
    @import "@/assets/form.css";
    
    
    </style>
    