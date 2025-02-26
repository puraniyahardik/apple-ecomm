import axios from 'axios';
import React, { useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

 const  onsubmitHandler= async (e)=>{
        try {
            e.preventDefault(); 
            const res = await axios.post( backendUrl + '/api/user/admin' , { email, password });
            console.log(res);

            if (res.data.success) {
                setToken(res.data.token); 
            }
            else{
                toast.error(res.data.message);
            }  
        } catch (error) {
            console.log(error);
            toast.error(error);
            
        }
    }
  return (
    <div className='flex items-center min-h-screen justify-center w-full'>
        <div className='bg-slate-400 shadow-md rounded-lg px-8 py-6  max-w-md'>
            <h1 className='text-2xl text-center font-bold mb-5'>Admin Penal</h1>
            <form onSubmit={onsubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-bold dark:text-white text-gray-700 mb-2' >Email</p>
                    <input
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}  
                    autocomplete="current-password"
                    className='rounded-md w-full px-3 py-2 border text-black  border-gray-400 outline-none' type="email" placeholder='example@gmail.com' required/>
                </div> 
                <div className='mb-3 min-w-72'>
                    <p className='text-sm  dark:text-white font-bold text-gray-700 mb-2' >Password</p>
                    <input 
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    autocomplete="current-password"
                    className='text-black rounded-md w-full px-3 py-2 border border-gray-400 outline-none' type="password" placeholder='Enter Your Password' 
                    />
                </div>

                <button className='mt-2 font-semibold w-full py-2 px-5 rounded-md to-white bg-slate-700' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login