const express = require("express");
const store = require("../controllers/storeController");
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle");


const router = express.Router();

router.route("/")
    .get(store.findAll)
    .post(store.create)

router.route("/:id")
    .put(store.update)
    .delete(store.delete)

router.route("/store-date/get")
    .get(store.findDate)

router.route("/:date")
    .get(store.findAll)

 
module.exports = router;
