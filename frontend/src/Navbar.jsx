// import React, { useState, useEffect } from 'react';
// import {
//   FaHome, FaEnvelope, FaBriefcase, FaPlusCircle, FaInfoCircle,
//   FaPhone, FaSearch, FaBell, FaPen, FaBars
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import checkNotification from './hooks/checkNotification';
// import './Navbar.css';

// const Navbar = ({ isLoggedIn, user }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [hasNotifications, setHasNotifications] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const profileImage = localStorage.getItem("profileimage");
//   const sampleUser = {
//     name: 'Profile',
//     avatar: profileImage 
//       ? (profileImage.startsWith('http') 
//           ? profileImage 
//           : `https://devthonbackend-production.up.railway.app/${profileImage}`)
//       : 'https://randomuser.me/api/portraits/men/32.jpg'
//   };

//   useEffect(() => {
//     checkNotification();
//     const discussionIds = JSON.parse(sessionStorage.getItem('discussionIds')) || [];
//     setHasNotifications(discussionIds.length > 0);
//   }, []);

//   const handleSearchClick = () => {
//     navigate('/search');
//     setIsMobileMenuOpen(false);
//   };

//   const handleProfileClick = () => {
//     navigate('/studentProfile');
//     setIsMobileMenuOpen(false);
//   };

//   const handleNotificationClick = () => {
//     navigate('/notifications');
//     setIsMobileMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleNavLinkClick = (path) => {
//     navigate(path);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className="navbar">
      

//               {/* Hamburger Menu for Mobile */}
//               <div className="hamburger" onClick={toggleMobileMenu}>
//                 <FaBars />
//               </div>

//               {/* Navbar Brand for Desktop */}
//               <div className="navbar-brand mobile-logo">GuidelineX</div>

//               {/* User Profile */}
//               <div
//                 className={`notification-icon ${hasNotifications ? 'glow' : ''}`}
//                 onClick={handleNotificationClick}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <FaBell />
//                 <span className="notification-badge"></span>
//               </div>
//               <div
//                 className="user-profile"
//                 onClick={handleProfileClick}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <img
//                   src={user?.avatar || sampleUser.avatar}
//                   alt="Profile"
//                   className="profile-picture"
//                 />
//               </div>

//         {/* Mobile Menu Content */}
//         <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
//           <div className="mobile-menu-header">
//             <div className="navbar-brand">GuidelineX</div>
//             <div className="mobile-menu-right">
//               <button className="mobile-search-button" onClick={handleSearchClick}>
//                 <FaSearch className="search-icon" /> Search
//               </button>


//             </div>
//           </div>

//           {/* Navigation Links Inside Mobile Menu */}
//           <div className="mobile-nav-links">
//             <div className="nav-link" onClick={() => handleNavLinkClick('/dashboard')}>
//               <FaHome className="nav-icon" /> Dashboard
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/messages')}>
//               <FaEnvelope className="nav-icon" /> Messages
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/discussion')}>
//               <FaBriefcase className="nav-icon" /> Job Area
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/newdiscussion')}>
//               <FaPlusCircle className="nav-icon" /> New Discussion
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/createpostforum')}>
//               <FaPen className="nav-icon" /> Create Post
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/aboutus')}>
//               <FaInfoCircle className="nav-icon" /> About us
//             </div>
//             <div className="nav-link" onClick={() => handleNavLinkClick('/contactus')}>
//               <FaPhone className="nav-icon" /> Contact us
//             </div>
//           </div>
//         </div>

//         {/* Backdrop for Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
//         )}

//         {/* Desktop Navigation Links */}
//         <div className="navbar-links">
//           <a href="/dashboard" className="nav-link">
//             <FaHome className="nav-icon" /> Dashboard
//           </a>
//           <a href="/messages" className="nav-link">
//             <FaEnvelope className="nav-icon" /> Messages
//           </a>
//           <a href="/discussion" className="nav-link">
//             <FaBriefcase className="nav-icon" /> Job Area
//           </a>
//           <a href="/newdiscussion" className="nav-link">
//             <FaPlusCircle className="nav-icon" /> New Discussion
//           </a>
//           <a href="/createpostforum" className="nav-link">
//             <FaPen className="nav-icon" /> Create Post
//           </a>
//           <a href="/aboutus" className="nav-link">
//             <FaInfoCircle className="nav-icon" /> About us
//           </a>
//           <a href="/contactus" className="nav-link">
//             <FaPhone className="nav-icon" /> Contact us
//           </a>
//           <div className="navbar-search" onClick={handleSearchClick}>
//             <FaSearch className="search-icon" />
//             <span style={{ color: 'white' }}>search</span>
//           </div>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="navbar-right">
//           <div
//             className={`notification-icon ${hasNotifications ? 'glow' : ''}`}
//             onClick={() => navigate('/notifications')}
//             style={{ cursor: 'pointer' }}
//           >
//             <FaBell />
//             <span className="notification-badge"></span>
//           </div>
//           <div
//             className="user-profile"
//             onClick={handleProfileClick}
//             style={{ cursor: 'pointer' }}
//           >
//             <img
//               src={user?.avatar || sampleUser.avatar}
//               alt="Profile"
//               className="profile-picture"
//             />
//             <span className="username">{user?.name || sampleUser.name}</span>
//           </div>
//         </div>

//         {searchResults.length > 0 && (
//           <div className="search-results">
//             <ul>
//               {searchResults.map((result, index) => (
//                 <li key={index}>{result.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import {
  FaHome, FaEnvelope, FaBriefcase, FaPlusCircle, FaInfoCircle,
  FaPhone, FaSearch, FaBell, FaPen, FaBars
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import checkNotification from './hooks/checkNotification';
import './Navbar.css';

const Navbar = ({ isLoggedIn, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const profileImage = localStorage.getItem("profileimage");
  const sampleUser = {
    name: 'Profile',
    avatar: profileImage 
      ? (profileImage.startsWith('http') 
          ? profileImage 
          : `https://devthonbackend-production.up.railway.app/${profileImage}`)
      : 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  useEffect(() => {
    checkNotification();
    const discussionIds = JSON.parse(sessionStorage.getItem('discussionIds')) || [];
    setHasNotifications(discussionIds.length > 0);
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/studentProfile');
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <FaBars />
        </div>

        {/* Navbar Brand for Both Desktop and Mobile */}
        <div className="navbar-brand">GuidelineX</div>

        {/* Mobile Right Section (Notification and Profile Icons for Mobile) */}
        <div className="mobile-right">
          <div
            className={`notification-icon ${hasNotifications ? 'glow' : ''}`}
            onClick={handleNotificationClick}
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
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="navbar-brand">GuidelineX</div>
            <div className="mobile-menu-right">
              <button className="mobile-search-button" onClick={handleSearchClick}>
                <FaSearch className="search-icon" /> Search
              </button>
            </div>
          </div>

          {/* Navigation Links Inside Mobile Menu */}
          <div className="mobile-nav-links">
            <div className="nav-link" onClick={() => handleNavLinkClick('/dashboard')}>
              <FaHome className="nav-icon" /> Dashboard
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/messages')}>
              <FaEnvelope className="nav-icon" /> Messages
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/discussion')}>
              <FaBriefcase className="nav-icon" /> Job Area
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/newdiscussion')}>
              <FaPlusCircle className="nav-icon" /> New Discussion
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/createpostforum')}>
              <FaPen className="nav-icon" /> Create Post
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/aboutus')}>
              <FaInfoCircle className="nav-icon" /> About us
            </div>
            <div className="nav-link" onClick={() => handleNavLinkClick('/contactus')}>
              <FaPhone className="nav-icon" /> Contact us
            </div>
          </div>
        </div>

        {/* Backdrop for Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
        )}

        {/* Desktop Navigation Links */}
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

        {/* Desktop Right Section */}
        <div className="navbar-right">
          <div
            className={`notification-icon ${hasNotifications ? 'glow' : ''}`}
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
    </>
  );
};

export default Navbar;