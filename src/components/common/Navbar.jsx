// import React, { useEffect, useState } from 'react'
// import { Link, Links, matchPath } from 'react-router-dom'
// import  {NavbarLinks}  from '../../data/navbar-links'
// import { useLocation } from 'react-router-dom'
// import Logo from "../../assets/Logo/Logo-Full-Light.png"
// import { useSelector } from 'react-redux'
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { BsChevronUp } from "react-icons/bs";
// import ProfileDropdown from '../core/auth/ProfileDropdown'
// import { apiConnector } from '../../services/apiconnector'
// import { categories } from '../../services/api'

// function Navbar() {

//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)

//   const [subLinks,setSubLinks] = useState();
//   const[isactive,setIsActive] = useState(false)
//   const [loading,setLoading] = useState(false)

//   const changeActive = ()=>{
//      setIsActive((prev) => !prev);
//   }

//   const fetchSublinks  =  async ()=>{
//        setLoading(true);
//         try {
//             const result = await apiConnector("GET",categories.CATEGORIES_API);
//             console.log("printing sublinks results",result.data)
//             setSubLinks(result.data.allCategory)
//              setLoading(false);
//         } catch (error) {
//             console.log(error+"can not fetech category list")
//         }
//         setLoading(false);
//      }

//   useEffect(()=>{
//     fetchSublinks();
//   },[])
//   useEffect(() => {
//   console.log("state value updated:", subLinks);
// }, [subLinks]);

//     const location = useLocation();
//     const matchRoute = (route)=>{
//           return matchPath(route,location.pathname)
//     }
//     return (
//         <div className='flex lg:h-14 items-center border-b-[1px] border-richblack-700 justify-center'>
//             <div className='flex lg:w-11/12 w-max-maxContent items-center justify-between'>
                 
//                  {/* first part image  */}
//                  <Link to={"/"}>
//                  <img src={Logo} alt="" width={160} height={32} loading='lazy'/>
//                  </Link>
                 
//                  {/* second part navlinks  */}
//                  <nav className='invisible md:visible'>
//                     <ul className='flex items-center gap-x-6 text-richblack-25'>
//                         {
//                             NavbarLinks.map((link,i)=>{
//                                 return (
//                                     <li key={i}>
//                                         {
//                                            link.title === "Catalog" ?
//                                            (<div className='relative'>

//                                                   <div  onClick={changeActive}
//                                                    className=
//                                                   {`group flex  items-center gap-2 cursor-pointer `}>
//                                                   <p> {link.title}</p>
//                                                   {
//                                                     isactive ? <BsChevronUp className='hover:text-richblack-400' /> : <BsChevronDown className='hover:text-richblack-400' />
//                                                   }
                                                  
//                                                   </div>

//                                                    <div className={`${isactive ? "visible": "invisible"} w-[100px] absolute left-[50%] top-[0%] z-[1000] w-[100px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-700 p-4 text-richblack-900  transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[200px]`}>
//                                                    <div className={`${isactive ? "visible": "invisible"} absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-700`}></div>
                                                   
//                                                    { loading ? (<p className="text-center">Loading...</p>)  :
//                                                      (subLinks && subLinks.length) ? (
//                                                   <div className='flex flex-col  justify-between text-richblack-25 text-[16px] gap-2 '>
//                                                    {subLinks?.map((item) => (
//                                                     <Link to={`/catalog/${item.name
//                                                        .split(" ")
//                                                        .join("-")
//                                                        .toLowerCase()}`}
//                                                        key={item._id}
//                                                        >
//                                                       <div  className='px-[5px] hover:bg-richblack-25 hover:text-richblack-900 cursor-pointer  rounded-md'
//                                                       key={item._id}>
//                                                        {item.name}
//                                                       </div>
//                                                       </Link>
//                                                    ))}
//                                                    </div>
//                                                      ) :(<p className="text-center">No Courses Found</p>)
//                                                    }
//                                                   </div>
                                       
//                                            </div>)
//                                            :
//                                            (
//                                             <Link to={link.path}>
//                                                 <p className={` ${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"} hover:text-richblack-400`}
//                                                 >{link.title}</p>
//                                             </Link>
//                                            )
//                                         }
//                                     </li>
//                                 )
//                             })
//                         }
//                     </ul>
//                  </nav>
                

//                  {/* 3 part  */}
//                 {/* login/signup/dashbord/cart  */}
//                 <div className='flex gap-x-4 items-center'>
//                      {
//                         user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && 
//                         (
//                         <Link to="/dashboard/cart" className="relative">
//                          <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                          {totalItems > 0 && (
//                          <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                           {totalItems}
//                           </span>
//                           )}
//                          </Link>
//                         )    
//                     }
//                     {
//                     token === null && (
//                      <Link to="/login">
//                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-richblack-50 hover:scale-60 transition-all duration-100 hover:border-[3px] ">
//                          Log in
//                        </button>
//                      </Link>
//                      )
//                     }
//                     {
//                     token === null && (
//                      <Link to="/signup">
//                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-richblack-50 hover:scale-60 transition-all duration-100 hover:border-[3px]">
//                          Sign up
//                        </button>
//                      </Link>
//                       )
//                     }
//                     {token !== null && <ProfileDropdown />}
//                 </div>

//                 <button className="mr-4 md:hidden">
//                   <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//                 </button>

//             </div>

//         </div>
//     )
// }

// export default Navbar



import React, { useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"


import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'

 
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'

import { ACCOUNT_TYPE } from "../../utils/constants"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'
import { useRef } from 'react'

import ProfileDropdown from '../core/auth/ProfileDropdown'
import useOnClickOutside from "../../hooks/useOnClickOutside"


function Navbar() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [subLinks,setSubLinks] = useState([])
  const [isactive,setIsActive] = useState(false)
  const [loading,setLoading] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
 

  const changeActive = ()=> setIsActive(prev => !prev)

  const fetchSublinks  =  async ()=>{
       setLoading(true)
        try {
            const result = await apiConnector("GET",categories.CATEGORIES_API)
            setSubLinks(result.data.allCategory)
        } catch (error) {
            console.error("Cannot fetch category list", error)
        }
        setLoading(false)
  }

  useEffect(()=>{ fetchSublinks() },[])

  const location = useLocation()
  const matchRoute = (route)=> matchPath(route,location.pathname)

  const ref = useRef(null);
  // useOnClickOutside(ref,()=>setIsActive(false))
  // useOnClickOutside(ref,()=>setMobileMenu(false))


useOnClickOutside(ref, () => {
  setIsActive(false)
  setMobileMenu(false)
})
  return (
    
      <div className={`flex h-14 items-center border-b-[1px] border-richblack-700 justify-center
        ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200
      `}>
       <div className="flex max-w-maxContent w-11/12 lg:w-full  items-center justify-between px-4">

        
        {/* first part image */}
        <Link to={"/"}>
          <img src={Logo} alt="logo" width={160} height={32} loading='lazy'/>
        </Link>

        {/* second part navlinks (desktop only) */}
        <nav className='hidden md:block'>
          <ul className='flex items-center gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link,i)=>(
              <li key={i}>
                { link.title === "Catalog" ? (
                  <div className='relative'>
                    <div onClick={changeActive} className='group flex items-center gap-2 cursor-pointer'>
                      <p>{link.title}</p>
                      { isactive ? <BsChevronUp/> : <BsChevronDown/> }
                    </div>

                    <div 
                     onClick={(e) => e.stopPropagation()}
                     ref={ref}
                    className={`${isactive ? "visible" : "invisible"} absolute left-[50%] top-[0%] z-[1000] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-4 transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] lg:w-[200px]`}>
                      <div className={`${isactive ? "visible" : "invisible"} absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 rounded border-t-[1px] border-richblack-700 bg-richblack-800 `}></div>
                      { loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        <div className='flex flex-col gap-2 text-richblack-25 text-[16px] '>
                          {subLinks.map((item) => (
                            <Link onClick={()=> setIsActive(false)}
                              to={`/catalog/${item.name.split(" ").join("-")}`}
                              key={item._id}>
                              <div className='px-2 py-1 hover:bg-richblack-25 hover:text-richblack-900 rounded-md  border-[1px] border-richblack-700 '>
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"} hover:text-richblack-400`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* third part - login/signup/cart (desktop only) */}
        <div className='hidden md:flex gap-x-4 items-center'>
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 hover:bg-richblack-900 hover:text-richblack-50 transition-all duration-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 hover:bg-richblack-900 hover:text-richblack-50 transition-all duration-100">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex flex-row items-center justify-between gap-1 md:hidden'>
        <button 
          className="mr-4 md:hidden"
          onClick={() => setMobileMenu(prev => !prev)}
        >
          {mobileMenu ? <AiOutlineClose fontSize={24} fill="#AFB2BF"/> : <AiOutlineMenu fontSize={24} fill="#AFB2BF"/>}
        </button>




      {/* mobile auth/cart */}
          <div className="flex flex-row gap-3 items-center">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative flex items-center gap-2">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {/* <span>Cart ({totalItems})</span> */}
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>


          </div>




        
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div 
         onClick={(e) => e.stopPropagation()}
          ref={ref}
        className="absolute top-14 left-0 w-full bg-richblack-800 border-[2px] border-richblack-700 p-4 flex flex-col gap-4 md:hidden z-50">
          {/* mobile nav links */}
          <ul className="flex flex-col gap-3 text-richblack-25">
            {NavbarLinks.map((link, i) => (
              <li key={i} >
                {link.title === "Catalog" ? (
                  <details>
                    <summary className="cursor-pointer flex items-center justify-between border-[2px] border-richblack-700 p-2 hover:bg-richblack-900">
                      {link.title}
                      <span>{isactive ? <BsChevronUp/> : <BsChevronDown/>}</span>
                    </summary>
                    <ul className="ml-4 mt-2 flex flex-col gap-2">
                      {subLinks?.map((item) => (
                        <div
                         key={item._id}
                         className='border-[1px] border-richblack-700 py-1 px-4 hover:bg-richblack-50 hover:text-richblack-900'>
                        <Link onClick={() => setMobileMenu(prev => !prev)}
                          key={item._id}
                          to={`/catalog/${item.name.split(" ").join("-").toLowerCase()}`}
                        
                        >
                          <li className="">{item.name}</li>
                        </Link>
                        </div>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <div className='border-[2px] border-richblack-700 p-2 hover:bg-richblack-900'>
                  <Link to={link.path} onClick={() => setMobileMenu(prev => !prev)}
                  >
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"} hover:text-richblack-400`}>
                      {link.title}
                    </p>
                  </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* mobile auth/cart */}
          <div className="flex flex-col gap-3 mt-4">
            {/* {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative flex items-center gap-2">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                <span>Cart ({totalItems})</span>
              </Link>
            )} */}
            {token === null ? (
              <>
                <Link to="/login" onClick={() => setMobileMenu(prev => !prev)}>
                  <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenu(prev => !prev)}>
                  <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              // <ProfileDropdown /> 
              <></>
            )}
          </div>



        </div>
      )}
    </div>
  )
}

export default Navbar
