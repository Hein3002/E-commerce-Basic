import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context';


const Header = () => {

  const user = useSelector(state => state?.user?.user)  
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const [search,setSearch] =useState(searchInput?.search?.split("=")[1])

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if (data.error) {
      toast.error(data.message)
    }
  }
  
  const hadleSearch = (e)=>{
      const {value} = e.target
      setSearch(value)
      if(value){
        navigate(`/search?q=${value}`)
      }else{
        navigate("/search")
      }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input className='w-full outline-none pl-2' type='text' placeholder='Search product ....' onChange={hadleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-orange-500 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-2xl cursor-pointer'>
                  {
                    user?.profilePic ? (
                      <img src={user.profilePic} alt={user.name} className='w-10 h-10 rounded-full' onClick={() => setMenuDisplay((preve) => !preve)} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }

            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                  <nav>
                    <Link to={"admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay((preve) => !preve)}>Admin Panel</Link>
                  </nav>
                </div>
              )
            }
          </div>
          {
            user?._id && (
              <Link to={'cart'} className='text-2xl relative'>
                <span><BsCart2 /></span>
                <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                  <p className='text-xs'>{context.cartProductCount}</p>
                </div>
              </Link>
            )
          }

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700'>Logout</button>
              ) : (
                <Link to={"/login"}>
                  <button className='px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700'>Login</button>
                </Link>
              )
            }

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header