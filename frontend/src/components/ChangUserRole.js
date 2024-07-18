import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangUserRole = ({
    name,
    email,
    role,
    onClose,
    userId,
    callFunc,
}) => {
    const[userRole,setUserRole] =useState(role) 
    
    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method:SummaryApi.updateUser.method,
            credentials:'include',
            headers:{
                "content-type": "application/json"
            },
            body : JSON.stringify({
                userId:userId,
                role:userRole
            })
        })

        const responseData  = await fetchResponse.json();

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
    }
    
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className="bg-white shadow-md p-4 w-full max-w-sm ">
                <button className='block ml-auto hover:bg-red-300 hover:text-white rounded-full p-1'
                        onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='pb-4 text-lg font-medium'>Chang User Role</h1>
                <p>name : {name}</p>
                <p>email : {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role</p>
                    <select className="border px-4 py-1" value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
                        {
                            Object.values(ROLE).map((el) => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )


                            })}
                    </select>
                </div>
                <button
                 className='w-fit mx-auto block border py-1 px-3 rounded-full bg-orange-500 text-white hover:bg-orange-600'
                onClick={updateUserRole}>
                    Chang Role
                </button>
            </div>
        </div>
    )
}

export default ChangUserRole