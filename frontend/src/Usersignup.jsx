// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios'; // Import axios for making HTTP requests
// import './Login.css';
// import googleIcon from '/images/google.png';

// const Usersignuppage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const navigate = useNavigate(); // Initialize navigation

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if any field is empty
//     if (!username || !password || !email || !mobile) {
//       alert('Please fill in all fields!');
//       return;
//     }

//     try {
//       // Send a POST request to register the user
//       const response = await axios.post('http://localhost:3000/user/registeruser', {
//         username,
//         password,
//         email,
//         mobile,
//       });

//       // Handle successful response
//       console.log(response.data);
//       if (response.data.success) {
//         alert('Registration successful');
//         navigate('/'); // Redirect to Dashboard after successful registration
//       } else {
//         alert('Registration failed. Please try again!');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('An error occurred. Please try again!');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="logo">
//           <img src="/images/3.png" alt="Professional" className="logo-icon" />
//           <span className="logo-text">
//             <h1>Sign up to</h1>
//             <h2>GuidelineX</h2>
//             <p>
//               Join our platform as an expert and help others by sharing your expertise! By creating an account
//             </p>
//           </span>
//         </div>
//         <div className="user-section">
//           <div className="hi">
//             <button className="signin-button1" onClick={handleLogin}>
//               Have an account? <br />Sign in
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="right-section">
//         <h3><span className="welcome-text">Welcome to</span> <span className="guidelinex-text">GuidelineX</span></h3>
//         <h4>Sign up</h4>

//         <form onSubmit={handleSubmit}>
//           <label>Username</label>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={email}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <label>Email</label>
//           <input
//             type="text"
//             placeholder="Enter your email"
//             value={username}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label>Contact number</label>
//           <input
//             type="text"
//             placeholder="Enter your contact number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <a href="#" className="forgot-password">Forgot Password</a>
//           <button type="submit" className="signin-btn">Sign up</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Usersignuppage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';

const Usersignuppage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl="https://devthonbackend-production.up.railway.app"

  const handleLogin = () => {
    navigate('/login');
  };

  const validateForm = () => {
    if (!username || !password || !email || !mobile) {
      toast.error('Please fill in all fields!');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/user/registeruser`, {
        username,
        password,
        email,
        mobile,
      });

      if (response.data.status) {
        alert('Registration successful!');
        toast.success('Registration successful!');
        navigate('/login'); // Redirect to login page after registration
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again!');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="bottom-left" pauseOnHover/>
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
              Have an account? <br />Sign in
            </button>
          </div>
        </div>
      </div>

      <div className="right-section">
        <h3><span className="welcome-text">Welcome to</span> <span className="guidelinex-text">GuidelineX</span></h3>
        <h4>Sign up</h4>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label>Contact number</label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            pattern="[0-9]{10}"
            required
          />
          
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
          
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <button 
            type="submit" 
            className="signin-btn"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Usersignuppage;