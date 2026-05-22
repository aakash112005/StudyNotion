const Profile = require("../models/Profile");
const User = require("../models/User")
const Course  = require("../models/Course")
const CourseProgress = require("../models/CourseProgress")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const { default: mongoose } = require("mongoose");
require("dotenv").config()




exports.updatedProfile = async (req,res) => {
    try {
        // get data
        const {
             dateOfBirth,
             gender,
             about,
             contactNumber ,
            } = req.body;
            
        const userId = req.user.id


        // find and update
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


      
         
         
        // // Update the profile fields     
        // profileDetails.gender=gender
        // profileDetails.dateOfBirth=dateOfBirth
        // profileDetails.about=about
        // profileDetails.contactNumber=contactNumber

          // update only provided fields
        if (gender !== undefined) profileDetails.gender = gender;
        if (dateOfBirth !== undefined) profileDetails.dateOfBirth = dateOfBirth;
        if (about !== undefined) profileDetails.about = about;
        if (contactNumber !== undefined) profileDetails.contactNumber = contactNumber;

        // Save the updated profile               
        await profileDetails.save();
           
         // Find the updated user details
        const updatedUserDetails = await User.findById(userId)
           .populate("additionalDetails")
            .exec()

         return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
             updatedUserDetails,
        })
        
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",
            error:error.message,
        })
    }
    
}

// delete account 
exports.deleteAccount = async (req ,res) => {
    try {
        //get id
        const userId  = req.user.id;
        //validation

    
    const userDetails  = await User.findById({_id:userId});
    if(!userDetails){
          return res.status(404).json({
            success:false,
            message:"User Deatils Not Found",
              })
    }

    // delete the profile
    await Profile.findByIdAndDelete({_id: new mongoose.Types.ObjectId(userDetails.additionalDetails)})
    const enrolledCourseIds = userDetails.courses;

    // for each course remove user from studentsenrolled
     for(const courseId of enrolledCourseIds){
        await Course.findByIdAndUpdate(
            courseId,
            {$pull :{studentEnrolled:userId}},
             { new: true }
        )
     }

        // delete the profile

   
        // delete the user
            //TODO HW : DELETE unenrolled  user from all enrolled couses //done see above
      // sehcdule this task for 5 days to delte the user // npm i node-cron
      // and learn cronejob what is this how it is
      // how can we sechudle this task
    // await User.findByIdAndDelete({_id:userId})
    //      return res.status(200).json({
    //         success:true,
    //         message:"User Delete Successfully",
            
    //     })
    //     await CourseProgress.deleteMany({userId:userId})

    await CourseProgress.deleteMany({ userId });
await User.findByIdAndDelete(userId);

return res.status(200).json({
  success: true,
  message: "User Deleted Successfully",
});

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",
            error:error.message,
        })
    }
    
}

// all details of user exce

exports.getAllUserDetails = async (req,res) => {
    try{
        const userId = req.user.id
        //vaildate user dtails
        const userDetails  = await User.findById(userId)
          .populate("additionalDetails").exec();
         
        return res.status(200).json({
            success:true,
            message:"all user details fetched successfully",
            userDetails,
        })

    }catch(error){
         console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",
            error:error.message,
        })
    }
    
}

exports.updateDisplayPicture = async (req,res) => {
    try {
       // console.log("AUTH HEADER:", req.headers.authorization);

        if (!req.files || !req.files.displayPicture) {
  return res.status(400).json({
    success: false,
    message: "Display picture is required",
  });
}

const displayPicture = req.files.displayPicture;



        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
      //  console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
         res.send({
      success: true, 
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: error.message,
    })
    }
}




exports.getEnrolledCourses = async (req,res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({
            _id:userId,
        })
        .populate({
            path :"courses",
            populate:{
                path :"courseContent",
                populate:{
                    path:"subSection",
                },
            },
        })
        .exec()
        userDetails = userDetails.toObject();
        var SubsectionLength = 0
        for(var i=0;i<userDetails.courses.length;i++){
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for(var j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc,curr)=> acc +parseInt(curr.timeDuration),0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount  = await CourseProgress.findOne({
                courseId : userDetails.courses[i]._id,
                userId:userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if(SubsectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            }else{
                //To make it up 2 decimal point
                const multiplier = Math.pow(10,2)
                userDetails.courses[i].progressPercentage = 
                  Math.round(
                     (courseProgressCount / SubsectionLength) * 100 * multiplier
                  ) / multiplier
            }
        }
         if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: error.message,
    })
    }
}

exports.instructorDashboard = async (req,res) => {
    try {
        const courseDetails = await Course.find({instructor:req.user.id})

        const courseData = courseDetails.map((course)=>{
            const totalStudentEnrolled = course.studentEnrolled.length
            const tottalAmountGenerated = totalStudentEnrolled * course.price
           // create a new object with the additional fields
           const courseDataWithStats = {
            _id : course._id,
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            //Include other course Properties as needed
            totalStudentEnrolled,
            tottalAmountGenerated,
           }
            return courseDataWithStats
        })
         res.status(200).json({ courses: courseData })
    } catch (error) {
         console.error(error)
         res.status(500).json({ message: "Server Error" })
    }
}