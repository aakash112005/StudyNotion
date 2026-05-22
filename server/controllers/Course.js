const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const {uploadImageToCloudinary}  = require("../utils/imageUploader")
const {convertSecondsToDuration} = require("../utils/secToDuration");


// create Course handler 
// exports.createCourse = async (req,res) =>{
//     try {
//         //fetch data
//         const userId = req.user.id;
//         const {
//             courseName,
//             courseDescription,
//             whatYouLearn,
//             price,
//             category,
//             tag:_tag,
//             status: rawStatus,
//             instructions: _instructions,
//         }= req.body
//         const thumbnail = req.files.thumbnailImage;

//          // Convert the tag and instructions from stringified Array to Array
//     // const tag = JSON.parse(_tag)
//     // const instructions = JSON.parse(_instructions)


//   // ----- DEFAULT VALUES -----
//     const status = rawStatus || "Draft"; // Default if not provided

//     // Parse tag safely
//     let tag = [];
//     if (_tag) {
//       try {
//         tag = JSON.parse(_tag);
//         if (!Array.isArray(tag)) tag = [tag];
//       } catch {
//         tag = [_tag];
//       }
//     }

//     // Parse instructions safely, default to []
//     let instructions = [];
//     if (_instructions) {
//       try {
//         instructions = JSON.parse(_instructions);
//         if (!Array.isArray(instructions)) instructions = [instructions];
//       } catch {
//         instructions = [_instructions];
//       }
//     }



//     console.log("tag", tag)
//     console.log("instructions", instructions)

//         //vaildation 
//         if(!courseName ||
//         !courseDescription ||
//         !whatYouLearn||
//         !category ||
//         !price ||
//         !thumbnail ||
//         !tag.length 
//         ){
//            return res.status(400).json({
//                 sucess:false,
//                 message:"All Field Atre required",
//             })
//         }
//         if (!status || status === undefined) {
//          status = "Draft"
//         }

//         // Check For Instructor
//         const instructorDetails = await User.findById(userId,{
//             accountType : "Instructor",
//          });
//         console.log("Instructor Details" , instructorDetails)
//           // todo verify that userId and instructorDetails._id are same or not
//         if(!instructorDetails){
//               return res.status(404).json({
//                 sucess:false,
//                 message:"Instructor Details Not Found",
//             })
//         }

//         // check given tag is  vaild or not
//         const categoryDetails = await Category.findById(category);
//         if(!categoryDetails){
//               return res.status(404).json({
//                 sucess:false,
//                 message:"tag Details Not Found",
//             })
//         } 
//         // upload Image To cloudinary
//         const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
//         console.log(thumbnailImage)
//         // CREATE AN ENTRY FOR NEW COURSE

//         const newCourse = await Course.create({
//             courseName,courseDescription,
//             instructor:instructorDetails._id,
//             whatYouLearn,price,tag,
//             category:categoryDetails._id,
//             thumbnail:thumbnailImage.secure_url,
//             status: status,
//             instructions,
//         })

//         // updated user(instructor)
//         await User.findByIdAndUpdate(
//             {_id:instructorDetails._id},
//             {
//                 $push:{
//                     courses:newCourse._id,
//                 }
//             },
//             {new:true}
//         )
//         //update tage schema HW  :  done but testing 
//         await Category.findByIdAndUpdate(
//             {_id:categoryDetails._id},
//             {
//                  $push:{
//                     course:newCourse._id,
//                 }
//             },
//             {new:true}
//         )
//         //return res
//          return res.status(200).json({
//                 sucess:true,
//                 message:"Course Added Successfully",
//                 data:newCourse,
//             })

//     } catch (error) {
//         console.error(error)
//          return res.status(500).json({
//                 sucess:false,
//                 message:"Course Not Added", 
//                 error:error.message,
//             })
//     }
// }


exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id

    const {
      courseName,
      courseDescription,
      whatYouWillLearn, // ✅ fixed
      price,
      category,
      tag: _tag,
      status: rawStatus,
      instructions: _instructions,
    } = req.body

    const thumbnail = req.files?.thumbnailImage
    let status = rawStatus || "Draft"

    // let tag = []
    // if (_tag) tag = JSON.parse(_tag)

    // let instructions = []
    // if (_instructions) instructions = JSON.parse(_instructions)
let tag = []
try {
  if (_tag) tag = JSON.parse(_tag)
} catch {
  tag = []
}

let instructions = []
try {
  if (_instructions) instructions = JSON.parse(_instructions)
} catch {
  instructions = []
}
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }
    // console.log("courseName",courseName)
    // console.log("courseDescription",courseDescription)
    // console.log("whatYouWillLearn",whatYouWillLearn)
    // console.log("price",price)
    // console.log("category",category)
    // console.log("thumbnail",thumbnail)
    // console.log("tag",tag)
    // console.log("instructions",instructions)

    const instructorDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      })
    }

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }


    
      const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
      )
//console.log("After")
  // console.log(thumbnailImage.secure_url)
   
  

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      instructor: instructorDetails._id,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    })
    await Category.findByIdAndUpdate(
 categoryDetails._id,
  { $push: { courses: newCourse._id } },
  { new: true }
);

    // console.log("after all",newCourse)
    return res.status(200).json({
      success: true,
      message: "Course Added Successfully",
      data: newCourse,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
     
    })
  }
}



//Edit Course Details
// exports.editCourse = async (req,res) => {
//     try {
//         const {courseId } = req.body
//         const updates = req.body
//         const course = await Course.findById(courseId)

//         if(!course){
//             return res.status(404).json({
//                 success:false,
//                 message:"Course Not Found"
//             })
//         }
//         //If Thumbnail Image is Found Update it
//         if(res.files){
//             console.log("thumbnail update")
              
//              console.log("thumbnail update")
//              const thumbnail = req.files.thumbnailImage
//              const thumbnailImage = await uploadImageToCloudinary(
//                thumbnail,
//                process.env.FOLDER_NAME
//       )
//       course.thumbnail = thumbnailImage.secure_url
//      }

//     //update Only the feild that are present in request body
//     for(const key in updates){
//          if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key])
//         } else {
//           course[key] = updates[key]
//         }
//       }
//     }
//      await course.save()

//          const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
      
//     } catch (error) {
//         console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//     }
// }



exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    const oldCategoryId = course.category.toString(); // ✅ save old category

    // Thumbnail update
    if (req.files?.thumbnailImage) {
      const thumbnailImage = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Handle category change FIRST
    if (updates.category && updates.category !== oldCategoryId) {
      await Category.findByIdAndUpdate(
        oldCategoryId,
        { $pull: { courses: course._id } }
      );

      await Category.findByIdAndUpdate(
        updates.category,
        { $push: { courses: course._id } }
      );

      course.category = updates.category;
    }

    // Update other fields
    for (const key in updates) {
      if (key === "tag" || key === "instructions") {
        course[key] = JSON.parse(updates[key]);
      } else if (key !== "category") {
        course[key] = updates[key];
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// get all Courses

exports.getAllCourses = async (req ,res)=>{
    try{
        const allCourses = await Course.find({},{
                                    courseName:true,
                                    price:true,
                                    thumbnail:true,
                                    instructor:true,
                                    ratingAndReviews:true,
                                    studentEnrolled:true,
                                })
                                .populate("instructor")
                                .exec();
       return res.status(200).json({
                sucess:true,
                message:"Data  All The courses found Successfully",
                data:allCourses, 
               
            })
    
    }catch(error){
        console.error(error)
         return res.status(500).json({
                sucess:false,
                message:"Cannot Show All The courses", 
                error:error.message,
            })
    }
} 
    
exports.getCourseDetails = async (req,res) => {
    try {
        //fetch for the courseId from req.body
        const {courseId}= req.body;
        //find course details
        console.log("in conrollers.........")
        const courseDetails = await Course.findById({_id:courseId})
                               .populate({
                                path:"instructor",
                                populate:{
                                    path:"additionalDetails",
                                }
                               })
                               .populate("category")
                               .populate("ratingAndReviews")
                               .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection",
                                    select : "-videoUrl",
                                }
                               })
                               .exec();

     //validation
     if(!courseDetails){
         return res.status(400).json({
                sucess:false,
                message:`Cannot find couse with this course id ${courseId}`,

               
            })
}
     let totalDurationInSecond = 0
     courseDetails.courseContent.forEach((content)=>{
        content.subSection.forEach((subSection)=>{
          const timeDurationInSecond = Number(subSection.timeDuration) || 0
totalDurationInSecond += timeDurationInSecond

        })
     })
     const totalDuration  = convertSecondsToDuration(totalDurationInSecond);
      return res.status(200).json({
 success: true,

  message: "Course Details Fetched Successfully",
  courseDetails,
  totalDuration,
})

    } catch (error) {
         console.error(error)
         return res.status(500).json({
                sucess:false,
                message:"Cannot Show course Deatils", 
                error:error.message,
            })
    }
    
}

exports.getFullCourseDetails = async (req,res) => {
    try {
        const  {courseId}  = req.body;
       // console.log("course Id in backend",courseId)
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId, 
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseId:courseId,
            userId :userId,
        })
       // console.log("courseProgress : ",courseProgressCount)
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : `Could not find course with id : ${courseId}`,
            })
        }

        
     let totalDurationInSecond = 0
     courseDetails.courseContent.forEach((content)=>{
        content.subSection.forEach((subSection)=>{
            const timeDurationInSecond = parseInt(subSection.timeDuration)
            totalDurationInSecond += timeDurationInSecond
        })
     })
     const totalDuration  = convertSecondsToDuration(totalDurationInSecond);

     return res.status(200).json({
        success :true,
        data :{
            courseDetails,
            totalDuration,
            completedVideos : courseProgressCount?.completedVideos
             ? courseProgressCount?.completedVideos
             : [],
        }
     })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success :false,
            message :error.message,
        })
    }
}
// Get a list of Course for a given Instructor
exports.getInstructorCourse = async (req,res) => {
    try {
          // Get the instructor ID from the authenticated user or request body
          const instructorId = req.user.id

          // find all Course Belonging to instructor
          const instructorCourses = await Course.find({
            instructor : instructorId,
          }).sort({createdAt :-1})
          //Return the instructor's courses
          res.status(200).json({
            success:true,
            data :instructorCourses,
          })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to retrieve instructor courses",
            error:error.message,
        })
    }
}

//Delete the Courses
exports.deleteCourse = async (req,res ) => {
    try {
        const { courseId } = req.body;
        //find Course

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message : "Course not Found"})
        }

        // Unenroll Student From the Course
        const studentEnrolled = course.studentEnrolled
        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses: courseId}
            })
        }

        //Delte section and sub Section 
        const courseSection = course.courseContent
        for(const sectionId of courseSection){
            // delete subsection of the section first
            const section = await Section.findById(sectionId)
            if(section){
                const subSection = section.subSection
                for(const subSectionId of subSection){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        await Category.findByIdAndUpdate(
  course.category,
  { $pull: { courses: courseId } }
);
        // Delete the Course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success:true,
            message :"Course Deleted Successfully"
        })
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to retrieve instructor courses",
            error:error.message,
        })
    }
}


exports.updateCourseProgress = async (req,res) => {
    try {
        console.log("HELELOOOOO")
        const {courseId ,subSectionId } = req.body;
      //     console.log("CourseId===",courseId)
      // console.log("SUB===",subSectionId)
        const userId = req.user.id;

        //check if sub Section is vaild or not
        const subsection = await SubSection.findById(subSectionId)
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:"InVaild Sub Section 5666"
            })
        }
        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
          courseId: courseId,
          userId: userId,
        })
        if (!courseProgress) {
        // If course progress doesn't exist, create a new one
        return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
        })
       }  else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subSectionId)
    }

       // Save the updated course progress
    await courseProgress.save()
      return res.status(200).json({
        success:true,
        message:"Course Progress updated",
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something Went Wrong ,nternal server error"
        })
    }
}