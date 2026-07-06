import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

function Footer() {
    return (
        <div className='bg-richblack-800'>
            {/* upper section  */}
            <div className='flex lg:flex-row lg:gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
            <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                {/* left part  */}
                <div className='flex lg:flex-row  lg:w-[50%] justify-between  border-b lg:border-b-0 lg:border-r border-richblack-700  pl-3 lg:pr-5 gap-12 lg:gap-3 '>
                  
                  {/* 1 part  */}
                   <div className='w-[30%] flex flex-col gap-5 lg:w-[30%] mb-7 lg:pl-0'>
                    <img src={Logo} alt="" className="object-contain w-[160px] h-[32px]" />
                    <h1 className="text-richblack-50 font-semibold text-[18px]">Company</h1>
                    <div className="flex flex-col gap-2">
                      {
                       ["About", "Careers", "Affiliates"].map((ele,i)=>{
                            return(
                                <div key={i} 
                                className="text-[14px] text-richblack-400 font-semibold cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                   <Link to={ele.toLowerCase()}>{ele}</Link>
                                </div>
                            );
                        })
                      }
                    </div>
                    {/* icons  */}
                    <div className="flex gap-2 text-richblack-50 ">
                        <FaFacebook  className="w-[20px] h-[20px] cursor-pointer hover:text-richblack-400"/>
                        <FaGoogle className="w-[20px] h-[20px] cursor-pointer hover:text-richblack-400"/>
                        <FaTwitter className="w-[20px] h-[20px] cursor-pointer hover:text-richblack-400"/>
                        <FaYoutube className="w-[20px] h-[20px] cursor-pointer hover:text-richblack-400"/>
                    </div>
                   </div>
                
                 {/* 2 part  */}
                   <div className="flex flex-col w-[48%] lg:w-[30%] mb-7 lg:pl-0">

                     <h1 className="text-richblack-50 font-semibold text-[18px]">Resource</h1>

                     <div className="flex flex-col gap-2 mt-2">
                       {
                        Resources.map((ele,i)=>{
                            return (
                                <div key={i}
                                className="text-[14px] text-richblack-400 font-semibold cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                </div>
                            )
                        })
                       }
                     </div>

                     <h1 className="text-richblack-50 font-semibold text-[18px] mt-7">Support</h1>
                     <div
                                className="text-[14px] text-richblack-400 font-semibold cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                    <Link to={"/help-center"}>Help Center</Link>
                                </div>

                    
                   </div>

                 {/* 3 part  */}
                    <div className="flex flex-col w-[48%] lg:w-[30%] mb-7 lg:pl-0">

                     <h1 className="text-richblack-50 font-semibold text-[18px]">Plans</h1>

                     <div className="flex flex-col gap-2 mt-2">
                       {
                        Plans.map((ele,i)=>{
                            return (
                                <div key={i}
                                className="text-[14px] text-richblack-400 font-semibold cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                </div>
                            )
                        })
                       }
                     </div>

                     <h1 className="text-richblack-50 font-semibold text-[18px] mt-7">Community</h1>
                     <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 font-semibold"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
                    
                   </div>
                </div>

                {/* right part  */}
                <div className="flex  lg:flex-row  lg:w-[50%] justify-between -richblack-700 pl-3 lg:pr-5 gap-3 mt-6 lg:mt-0  lg:ml-12">
                   {
                    FooterLink2.map((ele,i)=>{
                         return (
                             <div key={i} className='w-[30%] flex flex-col gap-5 lg:w-[30%] mb-7 lg:pl-0'>
                              <h1 className="text-richblack-50 font-semibold text-[18px]">{ele.title}</h1>
                    <div className="flex flex-col gap-2">
                      {
                       ele.links.map((ele,i)=>{
                            return(
                                <div key={i} 
                                className="text-[14px] text-richblack-400 font-semibold cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                   <Link to={ele.link}>{ele.title}</Link>
                                </div>
                            );
                        })
                      }
                    </div>
                   </div>
                     )
                    })
                   }
                </div>

            </div>
            </div>
           

        {/* horizontal line ------------------------------------------------------------------------------------ */}

            {/* lower section  */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
                      <div className="flex flex-row gap-2">
                        {
                            BottomFooter.map((ele,i)=>{
                                return (
                                    <div
                                    key={i}
                                    className={` ${i === 2
                                     ? "cursor-pointer hover:text-richblack-50 transition-all duration-200 px-2 font-semibold text-[14px] " 
                                     :  "border-r-2 border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200 px-2 font-semibold text-[14px] "
                                     }
                                    `}
                                    >
                                    <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                                       {ele}
                                    </Link>
                                    </div>
                                )
                            })
                        }
                      </div>
                      <div className="text-center mt-8 lg:mt-0 ">Made with ❤️ Aakash Saini © 2026 Studynotion</div>
            </div>
            
        </div>
    )
}

export default Footer


  