import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from './../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCartProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)  
    const scrollElement = useRef()
    const [current, setCurrent] = useState(0);
    const [elementWidth, setElementWidth] = useState(0);
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
                <button onClick={next} className='bg-white shadow-md rounded-full p-1 absolute left-0 z-10 top-48 hidden md:block'>
                    <FaAngleLeft />
                </button>
                <button onClick={prev} className='bg-white shadow-md rounded-full p-1 absolute right-0 top-48 hidden md:block z-10'>
                    <FaAngleRight />
                </button>
                <div className='flex items-center gap-4 md:gap-6  translate transition-transform duration-700' style={{ transform: `translateX(${current}px)` }} ref={scrollElement}>                                  
                {
                    loading ? (
                        <p>loading...</p>
                    ) : (
                        data.map((product, index) => (
                           <Link to={"product-details/"+product?._id} key={product+index} className='w-full min-w-[280px] md:min-w-[220px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center '>
                                    <img src={product.productImage[0]} className='object-cover h-full hover:scale-110 rounded transition-all' />

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
        </div>
    )
}

export default VerticalCartProduct