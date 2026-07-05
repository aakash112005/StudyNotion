const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email,title,body) =>{
    console.log("HOST:", process.env.MAIL_HOST);
    console.log("USER:", process.env.MAIL_USER);
    console.log("PASS exists:", !!process.env.MAIL_PASS);
    try {
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
         port: 587,                 // ✅ REQUIRED
        secure: false,             // ✅ REQUIRED (true only for 465)
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
})

// ✅ VERIFY TRANSPORTER
    await transporter.verify()

    let info = await transporter.sendMail({
       from: `"StudyNotion" <${process.env.MAIL_USER}>`, // ✅ VALID EMAIL
        to: `${email}`,
        subject: `${title}`,
        html:`${body}`,
    })
    console.log("information == ",info)
    return info;
}catch(error){
    console.log(error.message);
    throw error   
}
}



module.exports = mailSender;
