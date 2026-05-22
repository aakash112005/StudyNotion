// import React from 'react'
// import ContactUsForm from '../components/ContactPage/ContactUsForm'

// function ContactUs() {
//     return (
//         <section>
//             <div>
//                 <div className='flex flex-col lg:flex-row justify-between w-11/12 max-w-maxContent mx-auto py-20 '>
//                         <div className='w-[35%] rounded-xl  bg-richblack-800 h-[390px] flex flex-col items-center py-[24px] px-[24px] gap-[24px]'>
//                             <div className='p-[12px] gap-[9px] flex '>  
//                                 <div></div>
//                                 <div className='flex flex-col  '>
//                                     <h1 className='text-[18px] leading-[26px] text-richblack-50 font-semibold'>Chat on us</h1>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium '>Our friendly team is here to help.</p>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium'>@mail address</p>
//                                 </div>
//                             </div>
//                            <div className='p-[12px] gap-[9px] flex '>  
//                                 <div></div>
//                                 <div className='flex flex-col  '>
//                                     <h1 className='text-[18px] leading-[26px] text-richblack-50 font-semibold'>Chat on us</h1>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium'>Our friendly team is here to help.</p>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium'>@mail address</p>
//                                 </div>
//                             </div>
//                             <div className='p-[12px] gap-[9px] flex '>  
//                                 <div></div>
//                                 <div className='flex flex-col '>
//                                     <h1 className='text-[18px] leading-[26px] text-richblack-50 font-semibold'>Chat on us</h1>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium'>Our friendly team is here to help.</p>
//                                     <p className='text-[14px] leading-[22px] text-richblack-50 font-medium'>@mail address</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='w-[55%] rounded-xl border-[1px] border-richblack-25 gap-12 mx-auto px-12 py-12 '>
//                             <div className='flex flex-col  justify-between text-richblack-50 mx-auto gap-2'>
//                                 <h1 className='text-[36px] font-semibold leading-[44px] tracking-[0.2%] text-richblack-50'>
//                                     Got a Idea? We’ve got the skills. Let’s team up
//                                 </h1>
//                                 <p
//                                 className='text-[16px] font-400 leading-[24px] tracking-[0.2%] text-richblack-300'
//                                 >Tall us more about yourself and what you’re got in mind.</p>
//                             </div>
//                             <div className='mt-8'>
//                                   <ContactUsForm />
//                             </div>
//                         </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default ContactUs


import React from "react"

import ContactDetails from "../components/ContactPage/ContactDetails"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"
import ContactForm from "../components/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div>
      {}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>

    
  )
}

export default Contact