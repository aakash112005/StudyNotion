import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import {login} from "../../../services/operations/authAPI"


function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // useState to store from data
    const [formData, setFormData] = useState({email:"",password:"",})

    // It was use for the eye icon in password field
    const [showPassword, setShowPassword] = useState(false)

    // email password aree fetxhed from form data to pass into api request
    const { email, password } = formData
    
    // this fuction handles the change fuctionality inside input field if use change value before submit
    const handleOnChange = (e) => {
         setFormData((prevData) => ({
           ...prevData,
           [e.target.name]: e.target.value,
         }))
    }
    
    // on submission of the form this function send req to api
    const handleOnSubmit = (e) => {
          e.preventDefault()
          dispatch(login(email, password, navigate))
    }

    return (
    <form onSubmit={handleOnSubmit}
       className="mt-6 flex w-full flex-col gap-y-4">

      {/* Input Field  */}
       <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
       </label>

      {/* password field  */}
       <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />

        {/* Eye icon inside password field  */}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        {/* forgot password field  */}
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-s text-blue-100 hover:text-richblack-400 hover:scale-95 transition-all duration-200 ">
            Forgot Password
          </p>
        </Link>

      </label>

       {/* //final submit button  */}
      <button type="submit"
      className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 hover:scale-95 transition-all duration-150 ">
      LogIn
      </button>

    </form>
)

}
export default LoginForm
