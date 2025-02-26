import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Colletion = () => {
  const { products,search,showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter]=useState(false)
  const [filterProducts,setFilterProduct]=useState([])

  // For Filtering Category 
  const [category,setCategory]=useState([]);

  // For Filtering SubCategory
  const [subCategory,setSubCategory]=useState([]);

  //
  const [sortType,setSortType]=useState('Relavent');
  // Function for Toggele Category Means Like MENS,WOMEN,KIDS Like that
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !==e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const SubtoggleCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !==e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }
  // Apply Filter Function
  const applyFilter=()=>{
    let productCopy=products.slice();

    if(showSearch && search)
    {
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0)
    {
      productCopy=productCopy.filter(item=>category.includes(item.category));
    }
    if(subCategory.length>0)
    {
        productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory));
    }
    
    setFilterProduct(productCopy)
  }
  // Sort Function For Price

  const sortProduct=()=>{
    let FilterCopy=filterProducts.slice();
    switch(sortType){
      case 'Low-High':
        // Sort In Decending Order
        setFilterProduct(FilterCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'High-Low':
        // Sort In Acending Order
        setFilterProduct(FilterCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  

  useEffect(()=>{
      applyFilter()
  },[category,subCategory,search,showSearch,products])
  useEffect(()=>{
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Options */}
      <div className=" min-w-60">
        <p className=" my-2 text-xl flex items-center cursor-pointer gap-2 transition-all duration-300" onClick={()=>{if(showFilter){setShowFilter(false)}else{setShowFilter(true)}}}>FILTERS
          <img src={assets.dropdown_icon} className={` h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}  alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className=" mb-3 text-sm font-medium">CATEGORIES</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={toggleCategory}  value={'Plus'}/> Plus
            </p>
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={toggleCategory}  value={'Pro'}/> Pro
            </p>
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={toggleCategory}  value={'Pro Max'}/> Pro Max
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className=" mb-3 text-sm font-medium">COLORS</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={SubtoggleCategory} value={'Black'}/> Black
            </p>
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={SubtoggleCategory}  value={'White'}/> White
            </p>
            <p className=" flex gap-2">
              <input type="checkbox" className='w-3' onChange={SubtoggleCategory}  value={'Blue'}/> Blue
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className=" flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL" } text2={"COLLECTIONS"}/>
          {/* Product Shorting */}
          <select name="" id="" className=" border-2 border-gray-300 text-sm px-2 dark:bg-black dark:text-white  h-10 " onChange={(e)=>setSortType(e.target.value)}>
            <option value="Relavent" >Sort By: Relavent</option>
            <option value="Low-High">Sort By: Low to High</option>
            <option value="High-Low">Sort By: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index)=>(
              <ProductItem  key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Colletion
