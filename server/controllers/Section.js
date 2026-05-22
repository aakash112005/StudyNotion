const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection = async (req,res) =>{
    try{
        //dta fecth
        const {sectionName,courseId} = req.body;
        // data vaildation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All Feilds Are Required",
            })
        }
        // create section
        const newSection = await  Section.create({sectionName})
        //updateCouse
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                     courseContent:newSection._id,
                }
            },
            {new:true},
        ) .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec(); //done
        // populate section and sub section in course at one time 
        // TODO HW
        
        //return res
         return res.status(200).json({
                success:true,
                message:"Section Created Successfully",
                updatedCourseDetails,
            })


    }catch(error){
        console.log(error)
          return res.status(400).json({
                success:false,
                message:"SomeThing Went Wrong , Please Try Again",
                error:error.message,
            })
    }
}

exports.updateSection = async (req ,res) => {
    try {
        // data input
        const {sectionName , sectionId,courseId} = req.body;
        //vaildate data
        if(!sectionId || !sectionName){
          return res.status(400).json({
                success:false,
                message:"All Feilds Are Required",
               
            })
        }
        //update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {sectionName} , {new:true}
        )

        const course = await Course.findById(courseId)
         .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
         })
          .exec();
        //   return res.status(200).json({
        //         success:true,
        //         message:"Section Updated Successfully",
        //         updatedSection:updatedSection,
               
        //     })
        return res.status(200).json({
  success: true,
  message: "Section Updated Successfully",
  updatedCourseDetails: course,
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

// delete section

exports.deleteSection = async (req,res) => {
    try {
        const {sectionId,courseId} = req.body;
        if(!sectionId ||!courseId){
          return res.status(404).json({
                success:false,
                message:"Section Id Not Found",
               
            })
        }

       await Course.findByIdAndUpdate(courseId,{
        $pull:{
            courseContent : sectionId,
        }
       })
       const section = await Section.findById(sectionId);
     //  console.log(sectionId,courseId);
       if(!section){
        return res.status(404).json({
            success:false,
            message:"Section not found",
        })
       }

       //delete subsection
       await SubSection.deleteMany({_id:{$in: section.subSection}})

       await Section.findByIdAndDelete(sectionId);

       //find the updated course And return 
       const course = await Course.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
       })
       .exec();

         return res.status(200).json({
                success:true,
                message:"Section Delete Successfully",
               data:course
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