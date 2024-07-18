import React, { useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imgToBase64';
import SummaryApi from './../common/index';
import { toast } from 'react-toastify';
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const navigate =useNavigate()
    const handleOneChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async(e)=>{
        const file = e.target.files[0]
        const imagePic = await imageToBase64(file)
        setData((preve)=>{
            return{
                ...preve,
                profilePic:imagePic
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method: SummaryApi.signUp.method,   
                headers:{
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
                        
            const dataApi =await dataResponse.json()
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }

        }else{
            toast.error("Please check password and confirmpassword")
        }
        
    }
    return (
        <section id="signup">
            <div className='max-auto container p-4'>
                <div className=' bg-white p-4 w-full max-w-sm mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='Login' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>
                    <form className='pt-8 flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    required
                                    value={data.name}
                                    onChange={handleOneChange}
                                />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    type='email'
                                    required
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOneChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='enter password'
                                    name='password'
                                    required
                                    value={data.password}
                                    onChange={handleOneChange}
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaRegEyeSlash />
                                            ) :
                                                (
                                                    <FaRegEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Enter Confirm Password'
                                    name='confirmPassword'
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleOneChange}
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setConfirmShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaRegEyeSlash />
                                            ) :
                                                (
                                                    <FaRegEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className=' block bg-orange-500 text-white mt-4 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto hover:bg-orange-600'>Sign up</button>
                    </form>
                    <p className='mt-4 text-center'>Already have account?
                        <Link className=' text-orange-500 hover:underline hover:text-orange-600' to={"/login"}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Signup