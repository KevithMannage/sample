// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios'; // Import axios
// import './Login.css';

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

//     // Basic form validation
//     if (!username || !password || !email || !mobile) {
//       alert('Please fill in all fields!');
//       return;
//     }

//     try {
//       // Send a POST request to the backend to register the user
//       const response = await axios.post('http://localhost:3000/user/registerprofession', {
//         username,
//         password,
//         email,
//         mobile,
//       });

//       // Handle the response
//       if (response.data.status) {
//         console.log('Signup successful');
//         navigate('/'); // Redirect to Dashboard or Login page
//       } else {
//         alert('Signup failed. Please try again!'); // Show error message if signup fails
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//       alert('An error occurred. Please try again later!'); // Handle error case
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
//             <p>Join our platform as an expert and help others by sharing your expertise! By creating an account.</p>
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
//           <label>Username </label>
//           <input
//             type="text"
//             placeholder="Enter your username "
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
          
//           <label>Email</label>
//           <input
//             type="text"
//             placeholder="Enter your email"
//             value={email}
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
//             placeholder="Enter your password"
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
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      toast.warning('Email is required');
    } else if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email');
    }
    if (!formData.mobile.trim()) {
      toast.warning('Mobile number is required');
    } else if (!mobileRegex.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit number');
    }
    if (!formData.password) {
      toast.warning('Password is required');
    } else if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/user/registerprofession', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile
      });

      if (response.data.status) {
        alert('Registration successful!');
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
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
            <p>Join our platform as an expert and help others by sharing your expertise!</p>
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
        
        {apiError && <div className="error-message">{apiError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Contact number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your contact number"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'error' : ''}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="signin-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Usersignuppage;