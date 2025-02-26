import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { token, BackendUrl, Logout, isDarkMode } = useContext(ShopContext);
  const [user, setUser] = useState({ name: 'Loading...', email: 'Loading...' });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    console.log('Fetching from:', `${BackendUrl}/api/user/profile`, 'Token:', token);
    if (!token) {
      toast.error('Please log in to view your profile.');
      return;
    }

    try {
      const response = await axios.get(`${BackendUrl}/api/user/profile`, {
        headers: { token },
      });
      console.log('Response:', response.data);
      if (response.data.success) {
        setUser({
          name: response.data.user.name || 'Unknown',
          email: response.data.user.email || 'Not provided',
          
        });
      } else {
        toast.error(response.data.message);
        if (response.data.message === 'User not found') {
          console.log('User not found, logging out...');
          logout();
          toast.error('Session invalid. Please log in again.');
        }
      }
    } catch (error) {
      console.error('Fetch Error:', error.response?.status, error.response?.data || error.message);
      toast.error(`Failed to fetch profile: ${error.response?.status || 'Unknown error'}`);
      if (error.response?.status === 404) {
        logout();
        toast.error('Session invalid. Please log in again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#151013] flex items-center justify-center">
        <p className="text-gray-800 dark:text-white">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#151013] flex items-center justify-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h1>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Name:</span>
              <span className="text-gray-800 dark:text-white">{user.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Email:</span>
              <span className="text-gray-800 dark:text-white">{user.email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Password:</span>
              <span className="text-gray-800 dark:text-white">********</span>
            </div>
          </div>
        )}
        <button
          onClick={Logout}
          className="mt-6 w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;