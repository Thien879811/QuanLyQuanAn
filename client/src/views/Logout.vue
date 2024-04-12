<script>
export default{
    methods:{
        logout(){
            localStorage.removeItem("token");
            this.$router.push('/')
        }
    },
    created(){
        this.logout()
    }
}
</script>