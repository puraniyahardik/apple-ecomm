import React from 'react'
import { assets } from '../assets/admin_assets/assets.js'
const Navbar = () => {
  return (
    <div className=' flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} className='w-[max(10%,80px)]' alt="" />
      <button className=' bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>logout</button>
    </div>
  )
}

export default Navbar
