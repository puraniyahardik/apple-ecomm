import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Colletion from './pages/Colletion'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
import Chatbot from './components/Chatbot'
import { useContext } from 'react'
import { ShopContext } from './context/ShopContext'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'

function App() {

  const { isDarkMode, setIsDarkMode } = useContext(ShopContext);
  // console.log(isDarkMode);
  

  return (
    <div className={isDarkMode ? 'dark' : ''} >
      <div className='bg-[#F7F7F7] dark:bg-[#151013] dark:text-white text-black min-h-screen'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer position="top-right" autoClose={5000} /> {/* Ensure this */}   <Navbar />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Colletion />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Footer />
          <Chatbot />
        </div>
      </div>
    </div>
  )
}

export default App
