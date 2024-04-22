const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
        username: {
            type: String,
            require: [true, "Please add the user name"],
        },
        password:{
            type: String,
            require: [true, "Please add the user password"],
        },
        name: {
            type: String,
            default:"",
        },
        address: {
            type: [String],
            require: [true, "Please add the user name"],
        },
        phone:{
            type: String,
            default:"",
            require: [true, "Please add the user name"],
        },
        is_admin:{
            type: Boolean,
            default: false
        }
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User",userSchema);