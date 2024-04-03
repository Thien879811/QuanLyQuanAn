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
        is_admin:{
            type: Boolean,
        }
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User",userSchema);