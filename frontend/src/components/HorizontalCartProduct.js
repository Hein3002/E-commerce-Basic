import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCartProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef()
    const {fetchUserAddToCart} =useContext(Context)    
    const hadleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserAddToCart()
     }
    const fetchData = async () => {
        setLoading(true)
        const categoruProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoruProduct.data)
    }

    const [current, setCurrent] = useState(0);

    const [elementWidth, setElementWidth] = useState(0);


    useEffect(() => {
        fetchData();
        if (scrollElement.current) {
            setElementWidth(scrollElement.current.clientWidth);
        }
    }, [])

    const next = () => {
        if (scrollElement.current) {
            const nextPosition = current - elementWidth;
            if (nextPosition >= -(scrollElement.current.scrollWidth - scrollElement.current.clientWidth)) {
                setCurrent(nextPosition);
            } else {
                setCurrent(0);
            }
            console.log(nextPosition,-(scrollElement.current.scrollWidth - scrollElement.current.clientWidth))
        }
    }
    
    const prev = () => {
        if (scrollElement.current) {
            const prevPosition = current + elementWidth;
            if (prevPosition <= 0) {
                setCurrent(prevPosition);
            } else {
                setCurrent(-(scrollElement.current.scrollWidth - scrollElement.current.clientWidth));
            }
        }
    }
   
    return (
        <div className='container mx-auto px-4 my-6 relative overflow-hidden'>
            <h2 className='text-xl font-semibold py-4'>{heading}</h2>
            <button onClick={next}  className='bg-white shadow-md rounded-full p-1 absolute left-0 top-28 z-10 hidden md:block'>
                    <FaAngleLeft />
                </button>
                <button onClick={prev} className='bg-white shadow-md rounded-full p-1 absolute top-28 right-0 hidden md:block z-10'>
                    <FaAngleRight />
                </button>
            <div className='flex items-center gap-4 md:gap-6  translate transition-transform duration-700' style={{ transform: `translateX(${current}px)` }} ref={scrollElement}>
              
                {
                    loading ? (
                        loadingList.map((product, index) => (
                            <div key={product+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow flex '>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                   
                                </div>
                                <div className='p-4 gap-1 grid w-full'>
                                    <h2 className=' bg-slate-200 font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize p-1 animate-pulse rounded-full'>
                             
                                    </h2>
                                    <p className='capitalize bg-slate-200 p-1 animate-pulse rounded-full'>
                                 
                                    </p>
                                    <div className='flex items-center gap-2 w-full' >
                                        <p className='p-2 bg-slate-200 w-full font-medium animate-pulse rounded-full'>
                                        
                                        </p>
                                        <p className='bg-slate-200 line-through text-xs p-2 w-full animate-pulse rounded-full'>
                                        
                                        </p>
                                    </div>
                                    <button className='text-white px-3 bg-slate-200 rounded-full py-0.5 text-sm p-1 w-full animate-pulse ' >
                                     
                                    </button>
                                </div>
                            </div>
                        ))
                    ):(
                        data.map((product, index) => (
                            <Link to={"product-details/"+product?._id} key={product+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow flex '>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                    <img src={product.productImage[0]} className='object-cover rounded h-full hover:scale-110 transition-all' />
    
                                </div>
                                <div className='p-4 grid'>
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
                                    <button onClick={(e)=>hadleAddToCart(e,product?._id)} className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-0.5 text-sm' >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )
                  
                }
            </div>

        </div>
    )
}

export default HorizontalCartProduct