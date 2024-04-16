<template>
<Form @submit="selectData">
    <v-row>
        <v-col cols="12" sm="11">
            <v-select
            v-if="items"  
            label="Chọn"
            :items="items"
            v-model="date"
            >
            </v-select>
        </v-col>
        <v-col class="mt-1">
            <button type="submit">Tìm</button>
        </v-col>
    </v-row>
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
            items: null,
            date: null,
            products : this.product,
            product_edit: null,
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

        async getDate(){
            const data = await storeService.getDate();
            this.items = data.map(item => ([item._id]));
            console.log(this.items)
        },

        async selectData(){
            try{
                this.products = await storeService.getAllByDate(this.date),
                console(this.products)
            }catch(err){
                console.log(err)
            }
        }
    },
    created(){
        this.getDate()
    }
}
</script>