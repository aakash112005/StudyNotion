import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './sideBarLink'
import { VscSettingsGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [confirmationModal , setConfirmationModal] = useState(null);


   const {user,loading:profileLoading} = useSelector((state)=>state.profile)
   const {loading:authLoading} = useSelector((state)=>state.auth)
    if(profileLoading || authLoading){
        return (
          <div className='spinner items-center'>Loading...</div>
        )
    }

    return (
        <div >
        <div className='flex h-[calc(100vh-3.5rem)] min-w-[250px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-6 '>

            {/* Upper Section  */}
            <div className='flex flex-col mb-4'>
               {
                sidebarLinks.map((link)=>{
                    if(link.type && user.accountType !== link.type) return null;
                    return (
                        <SideBarLink key={link.id} link={link} iconName={link.icon}/>
                    )
                })
               }
            </div>
           
           
            <div className='w-10/12 border-t-[1px] border-white mx-auto'></div>

            {/* loWerSection  */}
            <div className='flex flex-col gap-2  py-2'>
                 
                 {/* Setting bUtton  */}
                <SideBarLink  link={{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"/>

                 {/* logOut Button  */}
                <button onClick={()=>setConfirmationModal({
                    text1:"Are You Sure",
                    text2:"You Will be logged out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler : ()=> dispatch(logout(navigate)),
                    btn2Handler : ()=> setConfirmationModal(null)
                  })}
                className=" py-2 text-sm font-medium text-richblack-300"
                  >
                    <div className="flex items-center gap-x-4 px-6">
                         <VscSignOut  className='text-[24px] font-medium '/>
                         <span className='text-[18px] font-medium '>Logout</span>
                    </div>
                </button>

            {/* </div> */}
            </div>

        </div> 
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar



// onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//             }}
