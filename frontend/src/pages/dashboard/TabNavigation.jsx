// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const TabNavigation = () => {
//   const [items, setItems] = useState([]);
//   const [visible, setVisible] = useState(20); 
//   const [activeTab, setActiveTab] = useState("myPosts"); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab); 
//     setVisible(20); 
//   };

//   const handleContinue = (id) => {
//     navigate(`/discussion/${id}`); 
//   };

//   const showMoreItems = () => {
//     setVisible((prevValue) => prevValue + 20); 
//   };

//   const showLessItems = () => {
//     setVisible((prevValue) => Math.max(prevValue - 20, 20));
//   };

//   return (
//     <div className="mt-2 flex flex-col items-center justify-center w-full p-4 box-border min-w-[400px] bg-[#f0f8ff] rounded-[30px]">
//       <span className="text-2xl font-bold text-[#1E88E5] mb-5 self-start"> 📫 Posts</span>


//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => handleTabClick("myPosts")}
//           className={`px-4 py-2 rounded-full ${
//             activeTab === "myPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           My Posts
//         </button>
//         <button
//           onClick={() => handleTabClick("allPosts")}
//           className={`px-4 py-2 rounded-full ${
//             activeTab === "allPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           All Posts
//         </button>
//       </div>

//       <div className="w-full">
//         {items
//           .filter((item) => (activeTab === "myPosts" ? item.userId === 1 : true)) 
//           .slice(0, visible) 
//           .map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center p-4 mb-2 border border-gray-300 rounded-lg bg-white shadow-md"
//             >
//               <div>
//                 <h4 className="text-lg font-bold text-[#1E88E5]">{item.title}</h4>
//                 <p className="text-sm text-gray-600">{item.body}</p>
//               </div>
//               <button
//                 onClick={() => handleContinue(item.id)}
//                 className="px-4 py-2 text-white bg-[#1E88E5] rounded-full shadow-md hover:bg-[#0056b3]"
//               >
//                 Explore
//               </button>
//             </div>
//           ))}
//       </div>

//       <div className="flex gap-4 mt-4">
//         {visible < items.filter((item) => (activeTab === "myPosts" ? item.userId === 1 : true)).length && (
//           <button
//             onClick={showMoreItems}
//             className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
//           >
//             Load More
//           </button>
//         )}
//         {visible > 20 && (
//           <button
//             onClick={showLessItems}
//             className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
//           >
//             Show Less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TabNavigation;


// "use client";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const TabNavigation = () => {
//   const [items, setItems] = useState([]);
//   const [visible, setVisible] = useState(20);
//   const [activeTab, setActiveTab] = useState("myPosts");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Using axios to fetch posts from your backend
//     axios
//       .get("http://localhost:3000/post/getpost")
//       .then((response) => {
//         setItems(response.data.posts); // Assuming the response contains 'posts'
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setVisible(20);
//   };

//   const handleContinue = (id) => {
//     console.log(id);
//     localStorage.setItem("postid",id);
//     navigate(`/post/${id}`);
//   };

//   const showMoreItems = () => {
//     setVisible((prevValue) => prevValue + 20);
//   };

//   const showLessItems = () => {
//     setVisible((prevValue) => Math.max(prevValue - 20, 20));
//   };

//   return (
//     <div className="mt-2 flex flex-col items-center justify-center w-full p-4 box-border min-w-[400px] bg-[#f0f8ff] rounded-[30px]">
//       <span className="text-2xl font-bold text-[#1E88E5] mb-5 self-start"> 📫 Posts</span>

//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => handleTabClick("myPosts")}
//           className={`px-4 py-2 rounded-full ${
//             activeTab === "myPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           My Posts
//         </button>
//         <button
//           onClick={() => handleTabClick("allPosts")}
//           className={`px-4 py-2 rounded-full ${
//             activeTab === "allPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           All Posts
//         </button>
//       </div>

//       <div className="w-full">
//         {items
//           .filter((item) => (activeTab === "myPosts" ? item.userId === 1 : true))
//           .slice(0, visible)
//           .map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center p-4 mb-2 border border-gray-300 rounded-lg bg-white shadow-md"
//             >
//               <div>
//                 <h4 className="text-lg font-bold text-[#1E88E5]">{item.title}</h4>
//                 <p className="text-sm text-gray-600">{item.body}</p>
//               </div>
//               <button
//                 onClick={() => handleContinue(item._id)}
//                 className="px-4 py-2 text-white bg-[#1E88E5] rounded-full shadow-md hover:bg-[#0056b3]"
//               >
//                 Explore
//               </button>
//             </div>
//           ))}
//       </div>

//       <div className="flex gap-4 mt-4">
//         {visible < items.filter((item) => (activeTab === "myPosts" ? item.userId === 1 : true)).length && (
//           <button
//             onClick={showMoreItems}
//             className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
//           >
//             Load More
//           </button>
//         )}
//         {visible > 20 && (
//           <button
//             onClick={showLessItems}
//             className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
//           >
//             Show Less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TabNavigation;


"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TabNavigation = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(20);
  const [activeTab, setActiveTab] = useState("myPosts");
  const navigate = useNavigate();

  // Fetching posts from the backend
  useEffect(() => {
    axios
      .get("https://devthonbackend-production.up.railway.app/post/getpost")
      .then((response) => {
        setItems(response.data.posts); // Assuming the response contains 'posts'
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setVisible(20);
  };

  const handleContinue = (id) => {
    console.log(id);
    localStorage.setItem("postid", id); // Storing post ID for future reference
    navigate(`/post/${id}`);
  };

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 20);
  };

  const showLessItems = () => {
    setVisible((prevValue) => Math.max(prevValue - 20, 20));
  };

  // Get the username from localStorage
  const currentUsername = localStorage.getItem("username");

  return (
    <div className="mt-2 flex flex-col items-center justify-center w-full p-4 box-border min-w-[400px] bg-[#f0f8ff] rounded-[30px]">
      <span className="text-2xl font-bold text-[#1E88E5] mb-5 self-start"> 📫 Posts</span>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleTabClick("myPosts")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "myPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => handleTabClick("allPosts")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "allPosts" ? "bg-[#1E88E5] text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          All Posts
        </button>
      </div>

      <div className="w-full">
        {items
          .filter((item) => (activeTab === "myPosts" ? item.username === currentUsername : true)) // Filter by current username
          .slice(0, visible)
          .map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 mb-2 border border-gray-300 rounded-lg bg-white shadow-md"
            >
              <div>
                <h4 className="text-lg font-bold text-[#1E88E5]">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
              <button
                onClick={() => handleContinue(item._id)}
                className="px-4 py-2 text-white bg-[#1E88E5] rounded-full shadow-md hover:bg-[#0056b3]"
              >
                Explore
              </button>
            </div>
          ))}
      </div>

      <div className="flex gap-4 mt-4">
        {visible < items.filter((item) => (activeTab === "myPosts" ? item.username === currentUsername : true)).length && (
          <button
            onClick={showMoreItems}
            className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
          >
            Load More
          </button>
        )}
        {visible > 20 && (
          <button
            onClick={showLessItems}
            className="px-4 py-2 text-white bg-[#1E88E5] rounded-md shadow-md hover:bg-[#0056b3]"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
