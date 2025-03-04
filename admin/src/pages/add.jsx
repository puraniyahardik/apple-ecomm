import React, { useState } from 'react'
import { backendUrl } from '../App'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({token}) => {
 //state variable for forms
  const [image1,setImage1]=useState(false)

  const [image2,setImage2]=useState(false)

  const [image3,setImage3]=useState(false)

  const [image4,setImage4]=useState(false)

  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('Plus');
  const [subCategory,setSubCategory]=useState('Black');
  const [bestseller,setBestseller]=useState(false);
  const [sizes,setSizes]=useState([]);

  const onSumbitFormData=async(e)=>{
    e.preventDefault();
    console.log(token)
    // console.log(image1,image2,image3,image4)
    // console.log(name,description,price,category,subCategory,bestseller,sizes)
  try {
    const formData=new FormData()
    //append data into formdata
    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("subCategory",subCategory)
    formData.append("bestseller",bestseller)
    formData.append("sizes",JSON.stringify(sizes))//to covert array into string and send 

    //images
    image1 && formData.append('image1',image1)
    image2 && formData.append('image2',image2)
    image3 && formData.append('image3',image3)
    image4 && formData.append('image4',image4)

    //api to send  data

    const respone = await axios.post(backendUrl + '/api/product/add',formData,{headers:{token}})
    console.log(respone)

    if(respone.data.success)
    {
      toast.success(respone.data.message)
      setName('')
      // setDescription('')
      setPrice('')
      setCategory('Plus')
      setSubCategory('Black')
      setSizes([])
      setBestseller(false)
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)

    }
    else{
      toast.success(respone.data.message)
    }

  } catch (error) {
    
  }
  }
  // console.log(BackendUrl)
  return (
    <form action="" className=' flex flex-col w-full items-start gap-3' onSubmit={onSumbitFormData}>
      <div>
        <p className=' mb-2'>Upload Image</p>

        <div className=' flex gap-2'>
          <label htmlFor="image1">
            <img className=' w-20 ' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className=' w-20 ' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className=' w-20 ' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className=' w-20 ' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>

      </div>

      <div className=' w-full'>
        <p className=' mb-2'>Product Name</p>
        <input type="text" placeholder='Type here' required  className=' w-full max-w-[500px] px-3 py-2' onChange={(e)=>setName(e.target.value)} value={name}/>
      </div>
      <div className=' w-full'>
        <p className=' mb-2'>Product Description</p>
        <textarea type="text"  rows={3} placeholder='Write Content Here' required  className=' w-full max-w-[500px] px-3 py-2' onChange={(e)=>setDescription(e.target.value)} value={description}/>
      </div>

      <div className=' flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div >
          <p className=' mb-2 '>Category</p>
          <select className=' w-full px-3 py-2' onChange={(e)=>setCategory(e.target.value)}>
            <option value="Plus">Plus</option>
            <option value="Pro">Pro</option>
            <option value="Pro Max">Pro Max</option>
          </select>
        </div>

        
        <div >
          <p className=' mb-2 '>Color</p>
          <select className=' w-full px-3 py-2' onChange={(e)=>setSubCategory(e.target.value)}>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        
        <div>
          <p className=' mb-2' >Product Price</p>
          <input type="number" onChange={(e)=>setPrice(Number(e.target.value))} className=' w-full px-3 py-2 sm:w-[120px]' placeholder='10000' />
        </div>

      </div>

      <div>
        <p className=' mb-2'>Product Sizes</p>
        <div className=' flex gap-3'>
          <div onClick={()=>setSizes(prev=>prev.includes("32Gb") ? prev.filter(item=>item!=="32Gb") : [...prev,"32Gb"])}>
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("32Gb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>32 GB</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("64Gb") ? prev.filter(item=>item!=="64Gb") : [...prev,"64Gb"])}>
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("64Gb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>64 GB</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("128Gb") ? prev.filter(item=>item!=="128Gb") : [...prev,"128Gb"])} >
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("128Gb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>128 GB</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("256Gb") ? prev.filter(item=>item!=="256Gb") : [...prev,"256Gb"])}>
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("256Gb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>256 GB</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("512Gb") ? prev.filter(item=>item!=="512Gb") : [...prev,"512Gb"])}>
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("512Gb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>512 GB</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes("1Tb") ? prev.filter(item=>item!=="1Tb") : [...prev,"1Tb"])}>
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("1Tb") ? 'bg-pink-100 dark:bg-pink-300': 'bg-slate-200'}  `}>1 TB</p>
          </div>
        </div>
      </div>

      <div className=' flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' onChange={()=>bestseller ? setBestseller(false) : setBestseller(true) } />
        <label className=' cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className=' w-28 py-3 mt-4 bg-black text-white '>Add </button>
    </form>
  )
}

export default Add
