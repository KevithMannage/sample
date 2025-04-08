// src/components/AboutUs.js
import React from 'react';
import Navbar from '../Navbar'; // Import Navbar component
import logo from '/images/4.png'; // Import the missing logo image
import developer1 from '/images/kevith.png';
import developer2 from '/images/induwara.png'; // Use correct images
import developer3 from '/images/malith.png';
import developer4 from '/images/idunil.png';
import developer5 from '/images/umesh.png';
import ChatBot from "./Chatbot";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar /> {/* Reusing Navbar */}

      {/* Main Content */}
      <div className="mt-20 max-w-6xl mx-auto  p-8 bg-[#ebf8ff] rounded-[40px] shadow-lg " >
        <h1 className="text-6xl font-bold text-[#1e90ff] text-center mb-8 font-poppins">About Us</h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Logo Section */}
          <div className="flex-1">
            <img src={logo} alt="Company Logo" className="w-full max-w-lg mx-auto" />
          </div>

          {/* Text Section */}
          <div className="flex-2">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>GuidelineX Chat</strong>, your personal companion on the journey to success! 
              We believe that the right career course can be chosen through a simple and friendly chat app, 
              helping students, job seekers, and professionals discover the best paths for their future.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At GuidelineX Chat, we provide personalized career course options and opportunities for everyone. 
              Whether you’re exploring career paths, seeking advice, or preparing for your dream job, we’re here to guide you every step of the way.
            </p>
          </div>
        </div>

        {/* Developers Section */}
        <h2 className="text-4xl font-bold text-[#1e90ff] text-center mt-12 mb-8 font-poppins">Developers</h2>
        <div className="flex flex-wrap justify-between gap-8">
          {[developer1, developer2, developer3, developer4, developer5].map((dev, index) => (
            <div key={index} className="text-center">
              <img src={dev} alt={`Developer ${index + 1}`} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
              <p className="text-lg font-bold text-gray-800">{["Kevith Mannage", "Induwara Withanage", "Malith Sathmina", "Kaveesha indunil", "Umesh Jayakody"][index]}</p>
              <p className="text-sm text-gray-600"></p>
            </div>
          ))}
        </div>
      </div>
      <ChatBot /> {/* Reusing ChatBot component */}
    </div>
  );
};

export default AboutUs;
