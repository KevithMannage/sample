import React from 'react';
import { FaHome, FaEnvelope, FaComments, FaPlusCircle, FaInfoCircle, FaPhone, FaSearch, FaBell } from 'react-icons/fa';
import './Navbar.css';



const Navbar = ({ isLoggedIn, user }) => {
  // Sample user data - in a real app, this would come from props or context
  const sampleUser = {
    name: 'profile',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">GuidelineX</div>
      
      <div className="navbar-links">
        <a href="/dashboard" className="nav-link">
          <FaHome className="nav-icon" /> Dashboard
        </a>
        <a href="/messages" className="nav-link">
          <FaEnvelope className="nav-icon" /> Messages
        </a>
        <a href="/discussion" className="nav-link">
          <FaComments className="nav-icon" /> Discussions
        </a>
        <a href="/newdiscussion" className="nav-link">
          <FaPlusCircle className="nav-icon" /> New Discussion
        </a>
        <a href="/aboutus" className="nav-link">
          <FaInfoCircle className="nav-icon" /> About us
        </a>
        <a href="/contactus" className="nav-link">
          <FaPhone className="nav-icon" /> Contact us
        </a>

        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge"></span>
        </div>
        
        {isLoggedIn ? (
          <div className="user-profile">
            <img 
              src={user?.avatar || sampleUser.avatar} 
              alt="Profile" 
              className="profile-picture"
            />
            <span className="username">{user?.name || sampleUser.name}</span>
          </div>
        ) : (
            <div className="user-profile">
            <img 
              src={user?.avatar || sampleUser.avatar} 
              alt="Profile" 
              className="profile-picture"
            />
            <span className="username">{user?.name || sampleUser.name}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;