const {instance} = require("../config/razorpay");
const Course = require("../models/Course")
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress")
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")
const crypto = require("crypto");




//caputureq the payment and initaite the zarorpay order
exports.capturePayment  = async (req,res) => {

        //get course Id and userId
        const { courses } = req.body;
        const userId = req.user.id;

        // console.log("courses ",courses);
        // console.log("User",userId);

        
        // valid CourseId detail
        if(courses.length == 0){
            return res.json({
                success:false,
                message:"Please Provide Valid Course ID",
            })
        }

        // validate user details
        if(! userId){
            return res.json({
                success:false,
                message:"User Id Not Fetched from req.user.id",
            })
        }

        let total_amount = 0;

        for(const course_id of courses){
            let course
            try {
                //find the course by id
                course = await Course.findById(course_id)

                //if the course is not found return eeeor 
                if(!course){
                    return res.status(401).json({
                        succeess:false,
                        message:"Cloud not find the Course",
                    })
                }

                //check if the user is already  enrolled inside the course
           const uid = new mongoose.Types.ObjectId(userId);

if (course.studentEnrolled.includes(uid)) {
    return res.status(400).json({
        success: false,
        message: "Student already enrolled in this course",
    });
}


                //Add the price of the couse in total amount
                total_amount +=course.price

            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    sucess:false,
                    message:error.message,
                })
            }
        }

        const options = {
            amount: total_amount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
             notes:{
                courses:courses,
                userId,
            }
        }

        
        try {
            //initate the payment using razor pay
            const paymentResponse = await instance.orders.create(options);
            // console.log(paymentResponse);

             // return response
            return res.status(200).json({
                success:true,
               data:paymentResponse,
            });
        } catch (error) {
            console.error(error)
               return res.status(500).json({
                sucess:false,
                message:"RazorPay Order not Created", 
                error:error.message,
            })
        }

    }

exports.verifyPayment = async(req,res) =>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

   if (
  !razorpay_order_id ||
  !razorpay_payment_id ||
  !razorpay_signature ||
  !courses ||
  !userId
) {
  return res.status(400).json({
    success: false,
    message: "Payment verification failed",
  });
}


     let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_SECRET)
  .update(body)
  .digest("hex");


        if(expectedSignature === razorpay_signature){
            //enroll karwon student ko
             await enrollStudent(courses,userId,res)
            //return res
            return res.status(200).json({success:true,message:"payment verified"})
        }
        return res.status(400).json({
            success:false,
            message:"Payment Failed",
        })
}

// const enrollStudent  = async (courses,userId,res) => {

//     // validate
//     if(!courses||!userId){
//         return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//     }

//     for(const courseId of courses){
//       try {
//         // Find the Course And enrolled the Syudent in it
//         const enrolledCourse = await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push : {studentEnrolled:userId}},
//             {new:true}
//         )

//         if(!enrolledCourse){
//             return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//         }
//         console.log("Updated course: ", enrolledCourse)

//         const courseProgress = await CourseProgress.create({
//         courseId: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//         // Find the student and add the course to their list of enrolled courses
//        const enrolledStudent  = await User.findByIdAndUpdate(
//         userId,
//         {
//             $push :{
//                 courses : courseId,
//                 courseProgress : courseProgress._id,
//             }
//         }, {new:true}
//        )  
//        console.log("Enrolled student: ", enrolledStudent)

//         // Send an email notification to the enrolled student
//         const emailResponse = await mailSender(
//             enrolledStudent.email,
//             `SuccessFully Enrolled into ${enrolledCourse.courseName}`,
//             courseEnrollmentEmail(
//                 enrolledCourse.courseName,
//                 `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//             )
//         )
//         console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//         console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//       }
//     }
// }



const enrollStudent = async (courses, userId) => {
  if (!courses || !userId) {
    throw new Error("Missing courses or userId");
  }

  for (const courseId of courses) {
    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentEnrolled: userId } },
      { new: true }
    );

    if (!enrolledCourse) {
      throw new Error("Course not found");
    }

    const courseProgress = await CourseProgress.create({
      courseId,
      userId,
      completedVideos: [],
    });

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          coursesProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    await mailSender(
      enrolledStudent.email,
      `Successfully Enrolled into ${enrolledCourse.courseName}`,
      courseEnrollmentEmail(
        enrolledCourse.courseName,
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
      )
    );
  }
};



// Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req,res) => {
//     const {orderId ,paymentId,amount} = req.body
//     const userId = req.user.id;
//     if(!orderId ||!paymentId ||!amount ||!userId){
//         return res.status(400).json({
//             success:false,
//             message:"Please Provide All Details "
//         })
//     } 
//     try {
//         const enrolledStudent = await User.findById(userId);

//         await mailSender(
//            enrolledStudent.email,
//            `Payment Received`,
//            paymentSuccessEmail(
//             `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//             amount / 100,
//             orderId,
//             paymentId,
//            )
//         )
//          console.log("payemt mail isend in backend ..........................")
//     } catch (error) {
//         console.log("error in sending mail", error)
//         return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//     }
// }




exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const enrolledStudent = await User.findById(userId);
    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    // 🔥 THIS WAS MISSING
    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });

  } catch (error) {
    console.log("error in sending mail", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};

