import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add'
import List from './pages/list'
import Oders from './pages/orders'
import Login from './components/Login';
import {ToastContainer} from 'react-toastify'
import { ShopContext } from './context/AppContext'

//for accesing backend to use these url 
/////
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'
///////
const App = () => {
  const { isDarkMode } = useContext(ShopContext);

  const [token, setToken] = useState(
    localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '');

  useEffect(()=>{
    localStorage.setItem('token',token);
  },[token])


  return (
    <div className={isDarkMode ? "dark" : ''}>
      <div className="bg-white dark:bg-[#151013] text-black dark:text-white min-h-screen ">
        <ToastContainer />
        {token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr /><hr /><hr />

            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={ <Add token={token} />} />
                  <Route path='/list' element={<List token={token}/>} />
                  <Route path='/orders' element={<Oders token={token}/>} />
                </Routes>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default App

