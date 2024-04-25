<template>
    <div class="login-group">
        <Form
            @submit ='submit'
            :validation-schema="loginSchema"
        >
        <div class="form-group">
            <label for="name">Tài khoản</label>
            <Field
            name="username"
            type="text"
            class="form-control"
            v-model="user.username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="email">Mật khẩu</label>
            <Field
            name="password"
            type="password"
            class="form-control"
            v-model="user.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
    
        <div class="form-group">
            <button class="btn btn-primary">Đăng ký</button>
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
            const loginSchema = yup.object().shape({
                username: yup.string().required("Tên đăng nhập không được để trống"),
            })
            return {
                user:{
                    username:"",
                    password:""
                },
                loginSchema
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
    