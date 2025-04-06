"use client";
import React, { useState, useEffect } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; 

const TrendingItem = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setItems(data.slice(0, 7))); 
  }, []);

  const handleJoinDiscussion = (id) => {
    navigate(`/discussion/${id}`); 
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-full p-4 box-border min-w-[300px] rounded-[30px]">
      <h1 className="text-xl font-bold text-red-500 mb-2 text-center bg-red-100 p-4 rounded-[30px] min-w-[300px]"> ⚡ Top Discussion ⚡</h1>
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-[1200px] bg-transparent p-5 rounded-[20px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-1 max-w-[calc(33.333%-1rem)] p-6 border border-[#ffffff] rounded-lg shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg hover:border-[#FF000048] min-w-[300px] rounded-[35px] bg-red-50"
          >
            <div className="h-[60px] overflow-hidden">
              <h4 className="text-lg font-bold text-[#FF0000] mb-2 text-center">{item.title}</h4>
            </div>
            <div className="flex flex-col h-[200px] text-sm leading-6 text-[#656565]">
              <div className="p-3 rounded bg-[rgba(255,255,255,0.2)]">
                <span>Admin : Christopher Walker</span>
              </div>
              <div className="p-3 rounded bg-[rgba(255,255,255,0.2)]">
                <span>Started at | Nov 2nd, 2023</span>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleJoinDiscussion(item.id)} 
                  className="flex items-center justify-center font-medium text-sm px-4 py-2 text-white bg-[#FF0000] border-none shadow-md rounded-full transition-all duration-300 ease-in-out hover:shadow-lg active:shadow-sm max-w-[200px]"
                >
                  Join the Discussion
                </button>
              </div>
              <div className="flex items-center p-3 rounded bg-[rgba(255,255,255,0.2)]">
                <FaRegMessage className="ml-5" />
                <span className="text-xs ml-3">123 chats</span>
                <FaUserGroup className="ml-8" />
                <span className="text-xs ml-2">126,234</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingItem;