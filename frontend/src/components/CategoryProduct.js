import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VeticalCart from './VeticalCart'
import SummaryApi from '../common'

const CategoryProduct = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)  
  const urlCategoryListInArray =  urlSearch.getAll("category")
  const urlCategoryListInObject ={}
  urlCategoryListInArray.forEach(el=>{
    urlCategoryListInObject[el]=true
  })

  



  const [selectCategory, setSelectCategory] = useState(urlCategoryListInObject)
  const [fillterCategoryList, setFillterCategoryList] = useState([])
  const fetchData = async () => {
    const response = await fetch(SummaryApi.fillterProduct.url, {
      method: SummaryApi.fillterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: fillterCategoryList
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data || [])
  }

  const handleSelctCategory = (e) => {
    const { name, value, checked } = e.target
   
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }
  useEffect(() => { 
    fetchData();
  }, [fillterCategoryList])
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter((el) => el)
    setFillterCategoryList(arrayOfCategory)
    navigate('/product-category?')
  }, [selectCategory])
  return (
    <div className='container mx-auto p-4'>


      <div className='hidden lg:grid grid-cols-[200px,1fr]'>


        <div className='bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>

          <div className=''>
            <h3 className=' text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>
              Short By
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' />
                <label>Price - Low to Hight</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' />
                <label>Price - Low to Hight</label>
              </div>
            </form>
          </div>

          <div className=''>
            <h3 className=' text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex item gap-2'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelctCategory} />
                      <label htmlFor={categoryName?.value}> {categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>

        <div className="ml-5">
          {
            data?.length !== 0 && !loading && (
              <VeticalCart data={data} loading={loading} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct