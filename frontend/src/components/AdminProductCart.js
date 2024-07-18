import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayVNDCurrency from '../helpers/displayCurrency';
const AdminProductCart = ({
    data,
    fetchData
}) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40 '>
                <div className='h-32 w-full flex justify-center items-center pb-2'>
                    <img src={data?.productImage[0]} width={120} height={120} className='object-fill mx-auto h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2' >{data.productName}</h1>
                <div>
                    <p className='font-semibold'>
                        {
                            displayVNDCurrency(data.sellingPrice)
                        }

                    </p>
                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEdit />
                    </div>
                </div>

            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                )
            }
        </div>
    )
}

export default AdminProductCart