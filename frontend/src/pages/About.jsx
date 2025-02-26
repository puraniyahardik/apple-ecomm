import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] sm:max-w-[300px] sm:bg-contain bg-cover"
          src="https://images.unsplash.com/photo-1630673287511-4d477913d7a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          Apple was born out of a passion for innovation and a commitment to redefining the online shopping experience for Apple enthusiasts. Our journey began with a simple vision: to create a seamless and trustworthy platform where customers can explore, compare, and purchase the latest Apple products with confidence.
          </p>
          <p>
          At Apple, we are more than just an e-commerce store—we are a destination for those who appreciate cutting-edge technology, elegant design, and seamless performance. Whether you’re looking for the latest iPhone, iPad, Mac, Apple Watch, or accessories, we bring you an extensive selection sourced directly from Apple and authorized suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Apple is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=' text-gray-600'>
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Service:</b>
          <p className=' text-gray-600'>
            Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About
