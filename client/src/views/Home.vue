<template>
  <v-app id="inspire">

<!-- category -->
        <Form @submit="submitSelect">
            <v-row>
                <v-col cols="12" sm="11">
                    <v-select
                    v-if="items"  
                    label="Chọn"
                    :items="items"
                    v-model="dataSelect"
                    >
                    </v-select>
                </v-col>
                <v-col class="mt-1">
                    <button type="submit">Tìm</button>
                </v-col>
            </v-row>
        </Form>
        {{ message }}
     <!-- add product -->
        <SideBarLeft/>
        <SideBarRight v-model:active="active"/>
        <div v-if="activeTable()">
            <ProductList :table_id="active" />
            <v-btn color="green" @click="addOrder()">
                Thêm món
            </v-btn>
        </div>

      
        <v-container v-else class="container">
            <v-tool-bar flat>
                <v-row class="mt-9">
                    <v-col cols="12" sm="6" >
                            <h6 class="green--text" @click="addProduct()">Thêm sản phẩm</h6> 
                    </v-col>

                    <v-col cols="12" sm="6">
                    </v-col> 
                </v-row>
            </v-tool-bar>


            <v-row class="mt-6">
                <v-col cols="12" sm="4" v-for="product in product">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card @click="addOrderProduct(product)" class="" color="lighten-5" :elevation="hover ? 16 : 2" :higeht>
                            <div class="d-flex flex-column justify-space-between align-center">
                                <img class="mt-6"  :src="product.image" height="180" max-width="180"></img>
                            </div>
                            <div>
                                <h5 class="ml-6 grey--text text-lighten-3">{{ product.productName }}</h5>
                                <v-chip class="ma-2" color="grey lighten-3" text-color="red" dense>
                                    {{ product.price }}
                                </v-chip> 
                                
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import ProductService from "@/services/product.service";
import SideBarLeft from '@/components/SideBarLeft.vue';
import SideBarRight from '@/components/SideBarRight.vue';
import ProductList from '@/components/ProductList.vue';
import orderService from '@/services/order.service'
import { createApp } from "vue";
import tableService from "@/services/table.service";

export default {
    components: {
        SideBarLeft,
        SideBarRight,
        ProductList,
        Form,
        Field,
        ErrorMessage,
    },
    data(){
        return {
            message:'',
            dataSelect:"",
            items:null,
            productOrder:null,
            product: null,
            active: null,
            actiProduct: true,
            id_table: null,
            category: null
        }
    },
    watch:{
        active(){
            this.activeTable();
        },
    },
    methods:{

        async search(){
            try{
                this.category = await ProductService.getCategory();
                this.items= this.category.map(c => (c._id))
            }catch(err){
                console.log(err)
            }
        },

        async getProduct(){
            try{
                this.product = await ProductService.getAll();
            }catch(err){
                console.log(err);
            }
        },

        activeTable(value = true) {
            if (this.active) {
                this.actiProduct = false;
                return value;
            };
            return false;
        },

        async addProduct(data){
            this.$router.push({name:'addproduct'})
        }, 

        addOrderProduct(product){

            if(this.id_table){
                this.productOrder = product;
                this.create();
                return;
            }
            confirm('Vui long chon ban truoc')
        },

        async addOrder(){
            this.id_table = this.active;
            this.active = null  
        },

        async create(){
            const table = await tableService.get(this.id_table)
            
            const order = {
                customerName: table.tableName,
                customer: this.id_table,
                product:[this.productOrder],
                status: false
            }
            

            try{
                const docoment = await orderService.create(order);
                if(docoment){
                    confirm("Thêm món thành công")
                }
            }catch(err){
                console.log(err)
            }
        },

        async submitSelect(){
            const data = {
                search:this.dataSelect
            }
            this.product = await ProductService.getDateSearch(data)
            console(this.product)
        }

    },
    created(){
        this.getProduct();
        this.active = null;
        this.message = "";
        this.actiProduct = true; 
        this.search();
    }
}
</script>

<style>
@media only screen and (max-width: 1960px) {
    .container{
        max-width: 900px;
    }
}

</style>