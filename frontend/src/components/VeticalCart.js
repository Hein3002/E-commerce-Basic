import React, { useContext } from 'react'
import scrollToTop from '../helpers/scrollToTop'
import displayVNDCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'

const VeticalCart = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null) 
    const {fetchUserAddToCart} =useContext(Context)   
    const hadleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserAddToCart()
     }
    return (              
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10'>
            {           
                loading ? (
                    <p>loading...</p>
                ) : (
                    data.map((product, index) => (
                        <Link to={"/product-details/" + product?._id} key={product + index} className='w-full min-w-[280px] md:min-w-[120px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow' onClick={scrollToTop} >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center '>
                                <img src={product?.productImage[0]} className='object-cover h-full hover:scale-110 rounded transition-all' />

                            </div>
                            <div className='p-4 grid gap-1'>
                                <h2 className='font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-slate-500'>
                                    {product?.category}
                                </p>
                                <div className='flex items-center gap-2' >
                                    <p className='text-orange-500 font-medium'>
                                        {displayVNDCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className='text-slate-500 line-through text-xs'>
                                        {displayVNDCurrency(product?.price)}
                                    </p>
                                </div>
                                <button onClick={(e) => hadleAddToCart(e, product?._id)} className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-0.5 text-sm' >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )

            }
        </div>
    )
}

export default VeticalCart