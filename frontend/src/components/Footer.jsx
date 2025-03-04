import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div >
              <Link to={'/'}>
                <img src="https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg" alt="" className='mb-5 w-32 invert-0 dark:invert dark:bg-[#151013] rounded-md' />
              </Link>
                <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum officiis doloribus odit nemo quaerat in illo, ab totam, molestias ipsam ut unde sint at mollitia quo quod consectetur est exercitationem.Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 92655 56357</li>
                    <li>parthvekariya302@gmail.com</li>
                    <li>Instagram</li>
                    <li>Github</li>
                </ul>
            </div>
      </div>
      <div>
        <hr />
        <p className=' py-5 text-sm text-center '>Copyright 2024@ Apple.in - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
