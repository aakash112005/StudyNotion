// import React, { useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import { ratingsEndpoints } from '../../services/api';

// import { FreeMode, Pagination, Mousewheel } from "swiper/modules";
// import { FaStar } from "react-icons/fa"
// import { apiConnector } from '../../services/apiconnector';

// function ReviewSlider() {
//      const [reviews,SetReviews] = useState([]);
//      const truncatewords = 15;

//       useEffect(()=>{
//         const fetchAllReviews = async()=>{
//             const response= await apiConnector("GET" ,ratingsEndpoints.REVIEWS_DETAILS_API)
//            // console.log("response of reviews == ",response)
//             const {data}=  response;
//             if(data?.success){
//                 SetReviews(data?.allReviews)
//             }
//            //  console.log("response of reviews == ",reviews)
//         }
//         fetchAllReviews();
//       },[reviews])

//     return (
//       <div className="text-white w-full min-w-0">
//     <div className="w-full min-w-full h-[190px] overflow-hidden items-center">
//               <Swiper
//                style={{ width: "100%" }}   // 🔥 IMPORTANT
//             className="w-full min-w-full"
//           slidesPerView={5}
//          loop={reviews.length > 3}
//           autoplay={{
//             delay:2500,
//           }}
//           spaceBetween={25}
//           freeMode={true}
//          // pagination={{ clickable: true }}
//           grabCursor={true}
//           simulateTouch={true}
//           mousewheel={{ forceToAxis: true }}
//           modules={[FreeMode, Pagination, Mousewheel]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
         
//         >
//          {
//             reviews.map((review,index)=>(
//                 <SwiperSlide key={index}
//                 className="!w-auto flex justify-center"
//                 >
                  
//                     <img  className="h-9 w-9 rounded-full object-cover mx-auto"
//                     src={review?.user?.image
//                         ? review?.user?.image
//                         : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`   
//                     } 
//                     alt="User" />
//                     <p>{review?.user?.firstName} {review?.user?.lastName}</p>
//                     <p className='text-white'>{review?.course?.courseName}</p>
//                      <p>
//                         {review?.review}
//                      </p>
//                      <p>{review?.rating}</p>
//                      <div className="flex gap-1 mt-1">
//   {Array.from({ length: 5 }).map((_, i) => (
//     <FaStar
//       key={i}
//       className={
//         i < review?.rating
//           ? "text-yellow-400"
//           : "text-gray-400"
//       }
//       size={14}
//     />
//   ))}
// </div>
//                 </SwiperSlide>
//             ))
//          }
//         </Swiper>
//             </div>
//         </div>
//     )
// }

// export default ReviewSlider




import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode, Mousewheel } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import { ratingsEndpoints } from "../../services/api";
import { apiConnector } from "../../services/apiconnector";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  // 🔥 FETCH REVIEWS (RUN ONCE)
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        if (response?.data?.success) {
          setReviews(response.data.allReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchAllReviews();
  }, []);
  const truncateWords = (text, limit = 15) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
};


  return (
    <div className="w-full text-white py-12">
      {/* SECTION TITLE */}
      {/* <h2 className="text-3xl font-semibold text-center mb-10">
        Reviews from other learners
      </h2> */}

      {/* SLIDER */}
      <div className="w-full min-w-0 overflow-hidden">
        <Swiper
          style={{ width: "100%" }}
          className="w-full"
          slidesPerView={4}
          spaceBetween={24}
          loop={reviews.length > 4}
          grabCursor
          freeMode
          mousewheel={{ forceToAxis: true }}
          modules={[FreeMode, Mousewheel]}
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              {/* REVIEW CARD */}
              <div className="w-[300px] h-[200px] bg-richblack-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg">
                
                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`
                    }
                    alt="User"
                  />

                  <div>
                    <p className="text-sm font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

              <p className="text-sm text-richblack-200">
  {truncateWords(review?.review, 15)}
</p>


                {/* RATING */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-yellow-400 font-semibold">
                    {review?.rating}
                  </span>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review?.rating
                            ? "text-yellow-400"
                            : "text-richblack-500"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
