const Error = require("../api-error");
const jwt = require("jsonwebtoken")

exports.validateToken = async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECERT || 'defaultSecretValue';
        jwt.verify(token, accessTokenSecret,(err, decoded)=>{
            if(err){
                res.status(401).json({message:"User not login"});
            }else{
                req.user = decoded.user;
                next();
            }
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
}
