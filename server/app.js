const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');
const userRoute = require("./app/routes/userRoutes");
const menuRoute= require("./app/routes/menuRoutes");
const { validateToken } = require('./app/middleware/validateTokenHandle');

const app = express();

app.use(express.json());

app.use("/api/user",userRoute);
app.use("/api/menu",menuRoute);

app.use((req, res, next)=>{
    return next(new ApiError(404,"Resource not found"));
});

app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
})
module.exports = app;
