import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../../frontend/src/assets/admin_assets/assets'
import { BackendUrl } from '../App'

const Orders = ({ token }) => {
  const currency='$';
  const [Orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }

    try {
      const respones = await axios.post(`${BackendUrl}/api/order/list`,{}, { headers: { token } })
      // console.log(respones)
      if (respones.data.success) {
        setOrders(respones.data.orders)
      } else {
        toast.error(respones.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const StatusHandler=async(event,orderId)=>{
    try {
      const respones=await axios.post(`${BackendUrl}/api/order/status`,{orderId,status:event.target.value},{headers:{token}})
      if(respones.data.success){
        await fetchAllOrders()
        toast.success(respones.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(respones.data.message)

    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  // console.log(Orders)
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          Orders.map((order, index) => (
            <div  className=' grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img  className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className=' py-1' key={index}>{item.name} x {item.quantity} <span> {item.size}</span></p>
                      } else {
                        return <p className=' py-1' key={index}>{item.name} x {item.quantity} <span> {item.size}</span> ,</p>
                      }
                    })
                  }
                </div>
                <p className=' mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>

                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className=' text-sm  sm:text-[15px['>Items:{order.items.length}</p>
                <p className=' mt-3'>Method:{order.paymentMethod}</p>
                <p>Payment:{order.payment ? 'Done':'Pending'}</p>
                <p>Date:{new Date(order.date).toDateString()}</p>
              </div>
              <p className=' text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>StatusHandler(event,order._id)} value={order.status} className=' p-2 font-semibold border-gray-700' >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Orders
