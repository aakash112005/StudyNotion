const Section  = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const Course =  require("../models/Course")
require("dotenv").config();

// create subSection 

exports.createSubSection = async (req,res) => {
    try {
        // console.log("Body:", req.body);
        // console.log("Files:", req.files);

        //fetch data form the req body
        const {sectionId,title,description,timeDuration} = req.body;
        //extract file/videos        
         const video = req.files?.video;
        //vailadte
     
       if(! sectionId|| !title || !description  ||!video ){
           return res.status(400).json({
            success:false,
            message:"All Feilds Are Required",

        })
       }
     //  console.log(video)
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
      //  console.log(uploadDetails)
        //create a sub section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section by adding the the id of this sub section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true}
        ).populate("subSection").exec(); //done
        //TODO HW: LOG updated section here after adding populate query   :-- done
      //  console.log(updatedSection);
        //return response
        //  return res.status(200).json({
        //     success:true,
        //     message:"SubSection Created Successfully",
        //     updatedSection,
        // })

       // console.log("okkkkkkkkkk")
        const updatedCourse = await Course.findOne({
  courseContent: sectionId,
})
.populate({
  path: "courseContent",
  populate: {
    path: "subSection",
  },
})
.exec();

return res.status(200).json({
  success: true,
  message: "SubSection Created Successfully",
  updatedCourseDetails: updatedCourse,
});

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",

        })
    }
    
}
 
//TODO HW: upadated sub section   :-  done
exports.updateSubSection = async (req ,res) => {
    try {
        const {subSectionId,title,timeDuration,description,sectionId} = req.body;
        const subSection  = await SubSection.findById(subSectionId)

          if(! subSectionId ){
           return res.status(400).json({
            success:false,
            message:"SubSection Feilds Are Required",

        })
       }
       if (title !== undefined) {
          subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (timeDuration !== undefined) {
            subSection.timeDuration = timeDuration
        }

       //upload video to cloudinary
           if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
    //   subSection.timeDuration = `${uploadDetails.duration}`
   
    }
          await subSection.save()
         const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )
   // console.log("updated section", updatedSection)
        // there is no need to updated section because subsection id is same as we do not create the new sub section we only update the section dtails
        //  return res.status(200).json({
        //     success:true,
        //     message:"SubSection Updated Successfully",
        //     updatedSection,
        // })
        const updatedCourse = await Course.findOne({
  courseContent: sectionId,
})
.populate({
  path: "courseContent",
  populate: {
    path: "subSection",
  },
})
.exec();

return res.status(200).json({
  success: true,
  message: "SubSection Updated Successfully",
  updatedCourseDetails: updatedCourse,
});

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",

        })
    }
}
    


//TODO:  HW delete sub section   :-  done
 
exports.deleteSubSection = async (req,res) => {
    try {
         const { subSectionId, sectionId } = req.body
        if(!subSectionId){
             return res.status(404).json({
                success:false,
                message:"SubSection Id Not Found",
               
            })
        }
         await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )

      const deletedSubSection =   await SubSection.findByIdAndDelete(subSectionId);
       //TODOD[TESTING] : DO WE NEED TO DELTE THE ENTRY OF SubSECTION IN section SECHEMA
      if(!deletedSubSection){
           return res.status(403).json({
                success:false,
                message:"SubSection not deleted",
               
            })
      }

          const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )
        //   return res.status(200).json({
        //         success:false,
        //         message:"SubSection Delete Successfully",
               
        //     })
        const updatedCourse = await Course.findOne({
  courseContent: sectionId,
})
.populate({
  path: "courseContent",
  populate: {
    path: "subSection",
  },
})
.exec();

return res.status(200).json({
  success: true,
  message: "SubSection Deleted Successfully",
  updatedCourseDetails: updatedCourse,
});

        
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong Please Try Again",

        })
    }
    
}