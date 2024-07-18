import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCart from '../components/AdminProductCart'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>
          All Product
        </h2>
        <button
          className='border-2 border-orange-600 text-orange-600 py-1 px-3 rounded-full hover:bg-orange-600 hover:text-white transition-all'
          onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
             <AdminProductCart data={product} key={index} fetchData={fetchAllProduct}/>
            )
          })
        }
      </div>
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }


    </div>
  )
}

export default AllProduct