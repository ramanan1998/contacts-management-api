const asyncHandler = require("express-async-handler");
const usersModel = require("../models/users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if(!firstname || !lastname || !email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }

    try{

        const isEmailExists = await usersModel.findOne({ email: email });

        if(!isEmailExists){

            const hashPassword = await bcrypt.hash(password, 10);

            const userCreated = await usersModel.create({
                firstname,
                lastname,
                email,
                password: hashPassword
            });

            if(userCreated){
                res.status(201).json({ 
                    id: userCreated.id,
                    firstname: userCreated.firstname,
                    lastname: userCreated.lastname,
                    email: userCreated.email
                }); 
            }else{
                res.status(400);
                throw new Error("User data is not valid");
            }
        }else{
            res.status(400);
            throw new Error("Email already exists!")
        }
    }catch(error){
        throw error
    }
})

//login user
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }

    try{
        const isUserPresent = await usersModel.findOne({ email: email });

        if(isUserPresent && await bcrypt.compare(password, isUserPresent.password)){

            const accessToken = jwt.sign(
                {
                    user: {
                        firstname: isUserPresent.firstname,
                        lastname: isUserPresent.lastname,
                        email: isUserPresent.email,
                        id: isUserPresent.id
                    }
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "15m"
                }
            );

            res.status(200).json({ accessToken })
        }else{
            res.status(400);
            throw new Error("Invalid email id or password")
        }
    }catch(error){
        throw error;
    }
})

//get user info
const getUserInfo = asyncHandler((req, res) => {
    res.status(200).json(req.user);
})

module.exports = { registerUser, loginUser, getUserInfo }