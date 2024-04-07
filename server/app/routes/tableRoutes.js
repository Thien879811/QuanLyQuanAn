const express = require("express");
const table = require("../controllers/tableController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");


const router = express.Router();

router.route("/")
    .get(table.findAll)
    .post(table.createMenu)

router.route("/:id")
    .put(table.updateMenu)
 
module.exports = router;
