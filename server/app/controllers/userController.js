const ApiError = require("../api-error");
const MongoDB = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require ("jsonwebtoken")
const asyncHandler = require("express-async-handler");

exports.get = async (req, res, next) => {
    res.send('Hello');
}

// Create and Save a new Contact
exports.register = async (req, res, next) => {

    const {username, password, is_admin} = req.body;
    if(!username || !password){
        res.status(400);
        throw new ApiError("All fields are madatory");
    }

    const userAvailable = await userModel.findOne({username});

    if(userAvailable){
        res.status(400);
        throw new ApiError("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = userModel.create({
        username,
        password : hashedPassword,
        is_admin,
    });
    console.log(`User created ${user}`);

    if(user){
        res.status(201).json({_id: user.id, username: user.username});
    }else{
        res.status(400);
        throw new ApiError("User data us not valid")
    }
}

exports.loginUser= async (req, res, next)=>{

    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({message:"All fields are madatory"});
    }

    const user = await userModel.findOne({ username });

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECERT || 'defaultSecretValue';

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                id: user.id
            },
        },
        accessTokenSecret,
        // { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401).json({message: "username and password"})
    }
}

exports.updataUser = async(req,res)=>{
    if(req.body){
        const user = await userModel.findByIdAndUpdate(req.user.id,req.body)
        res.send("update thanh cong")
    }
}

exports.currentUser = async(req, res)=>{
    const user = await userModel.findById(req.user.id)
    const userInfo ={
        _id: user._id,
        address: user.address,
        name: user.name,
        phone: user.phone,
        is_admin: user.is_admin
    }
    res.send(userInfo);
};


///cart
exports.getToCart = async(req,res)=>{
    res.send("addd")
}
exports.addToCart = async(req,res)=>{
    
}