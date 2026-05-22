const express = require("express");
const router = express.Router();


const {auth, isInstructor,
  isStudent,} = require("../middleware/auth")



const {getAllUserDetails,
    updateDisplayPicture,
    updatedProfile,
    deleteAccount,
getEnrolledCourses ,
instructorDashboard

} = require("../controllers/Profile")



router.delete("/deleteProfile", auth,isStudent, deleteAccount)
router.get("/getUserDetails", auth,getAllUserDetails);
router.put("/updateDisplayPicture", auth,updateDisplayPicture);
router.put("/updateProfile", auth,updatedProfile);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
module.exports = router;