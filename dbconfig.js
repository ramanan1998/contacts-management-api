const mongoose = require("mongoose");
require("dotenv").config();


const uri = process.env.MONGODB_URI;

 
const connectDb= async () => {
    try{
        const connect = await mongoose.connect(uri);

        console.log("Database connected: ", connect.connection.host, connect.connection.name)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};
 


module.exports = connectDb;