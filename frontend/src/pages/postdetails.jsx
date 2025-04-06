"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const postId = "67f22dc588e867e58079107d"; // The post ID in your example

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
    <div className="post-details-container p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="related-area">
        <strong>Related Area: </strong>
        {post.related_area.join(", ")}
      </div>
      <div className="content">
        <strong>Content: </strong>
        <p>{post.content}</p>
      </div>
      <div className="author-name">
        <strong>Author: </strong>
        {post.author_name}
      </div>
      <div className="reference-links">
        <strong>Reference Links: </strong>
        <ul>
          {post.reference_links.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="replies">
        <strong>Replies: </strong>
        {post.replies.length > 0 ? (
          <ul>
            {post.replies.map((reply, index) => (
              <li key={index}>{reply || "No message"}</li>
            ))}
          </ul>
        ) : (
          <p>No replies yet</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
