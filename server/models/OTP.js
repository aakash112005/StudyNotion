const otpTemplate = require("../mail/templates/emailVerificationTemplate")
const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const OTPSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*100,// The document will be automatically deleted after 5 minutes of its creation time
    }
})
// Define a function to send emails
async function sendVerificationEmail(email,otp) {
    try{
        console.log("Email = =" ,email)
         const emailResponse = await mailSender(
            email,
            "Verification Mail From StudyNotion",
            otpTemplate(otp),
        );
         console.log("Email Send Successfully : ",emailResponse)
    }catch(error){
        console.log("Error While Sending Verification Email : ",error)
        throw error;
    }
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save" , async function(next){
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if(this.isNew){
   await sendVerificationEmail(this.email,this.otp);
    }
   next();
});

module.exports = mongoose.model("OTP",OTPSchema)