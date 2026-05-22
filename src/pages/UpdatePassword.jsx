import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import {resetPassword} from ".././services/operations/authAPI"
import { useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"

function UpdatePassword() {
    const {loading }  = useSelector((state)=>state.auth)
    const [formData,setFormData] = useState({password :"",confirmPassword:""})
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch()
    const  {token}  = useParams(); 
    const location = useLocation()
    const handleChange = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }
    const {password,confirmPassword}= formData;
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        dispatch(resetPassword(password,confirmPassword,token))
    }
    return (
        <div lassName="flex justify-center items-center mt-[150px]">
            {
                loading ? (<div className='spinner items-center'></div>) :
                (
                   <div className="max-w-[500px] p-4 lg:p-8 items-center mt-[150px] justify-center mx-auto">
                    <h1
                    className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5"
                    >Choose New Password</h1>
                    <p
                    className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"
                    >Almost Done. Enter Your New Password And youre All Set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                               New Password <sup className="text-pink-200">*</sup>
                             </p>
                            <input type={showPassword ? "text" :"password"}
                            
                            required
                            name="password" 
                           
                            value={password}
                            onChange={handleChange}
                             placeholder="Enter Password"
                             className="form-style w-full !pr-10"
                            />
                            <span  onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {
                                    showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                        </label>
                        <label className="relative mt-3 block">
                             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                 Confirm New Password <sup className="text-pink-200">*</sup>
                               </p>
                            <input type={showConfirmPassword ? "text" :"password"}
                           
                            required
                            name="confirmPassword" 
                            placeholder='ConfirmPassword' 
                            value={confirmPassword}
                            onChange={handleChange}
                            className="form-style w-full !pr-10"
                            />
                            <span  onClick={() => setShowConfirmPassword((prev) => !prev)}
                              className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {
                                    showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                        </label>
                        <button type='Submit'
                         className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-semiBold text-richblack-900 hover:scale-95 transition-all duration-200"
                        >
                            Reset Password
                        </button>
                    </form>
                      <div className="mt-6 flex items-center justify-between">
                        <Link to={"/login"}
                        >
                          <p className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-400 hover:scale-95 transition-all duration-200">
                             <BiArrowBack /> Back To Login
                          </p>
                        
                          
                        </Link>
                    </div>
                   </div>
                   
                )
            }
        </div>
        
    )
}

export default UpdatePassword

