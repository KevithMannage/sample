"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Make sure to import this
import { FaArrowLeft } from "react-icons/fa"; // We'll use react-icons for the arrow icon
import Navbar from '../Navbar';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const postId = localStorage.getItem("postid");
  const backendUrl="https://devthonbackend-production.up.railway.app"

  useEffect(() => {
    // Fetch post data from the API
    axios
      .get(`${backendUrl}/post/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
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
  );
};

export default PostDetails;