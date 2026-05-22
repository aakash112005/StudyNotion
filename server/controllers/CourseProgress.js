// const SubSection = require("../models/SubSection")
// const CourseProgress = require("../models/CourseProgress")


// exports.updateCourseProgress = async (req,res) => {
//     try {
       
//         const {courseId ,subSectionId } = req.body;
//          console.log("CourseId ",courseId);
//         console.log("subSectionId ",subSectionId);
//         const userId = req.user.id;

//         //check if sub Section is vaild or not
//         const subsection = await SubSection.findById(subSectionId)
//         if(!subsection){
//             return res.status(404).json({
//                 success:false,
//                 message:"InVaild Sub Section"
//             })
//         }
//         // Find the course progress document for the user and course
//         let courseProgress = await CourseProgress.findOne({
//           courseId: courseId,
//           userId: userId,
//         })
//         if (!courseProgress) {
//         // If course progress doesn't exist, create a new one
//         return res.status(404).json({
//         success: false,
//         message: "Course progress Does Not Exist",
//         })
//        }  else {
//       // If course progress exists, check if the subsection is already completed
//       if (courseProgress.completedVideos.includes(subSectionId)) {
//         return res.status(400).json({ error: "Subsection already completed" })
//       }

//       // Push the subsection into the completedVideos array
//       courseProgress.completedVideos.push(subSectionId)
//     }

//        // Save the updated course progress
//     await courseProgress.save()
//       return res.status(200).json({
//         success:true,
//         message:"Course Progress updated",
//       })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message:"Something Went Wrong ,nternal server error"
//         })
//     }
// }

const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const User = require("../models/User")

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id

    // 1️⃣ Validate subsection
    const subsection = await SubSection.findById(subSectionId)
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid SubSection",
      })
    }

    // 2️⃣ Find course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    })

    // 3️⃣ If course progress DOES NOT exist → CREATE
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        courseId,
        userId,
        completedVideos: [subSectionId],
      })

      // 3️⃣a Add progress reference to user
      await User.findByIdAndUpdate(
        userId,
        { $push: { coursesProgress: courseProgress._id } },
        { new: true }
      )

      return res.status(200).json({
        success: true,
        message: "Course progress created and lecture marked complete",
      })
    }

    // 4️⃣ If lecture already completed
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(200).json({
        success: true,
        message: "Lecture already completed",
      })
    }

    // 5️⃣ Add new completed lecture
    courseProgress.completedVideos.push(subSectionId)
    await courseProgress.save()

    return res.status(200).json({
      success: true,
      message: "Course progress updated",
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
