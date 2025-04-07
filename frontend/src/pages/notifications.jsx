import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]); // State to store fetched notifications
  const [loading, setLoading] = useState(true); // State to handle loading

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
            const response = await axios.get(`http://localhost:3000/discussion/${id}`);
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

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
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
                    <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-sm">
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
                    <button className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 shadow-sm">
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