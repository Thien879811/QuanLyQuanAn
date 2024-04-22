const express = require("express")
const users = require("../controllers/userController")
const jwt= require("jsonwebtoken")

const validateToken = require("../middleware/validateTokenHandle")

const router = express.Router();

router.route("/register")
    .get(users.get)
    .post(users.register)

router.route("/login")
    .get(users.get)
    .post(users.loginUser)


router.put('/:id', function (req, res, next) {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECERT || 'defaultSecretValue';
            jwt.verify(token, accessTokenSecret, (err, decoded)=>{
                if(err){
                    res.status(401).json({message:""});
                    throw new Error("User is not authorized");
                }
                req.user = decoded.user;
                next();
            });
    
            if(!token){
                res.status(401);
                throw new Error("User ois not authorized or token is missing");
            }
        }
}, users.updataUser)

router.get('/current', function (req, res, next) {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECERT || 'defaultSecretValue';
        jwt.verify(token, accessTokenSecret, (err, decoded)=>{
            if(err){
                res.status(401).json({message:""});
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User ois not authorized or token is missing");
        }
    }
}, users.currentUser)
 
module.exports = router;
