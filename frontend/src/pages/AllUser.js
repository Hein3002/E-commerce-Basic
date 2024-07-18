import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { CiEdit } from "react-icons/ci";
import ChangUserRole from '../components/ChangUserRole';



const AllUser = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })

    const fetchAllUser = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include"
        })

        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUser()
    }, [])
    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className=' text-black'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map((el,index)=>(
                            <tr key={el}>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('ll')}</td>
                                <td>
                                    <button 
                                    className='bg-green-100 p-1 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={(e)=>
                                        {setOpenUpdateRole(true)
                                        setUpdateUserDetails(el)}
                                    }
                                    >
                                        <CiEdit/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>     
            {
                openUpdateRole && (
                    <ChangUserRole 
                    onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUser}
                    />     
                )
            } 
          
        </div>
    )
}

export default AllUser