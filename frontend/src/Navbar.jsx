import React, { useState } from 'react';
import { FaHome, FaEnvelope, FaComments, FaPlusCircle, FaInfoCircle, FaPhone, FaSearch, FaBell } from 'react-icons/fa';
import axios from 'axios'; // Import axios
import './Navbar.css';

const Navbar = ({ isLoggedIn, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to store the search results

  const handleSearch = async (event) => {
    if (event.key === "Enter" && searchTerm) { // Trigger on "Enter" key press only if there's a search term
      try {
        const response = await axios.get('http://localhost:3000/search/searchevent', {
          params: { name: searchTerm }, // Pass searchTerm as a query parameter
        });

        console.log(response.data); // Check the response in console
        setSearchResults(response.data || []); // Update state with the results

      } catch (error) {
        console.error("Error searching:", error);
      }
    }
  };

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term); // Update the search term as the user types

    // If the search term is empty, clear the search results
    if (term === "") {
      setSearchResults([]); // Clear results when search term is empty
    }
  };

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
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleSearch} // Call handleSearch when the "Enter" key is pressed
          />
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
