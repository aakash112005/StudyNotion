// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import IconBtn from '../../common/IconBtn';

// function MyProfile() {
//     const {user} = useSelector((state)=>state.profile)
//     const navigate = useNavigate();
//     return (
//         <div className='flex flex-col  justify-between gap-y-8 text-white'>
//             <h1 className='text-4xl text-white font-bold'>My Profile</h1>

//             {/* section 1 */}
//             <div className='flex justify-between bg-richblack-800 p-10 rounded-md border-[1px] border-richblack-700'>
//                 <div className='flex items-center justify-between gap-10'>
//                     <img src={user?.image} alt={`Profile-${user?.firstName}`} 
//                     className='aspect-square w-[78px] rounded-full object-cover'
//                     />
//                     <div className='flex flex-col  '>
//                         <p>{user?.firstName +" "+ user?.lastName}</p>
//                         <p>{user?.email}</p>
//                     </div>
//                 </div>

//                 <IconBtn className="w-[25px] h-[10px]"
//                 text="Edit" onClick={()=>{
//                     navigate("/dashboard/settings")
//                 }}
//                 />
//             </div>

//             {/* section 2 */}
//             <div>
//                 <div>
//                     <p>About</p>
//                     <IconBtn 
//                     text="Edit"
//                     onClick={()=>{
//                         navigate("/dashboard/settings")
//                     }}
//                     />
//                 </div>
//                 <p>{user?.additionalDetails?.about ?? "Write Something about YourSelf"}</p>
//             </div>

//             {/* section 3 */}
//             <div>
//                 <div>
//                     <p>Personal Details</p>
//                    <IconBtn 
//                     text="Edit"
//                     onClick={()=>{
//                         navigate("/dashboard/settings")
//                     }}
//                     />
//                 </div>

//                 <div>
//                    <div>
//                      <p>First Name</p>
//                      <p>{user?.firstName}</p>
//                    </div>

//                     <div>
//                      <p>E-mail</p>
//                      <p>{user?.email}</p>
//                    </div>

//                     <div>
//                      <p>Gender</p>
//                      <p>{user?.additionalDetails?.gender ?? "Please Enter Genter"}</p>
//                    </div>

//                     <div>
//                      <p>Last Name</p>
//                      <p>{user?.lastName}</p>
//                    </div>

//                     <div>
//                      <p>Phone Number</p>
//                      <p>{user?.additionalDetails?.contactNumber ?? "Please Enter contactNumber"}</p>
//                    </div>

//                    <div>
//                     <p>Date Of Birth</p>
//                     <p>{user?.additionalDetails?.dateOfBirth ?? "Please Enter dateOfBirth"}</p>
//                    </div>

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default MyProfile





















import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onClick={()=>{
                navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>



      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onClick={()=>{
                navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>



      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
           onClick={()=>{
                navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}