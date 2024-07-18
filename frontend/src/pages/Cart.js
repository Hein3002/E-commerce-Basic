import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from './../context/index';
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import displayVNDCurrency from './../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchDataQuantity = async (id, qty) => {
        const response = await fetch(SummaryApi.updateQuantity.url, {
            method: SummaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty
            })
        })

        const responseData = await response.json()

        return responseData
    }

    const increaseQty = async (id, qty) => {
        qty += 1
        const response = await fetchDataQuantity(id, qty)
        console.log(response)
        if (response.success) {
            fetchData()

        }

    }
    const decraseQty = async (id, qty) => {
        qty -= 1
        const response = await fetchDataQuantity(id, qty)
        console.log(response)
        if (response.success) {
            fetchData()

        }

    }


    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }





    const fetchData = async () => {

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }
    const totalQuantity = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
    useEffect(() => {
        setLoading(true)
        fetchData()
        setLoading(false)
    }, [])
    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>


            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between items-start p-4'>

                {/**view cart */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => (
                                <div key={el + index} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>

                                </div>
                            ))
                        ) : (
                            data?.map((product, index) => (
                                <div key={product._id + index} className='w-full h-32 my-2 rounded bg-white p-1  overflow-hidden grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-full bg-slate-200 p-1 rounded '>
                                        <img src={product.productId.productImage[0]} className='w-full h-full object-cover rounded  mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 py-2 relative'>
                                        <div className='absolute right-0 text-orange-600 rounded-full p-2 hover:bg-orange-600 hover:text-white text-lg  cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-base text-slate-800 font-medium text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-sm text-slate-500'>{product.productId.category}</p>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-xs line-through text-slate-800'>{displayVNDCurrency(product?.productId?.price)}</p>
                                            <p className='font-medium text-base text-orange-500'>{displayVNDCurrency(product?.productId?.sellingPrice)}</p>
                                        </div>
                                        <div className='absolute right-0 bottom-12 flex items-center '>
                                            <p className='text-orange-600 font-semibold text-lg'>{displayVNDCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button onClick={() => decraseQty(product?._id, product?.quantity)} className=' border border-orange-600 hover:text-white hover:bg-orange-600 text-orange-600 w-6 h-6 flex items-center justify-center rounded-full'><RiSubtractFill /></button>
                                            <span className='font-medium text-orange-700'>{product?.quantity}</span>
                                            <button onClick={() => increaseQty(product?._id, product?.quantity)} className=' border border-orange-600 hover:text-white hover:bg-orange-600 text-orange-600 w-6 h-6 flex items-center justify-center rounded-full'><IoAddOutline /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                {/**total */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm pt-2' >
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-200 my-2 animate-pulse'>

                            </div>
                        ) : (

                            <div className='h-36 bg-white border border-slate-200  '>
                                <h2 className='text-white bg-orange-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>
                                        {totalQuantity}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayVNDCurrency(totalPrice)}</p>
                                </div>
                                <Link 
                                to={'/cart-confirmation'}
                                className='bg-blue-600 p-2 text-white w-full mt-4 block text-center'                                
                                >
                                    Payment 
                                </Link>
                            </div>

                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Cart