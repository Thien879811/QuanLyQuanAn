const express = require("express");
const users = require("../controllers/userController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");
const Menu = require("../controllers/menuController");


const router = express.Router();

router.route("/")
    .get(Menu.findAll)
    .post(Menu.createMenu)

router.route("/:id")
    .put(Menu.updateMenu)
 
module.exports = router;
