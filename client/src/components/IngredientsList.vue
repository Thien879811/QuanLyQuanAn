<template>
    <Form @submit="search">
        <Field type="date" name="date" id="" v-model="date"/>
        <button class="ml-2"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
    </Form>
    {{ message }}
    <v-table>
        <thead>
        <tr >
            <th class="" style="width: 50%;" >
            Tên nguyên liệu
            </th>
            <th class="text-left" style="width: 25%;" >
            Giá mua
            </th>
            <th class="text-left" style="width: 25%;" >
            Số lượng
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="product in products">
                <td>{{ product.productName }}</td>
                <td>{{ product.bayPrice }}</td>
                <td>

                    
                    {{ product.quantity }}
                 

                  
                        <button class="btn" @click="addEdit(product)"><font-awesome-icon :icon="['fas', 'pen']" /></button>

                        <button class="btn" @click="deleteProduct(product._id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>

                
                </td>
                
            </tr>
            
        </tbody>

    </v-table>
    <IngredientForm v-if="product_edit" v-bind:products="product_edit" @submit:product="editProduct"/>
</template>
<script>
import storeService from '@/services/store.service';
import IngredientForm from './IngredientForm.vue';
import {Form, Field, ErrorMessage} from "vee-validate";
export default{
    components:{
        Form,
        Field,
        ErrorMessage,
        IngredientForm
    },
    props:{
        product:{type: Array},
    },
    data(){
        return {
            products : this.product,
            product_edit: null,
            date:null,
            message:""
        }
    },
    methods:{
        async addEdit(product){
            console.log(product)
            this.product_edit = product
        },

        async editProduct(data){
            try{
                await storeService.update(data._id,data);
                confirm("Cập nhật thành công")
                this.product_edit = null
                location.reload()
            }catch(err){
                console.log(err)
            }
        },

        async deleteProduct(id){
            confirm("Bạn có chắc xóa nguyên liệu này")
            try{
                await storeService.delete(id);
                confirm("Xóa thành công")
                location.reload()
            }catch(err){
                console.log(err)
            }
        },

        async search(){
            this.message = this.date
        }
    },
}
</script>