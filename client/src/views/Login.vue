
<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <UserForm
            @submit:user="login"
        />
        <p>{{ message }}</p>
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
                    this.message = this.token.message;
                }
                else{
                    localStorage.setItem("token",this.token.accessToken);
                    let user = await UserService.current(this.token.accessToken);
                    console.log(user)
                    localStorage.setItem("username",user.username);
                    localStorage.setItem("id",user.id)
                    this.$router.push('/home');
                }
            } catch (error) {
                console.log(error);
            }
        },

    },
}
</script>