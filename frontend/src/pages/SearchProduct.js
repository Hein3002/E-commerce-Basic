import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VeticalCart from '../components/VeticalCart'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataReponse = await response.json()
    setLoading(false)
    setData(dataReponse.data)    
  }

  useEffect(() => {
    fetchProduct()
  }, [query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p>{data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Foun...</p>
        )
      }

      {
        data.length !== 0 && !loading && (
          <VeticalCart loading={loading} data={data} />
        )
      }
    </div>
  )
}

export default SearchProduct