const { default: mongoose } = require("mongoose");

const  storeSchema = mongoose.Schema({
    productName : {
        type: String,
        require: [true, "Vui lòng nhập tên sản phẩm"]
    },
    bayPrice:{
        type: Number,
        require: [true, "Vui lòng nhập giá mua vào"]
    },
    quantity:{
        type: Number,
        require:[true,"Vui lòng nhập số lượng mua"]
    },
    inventory:{
        type: Number,
        require:[true,"Vui lòng nhập số lượng còn lại trong kho"]
    }
})

module.exports = mongoose.model("Store",storeSchema);