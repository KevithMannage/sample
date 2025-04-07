"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const postId=localStorage.getItem("postid");
  useEffect(() => {
    // Fetch post data from the API
    axios
      .get(`http://localhost:3000/post/${postId}`)
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
<div className="post-details-container max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg space-y-6">
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

  <div className="text-gray-700">
    <strong className="block text-gray-900 font-semibold mb-1">Replies:</strong>
    {post.replies.length > 0 ? (
      <ul className="list-decimal list-inside pl-4 space-y-1">
        {post.replies.map((reply, index) => (
          <li key={index}>{reply || "No message"}</li>
        ))}
      </ul>
    ) : (
      <p className="italic pl-4">No replies yet</p>
    )}
  </div>
</div>

  );
};

export default PostDetails;
