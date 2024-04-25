/* app.vue */
<script>
import orderService from '@/services/order.service';
export default {
  data() {
    return {
        data: null,
        chart: null,
        options: {
            animationEnabled: true,
            exportEnabled: true,
            title:{
            text: "Sản phảm được bán"
            },
            axisX: {
            labelTextAlign: "right"
            },
            axisY: {
            title: "",
            suffix: ""
            },
            data: [{
                type: "bar",
                yValueFormatString: "#",
                dataPoints: []
            }]
        }
    }
  },

  methods:{
    async getData(){
        this.data = await orderService.getProductChart();
        this.updateChart()
    },

    updateChart() {
      const dataPoints = this.data.map(item => ({ label: item._id, y: item.count }));
      this.options.data[0].dataPoints = dataPoints; // Cập nhật dữ liệu cho biểu đồ
      // Render lại biểu đồ nếu đã được khởi tạo trước đó
    },

  },

  created(){
    this.getData()
  }
}
</script>
<template>
    <div class="mt-5">
        <CanvasJSChart v-if="data" :options="options"/>
    </div>
</template>  