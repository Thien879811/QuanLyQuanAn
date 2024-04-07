<template>
    <v-navigation-drawer location="right" permanent>
        <v-list-item class="px-2 py-5" >
            <v-list-item-title class="text-capitalize" align="center">
                <v-icon x-large class="pr-2"></v-icon><h3>Bàn</h3>
            </v-list-item-title>
            <v-row class="mt-4">
                <v-col cols="4" v-for="table in tables">

                   <div v-if="tableStatus(table._id)">
                        <v-btn color="green" @click="updateActiveIndex(table._id)">
                            {{ table.tableName }}
                        </v-btn>
                   </div>

                   <div v-else>
                        <v-btn @click="updateActiveIndex(table._id)">
                            {{ table.tableName }}
                        </v-btn>
                   </div>

                </v-col>
            </v-row>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script>
import Table from '@/services/table.service'
import orderService from '@/services/order.service'
export default {
    props: {
        active: { type: Number, default: -1 },
    },
    data(){
        return{
            tables: null,
        } 
    },

    emits: ["update:active"],

    methods:{
        updateActiveIndex(index) {
            console.log(index)
            this.$emit("update:active", index);
        },

        async tableStatus(id){
            const orders = await orderService.search(id);
            if(!orders._id){
                return true;
            }
            return false;
        },

        async getTable(){
            try{
                this.tables = await Table.getAll();
            }catch(err){
                console.log(err);
            }
        },
    },
    created(){
       this.getTable();
    }
}
</script>

<style>

</style>