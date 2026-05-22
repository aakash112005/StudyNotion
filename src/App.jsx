 import './App.css'
 import Navbar from "./components/common/Navbar"
 import Home from './pages/Home'
 import OpenRoute from './components/core/auth/OpenRoute'
 import Signup from './pages/Signup'
 import Login from './pages/Login'

 import { Routes,Route } from 'react-router-dom'

 import ForgotPassword from './pages/ForgotPassword'
 import UpdatePassword from './pages/UpdatePassword'
 import VerifyEmail from './pages/VerifyEmail'
 import About from './pages/About'
 import ContactUs from './pages/ContactUs'
 
 import Dashboard from './pages/Dashboard'
 import MyProfile from './components/core/Dashboard/MyProfile'
 import PrivateRoute from './components/core/auth/PrivateRoute'
import Settings from './components/core/Dashboard/Settings/index.jsx'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants.js'

 import AddCourse from "./components/core/Dashboard/AddCourse/index.jsx"
 //import MyCourses from './components/core/Dashboard/MyCourses.jsx'
import MyCourses from './components/core/Dashboard/MyCourses.jsx'
import EditCourse from './components/core/Dashboard/EditCourse/index.jsx'
import Catalog from './pages/Catalog.jsx'
import CourseDetails from './pages/CourseDetails.jsx'

import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import VideoDetails from './components/core/ViewCourse/VideoDetails.jsx'
import VideoDetailsSidebar from './components/core/ViewCourse/VideoDetailsSidebar.jsx'
import CourseReviewModal from './components/core/ViewCourse/CourseReviewModal.jsx'
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor.jsx'
import Cart from './components/core/Dashboard/Cart/index.jsx'

function App() {

  const  {user}  =   useSelector((state)=> state.profile)

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
       
    {/* Navbar shows on the all pages  */}
    <Navbar />

    {/* All the Routes according to pages  */}
    <Routes>

        {/* home page route  */}
        <Route path="/" element={<Home/>}/>

        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>

        {/* signup page route  */}
        <Route path="signup" element={<OpenRoute>   <Signup /> </OpenRoute> }/>

        {/* login page route  */}
        <Route path="login" element={<OpenRoute>    <Login />   </OpenRoute>}/>

        <Route path="/forgot-password"        element={<OpenRoute>         <ForgotPassword/>  </OpenRoute>}/>
        <Route path="/update-password/:token" element={<OpenRoute>         <UpdatePassword/>  </OpenRoute>}/>
        <Route path="/verify-email"           element={<OpenRoute>         <VerifyEmail/>     </OpenRoute>}/>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />



      <Route element={   <PrivateRoute>     <Dashboard />    </PrivateRoute>   }>

        <Route path='/dashboard/my-profile' element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />

        {/* Routes for Students Only  */}
        {  user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
          )
        }

        {/* Routes For Instructor only  */}
        { user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          </>
          )
        }

      </Route>


      <Route element={ <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>}>
       
      

       {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
          path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
          element={<VideoDetails />}
          />
          </>
        )
       }
       </Route>

    </Routes>
    </div>
  )
}

export default App