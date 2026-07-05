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





const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

// setup API key
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const mailSender = async (email, title, body) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.MAIL_FROM,
        name: "StudyNotion",
      },
      to: [{ email }],
      subject: title,
      htmlContent: body,
    });

    console.log("Email sent successfully:", response.messageId);
    return response;
  } catch (error) {
    console.error("Brevo API Error:", error);
    throw error;
  }
};

module.exports = mailSender;


