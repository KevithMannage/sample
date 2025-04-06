"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegMessage } from "react-icons/fa6";

const DiscussionDetail = () => {
  const [discussion, setDiscussion] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const discussionId = localStorage.getItem("discussionid"); 
  const username=localStorage.getItem("username");
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
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/discussion/${discussionId}/reply`,
        {
          message: newMessage,
          user_id: "user999", // Replace with actual authenticated user ID
          username:username,
          created_at:Date.now()
        }
      );
      setDiscussion(response.data); // Update discussion with new reply
      setNewMessage(""); // Clear input
    } catch (error) {
      console.error("Error adding reply:", error);
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
      </div>
    </div>
  );
};

export default DiscussionDetail;