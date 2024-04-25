
<template>
    <div class="login-gr">
        <div class="page">
            <h4>Đăng nhập</h4>
            <span>{{ message }}</span>
            <UserForm
                @submit:user="login"
        />
        </div>
    </div>
</template>
<script>
import UserForm from "@/components/SignUpForm.vue";
import UserService from "@/services/auth.service"

export default{
    components:{
        UserForm,
    },
    data(){
        return {
            token: null,
            message:"",
        }
    },

    methods: {
        async login(data) {
            try {
                this.token = await UserService.signup(data);
                if(this.token){
                    confirm("Đăng kí thành công")
                    this.$router.push('/')
                }
            } catch (error) {
                this.message = "Tài khoản đã tồn tại"
                console.log(error);
            }
        },

    },
}
</script>
<style>
.login-gr{
    height: 500px;
    display: flex;
    align-items: center;
}
.page{
    width: 500px;
    padding: 50px;
    border: solid 1px darkblue;
    border-radius: 5px;
    box-shadow: 10px 10px;
}
</style>