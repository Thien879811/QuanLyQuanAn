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
                    <button class="btn"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                </td>
            </tr>
        </tbody>  
    </v-table>
</template>
<script>
export default{
    props:{
        product:{type: Array},
    },
    data(){
        return {
            products : this.product
        }
    },
    methods:{

    },
    created(){
        console.log(this.products)
    }
}
</script>