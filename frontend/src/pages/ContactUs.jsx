import React from "react";
import Navbar from "../navbar"; // Import existing Navbar

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contact Us Section */}
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="bg-blue-100 p-10 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl">
          
          {/* Left Section - Contact Info & Illustration */}
          <div className="md:w-1/2 flex flex-col items-center text-center p-6">
  <img
    src="images/Contactus.png" 
    alt="Illustration"
    className="w-80 mb-4"
  />

            <div className="text-gray-700 text-lg space-y-2">
              <p className="flex items-center">
              <img src="/images/phone.png" alt="phone icon"/> <span className="ml-2">+1 254 8547 956</span>
              </p>
             

              <p className="flex items-center">
  <img 
    src="/images/mail.png" 
    alt="mail icon" 
    className="-ml-2 mr-0.5" 
  />
  <span>Guidelinex@gmail.com</span>
</p>
              <p className="flex items-center">
              <img src="/images/location.png" alt="location icon"/> <span className="ml-2">Bandaranayake Mawatha, Moratuwa 10400</span>
              </p>


            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Any question or remarks? Let us know!</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Enter your Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Enter your Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Enter your Message</label>
                <textarea
                  placeholder="Type your message here"
                  className="w-full p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
