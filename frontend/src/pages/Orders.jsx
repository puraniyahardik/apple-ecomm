// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Orders = () => {
//   const { token, currency ,navigate,BackendUrl} = useContext(ShopContext);
//   const [orderData,setOrderData]=useState([])
  
//   const LoadOrderData=async()=>{
//     try {
//       if(!token){
//         return null
//       }

//       const respones=await axios.post(BackendUrl+'/api/order/userOrder',{ },{headers:{token}})
      
//       if(respones.data.success){
//         let allordersItem=[]
//         respones.data.orders.map((order)=>{
//           order.items.map((item)=>{
//             item['status']=order.status
//             item['payment']=order.payment
//             item['paymentMethod']=order.paymentMethod
//             item['date']=order.date
//             allordersItem.push(item)

//           })
//         })
//         console.log(allordersItem)
//         setOrderData(allordersItem.reverse())
//       }else{
//         toast.error(respones.data.message)
//       }
//     } catch (error) {
      
//     }
//   }

//   useEffect(()=>{
//     LoadOrderData()
//   },[token])
//   return (
//     <div className='border-t pt-16'>
//       <div className=" text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {
//           orderData.map((item, index) => (
//              <div key={index} className=' py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' >
//               <div className=" flex items-start gap-6 text-sm" >
//                 <img src={item.image[0]} alt="" className=" w-1/6 sm:w-20 cursor-pointer"   onClick={()=>navigate(`/product/${item._id}`)}/>
//                 <div>
//                   <p className=' sm:text-base font-medium'>{item.name}</p>
//                   <div className=" flex items-center gap-3 mt-2 text-base text-gray-700">
//                     <p>{currency}{item.price}.00</p>
//                     <p>Quantity:{item.quantity}</p>
//                     <p>Size:{item.size}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
//                   <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
//                 </div>
//               </div>
//               <div className=" md:w-1/2 flex justify-between">
//                 <div className=" flex items-center gap-2">
//                   <p className=' min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className=' text-sm md:text-base'>{item.status}</p>
//                 </div>
//                 <button onClick={LoadOrderData} className=' border px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Orders = () => {
//   const { token, currency, navigate, BackendUrl } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [error, setError] = useState(null); // Add error state

//   const LoadOrderData = async () => {
//     try {
//       if (!token) {
//         setError('Please log in to view orders');
//         return;
//       }

//       setLoading(true);
//       setError(null);
//       const response = await axios.post(
//         `${BackendUrl}/api/order/userOrder`,
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrdersItem.push(item);
//           });
//         });
//         console.log('Orders fetched:', allOrdersItem);
//         setOrderData(allOrdersItem.reverse());
//       } else {
//         toast.error(response.data.message);
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.log('LoadOrderData Error:', error);
//       const errorMsg = error.response?.data?.message || 'Failed to load orders';
//       toast.error(errorMsg);
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     LoadOrderData();
//   }, [token]);

//   return (
//     <div className='border-t pt-16'>
//       <div className="text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>
//       {loading ? (
//         <p>Loading orders...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : orderData.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div>
//           {orderData.map((item, index) => (
//             <div key={index} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//               <div className="flex items-start gap-6 text-sm">
//                 <img src={item.image[0]} alt="" className="w-1/6 sm:w-20 cursor-pointer" onClick={() => navigate(`/product/${item._id}`)} />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
//                     <p>{currency}{item.price}.00</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
//                   <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 flex justify-between">
//                 <div className="flex items-center gap-2">
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm md:text-base'>{item.status}</p>
//                 </div>
//                 <button onClick={LoadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { token, currency, navigate, BackendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // const LoadOrderData = async () => {
  //   try {
  //     if (!token) {
  //       console.log('No token, skipping order fetch');
  //       return null;
  //     }

  //     const response = await axios.post(
  //       `${BackendUrl}/api/order/userOrder`,
  //       {},
  //       { headers: { token } }
  //     );

  //     console.log('Full response:', response.data);

  //     if (response.data.success) {
  //       let allOrdersItem = [];
  //       response.data.orders.forEach((order) => {
  //         order.items.forEach((item) => {
  //           item['status'] = order.status;
  //           item['payment'] = order.payment;
  //           item['paymentMethod'] = order.paymentMethod;
  //           item['date'] = order.date;
  //           allOrdersItem.push(item);
  //         });
  //       });
  //       console.log('Processed orders:', allOrdersItem);
  //       setOrderData(allOrdersItem.reverse());
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log('LoadOrderData Error:', error);
  //     toast.error('Failed to load orders');
  //   }
  // };

  const LoadOrderData = async () => {
    try {
      if (!token) {
        console.log('No token, skipping order fetch');
        return null;
      }
  
      const response = await axios.post(
        `${BackendUrl}/api/order/userOrder`,
        {},
        { headers: { token } }
      );
  
      console.log('Full response:', response.data);
  
      if (response.data.success) {
        const allOrders = response.data.orders.map(order => ({
          _id: order._id, // Keep order ID
          items: order.items.map(item => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date
          }))
        }));
        console.log('Processed orders:', allOrders);
        setOrderData(allOrders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('LoadOrderData Error:', error);
      toast.error('Failed to load orders');
    }
  };
  useEffect(() => {
    LoadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      <div>
  {orderData.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    orderData.map((order, orderIndex) => (
      order.items.map((item, itemIndex) => (
        <div key={`${orderIndex}-${itemIndex}`} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className="flex items-start gap-6 text-sm">
            <img
              src={item.image && item.image[0] ? item.image[0] : 'fallback-image-url'}
              alt={item.name || 'Product'}
              className="w-1/6 sm:w-20 cursor-pointer"
              onClick={() => navigate(`/product/${item.product}`)}
            />
            <div>
              <p className='sm:text-base font-medium'>{item.name || 'Unknown Product'}</p>
              <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                <p>{currency}{item.price ? item.price.toFixed(2) : 'N/A'}</p>
                <p>Quantity: {item.quantity || 'N/A'}</p>
                <p>Size: {item.size || 'N/A'}</p>
              </div>
              <p className='mt-1'>Date: <span className='text-gray-400'>{item.date ? new Date(item.date).toDateString() : 'N/A'}</span></p>
              <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod || 'N/A'}</span></p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              <p className='text-sm md:text-base'>{item.status || 'N/A'}</p>
            </div>
            <button
              onClick={() => navigate(`/track/${order._id}`)} // Use order._id
              className='border px-4 py-2 text-sm font-medium rounded-sm'
            >
              Track Order
            </button>
          </div>
        </div>
      ))
    ))
  )}
</div>

      {/* <div>
        {orderData.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image && item.image[0] ? item.image[0] : 'fallback-image-url'} // Fallback if image is undefined
                  alt={item.name || 'Product'}
                  className="w-1/6 sm:w-20 cursor-pointer"
                  onClick={() => navigate(`/product/${item._id}`)}
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.name || 'Unknown Product'}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>{currency}{item.price ? item.price.toFixed(2) : 'N/A'}</p>
                    <p>Quantity: {item.quantity || 'N/A'}</p>
                    <p>Size: {item.size || 'N/A'}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{item.date ? new Date(item.date).toDateString() : 'N/A'}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod || 'N/A'}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status || 'N/A'}</p>
                </div>
                <button onClick={LoadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        )}
      </div> */}
      </div>

  );
};

export default Orders;