import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/add'
import List from './pages/list'
import Orders from './pages/orders'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';

export const BackendUrl=import.meta.env.VITE_BACKEND_URL;
function App() {
  // const [count, setCount] = useState(0)
  const [token,setToken]=useState('');

  // console.log(BackendUrl)

  return (
    <div className=' bg-gray-50 min-h-screen'>
      <ToastContainer />
       {
        token === "" ? <Login  setToken={setToken}/> :
        <>
        <Navbar />
        <hr />
        <div className=" flex w-full">
         <Sidebar />
         <div className=' w-[70%] mx-auto ml-[max(5px,25px)] my-8 text-gray-600 text-base '>
           <Routes >
             <Route path='/add' element={<Add  token={token}/>} />
             <Route path='/list' element={<List token={token}/>} />
             <Route path='/orders' element={<Orders token={token}/>} />
           </Routes>
   
         </div>
        </div>
          </>
       }
    
    </div>
  )
}

export default App
