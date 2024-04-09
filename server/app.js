const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');
const userRoute = require("./app/routes/userRoutes");
const productRoute= require("./app/routes/productRoutes");
const orderRoute= require("./app/routes/orderRoutes");
const tableRoute= require("./app/routes/tableRoutes");
const storeRoute= require("./app/routes/storeRoutes");
const { validateToken } = require('./app/middleware/validateTokenHandle');
const session = require("express-session")

const app = express();

app.use(express.json());

app.use(session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 60000  * 60,
        
    }
}))

app.use("/api/user",userRoute);
app.use("/api/product", productRoute);
app.use("/api/order",orderRoute);
app.use("/api/table",tableRoute);
app.use("/api/store",storeRoute);

app.use((req, res, next)=>{
    return next(new ApiError(404,"Resource not found"));
});

app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
})
module.exports = app;
