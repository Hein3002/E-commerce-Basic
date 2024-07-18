import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SummaryApi from './../common/index';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayVNDCurrency from './../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import ReactPaginate from 'react-paginate';
import { MdOutlineNavigateNext } from "react-icons/md";

const ProductDetails = () => {
  const [data, setData] = useState({})

  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [activeImage, setActiveImage] = useState('')
  const [zoomImage, setZoomImage] = useState({
    x: 0,
    y: 0
  })
  const productImageListLoading = new Array(4).fill(null)


  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()
    setData(dataReponse.data)
    console.log(dataReponse.data)
    setActiveImage(dataReponse?.data?.productImage[0])
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (image) => {
    setActiveImage(image)
  }
  const handleZoomImage = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setZoomImage({
      x,
      y
    })
  }, [zoomImage])

  const handlePageClick = (event) => {

  };
  return (
    <div className='container mx-auto p-4 '>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product image */}
        <div className='h-96 flex flex-col  lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96  relative p-1 rounded'>
            <img src={activeImage} className=' h-full w-full object-scale-down mix-blend-multiply rounded' onMouseMove={handleZoomImage} />
            {/**zoom */}
            <div className='hidden  absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0'>
              <div
                className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[400px]'
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: `${zoomImage.x * 100}% ${zoomImage.y * 100}%`
                }}>
              </div>
            </div>
          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div key={index} className='bg-slate-200 rounded h-20 w-20 animate-pulse'>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((image, index) => {
                      return (
                        <div key={image + index} className='bg-slate-200 rounded h-20 w-20 p-1'>
                          <img onClick={() => handleMouseEnterProduct(image)} onMouseEnter={() => handleMouseEnterProduct(image)} src={image} className='h-full w-full object-cover mix-blend-multiply cursor-pointer' />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/**product details */}
        <div className='flex flex-col gap-1'>
          <p className='bg-orange-200 text-orange-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
          <h2 className='text-2xl lg:text-4xl font-medium' >{data?.productName}</h2>
          <p className='capitalize text-slate-400'>{data?.category}</p>
          <div className='text-orange-500 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className='flex items-center gap-2 text-xl lg:2xl font-medium my-1'>
            <p className='text-orange-600'>
              {displayVNDCurrency(data.sellingPrice)}
            </p>
            <p className='text-slate-400 text-sm line-through'>
              {displayVNDCurrency(data.price)}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base-medium text-grey-2">Colors:</p>
            <div className="flex gap-2">
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                Đỏ
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                Tím
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                Vàng
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer bg-orange-500 text-white"
              >
                Xanh
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base-medium text-grey-2">Colors:</p>
            <div className="flex gap-2">
              <p
                className="border min-w-10 text-center  border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                S
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                M
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer "
              >
                L
              </p>
              <p
                className="border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer bg-orange-500 text-white"
              >
                XL
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <button className='border-2 border-orange-600 rounded px-3 py-1 min-w-[120px] text-orange-600 font-medium hover:bg-orange-600 hover:text-white'>
              Buy
            </button>
            <button className='border-2 border-orange-600 rounded px-3 py-1 min-w-[120px] text-orange-600 font-medium hover:bg-orange-600 hover:text-white'>
              Add to Cart
            </button>
          </div>
          <div>
            <p className='text-slate-600 font-medium my-1'>
              Description :
            </p>
            <p>
              {data?.description}
            </p>
          </div>
        </div>


      </div>
      
      {
        data?.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
        )
      }
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={20}
        previousLabel="<"
        containerClassName="pagination flex justify-center my-4"
        pageClassName="page-item"
        pageLinkClassName="page-link px-3 py-1  rounded hover:bg-gray-200"
        previousClassName="page-item"
        previousLinkClassName="page-link px-3 py-1  rounded hover:bg-gray-200"
        nextClassName="page-item"
        nextLinkClassName="page-link px-3 py-1  rounded hover:bg-gray-200"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link px-3 py-1  rounded hover:bg-gray-200"
        activeClassName="active"
        activeLinkClassName="bg-orange-600 text-white"
        renderOnZeroPageCount={null}
      />
    </div>

  )
}

export default ProductDetails