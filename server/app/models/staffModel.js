const { default: mongoose } = require("mongoose");

const  staffSchema = mongoose.Schema({
    fullname : {
        type: String,
        require: [true, "Vui lòng nhập tên nhân viên"]
    },
    phone:{
        type: Number,
        require: [true, "Vui lòng nhập số điện thoại"]
    },
    address:{
        type: String,
        require: [true, "Vui lòng nhập địa chỉ"]
    },
    salary:{
        type: String,
        require:[true,"Vui lòng nhập tiền lương"]
    }
})

module.exports = mongoose.model("Staff",staffSchema);