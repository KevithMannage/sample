import React, { useState } from 'react';
import {
  FaHome, FaEnvelope, FaComments, FaPlusCircle, FaInfoCircle,
  FaPhone, FaSearch, FaBell, FaPen
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ isLoggedIn, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  const sampleUser = {
    name: 'profile',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  const handleSearchClick = () => {
    navigate('/search'); // Navigate to /search when clicked
  };

  const handleProfileClick = () => {
    navigate('/studentProfile'); // Navigate to /studentProfile
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
          search
        </div>
      </div>

      <div className="navbar-right">
        <div className="notification-icon">
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

      {/* Display Search Results */}
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
