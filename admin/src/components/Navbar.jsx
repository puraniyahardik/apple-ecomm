import React, { useContext } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { ShopContext } from '../context/AppContext'

const Navbar = ({ setToken }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ShopContext);

  return (
    <div className=' flex items-center py-2 px-[4%] justify-between'>
      <img src="https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg" className='w-20 cursor-pointer dark:invert invert-0 rounded-sm' alt="" />
      <div className='flex justify-between gap-10'>

      <img src={assets.darkMode} className='cursor-pointer' onClick={() => setIsDarkMode(!isDarkMode)} alt="" />
      <button className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' onClick={() => setToken('')}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar