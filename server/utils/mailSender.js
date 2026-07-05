// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const mailSender = async (email,title,body) =>{
//     console.log("HOST:", process.env.MAIL_HOST);
//     console.log("USER:", process.env.MAIL_USER);
//     console.log("PASS exists:", !!process.env.MAIL_PASS);
//     try {
//     let transporter = nodemailer.createTransport({
//         host:process.env.MAIL_HOST,
//          port: 587,                 // ✅ REQUIRED
//         secure: false,             // ✅ REQUIRED (true only for 465)
//         auth:{
//             user:process.env.MAIL_USER,
//             pass:process.env.MAIL_PASS,
//         }
// })

// // ✅ VERIFY TRANSPORTER
//     await transporter.verify()

//     let info = await transporter.sendMail({
//        from: `"StudyNotion" <${process.env.MAIL_USER}>`, // ✅ VALID EMAIL
//         to: `${email}`,
//         subject: `${title}`,
//         html:`${body}`,
//     })
//     console.log("information == ",info)
//     return info;
// }catch(error){
//     console.log(error.message);
//     throw error   
// }
// }



// module.exports = mailSender;





const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("HOST:", process.env.MAIL_HOST);
    console.log("USER:", process.env.MAIL_USER);
    console.log("FROM:", process.env.MAIL_FROM);
    console.log("PASS exists:", !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Verify SMTP connection
   // await transporter.verify();
    console.log("SMTP Connected Successfully!");

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};

module.exports = mailSender;
