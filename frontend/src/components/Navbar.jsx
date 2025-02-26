import React, { useContext, useEffect, useState } from 'react'
import {assets} from "../assets/frontend_assets/assets.js"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
const Navbar = () => {

    const [visible,setVisible]=useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems, toggleDarkMode, Logout} = useContext(ShopContext)
    // console.log(toggleDarkMode);
    
    // const Logout=()=>{
    //     navigate('/login')
    //     localStorage.removeItem('token')
    //     setToken('')
    //     setCartItems({})
    // }
  return (
    <div className='flex items-center justify-between py-5 font-medium '>
       <Link to='/'>
       {/* <img src="https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg" className='w-36' alt="Logo" /> */}
       <img src="https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg" className='w-20 dark:invert invert-0 rounded-md' alt="Logo" />
       </Link> 
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img  
                src={assets.darkTheme} 
                onClick={toggleDarkMode} className='cursor-pointer dark:invert invert-0' alt="" />

            <img src={assets.search_icon} alt="search Icon" onClick={()=>setShowSearch(true)} className='w-5 cursor-pointer dark:invert invert-0' />
            <div className='group relative'>
               <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer dark:invert invert-0' alt="profile Icon" />
                {token &&   
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 dark:bg-black rounded'>
                         <Link to={'/profile'}> <p className='cursor-pointer hover:text-black dark:hover:text-white'>My Profile</p></Link>
                          <Link to={'/orders'}><p className='cursor-pointer hover:text-black dark:hover:text-white'>Orders</p></Link>
                          <p className='cursor-pointer hover:text-black dark:hover:text-white' onClick={Logout}>Logout</p>                                  
                    </div>
                </div>
                }
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5 dark:invert invert-0' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden dark:invert invert-0' onClick={()=>setVisible(true)} alt="" />
        </div>
        {/* Sidebat Menu For Small Scrrens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-black text-white transition-all duration-300 delay-100 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div className='flex items-center cursor-pointer gap-4 p-3' onClick={()=>setVisible(false)}>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180 dark:invert invert-0' alt="" />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/collection'>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/about'>About</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/contact'>Contact</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar

