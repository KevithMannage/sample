import React from 'react';
import Navbar from '../navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center py-20">
        <div className="text-center max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to About Us!</h1>
          <p className="text-lg text-gray-700 mb-6">This is your main About Us page. Here, you can add details about your company, mission, and team.</p>
          <p className="text-md text-gray-500">Feel free to update this page to better reflect your organization.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
