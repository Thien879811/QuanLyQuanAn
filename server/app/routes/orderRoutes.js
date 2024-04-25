const express = require("express");
const users = require("../controllers/userController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");
const Order = require("../controllers/orderController");


const router = express.Router();

router.route("/")
    .get(Order.findAll)
    .post(Order.createMenu)
 
router.route("/add-order-user")
    .get(Order.getOrderOnline)
    .post(Order.createOrder)
    
router.route("/add-order-user/:id")
    .get(Order.getOrderOnline)

    
router.route("/orderbydate/:data")
    .get(Order.getOrderByDate)

router.route("/:id")
    .put(Order.updateMenu)

router.route("/search/:id")
    .get(Order.searchOrder)

router.route("/total-sales/:date")
    .get(Order.getToltaByDate)

router.route("/total-sales")
    .get(Order.getToltaByDate)
 

router.route("/total-sales-chart")
    .get(Order.getTotalSale)

router.route("/count-product")
    .get(Order.countProductOccurrences)
    
router.route("/order_delete")
    .delete(Order.delete)
module.exports = router;
