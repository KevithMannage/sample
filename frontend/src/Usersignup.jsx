import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making HTTP requests
import './Login.css';
import googleIcon from '/images/google.png';

const Usersignuppage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !password || !email || !mobile) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      // Send a POST request to register the user
      const response = await axios.post('http://localhost:3000/user/registeruser', {
        username,
        password,
        email,
        mobile,
      });

      // Handle successful response
      console.log(response.data);
      if (response.data.success) {
        alert('Registration successful');
        navigate('/'); // Redirect to Dashboard after successful registration
      } else {
        alert('Registration failed. Please try again!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again!');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <img src="/images/3.png" alt="Professional" className="logo-icon" />
          <span className="logo-text">
            <h1>Sign up to</h1>
            <h2>GuidelineX</h2>
            <p>
              Join our platform as an expert and help others by sharing your expertise! By creating an account
            </p>
          </span>
        </div>
        <div className="user-section">
          <div className="hi">
            <button className="signin-button1" onClick={handleLogin}>
              <img src="/images/3.png" alt="picture" className="button-icon" />
              Have an account? <br />Sign in
            </button>
          </div>
          <div className="picture">
            <p><img src="images/signup2.png" alt="picture " /></p>
          </div>
        </div>
      </div>

      <div className="right-section">
        <h3><span className="welcome-text">Welcome to</span> <span className="guidelinex-text">GuidelineX</span></h3>
        <h4>Sign up</h4>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Contact number</label>
          <input
            type="text"
            placeholder="Enter your contact number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">Forgot Password</a>
          <button type="submit" className="signin-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Usersignuppage;
