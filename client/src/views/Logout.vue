<script>
export default{
    methods:{
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("id")
            this.$router.push('/')
        }
    },
    created(){
        this.logout()
    }
}
</script>