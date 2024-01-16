const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];

        if(!token){
            res.status(401);
            throw new Error("access token may be not valid or expired");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if(err){
                res.status(401);
                throw err;
            }

            req.user = decode.user;
            next();
        })
    }else{
        res.status(401);
        throw new Error("access token may be not valid or expired");
    }
});

module.exports = validateTokenHandler;