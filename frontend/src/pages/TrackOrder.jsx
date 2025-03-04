import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';

const TrackOrder = () => {
  const { token, currency, navigate, BackendUrl } = useContext(ShopContext);
  const { orderId } = useParams(); // Get orderId from URL
  const [order, setOrder] = useState(null);

  const loadTrackingData = async () => {
    try {
  if (!token) {
        console.log('No token, skipping tracking fetch');
        return;
      }

      const response = await axios.post(
        `${BackendUrl}/api/order/userOrder`,
        {},
        { headers: { token } }
      );

      console.log('Track Order Response:', response.data);

      if (response.data.success) {
        const foundOrder = response.data.orders.find(o => o._id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          toast.error('Order not found');
          navigate('/orders'); // Redirect if order not found
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('TrackOrder Error:', error);
      toast.error('Failed to load tracking data');
    }
  };

  useEffect(() => {
    if (orderId) {
      loadTrackingData();
    }
  }, [orderId, token]);

  const getTrackingStatus = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'Order received and processing';
      case 'Shipped':
        return 'Order has been shipped';
      case 'Out for Delivery':
        return 'Order is out for delivery';
      case 'Delivered':
        return 'Order has been delivered';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'TRACK'} text2={'ORDER'} />
      </div>

      {order ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
          <p className="mt-2">Status: <span className="text-green-500">{order.status}</span></p>
          <p>{getTrackingStatus(order.status)}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Date: {new Date(order.date).toDateString()}</p>
          <p>Total Amount: {currency}{order.amount.toFixed(2)}</p>

          <div className="mt-6">
            <h4 className="text-lg font-medium">Items:</h4>
            {order.items.map((item, index) => (
              <div key={index} className="py-4 border-t text-gray-700 flex items-start gap-6">
                <img
                  src={item.image && item.image[0] ? item.image[0] : 'fallback-image-url'}
                  alt={item.name || 'Product'}
                  className="w-1/6 sm:w-20 cursor-pointer"
                  onClick={() => navigate(`/product/${item.product}`)}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name || 'Unknown Product'}</p>
                  <p>{currency}{item.price ? item.price.toFixed(2) : 'N/A'}</p>
                  <p>Quantity: {item.quantity || 'N/A'}</p>
                  <p>Size: {item.size || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple tracking timeline */}
          <div className="mt-8">
            <h4 className="text-lg font-medium">Tracking Progress</h4>
            <ul className="list-disc pl-5">
              <li className={order.status === 'Order Placed' ? 'text-green-500' : 'text-gray-500'}>Order Placed</li>
              <li className={order.status === 'Shipped' ? 'text-green-500' : 'text-gray-500'}>Shipped</li>
              <li className={order.status === 'Out for Delivery' ? 'text-green-500' : 'text-gray-500'}>Out for Delivery</li>
              <li className={order.status === 'Delivered' ? 'text-green-500' : 'text-gray-500'}>Delivered</li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/orders')}
            className="mt-6 border px-4 py-2 text-sm font-medium rounded-sm"
          >
            Back to Orders
          </button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default TrackOrder;