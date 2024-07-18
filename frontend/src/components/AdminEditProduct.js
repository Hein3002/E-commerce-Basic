
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from './../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md"
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const AdminEditProduct = ({ onClose, productData, fetchData }) => {


  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
})


  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]

    const uploadImageCloudinary = await uploadImage(file)

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)
    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()    
    if (responseData.success) {
      toast.success(responseData?.message)
      fetchData()
      onClose()
    }

    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }
  return (
    <div className='fixed bg-slate-200 bg-opacity-35 w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:bg-red-400 hover:text-white rounded-full'
            onClick={onClose}>
            <IoMdClose />
          </div>
        </div>
        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='text'
            name='productName'
            id="productName"
            placeholder='Enter product name'
            value={data.productName}
            onChange={handleOnChange}
            required />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='text'
            name='brandName'
            id="brandName"
            placeholder='Enter product name'
            value={data.brandName}
            onChange={handleOnChange}
            required />
          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>Select Category</option>
            {
              productCategory.map((el, index) => {
                return (
                  <option key={el.value + index} value={el.value}>{el.label}</option>
                )
              })
            }
          </select>
          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' multiple id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data.productImage.map((el, index) => {
                      return (
                        <div className='relative group'>
                          <img
                            src={el}
                            alt={el}
                            width={80}
                            height={80}
                            className='bg-slate-100 rounded cursor-pointer'
                            onClick={() => {
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }}
                          />
                          <div
                            className='absolute -top-1 -right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                            onClick={() => handleDeleteProductImage(index)}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>Please upload image</p>
              )
            }

          </div>
          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            name='price'
            id="price"
            required
            placeholder='Enter price'
            value={data.price}
            onChange={handleOnChange} />

          <label htmlFor='sellingPrice' className='mt-3'>Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            name='sellingPrice'
            id="sellingPrice"
            placeholder='Enter selling price'
            value={data.sellingPrice}
            required
            onChange={handleOnChange} />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea 
          name='description' 
          className='h-28 bg-slate-100 border resize-none p-1' 
          placeholder='Enter product description' rows={3} 
          value={data.description}
          onChange={handleOnChange}>

          </textarea>
          <button className='px-3 py-2 bg-orange-500 text-white mb-10 hover:bg-orange-600'>Update Product</button>
        </form>
      </div>

      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }

    </div>
  )
}

export default AdminEditProduct