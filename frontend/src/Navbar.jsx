import React, { useState, useEffect } from 'react';
import {
  FaHome, FaEnvelope, FaComments, FaPlusCircle, FaInfoCircle,
  FaPhone, FaSearch, FaBell, FaPen ,FaBriefcase
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import checkNotification from './hooks/checkNotification'; // Import the updated checkNotification hook
import './Navbar.css';

const Navbar = ({ isLoggedIn, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasNotifications, setHasNotifications] = useState(false); // State to track notifications
  const navigate = useNavigate();


  //const navigate = useNavigate();
  
  // Get profile image from localStorage or use a default
  const profileImage = localStorage.getItem("profileimage") 
  
  // Sample user with proper image URL
  const sampleUser = {
    name: 'Profile',
    avatar: profileImage 
      ? (profileImage.startsWith('http') 
          ? profileImage 
          : `https://devthonbackend-production.up.railway.app/${profileImage}`)
      : 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  useEffect(() => {
    // Call the checkNotification hook
    checkNotification();

    // Check for discussionIds in session storage
    const discussionIds = JSON.parse(sessionStorage.getItem('discussionIds')) || [];
    setHasNotifications(discussionIds.length > 0); // Set state based on presence of discussionIds
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleProfileClick = () => {
    navigate('/studentProfile');
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
          <FaBriefcase className="nav-icon" /> Job Area
        </a>
        <a href="/newdiscussion" className="nav-link">
          <FaPlusCircle className="nav-icon" /> New Discussion
        </a>
        <a href="/createpostforum" className="nav-link">
          <FaPen className="nav-icon" /> Create Post
        </a>
        <a href="/aboutus" className="nav-link">
          <FaInfoCircle className="nav-icon" /> About us
        </a>
        <a href="/contactus" className="nav-link">
          <FaPhone className="nav-icon" /> Contact us
        </a>

        <div className="navbar-search" onClick={handleSearchClick}>
          <FaSearch className="search-icon" />
          <span style={{ color: 'white' }}>search</span>
        </div>
      </div>

      <div className="navbar-right">
        <div
          className={`notification-icon ${hasNotifications ? 'glow' : ''}`} // Add 'glow' class if notifications exist
          onClick={() => navigate('/notifications')}
          style={{ cursor: 'pointer' }}
        >
          <FaBell />
          <span className="notification-badge"></span>
        </div>

        <div
          className="user-profile"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={user?.avatar || sampleUser.avatar}
            alt="Profile"
            className="profile-picture"
          />
          <span className="username">{user?.name || sampleUser.name}</span>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;