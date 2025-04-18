// import React, { useState } from 'react';
// import { MessageCircle, Users, Home, MessageSquare, Search, Bell, ChevronRight, Info, HelpCircle } from 'lucide-react';
// import Navbar from '../Navbar'; // Fixed import (PascalCase)
// import ChatBot from "./Chatbot";

// const NewDiscussion = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [question, setQuestion] = useState('');

//   return (
//     <div className="flex-col h-screen bg-gray-70">
//       <Navbar /> {/* Fixed component name */}

//       {/* Main Content */}
//       <main className="tp-80 flex flex-1 overflow-hidden p-10"> {/* Added p-10 for padding (10px) */}

//         {/* Left Sidebar */}
//        {/* Left Sidebar */}
// <div className="w-64 bg-white border-r border-gray-200 bg-blue-50 p-6"> {/* Increased width & padding */}
//   <div className="bg-white rounded shadow p-6 mb-6">
//     <h3 className="text-blue-500 text-lg font-semibold mb-2">Untitled</h3> {/* Changed style */}
//     <p className="text-sm text-gray-600 mb-3">Admin: <span className="font-medium">John Walker</span></p>
    
//     <div className="flex items-center text-sm text-blue-500 font-medium mb-3"> 
//       <MessageCircle className="w-4 h-4 mr-2" />
//       <span>0 messages</span>
//     </div>
    
//     <p className="text-sm text-gray-500 mb-4">Started on Nov 2nd, 2023</p>
    
//     <button className="w-full bg-red-500 text-white text-sm py-3 rounded-full hover:bg-red-600 transition-all">
//       Start the Discussion
//     </button>
//   </div>
  
//   <div className="mb-6">
//     <p className="text-lg text-blue-600 font-semibold mb-2">Related Conversation</p>
//     <p className="text-md text-gray-500 italic">None</p>
//   </div>
  
//   <button className="w-full bg-green-500 text-white text-md py-3 rounded-full hover:bg-green-600 transition-all">
//     Create New Conversation
//   </button>
// </div>

        
//         {/* Main Form Area */}
//        {/* Main Form Area */}
// <div className="flex-1 p-6">
//   <div className="w-5.5/6 mx-auto bg-blue-50 p-12 rounded shadow"> {/* Increased max width */}
//     <div className="mb-6">
//       <label className="block text-blue-500 text-lg font-semibold mb-2 w-full">Enter the title for your Discussion</label>
//       <input 
//         type="text" 
//         className="w-full border border-gray-300 rounded p-3 text-lg"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//     </div>

//     <div className="mb-6">
//       <label className="block text-blue-500 text-lg font-semibold mb-2 w-full">Enter the Description about your Conversation</label>
//       <input 
//         type="text" 
//         className="w-full border border-gray-300 rounded p-3 text-lg"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//     </div>

//     <div className="mb-6">
//       <label className="block text-blue-500 text-lg font-semibold mb-2 w-full">Enter the first question</label>
//       <input 
//         type="text" 
//         className="w-full border border-gray-300 rounded p-3 text-lg"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//     </div>

//     <div className="flex justify-between gap-4 mb-6">
//       <button className="w-full bg-blue-500 text-white px-3 py-3 text-lg rounded-full hover:bg-blue-600 transition-all">
//         Start the Discussion
//       </button>
//       <button className="w-full bg-red-500 text-white px-6 py-3 text-lg rounded-full hover:bg-red-600 transition-all">
//         Cancel
//       </button>
//     </div>

//     {/* Tips Section */}
//     <div className="bg-blue-100 rounded-lg p-6 max-w-2xl mx-auto">
//       <p className="text-center text-blue-800 text-lg font-semibold mb-4">Tips on getting good answers quickly</p>
//       <ol className="space-y-3 text-blue-800 text-lg pl-6">
//         <li>✔ Make sure your question has not been asked already</li>
//         <li>✔ Keep your question short and to the point</li>
//         <li>✔ Double check grammar and spelling</li>
//       </ol>
//     </div>
//   </div>
// </div>

        
//         {/* Chat Button */}
// {/* Chat Button */}
// <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-6 rounded-l-lg">
//   <span className="transform rotate-90 block text-lg font-semibold">Chat</span>
// </div>

//       </main>
      
        
//       <ChatBot />
//     </div>
    
//   );
// };

// export default NewDiscussion;
import React, { useState } from 'react';
import { MessageCircle, Users, Home, MessageSquare, Search, Bell, ChevronRight, Info, HelpCircle } from 'lucide-react';
import Navbar from '../Navbar';
import ChatBot from "./Chatbot";

const NewDiscussion = () => {
  const [description, setDescription] = useState('');
  const [question, setQuestion] = useState('');
  const [relatedAreas, setRelatedAreas] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const backendUrl = "https://devthonbackend-production.up.railway.app";

  const handleStartDiscussion = async () => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const user_id = localStorage.getItem('userid');

    const discussionData = {
      topic: description,
      related_areas: relatedAreas.split(',').map(area => area.trim()),
      starting_message: question,
      role,
      username,
      user_id
    };

    try {
      const response = await fetch(`${backendUrl}/discussion/creatediscussion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discussionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Discussion created successfully ✅If someone replies to your question, we will notify you', result);
        setSuccessMessage('Discussion created successfully ✅If someone replies to your question, we will notify you');
        setDescription('');
        setQuestion('');
        setRelatedAreas('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to create discussion:', response.status);
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  return (
    <div className="flex-col ">
      <Navbar />
      <main className=" flex flex-1 overflow-hidden p-6 md:p-12">
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-[#ebf8ff] p-10 rounded-3xl shadow-2xl border border-blue-100 ">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center font-semibold">
                {successMessage}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-[#1e90ff] text-lg font-bold mb-2">
                Enter the Description about your Conversation
              </label>
              <input
                type="text"
                className="w-full border border-blue-300 rounded-xl p-4 text-base focus:ring-4 focus:ring-blue-100 shadow-md hover:shadow-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#1e90ff] text-lg font-bold mb-2">
                Enter Related Areas (comma separated)
              </label>
              <input
                type="text"
                className="w-full border border-blue-300 rounded-xl p-4 text-base focus:ring-4 focus:ring-blue-100 shadow-md hover:shadow-lg"
                value={relatedAreas}
                onChange={(e) => setRelatedAreas(e.target.value)}
                placeholder="e.g. Technology, Science, AI"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate areas with commas. Example: Technology, Science, AI
              </p>
              {relatedAreas && (
                <div className="mt-3">
                  <p className="text-sm text-blue-600 font-medium">Parsed Areas:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {relatedAreas.split(',').map((area, index) => (
                      <span
                        key={index}
                        className="bg-[#1e90ff]/10 text-[#1e90ff] text-sm px-3 py-1 rounded-full border border-[#1e90ff]/30"
                      >
                        {area.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#1e90ff] text-lg font-bold mb-2">
                Enter the First Question
              </label>
              <input
                type="text"
                className="w-full border border-blue-300 rounded-xl p-4 text-base focus:ring-4 focus:ring-blue-100 shadow-md hover:shadow-lg"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
              <button
                className="w-full bg-[#1e90ff] text-white px-6 py-3 text-lg font-semibold rounded-full shadow hover:brightness-110 transition-all"
                onClick={handleStartDiscussion}
              >
                Start the Discussion
              </button>
              <button
                className="w-full bg-red-500 text-white px-6 py-3 text-lg font-semibold rounded-full shadow hover:bg-red-600 transition-all"
              >
                Cancel
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto text-center">
              <p className="text-green text-lg font-semibold mb-4">
                💡 Tips for Great Questions
              </p>
              <ol className="list-disc list-inside space-y-2 text-green-900 text-base text-left">
                <li>Make sure your question hasn’t been asked already</li>
                <li>Keep it clear and concise</li>
                <li>Check your grammar and spelling</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default NewDiscussion;
