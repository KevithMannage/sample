import React, { useState } from "react";
import Navbar from "../Navbar"; // Import existing Navbar
import axios from "axios"; // Import Axios
import ChatBot from "./Chatbot"; // Import ChatBot component
const ContactUs = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading
  const backendUrl="https://devthonbackend-production.up.railway.app"

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading to true when form is submitted

    try {
      // POST request to your backend API
      const response = await axios.post(`${backendUrl}/contact/contactus`, {
        name,
        email,
        message,
      });
    if(response.data.status1=="ok"){
      // On success, show a success message or clear the form
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false); // Set loading to false once submission is complete
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contact Us Section */}
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="bg-[#ebf8ff] p-10 rounded-[40px] shadow-lg flex flex-col md:flex-row w-full max-w-5xl">
          
          {/* Left Section - Contact Info & Illustration */}
          <div className="md:w-1/2 flex flex-col items-center text-center p-6">
            <img
              src="images/Contactus.png" 
              alt="Illustration"
              className="w-80 mb-4"
            />

            <div className="text-gray-700 text-lg space-y-2">
              <p className="flex items-center">
                <img src="/images/phone.png" alt="phone icon" /> 
                <span className="ml-2">+1 254 8547 956</span>
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
                <img src="/images/location.png" alt="location icon"/> 
                <span className="ml-2">Bandaranayake Mawatha, Moratuwa 10400</span>
              </p>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#1e90ff] mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Any question or remarks? Let us know!</p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Enter your Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Enter your Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Enter your Message</label>
                <textarea
                  placeholder="Type your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#1e90ff] text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default ContactUs;
