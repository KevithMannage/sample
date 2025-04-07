import React, { useState, useEffect } from 'react';
import './ChatSelection.css';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatBot from "./Chatbot";

const ChatSelection = () => {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = "http://localhost:3000"; // Replace with your actual backend URL

  const handleonclick = () => {
    navigate('/chatbot');
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        // Get username from storage or context
        const username = localStorage.getItem('username') || ''; // Adjust based on your auth setup
        
        const response = await axios.post(`${backendUrl}/message/usercontacts`, 
          { user: username },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        if (response.data.success && Array.isArray(response.data.contacts)) {
          // Extract just usernames from contacts
          const extractedUsernames = response.data.contacts.map(contact => contact.username);
          setUsernames(extractedUsernames);
        } else {
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError(err.response?.data?.message || 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchUsernames();
  }, []);

  const handleUsernameClick = (username) => {
    localStorage.setItem("contact",username);
    navigate(`/chat`);
  };

  if (loading) {
    return (
      <div className="chat-selection-container">
        <Navbar />
        <div className="loading-message">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-selection-container">
        <Navbar />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="chat-selection-container">
      <Navbar/>
      {/* Contacts List */}
      <div className="contacts-list">
        {usernames.length > 0 ? (
          usernames.map((contact, index) => (
            <div key={index} className="contact" onClick={() => handleUsernameClick(contact)}>
              <img
                src={contact.avatar || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="contact-avatar"
              />
              <span className="contact-name">{contact || `Contact ${index + 1}`}</span>
            </div>
          ))
        ) : (
          <div className="no-contacts">No contacts available</div>
        )}
        <button style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
          }}>
            New Chat
          </button>

      </div>

      {/* Chat Placeholder */}
      <div className="chat-placeholder">
        <img
          src="images/messages.png"
          alt="Chat Illustration"
          className="chat-illustration"
        />
        <p className="chat-prompt">Select chat to message</p>
        <ChatBot/>
      </div>
    </div>
  );
};

export default ChatSelection;

// import React, { useState, useEffect } from 'react';
// import './ChatSelection.css';
// import Navbar from '../Navbar';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ChatSelection = () => {
//   const navigate = useNavigate();
//   const [usernames, setUsernames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const backendUrl = "http://localhost:3000";

//   useEffect(() => {
//     const fetchUsernames = async () => {
//       try {
//         const username = localStorage.getItem('username') || '';
        
//         const response = await axios.post(`${backendUrl}/message/usercontacts`, 
//           { user: username },
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         if (response.data.success && Array.isArray(response.data.contacts)) {
//           // Extract just usernames from contacts
//           const extractedUsernames = response.data.contacts.map(contact => contact.username);
//           setUsernames(extractedUsernames);
//         } else {
//           setError('Invalid data format received');
//         }
//       } catch (err) {
//         console.error('Error fetching contacts:', err);
//         setError(err.response?.data?.message || 'Failed to load contacts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsernames();
//   }, []);

//   const handleUsernameClick = (username) => {
//     navigate(`/chat/${username}`);
//   };

//   if (loading) {
//     return (
//       <div className="chat-selection-container">
//         <Navbar />
//         <div className="loading-message">Loading usernames...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="chat-selection-container">
//         <Navbar />
//         <div className="error-message">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-selection-container">
//       <Navbar />
      
//       <div className="usernames-header">
//         <h2>Available Users</h2>
//         <span className="count">{usernames.length} users</span>
//       </div>

//       <div className="usernames-list">
//         {usernames.length > 0 ? (
//           usernames.map((username, index) => (
//             <div 
//               key={index} 
//               className="username-item"
//               onClick={() => handleUsernameClick(username)}
//             >
//               <div className="username-avatar">
//                 {username.charAt(0).toUpperCase()}
//               </div>
//               <span className="username-text">{username}</span>
//             </div>
//           ))
//         ) : (
//           <div className="no-usernames">No users available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSelection;