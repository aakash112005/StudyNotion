const User = require("../models/User")
const mailsender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
// npm i crypto
const crypto = require("crypto")





// resetPassword Token
exports.resetPasswordToken = async(req,res)=>{
    try{
    //get email from the req body
    const email = req.body.email;
    //check user forn this email ande vaildate
    if(!email){
        return res.status(401).json({
            success:false,
            message:"Email is Required"
        })
    }
    const user = await User.findOne({email})
    if(!user){
         return res.status(401).json({
            success:false,
            message:"Your Email is Not Registered with us",
        })
    }

    //genrate token 
    const token = crypto.randomUUID();
    // updated user by adding token and expries time
    const updatedDetails = await User.findOneAndUpdate(
        {email:email},
        {
          token:token,
          resetPasswordExpires:Date.now() + 5*60*1000,
        },
        {new:true}
    );
    //create url
    const url = `http://localhost:5173/update-password/${token}`;
    //send mail containing url
    await mailsender(email,"Password Reset Link",
        `Password Reset Link : ${url}`,
    )
    // return res
 return res.status(200).json({
            success:true,
            message:"Email sent Successfully Please Check And Change the Password",
        });
    } catch(error){
        console.log(error)
         return res.status(401).json({
            success:false,
            message:"Something went Wrong",
        })
    }
}

// reset 
exports.resetPassword = async(req,res)=>{
    try{
        //data fetch
        const {password,confirmPassword, token} = req.body;
        // validate
        if(!password || !confirmPassword){
             return res.status(401).json({
            success:false,
            message:"All Fields Are Required",
        })
        }
        if(password !== confirmPassword){
             return res.status(401).json({
            success:false,
            message:"Password and confirm Password Not Matched",
        })
        }

        //get userdatilas
        const userDetails = await User.findOne({token:token})
         // if no enrty found  invaild token
        if(!userDetails){
             return res.status(401).json({
            success:false,
            message:"token inValid",
        })
        }
       
        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
              return res.status(401).json({
            success:false,
            message:"token Time Expires",
              });

        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
        // updates password 
        await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},    
        )
        //send res
          return res.status(200).json({
            success:true,
            message:"Password Reset Successfully",
              });

    }catch(error){
        console.log(error)
         return res.status(403).json({
            success:false,
            message:"Something Went Wrong",
              });
    }
}