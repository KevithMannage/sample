// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import Navbar from '../Navbar';

// const PostDetails = () => {
//   const [post, setPost] = useState(null);
//   const postId = localStorage.getItem("postid");
//   const backendUrl = "http://localhost:3000";

//   useEffect(() => {
//     // Fetch post data from the API
//     axios
//       .get(`${backendUrl}/post/${postId}`)
//       .then((response) => {
//         setPost(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching post:", error);
//       });
//   }, [postId]);

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="post-details-container max-w-4xl mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg space-y-6">
//         {/* Back Arrow Button */}
//         <Link 
//           to="/dashboard" 
//           className="flex items-center text-blue-700 hover:text-blue-900 mb-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Dashboard
//         </Link>

//         <h1 className="text-3xl font-bold text-blue-700 border-b pb-2">{post.title}</h1>

//         {/* Image Display */}
//         {post.image && (
//           <div className="text-center">
//             <img
//               src={`${backendUrl}/${post.image.replace('./', '')}`}
//               alt={post.title}
//               className="max-w-full h-auto rounded-lg shadow-md mx-auto"
//             />
//           </div>
//         )}

//         <div className="text-gray-700">
//           <strong className="block text-gray-900 font-semibold mb-1">Related Area:</strong>
//           <p className="pl-4">{post.related_area.join(", ")}</p>
//         </div>

//         <div className="text-gray-700">
//           <strong className="block text-gray-900 font-semibold mb-1">Content:</strong>
//           <p className="pl-4 whitespace-pre-line">{post.content}</p>
//         </div>

//         <div className="text-gray-700">
//           <strong className="block text-gray-900 font-semibold mb-1">Author:</strong>
//           <p className="pl-4">{post.author_name}</p>
//         </div>

//         <div className="text-gray-700">
//           <strong className="block text-gray-900 font-semibold mb-1">Reference Links:</strong>
//           <ul className="list-disc list-inside pl-4 text-blue-600 space-y-1">
//             {post.reference_links.map((link, index) => (
//               <li key={index}>
//                 <a
//                   href={link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:underline"
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../Navbar";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const postId = localStorage.getItem("postid");
  const backendUrl = "https://devthonbackend-production.up.railway.app"; // Use https://devthonbackend-production.up.railway.app for production

  useEffect(() => {
    // Fetch post data
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendUrl}/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    // Fetch related posts
    const fetchRelatedPosts = async () => {
      try {
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
          console.error("Invalid post ID");
          return;
        }
        const response = await axios.post(`${backendUrl}/post/getrelatedpost`, {
          topicId: postId, // Use topicId as the key
        });
        if (response.data.status) {
          setRelatedPosts(response.data.data);
        } else {
          console.error("Failed to load related posts");
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchPost();
    fetchRelatedPosts();
  }, [postId]);

  const handleExplorePost = (relatedId) => {
    localStorage.setItem("postid", relatedId);
    window.location.reload(); // Reload to fetch the new post
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      {/* Related Posts (Left Sidebar) */}
      <div className="fixed top-28 left-0 w-80 bg-white p-6 shadow-lg border-r border-gray-200 h-[calc(100vh-112px)] overflow-y-auto">
        <h3 className="text-xl font-bold text-blue-700 mb-6">Related Posts</h3>
        {relatedPosts.length > 0 ? (
          <ul className="space-y-4">
            {relatedPosts.map((related) => (
              <li
                key={related._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="text-md font-semibold text-gray-800 mb-2">{related.title}</h4>
                <p className="text-sm text-gray-600 mb-1">By: {related.author_name}</p>
                
                <button
                  onClick={() => handleExplorePost(related._id)}
                  className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition-colors duration-200"
                >
                  Explore
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No related posts found.</p>
        )}
      </div>

      {/* Main Content */}
      <div className="ml-80 w-full">
        <div className="post-details-container max-w-4xl mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg space-y-6">
          {/* Back Arrow Button */}
          <Link
            to="/dashboard"
            className="flex items-center text-blue-700 hover:text-blue-900 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-blue-700 border-b pb-2">{post.title}</h1>

          {/* Image Display */}
          {post.image && (
            <div className="text-center">
              <img
                src={`${backendUrl}/${post.image.replace("./", "")}`}
                alt={post.title}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              />
            </div>
          )}

          <div className="text-gray-700">
            <strong className="block text-gray-900 font-semibold mb-1">Related Area:</strong>
            <p className="pl-4">{post.related_area.join(", ")}</p>
          </div>

          <div className="text-gray-700">
            <strong className="block text-gray-900 font-semibold mb-1">Content:</strong>
            <p className="pl-4 whitespace-pre-line">{post.content}</p>
          </div>

          <div className="text-gray-700">
            <strong className="block text-gray-900 font-semibold mb-1">Author:</strong>
            <p className="pl-4">{post.author_name}</p>
          </div>

          <div className="text-gray-700">
            <strong className="block text-gray-900 font-semibold mb-1">Reference Links:</strong>
            <ul className="list-disc list-inside pl-4 text-blue-600 space-y-1">
              {post.reference_links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;