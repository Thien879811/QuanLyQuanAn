const session = require("express-session")
const userModel = require("../models/userModel");
const { findAll } = require("../controllers/orderController");

exports.isAdmin = async (req, res, next) => {
    if(req.user){
        try{
            const user = await userModel.findById(req.user._id)
            res.send(user)
        }catch(err){
            console.log(err)
        }
    }
}