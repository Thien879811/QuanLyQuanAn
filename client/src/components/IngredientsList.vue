<template>
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

                    <button class="btn"@click="disincreased(product)">-</button>
                    {{ product.quantity }}
                    <button class="btn" @click="increased(product)">+</button>

                    <button class="btn" @click="addEdit(product)"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                    
                </td>
                
            </tr>
            
        </tbody>

    </v-table>
    <IngredientForm v-if="product_edit" v-bind:products="product_edit" @submit:product="editProduct"/>
</template>
<script>
import storeService from '@/services/store.service';
import IngredientForm from './IngredientForm.vue';
export default{
    components:{
        IngredientForm
    },
    props:{
        product:{type: Array},
    },
    data(){
        return {
            products : this.product,
            product_edit: null,
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
        }
    },
    created(){
        console.log(this.products)
    }
}
</script>