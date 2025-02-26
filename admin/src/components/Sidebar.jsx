import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
    return (
        <div className=' w-[18%] min-h-screen border-r-2 '>
            <div className=" flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ">
                <NavLink to='/add' className=' flex items-center gap-3 border  dark:text-black dark:border-gray-600  border-gray-300 border-r-0 px-3 py-2 rounded-l '> 
                    <img  className=' invert-0 dark:invert w-5 h-5' src={assets.add_icon} alt="" />
                    <p className=' hidden md:block dark:text-white'>Add Items</p>
                </NavLink>
                <NavLink to='/list' className=' flex items-center gap-3 border border-gray-300 dark:text-black border-r-0 px-3 py-2 rounded-l '> 
                    <img  className=' w-5 h-5 invert-0 dark:invert' src={assets.order_icon} alt="" />
                    <p className=' hidden md:block dark:text-white'>List Items</p>
                </NavLink>
                <NavLink to='/orders' className=' flex items-center gap-3 border border-gray-300 dark:text-black border-r-0 px-3 py-2 rounded-l '> 
                    <img  className=' invert-0 dark:invert w-5 h-5' src={assets.parcel_icon} alt="" />
                    <p className=' hidden md:block dark:text-white'>Orders</p>
                </NavLink>
            </div>
            {/* <div className=" flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                
            </div>
            <div className=" flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
               
            </div> */}
        </div>
    )
}

export default Sidebar
