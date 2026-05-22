// import { useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { RxCross2 } from "react-icons/rx"
// import ReactStars from "react-rating-stars-component"
// import { useSelector } from "react-redux"

// //import { createRating } from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../common/IconBtn"

// export default function CourseReviewModal({ setReviewModal }) {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { courseEntireData } = useSelector((state) => state.viewCourse)

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

//   useEffect(() => {
//     setValue("courseExperience", "")
//     setValue("courseRating", 0)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const ratingChanged = (newRating) => {
//     // console.log(newRating)
//     setValue("courseRating", newRating)
//   }

//   const onSubmit = async (data) => {
//     // await createRating(
//     //   {
//     //     courseId: courseEntireData._id,
//     //     rating: data.courseRating,
//     //     review: data.courseExperience,
//     //   },
//     //   token
//     // )
//     setReviewModal(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5">Add Review</p>
//           <button onClick={() => setReviewModal(false)}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="p-6">
//           <div className="flex items-center justify-center gap-x-4">
//             <img
//               src={user?.image}
//               alt={user?.firstName + "profile"}
//               className="aspect-square w-[50px] rounded-full object-cover"
//             />
//             <div className="">
//               <p className="font-semibold text-richblack-5">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-sm text-richblack-5">Posting Publicly</p>
//             </div>
//           </div>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-6 flex flex-col items-center"
//           >
//            <div className="mt-4 text-white">
//   <ReactStars
//     count={5}
//     size={24}
//     value={0}
//     edit={true}
//     onChange={ratingChanged}
//     activeColor="#ffd700"
//   />
// </div>

//             <div className="flex w-11/12 flex-col space-y-2">
//               <label
//                 className="text-sm text-richblack-5"
//                 htmlFor="courseExperience"
//               >
//                 Add Your Experience <sup className="text-pink-200">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="form-style resize-x-none min-h-[130px] w-full"
//               />
//               {errors.courseExperience && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>
//             <div className="mt-6 flex w-11/12 justify-end gap-x-2">
//               <button
//                 onClick={() => setReviewModal(false)}
//                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//               >
//                 Cancel
//               </button>
//               <IconBtn text="Save" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { FaStar } from "react-icons/fa"
import { useSelector } from "react-redux"

import IconBtn from "../../common/IconBtn"
import { createRating } from "../../../services/operations/courseDetailsAPI"
export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
 const { token } = useSelector((state) => state.auth)
  const [rating, setRating] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // register rating manually
  useEffect(() => {
    register("courseRating", { required: true })
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [register, setValue])

  const onSubmit = async (data) => {
    const payload = {
      courseId: courseEntireData?._id,
      rating: data.courseRating,
      review: data.courseExperience,
    }
    console.log("REVIEW PAYLOAD 👉", payload)
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )

    // API call here later
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-4">
            <img
              src={user?.image}
              alt="profile"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            {/* ⭐ STAR RATING */}
            <div className="mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer transition-colors ${
                    rating >= star
                      ? "text-yellow-400"
                      : "text-richblack-300"
                  }`}
                  onClick={() => {
                    setRating(star)
                    setValue("courseRating", star)
                  }}
                />
              ))}
            </div>

            {errors.courseRating && (
              <span className="mb-3 text-xs text-pink-200">
                Please select a rating
              </span>
            )}

            {/* 📝 REVIEW TEXT */}
            <div className="flex w-11/12 flex-col gap-2">
              <label className="text-sm text-richblack-5">
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                placeholder="Add your experience..."
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] resize-none"
              />
              {errors.courseExperience && (
                <span className="text-xs text-pink-200">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex w-11/12 justify-end gap-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
