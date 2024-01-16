const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/users-controller");
const validateTokenHandler = require("../middleware/validateTokenHandler");
const router = express.Router();

// register user
router.post("/register", registerUser);

//login user 
router.post("/login", loginUser);

// get user info
router.get("/getUser", validateTokenHandler, getUserInfo)

module.exports = router;