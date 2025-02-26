// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [currentState,setCurrentState]=useState('Signup');
//   const {token,setToken,navigate,BackendUrl, forgotPasswordRequest}=useContext(ShopContext)
 
//   const [name,setName]=useState('');
//   const [password,setPassword]=useState('');
//   const [email,setEmail]=useState('');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);


 
//   const onSumbitHandler=async(e)=>{
//     e.preventDefault();

//     if (currentState === 'ForgotPassword') {
//       forgotPasswordRequest(email);
//       return;
//     }

//     try {
//       if(currentState == 'Signup'){
//         const respones=await axios.post(BackendUrl+'/api/user/registor',{name,email,password})
//         if(respones.data.success){
//           setToken(respones.data.token)
//           toast.success("REGISTOR SUCCESSFULLY DONE")
//           localStorage.setItem('token',respones.data.token)
//           // navigate('/home')
//         }else{
//           toast.error(respones.data.message)
//         }
//       }else{
//         const respones=await axios.post(BackendUrl+'/api/user/login',{email,password})
//         if(respones.data.success){
//           setToken(respones.data.token)
//           toast.success("LOGIN SUCCESSFULLY DONE")
//           localStorage.setItem('token',respones.data.token)
//           // navigate('/home')
//         }else{
//           toast.error(respones.data.message)
//         }
//         // console.log(BackendUrl)
//         // console.log(respones.data);
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(()=>{
//     if(token)
//     {
//       navigate('/')
//     }
//   },[token])
//   return (
//     <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' onSubmit={onSumbitHandler}>
//       <div className=" inline-flex items-center gap-2 mt-10">
//       <p className="prata-regular text-3xl">{currentState === 'ForgotPassword' ? 'Forgot Password' : currentState}</p>    
//        <hr className=' border-none h-[1.5px] w-8 bg-gray-800'/>
//       </div>
//       {
//         currentState === 'Login' ? '' :  <input type="text" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}required/>
//       }
   
//     <input type="email" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
//     <input type="password" className=' w-full px-3 py-2 border border-gray-800 ' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
//      <div className=" w-full flex justify-between text-sm mt-[-8px]">
//       <p className=' cursor-pointer'>Forgot Your Password?</p>
//       {
//         currentState==='Login' ?
//         <p className=' cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p>:
//         <p className=' cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
//       }
//       </div> 
//       <button className=' bg-black text-white font-light px-8 py-2 mt-4'>{currentState ==="Login" ? "Sign In" : "Sign Up"}</button>
//     </form>
//   )
// }

// export default Login


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Login, Signup, or ForgotPassword
  const { token, setToken, navigate, BackendUrl, forgotPasswordRequest } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currentState === 'ForgotPassword') {
      forgotPasswordRequest(email);
      return;
    }

    try {
      if (currentState === 'Signup') {
        const response = await axios.post(`${BackendUrl}/api/user/registor`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success("Registration Successful!");
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${BackendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success("Login Successful!");
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={onSubmitHandler}>
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{currentState === 'ForgotPassword' ? 'Forgot Password' : currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name field only for Signup */}
      {currentState === 'Signup' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      {/* Email field for all states */}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password field only for Login/Signup */}
      {currentState !== 'ForgotPassword' && (
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState !== 'ForgotPassword' ? (
          <p className="cursor-pointer" onClick={() => setCurrentState('ForgotPassword')}>
            Forgot Your Password?
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>
            Back to Login
          </p>
        )}

        {currentState !== 'ForgotPassword' && (
          currentState === 'Login' ? (
            <p className="cursor-pointer" onClick={() => setCurrentState('Signup')}>
              Create Account
            </p>
          ) : (
            <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>
              Login Here
            </p>
          )
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'ForgotPassword' ? 'Send Reset Link' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;