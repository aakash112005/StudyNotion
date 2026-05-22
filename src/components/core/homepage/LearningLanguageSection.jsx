import React from 'react'
import CTABUTTON from "./Button"
import HighlighText from './HighlighText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";


function LearningLanguageSection() {
    return (
        <div className='flex flex-col items-center px-4 lg:px-12 mt-[100px]'>
            <div className='flex flex-col items-center gap-4 mb-4'>
               <p className='font-semibold text-[36px] leading-[44px] tracking-[-0.2%]'
               >Your swiss knife for <HighlighText text={"learning any language"}/> </p>
               <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more</p>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
                <img src={Know_your_progress} alt="Know_your_progress" className="object-contain  lg:-mr-32 "/>
                <img src={Compare_with_others} alt="Compare_with_others"  className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>
                <img src={Plan_your_lessons} alt="Plan_your_lessons"  className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"/>
            </div>
            <div className=' w-fit mx-auto lg:mb-20 mb-8 mt-[50px]'> 
                <CTABUTTON children={"Learn More"} active={true} linkto={"/signup"}/>
            </div>
        </div>
    )
}

export default LearningLanguageSection
