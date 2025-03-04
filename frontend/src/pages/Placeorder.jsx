import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const {navigate,token,cartItems,setCartItems,getCartAmount,delivery_fee,products,BackendUrl} = useContext(ShopContext)
  const [method, setMethod]=useState('cod');
  
  const [formData, setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e) =>{
    const name=e.target.name
    const value=e.target.value

    setFormData(data=>({...data,[name]:value}))
    
  }

  const initPay=(order)=>{

    const options={

      key:import.meta.env.VITE_RAZORPAY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(respones)=>{
        console.log(respones)
        try {
          const respone=await axios.post(BackendUrl+'/api/order/verifyRazorpay',respones,{headers:{token}})
          if(respone.data.success){
            toast.success(respone.data.message)
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let OrderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
      console.log(OrderData)

      switch (method) {
        case 'cod':
          const respones= await axios.post(BackendUrl+'/api/order/place',OrderData,{headers:{token}})

          if(respones.data.success){
            setCartItems({})
            toast.success(respones.data.message)
            navigate('/orders')
          }else{
            toast.error(respones.data.message)
          }
          break;
        case 'stripe':
          const responesStripe=await axios.post(BackendUrl+'/api/order/stripe',OrderData,{headers:{token}})
          if(responesStripe.data.success){
            const {session_url}=responesStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responesStripe.data.message)
          }
          break;
        case 'razorpay':
          const responeRazorpay=await axios.post(BackendUrl+'/api/order/razorpay',OrderData,{headers:{token}})
          if(responeRazorpay.data.success){
            initPay(responeRazorpay.data.order)
          }
          break;
        default:
          console.log('default')
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to place order');
    }
  
  }
  //   try {
  //     let orderItems = [];
    
  //     // Iterate over the array of cartItems
  //     for (const cartItem of cartItems) {
  //       for (const [productId, sizes] of Object.entries(cartItem)) {
  //         for (const [size, quantity] of Object.entries(sizes)) {
  //           if (quantity > 0) {
  //             // Find the product in the products array
  //             const itemInfo = structuredClone(products.find(product => product._id === productId));
  //             if (itemInfo) {
  //               // Add size and quantity to the item
  //               itemInfo.size = size;
  //               itemInfo.quantity = quantity;
  //               orderItems.push(itemInfo);
  //             }
  //           }
  //         }
  //       }
  //     }
    
  //     console.log("Processed Order Items:", orderItems);
  //     setData(orderItems);
  //   } catch (error) {
  //     console.error("An error occurred while processing cart items:", error);
  //   }
    
  //   console.log("Processed Order Items:", orderItems);
    
  // }
  // console.log(data)

  return (
    <form className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' onSubmit={onSubmitHandler}>
     {/* Left Side */}
     {/* <form action="" className='flex justify-evenly items-center gap-20' onClick={(e)=>e.preventDefault()}> */}
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className=" text-xl sm:text-2xl my-3">
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className="flex gap-3">
            <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
            <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
          </div>
          <input onChange={onChangeHandler} name='email' value={formData.email} type="Email" placeholder='Email Address' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
          <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
            <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
          </div>
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='ZipCode' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
            <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
          </div>
          <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className=' border border-gray-300 rounded py-1.5 px-3.5 w-full '  />
       
      </div>   
     {/* Right SIde */}
     <div className=" mt-8">
      <div className=" mt-8 min-w-80">
        <CartTotal />
      </div>
      <div className=" mt-12">
        <Title  text1={"PAYMENT"} text2={"METHOD"}/>
        {/* ---------Payment Method Selection---------- */}
        <div className=' flex gap-3 flex-col lg:flex-row'>

          <div  onClick={()=>setMethod('stripe')} className=" flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='stripe' ? ' bg-green-500':''}`}></p>
            <img src={assets.stripe_logo} className=' h-5 mx-4' alt="" />
          </div>

          <div  onClick={()=>setMethod('razorpay')} className=" flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='razorpay' ? ' bg-green-500':''}`}></p>
            <img src={assets.razorpay_logo} className=' h-5 mx-4' alt="" />
          </div>

          {/* <div onClick={()=>setMethod('razorpay')} className=" flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className3={`min-w-3.5 h-3.5 border rounded-full  ${method=='razorpay' ? 'bg-green-500':''}`}></p>
            <img src={assets.razorpay_logo} className=' h-5 mx-4' alt="" />
          </div> */}

          <div onClick={()=>setMethod('cod')} className=" flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='cod' ? ' bg-green-500':''}`}></p>
            {/* <img src={assets.cashOnDelivery} className=' h-5 mx-4' alt="" /> */}
            <p className=' text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
          </div>
        </div>
        <div className=" w-full text-end mt-8">
            <button type='sumbit'  className=" bg-black text-white text-sm  px-16 py-3 active:bg-gray-700 ">PLACE ORDER</button>
          </div>
        
        
      </div>
     </div>
     {/* </form> */}
    </form>
  )
}

export default Placeorder
