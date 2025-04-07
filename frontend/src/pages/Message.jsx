// import React, { useState, useEffect } from 'react';
// import './Message.css';
// import Navbar from '../Navbar';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ChatBot from "./Chatbot";


// const ChatSelection = () => {
//   const navigate = useNavigate();
//   const [usernames, setUsernames] = useState([]);
//   const [filteredUsernames, setFilteredUsernames] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const backendUrl = "http://localhost:3000"; // Replace with your actual backend URL

//   useEffect(() => {
//     const fetchUsernames = async () => {
//       try {
//         const username = localStorage.getItem('username') || '';
//         const response = await axios.post(`${backendUrl}/message/usercontacts`, 
//           { user: username },
//           {
//             headers: { 'Content-Type': 'application/json' }
//           }
//         );
//         if (response.data.success && Array.isArray(response.data.contacts)) {
//           const extractedUsernames = response.data.contacts.map(contact => contact.username);
//           setUsernames(extractedUsernames);
//           // Initially show only first 5 contacts
//           setFilteredUsernames(extractedUsernames.slice(0, 5));
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

//   // Handle search functionality
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = usernames
//       .filter(username => username.toLowerCase().includes(term))
//       .slice(0, 5); // Limit to 5 even after filtering
//     setFilteredUsernames(filtered);
//   };

//   const handleUsernameClick = (username) => {
//     localStorage.setItem("contact", username);
//     navigate(`/chat`);
//   };

//   if (loading) {
//     return (
//       <div className="chat-selection-container">
//         <Navbar />
//         <div className="loading-message">Loading contacts...</div>
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
//     <>
//     <Navbar/>
//     <div className="chat-selection-container mt-16">

//       {/* Contacts List */}
//       <div className="contacts-list w-64 h-300">

//         {/* Search Input */}
//         <div className="search-container" style={{ marginBottom: '25px' }}>
//           <input
//             type="text"
//             placeholder="Search contacts..."
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{
//               width: '100%',
//               padding: '8px',
//               borderRadius: '4px',
//               border: '1px solid #ccc',
//               fontSize: '14px'
//             }}
//           />
//         </div>

//         {filteredUsernames.length > 0 ? (
//           filteredUsernames.map((contact, index) => (
//             <div key={index} className="contact" onClick={() => handleUsernameClick(contact)}>
//               <img
//                 src={contact.avatar || "https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain"}
//                 alt="User Avatar"
//                 className="contact-avatar"
//               />
//               <span className="contact-name">{contact || `Contact ${index + 1}`}</span>
//             </div>
//           ))
//         ) : (
//           <div className="no-contacts">No matching contacts found</div>
//         )}

//       </div>

//       {/* Chat Placeholder */}
//       <div className="chat-placeholder">
//         <img
//           src="images/messages.png"
//           alt="Chat Illustration"
//           className="chat-illustration"
//         />
//         <p className="chat-prompt">Select chat to message</p>
//         <ChatBot/>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ChatSelection;

import React, { useState, useEffect } from 'react';
import './Message.css';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatBot from "./Chatbot";

const ChatSelection = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]); // Changed to store full contact objects
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = "http://localhost:3000"; // Replace with your actual backend URL

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const username = localStorage.getItem('username') || '';
        const response = await axios.post(`${backendUrl}/message/usercontacts`, 
          { user: username },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        
        if (response.data.success && Array.isArray(response.data.contacts)) {
          // Store the full contact objects (assuming they contain username and profileImage)
          setContacts(response.data.contacts);
          // Initially show only first 5 contacts
          setFilteredContacts(response.data.contacts.slice(0, 5));
          
          // Optionally: Preload profile images
          response.data.contacts.forEach(contact => {
            if (contact.profileImage) {
              const img = new Image();
              img.src = contact.profileImage.startsWith('http') 
                ? contact.profileImage 
                : `${backendUrl}/${contact.profileImage}`;
            }
          });
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

    fetchContacts();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = contacts
      .filter(contact => contact.username.toLowerCase().includes(term))
      .slice(0, 5); // Limit to 5 even after filtering
    setFilteredContacts(filtered);
  };

  const handleContactClick = (contact) => {
    localStorage.setItem("contact", contact.username);
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
    <>
      <Navbar/>
      <div className="chat-selection-container mt-16">
        {/* Contacts List */}
        <div className="contacts-list w-64 h-300">
          {/* Search Input */}
          <div className="search-container" style={{ marginBottom: '25px' }}>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <div 
                key={index} 
                className="contact" 
                onClick={() => handleContactClick(contact)}
              >
                <img
                  src={
                    contact.profileImage
                      ? contact.profileImage.startsWith('http')
                        ? contact.profileImage
                        : `${backendUrl}/${contact.profileImage}`
                      : "images/profile.png"
                  }
                  alt={`${contact.username}'s avatar`}
                  className="contact-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain";
                  }}
                />
                <span className="contact-name">{contact.username || `Contact ${index + 1}`}</span>
              </div>
            ))
          ) : (
            <div className="no-contacts">No matching contacts found</div>
          )}
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
    </>
  );
};

export default ChatSelection;