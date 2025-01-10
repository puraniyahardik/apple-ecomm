import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState,setCurrentState]=useState('Signup');
  const {token,setToken,navigate,BackendUrl}=useContext(ShopContext)
 
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');


 
  const onSumbitHandler=async(e)=>{
    e.preventDefault();
    try {
      if(currentState == 'Signup'){
        const respones=await axios.post('http://localhost:8000/api/user/registor',{name,email,password})
        if(respones.data.success){
          setToken(respones.data.token)
          toast.success("REGISTOR SUCCESSFULLY DONE")
          localStorage.setItem('token',respones.data.token)
          // navigate('/home')
        }else{
          toast.error(respones.data.message)
        }
      }else{
        const respones=await axios.post('http://localhost:8000/api/user/login',{email,password})
        if(respones.data.success){
          setToken(respones.data.token)
          toast.success("LOGIN SUCCESSFULLY DONE")
          localStorage.setItem('token',respones.data.token)
          // navigate('/home')
        }else{
          toast.error(respones.data.message)
        }
        // console.log(BackendUrl)
        // console.log(respones.data);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])
  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' onSubmit={onSumbitHandler}>
      <div className=" inline-flex items-center gap-2 mt-10">
        <p className=' prata-regular text-3xl'>{currentState}</p>
        <hr className=' border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {
        currentState==='Login' ? '' :  <input type="text" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}required/>
      }
   
    <input type="email" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
    <input type="password" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
     <div className=" w-full flex justify-between text-sm mt-[-8px]">
      <p className=' cursor-pointer'>Forgot Your Password?</p>
      {
        currentState==='Login' ?
        <p className=' cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p>:
        <p className=' cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
      }
      </div> 
      <button className=' bg-black text-white font-light px-8 py-2 mt-4'>{currentState ==="Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login
