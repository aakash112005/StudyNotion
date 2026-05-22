import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

import banner from "../assets/Images/banner.mp4"

import HighlighText from '../components/core/homepage/HighlighText';
import CTABUTTON from '../components/core/homepage/Button';
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import ExploreMore from '../components/core/homepage/ExploreMore';
import TimelineSection from '../components/core/homepage/TimelineSection';
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection';
import InstructorSection from '../components/core/homepage/InstructorSection';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

function Home() {
    return (
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
               
          {/* Become a Instructor Button */}
            <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                 <Link to={"/signup"}>
                 <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                
                 <p>Become an Instructor</p>
                 <FaArrowRight />
                 
                </div>
                </Link>
            </div>
           
             
          {/* Heading */}
            <div className="text-center text-4xl font-semibold">
                Empower Your Future with  
                <HighlighText text={"Coding Skills"} />
            </div>

          {/* Sub Heading */}
            <div className='-mt-3 w-[90%] text-center text-lg  text-richblack-300'>
                With our online coding courses, you can learn at your own pace, 
                from anywhere in the world, and get access to a wealth of resources,
                 including hands-on projects, quizzes, and personalized feedback from 
                 instructors. 
            </div>

          {/* CTA Buttons */}
            <div className='mt-8 flex flex-row gap-7'>
              <CTABUTTON active={true} linkto={"/signup"}>
                 Learn More
              </CTABUTTON>
              <CTABUTTON active={false} linkto={"/login"}>
                 Book a Demo
              </CTABUTTON>
            </div>

          {/* Video */}
           <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
             <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay>
           <source src={banner} type="video/mp4" />
          </video>
           </div>
            
          {/* Code Section 1  */}
          <div>
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className='text-4xl font-semibold'>
                    Unlock Your 
                    <HighlighText text={"coding Potential"} />
                    with Our Online Courses.
                </div>
              }
              subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
              ctabtn1={
                {
                    btnText :"Try it Your Self",
                    active: true,
                    linkto: "/signup"
                }
              }
              ctabtn2={
                {
                    btnText :"Learn More",
                    active: false,
                    linkto: "/login"
                }
              }
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
           // backgroundGradient={<div className="codeblock1 absolute"></div>}
           />
           </div>

           {/* Code Section 2 */}
           <div>
            <CodeBlocks 
               position={"lg:flex-row-reverse"}
              heading={
                <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                    Start
                    <HighlighText text={"coding in seconds"} />
                   
                </div>
              }
              subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
              ctabtn1={
                {
                    btnText :"Continue Lesson",
                    active: true,
                    linkto: "/signup"
                }
              }
              ctabtn2={
                {
                    btnText :"Learn More",
                    active: false,
                    linkto: "/login"
                }
              }
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
           // backgroundGradient={<div className="absolute "></div>}
            />
           </div>

           {/* explore More  */}
           <ExploreMore />

        </div>

        {/* section 2 */}
        <div className='bg-[#F9F9F9]'> 
           {/* box backfround img  */}
           <div className='mt-[100px] homepage_bg h-[320px] flex  items-center justify-around'> 
            <div className='mt-8 flex flex-col lg:flex-row    gap-7'>
              <CTABUTTON active={true} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                 Explore Full Catalog
                 <FaArrowRight/>
                </div>
              </CTABUTTON>
              <CTABUTTON active={false} linkto={"/login"}>
                Learn More
              </CTABUTTON>
            </div>
            </div>

          <div className='flex flex-col items-center mt-[90px] gap-[100px] lg:gap-0 '>
               {/* upper details section  */}
               <div className='flex flex-col lg:flex-row  w-full max-w-[1300px]  h-[144px] gap-[50px] lg:gap-[150px] mx-auto px-[20px] mb-[40px]'>

                  <div className='font-semibold text-[36px] leading-[44px] tracking-[-0.2px]'>
                    Get the skills you need for a
                    <HighlighText text={"job that is in demand."} />
                  </div>

                  <div className='flex flex-col h-[144px] justify-between '>
                    <p className='font-medium text-[16px] leading-[24px]'
                   >The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                    <div className='w-[137px]'>
                    <CTABUTTON children={"Learn More"} active={true} linkto={"/login"} />
                    </div>
                  </div>
               </div>

               {/* time line Section  */}
               <TimelineSection />
          </div>

          {/* learning Language section  */}
          <LearningLanguageSection />

        </div>
           
           {/* section 3 */}
           <div className='px-6 lg:px-4 relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

          {/* Instructor Section  */}
          <InstructorSection />

          {/* Review Slider  */}
          {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
           </div>

           {/* section footer */}
           <div>
          <Footer />
           </div> 
    </div>
    )
}

export default Home
