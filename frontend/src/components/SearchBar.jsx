import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} =useContext(ShopContext)
  return showSearch ? (
    <div className=' border-t border-b bg-gray-50 text-center dark:bg-[#212121]'>
      <div className=" inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input type="text" className=" flex-1 outline-none bg-inherit  text-sm" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <img src={assets.search_icon} alt="" className="w-4 cursor-pointer" />
      </div>
      <img src={assets.cross_icon} onClick={()=>setShowSearch(false)} alt="" className=" inline w-3 cursor-pointer" />
    </div>
  ) : null
}

export default SearchBar
