<script>
export default{
    methods:{
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push('/')
        }
    },
    created(){
        this.logout()
    }
}
</script>