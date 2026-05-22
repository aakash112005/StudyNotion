const mongoose = require("mongoose")
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB Connection Successfully Done")})
    .catch((error)=>{
        console.log("DB Connectio Failed")
        console.error(error)
        process.exit(1);
    })
}
module.exports = dbconnect;