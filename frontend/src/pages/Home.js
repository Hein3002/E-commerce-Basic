import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCartProduct from '../components/VeticalCartProduct'
import VeticalCart from '../components/VeticalCart'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpodes"} heading={"Top Product"}/>
      <VerticalCartProduct category={"airpodes"} heading={"Top Product"}/>   
    </div>
  )
}

export default Home