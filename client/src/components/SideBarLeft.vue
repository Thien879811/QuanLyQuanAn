<template>
   <v-navigation-drawer
      app
      color="green accent-3"
      dark
    >
     <v-list-item class="px-2 py-5" >
            <v-list-item-title class="text-capitalize" align="center">
                <v-icon x-large class="pr-2"></v-icon><h3>Food Shop</h3>
            </v-list-item-title>
        </v-list-item>
        <v-list shaped >
            <v-list-item-group v-model="selectedItem" color="grey lighten-5">
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <router-link :to="item.route" class="text-light">
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                    </v-list-item> 
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
 
</template>

<script>
export default {
 data: () => ({
        selectedItem: 0,
        items: [
            {text: 'MENU', route: '/home'},
            {text: 'EDIT PRODUCT', route: '/edit_product'},
            {text: 'ORDER HISTORY', route: '/order-history'},
            {text: 'STORE', route: '/store'},
            {text: 'DASHBOARD', route: '/dashboard'},
            {text: 'LOG OUT', route: '/logout'},
        ]
        })
}
</script>


