import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import googleIcon from '/images/google.png';
import Navbar from './navbar';

const Usersignuppage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate authentication check (replace with real authentication logic)
    if (username === "k" && password === "k") {
      console.log('Login successful');
      navigate('/dashboard'); // Redirect to Dashboard
    } else {
      alert('Invalid credentials!'); // Show an error message
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <img src="/images/3.png" alt="Professional" className="logo-icon" />
          <span className="logo-text">
            <h1>Sign up to</h1>
            <h2>GuidelineX </h2>
            <p>
            join our platform as an expert and help others by sharing your expertise! By creating an account       </p>
          </span>        
        </div>
        <div className="user-section">

    <div className="picture">
    <p><img src="images/signup.png" alt="picture "></img></p>
    <div className='hi'>

    <button>signin</button>
    </div>
    

     </div>
          
        </div>
      </div>

      <div className="right-section">
        <h3><span className="welcome-text">Welcome to</span> <span className="guidelinex-text">GuidelineX</span></h3>
        <h4>Sign up</h4>
       
       
        <form onSubmit={handleSubmit}>
          <label>Username or email address</label>
          <input
            type="text"
            placeholder="Enter your username or email address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
           <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
            <label>Contact number</label>
          <input
            type="text"
            placeholder="Enter your contact number "
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">Forgot Password</a>
          <button type="submit" className="signin-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Usersignuppage;

