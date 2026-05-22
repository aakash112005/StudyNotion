import { FaArrowRight } from "react-icons/fa";
import CTABUTTON from '../homepage/Button';
import { TypeAnimation } from 'react-type-animation';


function CodeBlocks({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGraident,codecolor}) {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
            
          {/* section 1 */}
          <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
            {heading}
            
            {/* Sub Heading */}
            <div className='text-richblack-300 text-base  w-[85%] -mt-3'>
                    {subheading}
            </div>
             
            {/* Button Group */}
            <div className='flex gap-4'>
                    <CTABUTTON active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTABUTTON>

                     <CTABUTTON active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTABUTTON>
            </div>
          </div>

          {/* section 2 */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                   {/* {backgroundGraident} */}
                   <div>
                     <div
                       className="
                          absolute
                          w-[372.95px]
                          h-[257.05px]
                          rounded-full
                          left-[calc(50%_-_372.95px/2_-_76.53px)]
                          top-[calc(50%_-_257.05px/2_-_47.47px)]
                          opacity-20
                          blur-[34px]
                          bg-[linear-gradient(118.19deg,_#1fa2ff_-3.62%,_#12d8fa_50.44%,_#a6ffcb_104.51%)]
                          skew-x-[-1.718deg]"
                      ></div>
                    </div>

                   {/* Indexing */}
                   <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
                     <p>1</p>
                     <p>2</p>
                     <p>3</p>
                     <p>4</p>
                     <p>5</p>
                     <p>6</p>
                     <p>7</p>
                     <p>8</p>
                     <p>9</p>
                     <p>10</p>
                     <p>11</p>
                   </div>
           
                   {/* Codes */}
                   <div
                     className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-1`}
                   >
                     <TypeAnimation
                       sequence={[codeblock, 1000, ""]}
                       cursor={true}
                       repeat={Infinity}
                       style={{
                         whiteSpace: "pre-line",
                         display: "block",
                       }}
                       omitDeletionAnimation={true}
                     />
                   </div>
                 </div>
           
        </div>
    )
}

export default CodeBlocks
