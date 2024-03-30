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
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User",userSchema);