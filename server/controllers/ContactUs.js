import Contact from "../models/Contact.js";
import mailSender from "../utils/mailSender.js";
import { contactUsEmail } from "../mail/templates/contactFormRes.js";

export const contactUsController = async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      message,
      phoneNo,
      countrycode,
    } = req.body;

    // 1️⃣ Basic validation
    if (!email || !firstname || !lastname || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Send confirmation email
    const emailRes = await mailSender(
      email,
      "Your Request Sent Successfully",
      contactUsEmail(
        email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode
      )
    );

   // console.log("Email Response:", emailRes);

    // 3️⃣ Store contact data in DB
    const contactDetail = await Contact.create({
      email,
      firstname,
      lastname,
      message,
      phoneNo,
      countrycode,
    });

    // 4️⃣ Success response
    return res.status(200).json({
      success: true,
      message: "Email sent and data stored successfully",
      data: contactDetail,
    });

  } catch (error) {
    console.error("ContactUs Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
