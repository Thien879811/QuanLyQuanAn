
<template>
<v-app id="inspire">
  <Form
    >
    <v-select
      v-if="items"  
      label="Chọn"
      :items="items"
      v-model="date"
      @keydown.enter="submitForm"
    >
    </v-select>
  </Form>
  <SideBarLeft/>
  Hóa đơn
  <v-row>
    <v-col>
      <v-card class="mx-auto bg-green-lighten-2">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              {{ variant }}
            </div>
            <div class="text-h6 mb-1">
              Số hóa đơn
            </div>
            <div class="text-caption">{{ quantityOder }}</div>
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
            <div class="text-caption">{{ totalOrder }}</div>
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
            <div class="text-caption">{{ quantityOder }}</div>
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
            <div class="text-caption">{{ quantityOder }}</div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
  <CanvasJSChart v-if="data" :options="options" :style="styleOptions" @chart-ref="chartInstance"/>
</v-app>
</template>
<script>
import {Form, Field, ErrorMessage} from "vee-validate";

import orderService from '@/services/order.service';
import SideBarLeft from '@/components/SideBarLeft.vue';


export default {
  components:{
    Form,
    Field,
    ErrorMessage,
    SideBarLeft
  },
  data() {
    return {
      items:null,
      date:'',
      totalOrder:null,
      quantityOder:null,
      orders:null,
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

      if(!data) data = '';

      console.log( `du lieu ngay nhap vo la ${data}`)
      
      try{
        this.orders = await orderService.getTotal(data)
        console.log(this.orders)
        this.quantityOder = this.orders.length;
        let sum = 0;
        this.orders.forEach(pd => {
        sum = sum + pd.totalSales
        });
        this.totalOrder= sum
      }catch(err){
        console.log(err)
      }
    },

    // lay toan bo
    async getTotal(){
      this.data = await orderService.getTotal();
      if (this.data) {
        this.updateChart();
        this.updateItemSelect()
      }
    },

    //cap nhat item cho select
    updateItemSelect(){
      this.items = this.data.map(item => ([ item._id]));
      console.log(this.items)
    },


    updateChart() {
      const dataPoints = this.data.map(item => ({ label: item._id, y: item.totalSales }));
      dataPoints.sort(function(dp1, dp2) {
      return dp2.label - dp1.label;
      });
      console.log(dataPoints)
      this.options.data[0].dataPoints = dataPoints; // Cập nhật dữ liệu cho biểu đồ
      // Render lại biểu đồ nếu đã được khởi tạo trước đó
    },
    submitForm(){
      this.getOrder(this.date)
    },
  },

  created(){
    this.getTotal();
    this.getOrder();
  }
  
}
</script>
