import React from 'react'
import { FiDivideCircle } from 'react-icons/fi';
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, useLocation ,matchPath} from 'react-router-dom'

function SideBarLink({link,iconName}) {
    const Icon = Icons[iconName]
    const location  = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }

    return (
        <div>
        <NavLink to={link.path}
           onClick={"/"}
            className={`relative px-2   text-sm font-medium ${
        matchRoute(link.path)
          ? "text-yellow-50"
          : " text-richblack-300"
      } transition-all duration-200`}>

        <span   className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}></span>
            
        <div className='flex items-center gap-x-4 px-6 '>
                < Icon className="text-[24px] font-medium "/>
                <span className='text-[18px] font-medium '>{link.name}</span>
        </div>
           
        </NavLink>
        </div>
    )
}

export default SideBarLink
