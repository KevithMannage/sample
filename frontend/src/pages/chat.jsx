// // import React, { useState, useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import { io } from 'socket.io-client';
// // import './chat.css'; // Import your chat styles
// // import { Link } from 'react-router-dom';
// // import { FaArrowLeft } from 'react-icons/fa';

// // import Navbar from '../Navbar';

// // const SOCKET_URL = "http://localhost:3000";

// // const Chat = () => {
// //   const [sender, setSender] = useState('');
// //   const [receiver, setReceiver] = useState('');
// //   const [messages, setMessages] = useState([]);
// //   const [text, setText] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [senderImage, setSenderImage] = useState(null);
// //   const [receiverImage, setReceiverImage] = useState(null);
// //   const socket = useRef(null);
// //   const messagesEndRef = useRef(null);

// //   // Initialize sender and receiver
// //   useEffect(() => {
// //     const initializeUsers = () => {
// //       const username = localStorage.getItem('username');
// //       const contact = localStorage.getItem('contact');
// //       setSender(username || '');
// //       setReceiver(contact || '');
// //     };
// //     initializeUsers();
// //   }, []);

// //   // Setup socket connection
// //   useEffect(() => {
// //     socket.current = io(SOCKET_URL, {
// //       reconnection: true,
// //       reconnectionAttempts: 5,
// //     });

// //     socket.current.on('receiveMessage', (message) => {
// //       setMessages((prev) => [...prev, message]);
// //     });

// //     return () => {
// //       socket.current.disconnect();
// //     };
// //   }, []);

// //   // Fetch chat messages from the server
// //   const fetchMessages = async () => {
// //     if (!sender || !receiver) return;
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(`${SOCKET_URL}/message/getMessages`, null, {
// //         params: { sender, receiver },
// //       });
// //       setMessages(response.data || []);
// //     } catch (error) {
// //       console.error('Error fetching messages:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Send a message
// //   const sendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim()) return;

// //     const message = {
// //       sender,
// //       receiver,
// //       text,
// //       timestamp: new Date(),
// //     };

// //     try {
// //       await axios.post(`${SOCKET_URL}/message/sendMessage`, message);
// //       socket.current.emit('sendMessage', message);
// //       setText('');
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }
// //   };

// //   // Fetch messages when sender/receiver are set
// //   useEffect(() => {
// //     if (sender && receiver) {
// //       fetchMessages();
// //     }
// //   }, [sender, receiver]);

// //   // Scroll to bottom when new messages arrive
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   if (loading) {
// //     return <div className="loader">Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       <Navbar />

// //     <div
// //       className="messaging-container"
// //       style={{ backgroundImage: `url(/images/messages.png)` }}
// //     >
      
// //       <h1 className="header">Messaging</h1>
// //       <div className="messages-list">
// //         {messages.map((item) => {
// //           const isSender = item.sender === sender;
// //           const profileImage = isSender ? senderImage : receiverImage;

// //           return (
// //             <div
// //               key={item._id || item.timestamp}
// //               className={`message-container ${isSender ? 'sender' : 'receiver'}`}
// //             >
// //               <div className={`message-header ${isSender ? 'sender-header' : ''}`}>
// //                 {profileImage && (
// //                   <img src={profileImage} alt="profile" className="profile-image" />
// //                 )}
// //                 <span className="message-sender">{item.sender}</span>
// //               </div>
// //               <p className="message-text">{item.text}</p>
// //               <span className="message-timestamp">
// //                 {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
// //               </span>
// //             </div>
// //           );
// //         })}
// //         <div ref={messagesEndRef} />
// //       </div>
// //       <form onSubmit={sendMessage} className="input-container">
// //         <input
// //           type="text"
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           placeholder="Type a message..."
// //           className="message-input"
// //         />
// //         <button type="submit" className="send-button">Send</button>
// //       </form>
// //     </div>

// //     </div>
// //   );
// // };

// // export default Chat;
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import './chat.css'; // Import your chat styles
// import { Link } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SOCKET_URL = "http://localhost:3000";

// const Chat = () => {
//   const [sender, setSender] = useState('');
//   const [receiver, setReceiver] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [senderImage, setSenderImage] = useState(null);
//   const [receiverImage, setReceiverImage] = useState(null);
//   const socket = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Initialize sender and receiver
//   useEffect(() => {
//     const initializeUsers = () => {
//       const username = localStorage.getItem('username');
//       const contact = localStorage.getItem('contact');
//       setSender(username || '');
//       setReceiver(contact || '');
//     };
//     initializeUsers();
//   }, []);

//   // Setup socket connection
//   useEffect(() => {
//     socket.current = io(SOCKET_URL, {
//       reconnection: true,
//       reconnectionAttempts: 5,
//     });

//     socket.current.on('receiveMessage', (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, []);

//   // Fetch chat messages from the server
//   const fetchMessages = async () => {
//     if (!sender || !receiver) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(`${SOCKET_URL}/message/getMessages`, null, {
//         params: { sender, receiver },
//       });
//       setMessages(response.data || []);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Send a message
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     const message = {
//       sender,
//       receiver,
//       text,
//       timestamp: new Date(),
//     };

//     try {
//       await axios.post(`${SOCKET_URL}/message/sendMessage`, message);
//       socket.current.emit('sendMessage', message);
//       setText('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   // Fetch messages when sender/receiver are set
//   useEffect(() => {
//     if (sender && receiver) {
//       fetchMessages();
//     }
//   }, [sender, receiver]);

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   if (loading) {
//     return <div className="loader">Loading...</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div
//         className="messaging-container"
//         style={{ backgroundImage: `url(/images/messages.png)` }}
//       >
//         {/* Back Arrow Button */}
//         <Link 
//           to="/messages" 
//           className="flex items-center text-blue-700 hover:text-blue-900 mb-4 ml-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Messages
//         </Link>

//         <h1 className="header">Messaging</h1>
//         <div className="messages-list">
//           {messages.map((item) => {
//             const isSender = item.sender === sender;
//             const profileImage = isSender ? senderImage : receiverImage;

//             return (
//               <div
//                 key={item._id || item.timestamp}
//                 className={`message-container ${isSender ? 'sender' : 'receiver'}`}
//               >
//                 <div className={`message-header ${isSender ? 'sender-header' : ''}`}>
//                   {profileImage && (
//                     <img src={profileImage} alt="profile" className="profile-image" />
//                   )}
//                   <span className="message-sender">{item.sender}</span>
//                 </div>
//                 <p className="message-text">{item.text}</p>
//                 <span className="message-timestamp">
//                   {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
//                 </span>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>
//         <form onSubmit={sendMessage} className="input-container">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type a message..."
//             className="message-input"
//           />
//           <button type="submit" className="send-button">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './chat.css'; // Import your chat styles
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../Navbar';

const SOCKET_URL = "http://localhost:3000";

const Chat = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [senderImage, setSenderImage] = useState(null);
  const [receiverImage, setReceiverImage] = useState(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize sender and receiver
  useEffect(() => {
    const initializeUsers = () => {
      const username = localStorage.getItem('username');
      const contact = localStorage.getItem('contact');
      setSender(username || '');
      setReceiver(contact || '');
    };
    initializeUsers();
  }, []);

  // Setup socket connection
  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.current.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Fetch chat messages from the server
  const fetchMessages = async () => {
    if (!sender || !receiver) return;
    setLoading(true);
    try {
      const response = await axios.post(`${SOCKET_URL}/message/getMessages`, null, {
        params: { sender, receiver },
      });
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const message = {
      sender,
      receiver,
      text,
      timestamp: new Date(),
    };

    try {
      await axios.post(`${SOCKET_URL}/message/sendMessage`, message);
      socket.current.emit('sendMessage', message);
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch messages when sender/receiver are set
  useEffect(() => {
    if (sender && receiver) {
      fetchMessages();
    }
  }, [sender, receiver]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div
        className="messaging-container"
        style={{ backgroundImage: `url(/images/messages.png)` }}
      >
        {/* Back Arrow Button */}
        <Link 
          to="/messages" 
          className="back-link flex items-center text-blue-700 hover:text-blue-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Messages
        </Link>

        <h1 className="header">Messaging</h1>
        <div className="messages-list">
          {messages.map((item) => {
            const isSender = item.sender === sender;
            const profileImage = isSender ? senderImage : receiverImage;

            return (
              <div
                key={item._id || item.timestamp}
                className={`message-container ${isSender ? 'sender' : 'receiver'}`}
              >
                <div className={`message-header ${isSender ? 'sender-header' : ''}`}>
                  {profileImage && (
                    <img src={profileImage} alt="profile" className="profile-image" />
                  )}
                  <span className="message-sender">{item.sender}</span>
                </div>
                <p className="message-text">{item.text}</p>
                <span className="message-timestamp">
                  {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;