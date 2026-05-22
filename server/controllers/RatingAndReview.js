const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating
exports.createRating = async (req,res) => {
   try {
     // get user id
     const userId = req.user.id
     //console.log("user",userId);
     // fetch data from req.body
     const {courseId , rating,review} = req.body;
    //  console.log("courseId",courseId)
    //  console.log("rating",rating)
    //  console.log("review",review)
     // if user enrolled then give rating and eievw
     const courseDetails = await Course.findOne({_id:courseId,
                                            studentEnrolled : {$elemMatch : {$eq : userId}},
                                              
     });
     if(!courseDetails){
         return res.status(404).json({
                success:false,
                message:"Student Not Enrolled in this Course",
            })
     }
     // check for only one time user give rating review
     const alreadyReview = await RatingAndReview.findOne({
        user:userId,
        course:courseId,
     })
     if(alreadyReview){
         return res.status(403).json({
                success:false,
                message:"Course Is already review by this user",
            })
     }
     // create rating and reveiw
     const ratingReview = await RatingAndReview.create({
        rating,review,
        course:courseId,
        user:userId,
     });

     // add this into the particular course
    const updatedCourseDetails =  await Course.findByIdAndUpdate({_id:courseId},
        {
            $push:{
                ratingAndReviews:ratingReview._id,
            }
        },{new:true}
     );
        // console.log(updatedCourseDetails);
          return res.status(200).json({
                success:true,
                message:"Successfuly Created rating And review",
               ratingReview,
            })
       
   } catch (error) {
        console.log(error)
          return res.status(500).json({
                success:false,
                message:"SomeThing Went Wrong , Please Try Again",
                error:error.message,
            })
   }    
}
//get average rating
exports.getAverageRating = async (req,res) => {
     try {
          // get course id
          const courseId = req.body.courseId;
          //calculate Average rating
          const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course:mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating : {$avg :"$rating"},
                    }
                }
          ])
           //return Average rating
          if(result.length >0){
            return res.status(200).json({
                success:true,
                message:"Average rating find Successfully",
                averageRating: result[0].averageRating
            })
          }
          // if no Rating And review found
          return res.status(200).json({
                success:true,
                message:"rating is 0 , No Rating Till Now",
                averageRating: 0
            })
          
     } catch (error) {
         console.log(error)
          return res.status(500).json({
                success:false,
                message:"SomeThing Went Wrong , Please Try Again",
                error:error.message,
            })
     }
}
//get all rating and reviews

exports.getAllRating = async (req,res) => {
    try {
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user", 
            select:"firstName lastName , email , image",
        })
        .populate({
            path:"course",
             select:"courseName",
        })
        .exec();
         return res.status(200).json({
                success:true,
                message:"All Reviews Fetched Successfully",
                allReviews:allReviews,
                 })
    } catch (error) {
         console.log(error)
          return res.status(500).json({
                success:false,
                message:"SomeThing Went Wrong , Please Try Again",
                error:error.message,
            })
    }
    
}

// find rating review based on course