const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenrator = require("otp-generator")
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
const { use } = require("bcrypt/promises")
require("dotenv").config();
const cookie = require("cookie-parser");
const passwordUpdated = require("../mail/templates/passwordUpdate")
const mailSender = require("../utils/mailSender")

//npm i cookie

// Send OTP For Email Verification -----------------------------------------------------------------------------------------
exports.sendOTP= async (req,res) =>{
    try{
    //fetch email from the request ki body 
     const {email} = req.body;

    //check if User exits in DB or not
    const checkUserPresent  = await User.findOne({email})

    //if user already exits in DB
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User Already Registered",
        })
    }

    // Genrate OTP 
    var otp = otpGenrator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    //console.log("OTP Genrated " ,otp)

    // Check for unique otp or not
    const result = await OTP.findOne({otp:otp});
    // console.log("Result is Generate OTP Func")
    // console.log("OTP", otp)
    // console.log("Result", result)
     
    // Genrate OTP until Unique once is not found 
    while(result){
        otp = otpGenrator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    result = await OTP.findOne({otp:otp});
    }

    // create otp to Save IN DB 
    const otpPayload = {email,otp};
    // create entry in db for otp
    const otpBody = await OTP.create(otpPayload) // before saving otp in db it send email using pre function write in model 
   // console.log(otpBody)

    //return the rsponse
    return res.status(200).json({
        success:true,
        message:"OTP Send Successfully",
        //otp:otp,
    })
     
   } catch(error){
   // console.log(error)
    return res.status(403).json({
        success:false,
        message:error.message,
      })
     }
}
//----------------------------------------------------------------------------------------------------------------------------

// Signup Controller for Registering USers
exports.signUp = async(req,res)=>{
    try{
        //fetch data from req body
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // vaildated data
        if(!firstName || !lastName ||!email ||!password||!confirmPassword||!otp){
           return res.status(403).json({
                success:false,
                message:"All fields Are Required",
            })
        }

        // match the password and conform password
        if(password !== confirmPassword){
                return res.status(403).json({
                success:false,
                message:"Password And Confirm Password Not Match try Again",
            })
        }

        //check user already exits or not
        const existingUser = await User.findOne({email})
        
        if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User Already Registered",
        })
    }

        //find most recent otp stored for the user
        // const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        
        
        // const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

        // console.log(recentOtp)
        // //validate otp
        // if(recentOtp.length == 0){
        //     //OTP not found
        //     return res.status(400).json({
        //     success:false,
        //     message:"OTP Not Found",
        // })
        // }
        // else if(recentOtp.otp !== String(otp)){
        //      //OTP Invalid
        //     return res.status(400).json({
        //     success:false,
        //     message:"The OTP is not valid",
        // })
        // }
        
        // it find the most recent otp fromm the data base
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!recentOtp) {
          return res.status(400).json({
            success: false,
            message: "OTP Not Found",
          });
        }

        if (recentOtp.otp !== String(otp)) {
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          });
        }



        //hash the password 
        const hashedPassword = await bcrypt.hash(password,10)
        // create entry in  db
       
       
        // let approved = ""
        // approved === "Instructor" ? (approved = false) : (approved = true)
        
        let approved = accountType === "Instructor" ? false : true



        // const profileDetails = await Profile.create({
        //     gender:null,
        //     dateOfBirth:null,
        //     about:null,
        //     contactNumber:null,
        // })

        const profileDetails = new Profile({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })

        await profileDetails.save();


        // send the response
         return res.status(200).json({
            success:true,
            message:"User Is Registered Successfully",
            user,
        })

    }catch(error){
            console.error("SIGNUP ERROR:", error)
            return res.status(500).json({
                success:false,
                message: error.message || "User Registration Failed"
            })
     }
}
//-------------------------------------------------------------------------------------------------------------------------------

// Login controller for authenticating users
exports.login = async(req,res)=>{
    try{
        // fetch from req.body
        const {email,password} = req.body

        if(!email || !password){
       return res.status(400).json({
            success:false,
            message:"All Feilds Are required",
        })
        }


    // Find user with provided email        
        const user = await User.findOne({email}).populate("additionalDetails");
   // Find user with provided email
        if(!user){
         // Return 401 Unauthorized status code with error message
            return res.status(401).json({
            success:false,
            message:"User is not Registered with Us Please SignUp to Continue",
        })
        }



    // Generate JWT token and Compare Password
        if(await bcrypt.compare(password,user.password)){

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            // create the jwt token
             const token  = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
             })

            // Save token to user document in database
             user.token = token;
             user.password = undefined;


            //create A cookie
             const options ={
                expires :new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
             }

             // Set cookie for token and return success response
             res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
             })
        }
        else{
           return  res.status(403).json({
            success:false,
            message:"Password is incorrect",
        })
        }
    }
    catch(error){
        console.log(error)
       return res.status(500).json({
            success:false,
            message:"User login Failed Try Again",
        })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------

//change Password
//hw done but testing
exports.changePassword = async (req,res)=>{
    try{
    // Get user data from req.user
     const userDetails = await User.findById(req.user.id)

     // Get old password, new password, and confirm new password from req.body
    const {oldPassword,newPassword,confirmNewPassword} = req.body;
    // old pass new pass or confirm new pass
    // vaildation

    if(!oldPassword||!newPassword ||!confirmNewPassword){
         return res.status(403).json({
            success:false,
            message:"All Fields Are Required 5666 ",
        })
    }

    if(newPassword !== confirmNewPassword){
         return res.status(403).json({
            success:false,
            message:"newPassword and confirmNewPassword does not matched",
        })
    }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The oldPassword is incorrect" })
    }

    
    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

     // Send notification email
    try {
       // console.log("mail is heree");
  const emailResponse = await mailSender(
  updatedUserDetails.email,
  "Password Updated Successfully",
  passwordUpdated(
    updatedUserDetails.email,
    `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
  )
);

  console.log("Email sent successfully:", emailResponse.response)
} catch (error) {
  // ❗ Do NOT return error
  console.error("Email failed but password updated:", error.message)
}

  

    // retur res
     return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        })
    }catch(error){
        console.log(error)
            return res.status(403).json({
            success:false,
            message:"something Went Wrong , Error occurred while updating password",
        })
        
    }
}
//------------------------------------------------------------------------------------------------------------------------------