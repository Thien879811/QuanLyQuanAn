const express = require("express");
const users = require("../controllers/userController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");
const product = require("../controllers/productController");


const router = express.Router();

router.route("/")
    .get(product.findAll)
    .post(product.createMenu)

router.route("/:id")
    .put(product.updateMenu)
 
module.exports = router;
