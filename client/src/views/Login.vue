
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
import UserForm from "@/components/LoginForm.vue";
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
                this.token = await UserService.login(data);
                if(!this.token.accessToken){
                    this.message = "Tài khoản hoặc mật khẩu không chính sát"
                    this.$router.push('/');
                }
                else{
                    localStorage.setItem("token",this.token.accessToken);
                    let user = [] ;
                    user = await UserService.current(this.token.accessToken);
                    localStorage.setItem("user",JSON.stringify(user));
                    console.log(user)
                      if(user.is_admin){
                        this.$router.push('/home');
                    }else{
                        this.$router.push('/home-page');
                    }
                }
            } catch (error) {
                this.message = "Tài khoản hoặc mật khẩu không chính sác"
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