
// import React from 'react';
// import Navbar from '../Navbar';

// function NotificationsPage() {
//   const notifications = [
//     {
//       id: 1,
//       title: 'Message Notify',
//       text: 'Explore your friends.',
//       read: false
//     },
//     {
//       id: 2,
//       title: 'Security Notification',
//       text: 'Turn on two factor authentication for increase security.',
//       read: false
//     },
//     {
//       id: 3,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     },
//     {
//       id: 4,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     },
//     {
//       id: 5,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     },
//     {
//       id: 6,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     },
//     {
//       id: 7,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     },
//     {
//       id: 8,
//       title: 'Notification Title',
//       text: 'Here\'s notification text.',
//       read: false
//     }
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-blue-50">
//       {/* Keep the original Navbar */}
//       <Navbar />
    
//       {/* Main Content - Enhanced with light blue theme */}
//       <main className="flex-grow p-6 bg-blue-50">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
//           {/* Tabs - Enhanced with light blue colors */}
//           <div className="flex border-b border-blue-100">
//             <button className="px-8 py-4 font-medium border-b-2 border-blue-500 text-blue-600 bg-blue-50 transition-colors duration-200">All</button>
//             <button className="px-8 py-4 font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200">Read</button>
//             <button className="px-8 py-4 font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200">Unread</button>
//           </div>

//           {/* Notifications - Enhanced with light blue accents */}
//           <div className="divide-y divide-blue-100">
//             {notifications.map((notification) => (
//               <div key={notification.id} className="flex items-center justify-between py-5 px-6 hover:bg-blue-50 transition-colors duration-200">
//                 <div className="flex items-center">
//                   <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-sm">
//                     <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-blue-600 text-lg">{notification.title}</h3>
//                     <p className="text-gray-600">{notification.text}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex justify-center items-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200">
//                     <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
//                     </svg>
//                   </div>
//                   <button className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 shadow-sm">Options</button>
//                   <button className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 shadow-sm">Clear</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Chatbot widget - Enhanced with blue theme */}
//       <div className="fixed bottom-6 right-6">
//         <div className="bg-blue-600 rounded-full shadow-lg p-4 cursor-pointer hover:bg-blue-700 transition-colors duration-200">
//           <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NotificationsPage;


import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl="https://devthonbackend-production.up.railway.app"

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]); // State to store fetched notifications
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get discussionIds from session storage
        const discussionIds = JSON.parse(sessionStorage.getItem('discussionIds')) || [];

        if (discussionIds.length === 0) {
          console.warn('No discussion IDs found in session storage.');
          setLoading(false);
          return;
        }

        // Fetch data for each discussionId
        const fetchedNotifications = await Promise.all(
          discussionIds.map(async (id) => {
            const response = await axios.get(`${backendUrl}/discussion/${id}`);
            return response.data; // Return the discussion data
          })
        );

        setNotifications(fetchedNotifications); // Update state with fetched notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNotifications();
  }, []);

  const handleViewDiscussion = (id) => {
    navigate(`/discussion/${id}`); // Redirect to the discussion details page
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 mt-16">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-6 bg-blue-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
          {/* Tabs */}
          <div className="flex border-b border-blue-100">
            <button className="px-8 py-4 font-medium border-b-2 border-blue-500 text-blue-600 bg-blue-50 transition-colors duration-200">
              All
            </button>
          </div>

          {/* Notifications */}
          <div className="divide-y divide-blue-100">
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-600">No notifications found.</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-center justify-between py-5 px-6 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="bg-[#1e90ff] p-3 rounded-lg mr-4 shadow-sm">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-600 text-lg">{notification.topic}</h3>
                      <p className="text-gray-600">{notification.starting_message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleViewDiscussion(notification._id)} // Pass the discussion ID
                      className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotificationsPage;