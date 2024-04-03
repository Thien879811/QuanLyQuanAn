const { default: mongoose } = require("mongoose");

const  menuSchema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model("Product",menuSchema);