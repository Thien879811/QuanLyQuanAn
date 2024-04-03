const { default: mongoose, Model } = require("mongoose")

const Products = mongoose.Schema({
    productName : {
        type: String,
        require: [true, "Vui lòng nhập tên món ăn"]
    },
    price:{
        type: Number,
        require: [true, "Vui lòng nhập giá bán"]
    },
    // danh muc
    directory:{
        type: String,
        require: [true, "Vui lòng chọn danh mục"]
    },
    image:{
        type: String,
        require:[true,"Vui lòng nhập hình ảnh"]
    },
    quantity:{
        type: Number,
        require:[true,"Vui lòng nhập số lượng"]
    }
})

const orderSchema = mongoose.Schema({
    customer: {
        type: String,
        require: [true, "Vui lòng nhập tên khách hàng hoặc số bàn"]
    },
    product:{
        type: [Products],
        require :[true, "Vui lòng nhập sản phẩm"]
    },
    status:{
        type: String,
        require: [true, "Vui lòng nhập trạng thái đơn hàng"]
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Order",orderSchema);