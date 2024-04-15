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

router.route("/search/:id")
    .get(Order.searchOrder)

router.route("/total-sales")
    .get(Order.getTotalSale)
    
router.route("/total-sales/:date")
    .get(Order.getTotalSale)
 
 
module.exports = router;
