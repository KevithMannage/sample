import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    mobile: '',
  });

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (status) {
      setStatus(null); // Clear message when user types
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/forgetpassword', formData);
      setStatus({
        success: true,
        message: response.data.message || 'Reset link sent successfully.',
      });

      setTimeout(() => {
        navigate('/resetpassword');
      }, 1000);
    } catch (error) {
      console.error('Error sending reset request:', error);
      setStatus({
        success: false,
        message: 'Entered details are wrong',
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/forget.png')" }} // 🔁 Use your image path or URL
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-md w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>

        {status && (
          <div
            className={`mb-4 text-sm p-3 rounded-xl ${
              status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

      </div>
      <Link 
          to="/" 
          className="back-link flex items-bottom text-blue-700 hover:text-blue-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
        </Link>
    </div>
  );
};

export default ForgotPassword;
