import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import ROLE from './../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const nagivate = useNavigate()

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            nagivate("/")
        }
    },[user])

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-80 shadow-rgba(0,0,0,0.2)'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                            user?.profilePic ? (
                                <img src={user.profilePic} alt={user.name} className='w-20 h-20 rounded-full' />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='captitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>Product</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2'>
                 <Outlet/>       
            </main>
        </div>
    )
}

export default AdminPanel