import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const BackendUrl = 'http://localhost:8000'; // Or use ShopContext if preferred

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/api/user/reset-password`, { token, password });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={handleSubmit}>
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-black text-white font-light px-8 py-2 mt-4" type='submit'>Reset Password</button>
    </form>
  );
};

export default ResetPassword;