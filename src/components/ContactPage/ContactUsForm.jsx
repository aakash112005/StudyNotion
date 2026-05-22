import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../services/apiconnector"
import {contactusEndpoint} from "../../services/api"
import CountryCode from "../../data/countrycode.json"
import {toast} from "react-hot-toast"


function ContactUsForm() {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
       formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async(data) =>{
          console.log("Loggin Data",data)
          try {
            setLoading(true);
           const response  = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
          //  const response = {status :"OK"}
             if (!response.data.success) {
        throw new Error(response.data.message)
      }
           toast.success("Form Submitted Successfully")
            console.log("loging response",response)
            setLoading(false);
          } catch (error) {
            console.log("error",error.message)
            setLoading(false);
          }
    }

    useEffect (()=>{
        if(isSubmitSuccessful){
            reset({
                email : "",
                firstname: "",
                lastname : "",
                message :"",
                phoneNo :"",
            })
        }
    },[isSubmitSuccessful,reset])


    return (
        <div className='text-richblack-50 flex flex-col gap-4'>
          { loading ? (
                    <div className='spinner items-center'></div>
                ):(
            <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-4'>


               {/* name field  */}
               <div className="flex flex-col gap-5 lg:flex-row">

                {/* first name  */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firsrname" className="lable-style">
                        First Name
                    </label>
                    <input type="text"
                    name="firstname"
                    id="firsrname"
                    placeholder='Enter FirstName'
                    className="form-style"
                    {...register("firstname",{required:true})}
                   
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter First Name
                            </span>
                        )
                    }
                </div>

                {/* last name  */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style">
                        Last Name
                    </label>
                    <input type="text"
                    name="lastname"
                    id="lastname"
                    placeholder='Enter Last Name'
                    className="form-style"
                    {...register("lastname")}
                    />
                    {
                        errors.lastname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Last Name
                            </span>
                        )
                    }
                </div>

               </div>

               {/* email  */}
               <div className="flex flex-col gap-2 lg:w-[100%]">
                <label htmlFor="email" className="lable-style">Email Address</label>
                <input type="email"
                name='email'
                id='email'
                placeholder='Enter Email Address'
                className="form-style"
                 {...register("email",{required:true})}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter your Email Address
                        </span>
                    )
                }
               </div>

               {/* phone Number  */}
                <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
                </div>

               {/* message  */}
               <div className='lg:w-[100%] flex flex-col gap-2'>
                <label htmlFor="message" className="lable-style">Message</label>
                <textarea 
                   name='message'
                   id='message'
                   cols="30"
                   rows="7"
                   className="form-style"
                   placeholder='Enter Your Message Here'
                    {...register("message",{required:true})}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter your Message
                        </span>
                    )
                }
               </div>

               {/* Submit Button  */}
               <button
              disabled={loading}
              type="submit"
              className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
               ${
                 !loading &&
                 "transition-all duration-200 hover:scale-95 hover:shadow-none"
               }  disabled:bg-richblack-500 sm:text-[16px] `}
              >
              Send Message
               </button>

            </form>
            )}
        </div>
    )
}

export default ContactUsForm
