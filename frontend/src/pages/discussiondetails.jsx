

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaRegMessage, FaArrowLeft } from "react-icons/fa6"; // Added FaArrowLeft for the back button
// import { useNavigate } from "react-router-dom"; // Added useNavigate for navigation
// import Navbar from "../Navbar";

// const DiscussionDetail = () => {
//   const [discussion, setDiscussion] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const discussionId = localStorage.getItem("discussionid");
//   const username = localStorage.getItem("username");
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     // Fetch the specific discussion
//     axios
//       .get(`http://localhost:3000/discussion/${discussionId}`)
//       .then((response) => {
//         setDiscussion(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching discussion:", error);
//       });
//   }, []);

//   const handleAddMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/discussion/${discussionId}/reply`,
//         {
//           message: newMessage,
//           user_id: "user999", // Replace with actual authenticated user ID
//           username: username,
//           created_at: Date.now(),
//         }
//       );
//       setDiscussion(response.data); // Update discussion with new reply
//       setNewMessage(""); // Clear input
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   };

//   // Function to navigate back to the discussion page
//   const handleBack = () => {
//     navigate("/dashboard"); // Adjust the route based on your app's routing structure
//   };

//   if (!discussion) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="pt-24 pb-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <div className="w-full max-w-3xl mb-4">
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200"
//           >
//             <FaArrowLeft className="text-lg" />
//             <span>Back to Discussions</span>
//           </button>
//         </div>

//         {/* Discussion Topic Header */}
//         <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 bg-blue-50 px-6 py-4 rounded-3xl shadow-sm text-center max-w-3xl w-full mb-6">
//           {discussion.topic}
//         </h1>

//         {/* Discussion Container */}
//         <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
//           {/* Discussion Metadata */}
//           <div className="mb-6">
//             <p className="text-sm text-gray-600">
//               Started by: <span className="font-medium">{discussion.username}</span>
//             </p>
//             <p className="text-sm text-gray-600">
//               Created: <span className="font-medium">{new Date(discussion.created_at).toLocaleString()}</span>
//             </p>
//             <p className="text-lg sm:text-xl text-gray-800 mt-4 leading-relaxed">
//               {discussion.starting_message}
//             </p>
//           </div>

//           {/* Replies Section */}
//           <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">Replies</h3>
//           <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//             {discussion.replies.map((reply, index) => (
//               <div
//                 key={index}
//                 className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <p className="text-sm sm:text-base text-gray-700">{reply.message}</p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   By: <span className="font-medium">{reply.user_id}</span> |{" "}
//                   {new Date(reply.created_at).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Reply Form */}
//           <form onSubmit={handleAddMessage} className="mt-8 flex gap-3">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Add your message..."
//               className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
//             />
//             <button
//               type="submit"
//               className="px-4 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
//             >
//               <FaRegMessage className="text-lg" />
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DiscussionDetail;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegMessage } from "react-icons/fa6";

const DiscussionDetail = () => {
  const [discussion, setDiscussion] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const discussionId = localStorage.getItem("discussionid");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    // Fetch the specific discussion
    axios
      .get(`http://localhost:3000/discussion/${discussionId}`)
      .then((response) => {
        setDiscussion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussion:", error);
      });

    // Check if the user is already subscribed to this discussion
    const discussionIds = JSON.parse(sessionStorage.getItem("discussionIds")) || [];
    setIsSubscribed(discussionIds.includes(discussionId));
  }, [discussionId]);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/discussion/${discussionId}/reply`,
        {
          message: newMessage,
          user_id: userId,
          username: username,
          created_at: Date.now(),
        }
      );
      setDiscussion(response.data); // Update discussion with new reply
      setNewMessage(""); // Clear input
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/notifications/subscribe`, {
        user_id: userId,
        discussion_id: discussionId,
      });

      if (response.status === 200) {
        console.log("Subscribed successfully!");
        setIsSubscribed(true);

        // Update session storage with the new subscription
        const discussionIds = JSON.parse(sessionStorage.getItem("discussionIds")) || [];
        discussionIds.push(discussionId);
        sessionStorage.setItem("discussionIds", JSON.stringify(discussionIds));
      }
    } catch (error) {
      console.error("Error subscribing to discussion:", error);
    }
  };

  if (!discussion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-full p-4 box-border min-w-[300px]">
      <h1 className="text-xl font-bold text-red-500 mb-2 text-center bg-red-100 p-4 rounded-[30px] min-w-[300px]">
        {discussion.topic}
      </h1>
      <div className="w-full max-w-[800px] bg-red-50 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <p className="text-sm text-[#656565]">Started by: {discussion.username}</p>
          <p className="text-sm text-[#656565]">
            Created: {new Date(discussion.created_at).toLocaleString()}
          </p>
          <p className="text-lg mt-2">{discussion.starting_message}</p>
        </div>
        <h3 className="text-lg font-bold text-[#FF0000] mb-2">Replies</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {discussion.replies.map((reply, index) => (
            <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm">{reply.message}</p>
              <p className="text-xs text-[#656565]">
                By: {reply.user_id} | {new Date(reply.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddMessage} className="mt-6 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Add your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#FF0000] rounded-full hover:bg-red-600"
          >
            <FaRegMessage />
          </button>
        </form>

        {/* Subscribe Button */}
        <div className="mt-6">
          {isSubscribed ? (
            <button
              className="px-4 py-2 text-white bg-green-500 rounded-full cursor-not-allowed"
              disabled
            >
              Subscribed
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Subscribe to Discussion
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;