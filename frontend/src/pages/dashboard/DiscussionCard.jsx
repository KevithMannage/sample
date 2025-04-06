// "use client";
// import React, { useState, useEffect } from "react";
// import { FaRegMessage } from "react-icons/fa6";
// import { FaUserGroup } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom"; 

// const DiscussionContainer = () => {
//   const [items, setItems] = useState([]);
//   const [visible, setVisible] = useState(3);
//   const navigate = useNavigate(); 

//   const showMoreItems = () => {
//     setVisible((prevValue) => prevValue + 3);
//   };

//   const showLessItems = () => {
//     setVisible((prevValue) => Math.max(prevValue - 3, 3)); 
//   };

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, []);

//   const handleContinue = (id) => {
//     navigate(`/discussion/${id}`);
//   };

//   return (
//     <div className="mt-24 flex flex-col items-center justify-center w-full p-4 box-border min-w-[400px] bg-[#f0f8ff] rounded-[30px]">
//       <h1 className="text-2xl font-bold text-[#1E88E5] mb-5 text-center">🩵 Continue your Discussions</h1>
//       <h2 className="text-sm text-[#656565] mb-2 text-center">Explore Learn Enhanced</h2>
//       <div className="flex flex-wrap gap-4 justify-center w-full max-w-[1200px] bg-transparent p-5 rounded-[20px]">
//         {items.slice(0, visible).map((item) => (
//           <div
//             key={item.id}
//             className="flex-1 max-w-[calc(33.333%-1rem)] p-6 border border-[#ffffff] rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg hover:border-[#1e88e548] min-w-[300px] rounded-[35px]"
//           >
//             <div className="h-[60px] overflow-hidden">
//               <h4 className="text-lg font-bold text-[#1E88E5] mb-2 text-center">{item.title}</h4>
//             </div>
//             <div className="flex flex-col h-[200px] text-sm leading-6 text-[#656565]">
//               <div className="p-3 rounded bg-[rgba(255,255,255,0.2)]">
//                 <span>Admin : Christopher Walker</span>
//               </div>
//               <div className="flex items-center p-3  rounded bg-[rgba(255,255,255,0.2)]">
//                 <FaRegMessage className="ml-8" />
//                 <span className="text-xs ml-3">123 chats</span>
//                 <FaUserGroup className="ml-8" />
//                 <span className="text-xs ml-2">126,234</span>
//               </div>
//               <div className="p-3  rounded bg-[rgba(255, 255, 255, 0)]">
//                 <span>Started at | Nov 2nd, 2023</span>
//               </div>
//               <div className="flex justify-center mt-2">
//                 <button
//                   onClick={() => handleContinue(item.id)} 
//                   className="flex items-center justify-center font-medium text-sm px-4 py-2 text-white bg-[#19CD34] border-none shadow-md rounded-full transition-all duration-300 ease-in-out hover:shadow-lg active:shadow-sm max-w-[200px]"
//                 >
//                   Continue the Discussion
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-4 mt-4 justify-center w-full max-w-[1200px]">
//         {visible < items.length && (
//           <button
//             onClick={showMoreItems}
//             className="px-4 py-2 text-blue-600 rounded-md transition-all duration-300 ease-in-out text-center"
//           >
//             Load More {'>>'}
//           </button>
//         )}
//         {visible > 3 && (
//           <button
//             onClick={showLessItems}
//             className="px-4 py-2 text-blue-600 rounded-md transition-all duration-300 ease-in-out"
//           >
//             {'<<'} Show Less
//           </button>
//         )}
//       </div>
//       <div className="mt-4 text-sm text-gray-600">
//         Showing {Math.min(visible, items.length)} of {items.length} discussions
//       </div>
//     </div>
//   );
// };

// export default DiscussionContainer;


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegMessage, FaUserGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DiscussionContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(3);
  const navigate = useNavigate();

  const showMoreItems = () => setVisible((prev) => prev + 3);
  const showLessItems = () => setVisible((prev) => Math.max(prev - 3, 3));

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/discussion/getdiscussion");
        setItems(response.data.map(item => ({
          ...item,
          replies: item.replies || [], // make sure replies is always an array
        })));
        console.log(items);
        console.log("Fetched data:", response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching discussions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const handleContinue = (id) => {
    localStorage.setItem("discussionid",id);
    navigate(`/discussion/${id}`);
  };

  if (loading) {
    return (
      <div className="mt-24 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-24 text-center text-red-500">
        Error loading discussions: {error}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mt-24 text-center text-gray-500">
        No discussions available yet.
      </div>
    );
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-full p-4 box-border min-w-[400px] bg-[#f0f8ff] rounded-[30px]">
      <h1 className="text-2xl font-bold text-[#1E88E5] mb-2 text-center">🩵 Continue your Discussions</h1>
      <h2 className="text-sm text-[#656565] mb-5 text-center">Explore Learn Enhanced</h2>

      <div className="flex flex-wrap gap-4 justify-center w-full max-w-[1200px] p-5 rounded-[20px] bg-transparent">
        {items.slice(0, visible).map((item) => (
          <div
            key={item._id}
            className="flex-1 max-w-[calc(33.333%-1rem)] p-6 border border-[#ffffff] rounded-[35px] bg-white shadow-md hover:translate-y-[-5px] hover:shadow-lg hover:border-[#1e88e548] transition-all duration-300 ease-in-out min-w-[300px]"
          >
            <div className="h-[60px] overflow-hidden">
              <h4 className="text-lg font-bold text-[#1E88E5] mb-2 text-center">{item.topic}</h4>
            </div>
            <div className="flex flex-col h-[200px] text-sm leading-6 text-[#656565]">
              <div className="p-3 rounded bg-[rgba(255,255,255,0.2)]">
                <span>Started by: {item.username || "Unknown User"}</span>
              </div>
              <div className="flex items-center p-3 rounded bg-[rgba(255,255,255,0.2)]">
                <FaRegMessage className="ml-8" />
                <span className="text-xs ml-3">{item.replies?.length || 0} replies</span>
                <FaUserGroup className="ml-8" />
                <span className="text-xs ml-2">{item.participants || 0} participants</span>
              </div>
              <div className="p-3 rounded bg-transparent">
                <span>Started at: {new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleContinue(item._id)}
                  className="flex items-center justify-center font-medium text-sm px-4 py-2 text-white bg-[#19CD34] shadow-md rounded-full transition-all duration-300 hover:shadow-lg active:shadow-sm max-w-[200px]"
                >
                  Continue the Discussion
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 justify-center w-full max-w-[1200px]">
        {visible < items.length && (
          <button
            onClick={showMoreItems}
            className="px-4 py-2 text-blue-600 rounded-md hover:bg-blue-50 transition-all"
          >
            Load More {'>>'}
          </button>
        )}
        {visible > 3 && (
          <button
            onClick={showLessItems}
            className="px-4 py-2 text-blue-600 rounded-md hover:bg-blue-50 transition-all"
          >
            {'<<'} Show Less
          </button>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing {Math.min(visible, items.length)} of {items.length} discussions
      </div>
    </div>
  );
};

export default DiscussionContainer;
