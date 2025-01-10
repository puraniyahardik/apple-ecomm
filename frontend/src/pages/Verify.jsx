import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const {navigate,token,setCartItems}=useContext(ShopContext)
    const [searchParams,setSearchParams]=useSearchParams()
    
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')

    const verifyPayment=async()=>{
        try {
            if(!token){
                return null
            }

            const respones=await axios.post('http://localhost:8000/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if(respones.data.success){
                toast.success("PAYMENT COMPLETED")
                setCartItems({})
                navigate('/orders')

            }else{
                navigate('/')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
    return (
    <div>
      
    </div>
  )
}

export default Verify
