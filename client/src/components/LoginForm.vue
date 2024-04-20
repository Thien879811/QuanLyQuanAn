<template>
<div class="login-group">
    <Form
        @submit ='submit'
    >
    <div class="form-group">
        <label for="name">Tài khoản</label>
        <input
        name="username"
        type="text"
        class="form-control"
        v-model="user.username"
        />
        <ErrorMessage name="name" class="error-feedback" />
    </div>
    
    <div class="form-group">
        <label for="email">Mật khẩu</label>
        <input
        name="password"
        type="password"
        class="form-control"
        v-model="user.password"
        />
        <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
        <button class="btn btn-primary">Đăng nhập</button>
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
                username:"",
                password:""
            }
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
