const express = require("express");
const users = require("../controllers/userController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");
const Order = require("../controllers/orderController");


const router = express.Router();

router.route("/")
    .get(Order.findAll)
    .post(Order.createMenu)

router.route("/:id")
    .put(Order.updateMenu)

 
module.exports = router;
