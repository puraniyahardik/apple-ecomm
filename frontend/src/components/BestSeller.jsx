
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'

const BestSeller = () => {
    const {products} =useContext(ShopContext)
    const [latestProduct,setLastestProduct]=useState([]);

   useEffect(()=>{
           setLastestProduct(products);
       },[products])
    
   
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur facilis distinctio in blanditiis doloribus magni odit, officiis eaque saepe excepturi. </p>
        </div>
      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
             latestProduct.map((item,index)=>{
                 if(item.bestseller){
                     return(
                     <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    )
                    }
                })
        }
      </div>
    </div>
  )
}

export default BestSeller
