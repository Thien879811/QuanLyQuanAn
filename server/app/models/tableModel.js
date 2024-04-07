const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
        tableName: {
            type: String,
            require: [true, "Please add the user name"],
        },
        seats:{
            type: Number,
            require: [true, "Please add the user password"],
        },
        
    },
);

module.exports = mongoose.model("Table",tableSchema);