import React, { useState } from 'react'
import axios from 'axios'
import { BackendUrl } from '../App';
import { toast } from 'react-toastify';
// const Email=import.meta.env.VITE_ADMIN_EMAIL;
// const Password=import.meta.env.VITE_ADMIN_PASSWORD;
const Login = ({setToken}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const onSumbitHandler=async(e)=>{
        try {
            e.preventDefault()
            const respones=await axios.post(BackendUrl+'/api/user/admin',{email,password})

            console.log(respones)

            if(respones.data.success)
            {
                setToken(respones.data.token)
            }
            else{
                toast.error(respones.data.message)
            }
        } catch (error) {
            
        }
    }
  return (
    <div className=' flex w-full items-center justify-center min-h-screen '>
      <div className=' bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className=' text-2xl font-bold mb-4'>Admin Panel</h1>
        <form action="" onSubmit={onSumbitHandler}>
            <div className=' mb-3 min-w-72'>
                 <p className=' text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@gmail.com' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className=' mb-3 min-w-72'>
                 <p className=' text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter Your Password' required  onChange={(e)=>setPassword(e.target.value)} value={password}/>

            </div>
            <button type="submit" className=' mt-2 w-full py-2 px-4 rounded-md bg-black text-white'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
