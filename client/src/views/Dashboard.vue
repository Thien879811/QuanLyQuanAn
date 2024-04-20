
<template>
<v-app id="inspire">
  <Form @submit="submitForm"
    >
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
  <SideBarLeft/>
  Hóa đơn
  <v-row>
    <v-col>
      <v-card class="mx-auto bg-green-lighten-2">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
            </div>
            <div class="text-h6 mb-1">
              Số hóa đơn
            </div>
            <div v-if="quantityOrder"class="text-caption">{{ quantityOrder }}</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="mx-auto bg-green-lighten-2">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              {{ variant }}
            </div>
            <div class="text-h6 mb-1">
              Tổng số tiền từ hóa đơn
            </div>
            <div v-if="totalOrder" class="text-caption">{{ totalOrder }}</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
  Nguyên liệu
  <v-row>
    <v-col>
      <v-card class="mx-auto bg-green-lighten-2">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              {{ variant }}
            </div>
            <div class="text-h6 mb-1">
              Số nguyên liệu đã mua
            </div>
            <div class="text-caption">{{ quantityStore }}</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="mx-auto bg-green-lighten-2">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              {{ variant }}
            </div>
            <div class="text-h6 mb-1">
              Tổng số tiền
            </div>
            <div class="text-caption">{{ totalStore }}</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
  
  <ChartProduct/>

  <div class="mt-5">
    <CanvasJSChart v-if="data" :options="options" :style="styleOptions" @chart-ref="chartInstance"/>
  </div>
</v-app>
</template>
<script>
import {Form, Field, ErrorMessage} from "vee-validate";

import orderService from '@/services/order.service';
import SideBarLeft from '@/components/SideBarLeft.vue';
import { data } from "jquery";
import storeService from "@/services/store.service";
import ChartProduct from "@/components/ChartProduct.vue";

export default {
  components:{
    Form,
    Field,
    ErrorMessage,
    SideBarLeft,
    ChartProduct
  },
  data() {
    return {
      // data store
      dataStore:null,
      totalStore: null,
      quantityStore:null,
      // item select
      items:null,
      date:'',

      totalOrder:null,
      quantityOrder:null,

      orders:null,
      // data chart
      data: null,
      chart: null,
      options: {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true, // change to true   
        animationDuration: 3000,
        title:{
          text: "Money/Date"
        },
        axisY: {
          title: "",
          prefix: "$"
        },
        data: [{
          type: "line", // Change type to "bar", "area", "spline", "pie",etc.
          xValueFormatString: "MMM DD, YYYY",
          yValueFormatString: "$#,###.00",
          markerSize: 0,
          dataPoints: [
          ]
        }]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    }
  },

  methods:{
    // lay du lieu order theo lua chon
    async getOrder(data){

      if(!data) data = new Date();

      try{
        this.orders = await orderService.getTotalByDate(data)
        this.dataStore = await storeService.getAllByDate(data)
        console.log(this.dataStore)

        if(this.dataStore){
          this.totalStote();
        }

        this.quantityOrder = this.orders[0].orderCount;
        this.totalOrder = this.orders[0].totalSales;

      }catch(err){
        console.log(err)
      }
    },

    // lay toan bo
    async getTotal(){
      this.data = await orderService.getTotal();
      if (this.data) {

        this.updateChart();
        this.updateItemSelect();

      }
    },

    //total store

    totalStote(){
      console.log(this.dataStore.length)
      this.quantityStore = this.dataStore.length;
      let sum = 0
      this.dataStore.forEach(ds => {
        sum = sum + ds.bayPrice
      });

      this.totalStore= sum;
    },

    //cap nhat item cho select
    updateItemSelect(){
      this.items = this.data.map(item => ([ item._id]));
    },


    updateChart() {
      const dataPoints = this.data.map(item => ({ label: item._id, y: item.totalSales }));
      dataPoints.sort(function(dp1, dp2) {
      return dp2.label - dp1.label;
      });
      this.options.data[0].dataPoints = dataPoints; // Cập nhật dữ liệu cho biểu đồ
      // Render lại biểu đồ nếu đã được khởi tạo trước đó
    },

    submitForm(){
      this.getOrder(this.date);
      console.log(this.date)
    },
  },

  created(){
    this.getTotal();
    this.getOrder();
  }
  
}
</script>
