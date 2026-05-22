const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User")


//auth
// exports.auth = async (req,res,next)=>{
//     try{
//         // extract token
//         const token  = req.cookies.token ||req.body.token || req.header("Authorization")?.replace("Bearer ", "")
//         console.log("AUTH HEADER:", req.header("Authorization"));

//         //if token missing
//         if(!token){
//             return res.status(401).json({
//                 sucess:false,
//                 message:"Token Missing",
//             })
//         }

//         // verify token
//         try{
//             const decode = jwt.verify(token,process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;


//         }catch(error){
//              return res.status(401).json({
//                 sucess:false,
//                 message:"Token Issue or invaild",
//             })
//         }
//         next();
        
       
//     }catch(error){
//             return res.status(401).json({
//                 sucess:false,
//                 message:"Something Went Wrong While vaildating the Token",
//             }) 
//     }
// }



exports.auth = async (req, res, next) => {
  
 // console.log("HEADERS:", req.headers);
  try {
   const token =
  req.cookies.token ||
  req.headers["authorization"]?.replace("Bearer ", "");


     // console.log("Extracted token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};




//Is student
exports.isStudent =  async (req,res, next)=>{
      try{
          if(req.user.accountType !== "Student"){
              return res.status(401).json({
                sucess:false,
                message:"This is Protected route for Student Only",
            }) 
          }
            next();
      }catch(error){
           return res.status(500).json({
                sucess:false,
                message:"User Role Cannot be Verified",
            }) 
      }
} 

//Is admin
exports.isAdmin =  async (req,res, next)=>{
      try{
        
          if(req.user.accountType !== "Admin"){
              return res.status(401).json({
                sucess:false,
                message:"This is Protected route for Admin Only",
            }) 
          }
          // console.log("printing the Accountype : ",req.user.accountType)
            next();

      }
      catch(error){
           return res.status(500).json({
                success:false,
                message:"User Role Cannot be Verified this protected route for admin",
            }) 
      }
}

//Is Instructor
exports.isInstructor =  async (req,res, next)=>{
      try{
          if(req.user.accountType !== "Instructor"){
              return res.status(401).json({
                sucess:false,
                message:"This is Protected route for Instructor Only",
            }) 
          }
             next();
      }catch(error){
           return res.status(500).json({
                success:false,
                message:"User Role Cannot be Verified",
            }) 
      }
}