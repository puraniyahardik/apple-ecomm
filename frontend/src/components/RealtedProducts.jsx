import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RealtedProducts = ({ Category, subCategory }) => {
    const { products } = useContext(ShopContext)
    // const [stored,setStored]=useState([]);
    const [related, setRelated] = useState([]);
    

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => Category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0,5))
            // console.log(productsCopy.slice())
            console.log(related)
            
        }
    }, [products,Category,subCategory])
   
    // useEffect(()=>{setRelated(stored)},[])
    return (
        <div className='my-10' >
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur facilis distinctio in blanditiis doloribus magni odit, officiis eaque saepe excepturi. </p>
            </div>
            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}   />
                    ))
                }
            </div>
        </div>
    )
}

export default RealtedProducts
