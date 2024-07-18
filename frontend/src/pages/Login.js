import React, { useContext, useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';



const Login = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOneChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }
    return (
        <section id="login">
            <div className='max-auto container p-4'>
                <div className=' bg-white p-4 w-full max-w-sm mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='Login' className='mix-blend-multiply' />
                    </div>
                    <form className='pt-8 flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    type='email'
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
                            <Link className='block w-fit ml-auto hover:underline hover:text-orange-600' to={'/forgot-password'}>
                                Forgot password
                            </Link>
                        </div>

                        <button className=' block bg-orange-500 text-white mt-4 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto hover:bg-orange-600'>Login</button>
                    </form>
                    <p className='mt-4 text-center'>Don't have account?
                        <Link className='text-orange-500 hover:underline hover:text-orange-600' to={"/signup"}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login