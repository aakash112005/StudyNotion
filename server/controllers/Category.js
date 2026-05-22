const Category = require("../models/Category")


exports.CreateCategory = async (req ,res) => {
  console.log("req.body =  ",req.body)
    try{
        // fetch name and des cription
         const{name,description}= req.body;
        //vailadate thses two
        if(!name || !description){
             return res.status(400).json({
            sucess:true,
            message:"All Fields Are required",
              });
        }

        // Check if category with the same name already exists
        const existingCategory = await Category.findOne({ name: name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists.",
            });
        }


        // create enrty in Db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        })

        //log tagDetails
    //  console.log(categoryDetails)

        //return respone
         return res.status(200).json({
            sucess:true,
            message:"Category Created Successfully",
              });

    }catch(error){
        console.log(error)
         return res.status(500).json({
            sucess:false,
            message:` Something Went Wrong ${error.message}`,
              });
    }
}

// get all tags from db

exports.showAllCategory = async (req ,res) => {
    try{

        const allCategory = await Category.find({},{ name:true,
            description:true,})
    return res.status(200).json({
            sucess:true,
            allCategory:allCategory,
            message:"All Category Fetched Successfully",
              });
        

    }catch(error){
         console.log(error)
         return res.status(500).json({
            sucess:false,
            message:"Something Went Wrong , Please Try Again",
              });
    }
}

exports.categoryPageDetails = async (req,res) => {
  try {
    const {categoryId} = req.body

    //get courses for the specified cateroy
    const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  //  console.log(selectedCategory);


    //handle the case when the category not found
    if(!selectedCategory){
      console.log("Category not Found");
      return res.status(404).json({
        success:false,
        message:"No Courses Found for the selected Category",
      })
    }
    const selectedCourses = selectedCategory.courses;
// Handle the case when there are no courses
      if (selectedCourses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
    //get courses for the other categories
    const categoryExceptSelected = await Category.find({
      _id:{$ne:categoryId},
    }).populate("courses").exec();

    let differentCourses = [];
    for(const category of categoryExceptSelected){
      differentCourses.push(...category.courses);
    }

    //get top sellin courses accorsses all category
    const allCategories = await Category.find()
                         .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

    const allCourses = allCategories.flatMap((category)=> category.courses);
    const mostSellingCourses = allCourses
           .sort((a,b)=> b.sold - a.sold)
           .slice(0,10);

    // res.status(200).json({
    //   selectedCourses:selectedCourses,
    //   differentCourses:differentCourses,
    //   mostSellingCourses:mostSellingCourses,
    // });
    res.status(200).json({
  success: true,
  data: {
    selectedCategory,
    differentCategory: categoryExceptSelected[0],
    mostSellingCourses,
  },
});

  } catch (error) {
     console.log(error)
         return res.status(500).json({
            sucess:false,
            message:"Something Went Wrong , Please Try Again",
              });
  }
  
}