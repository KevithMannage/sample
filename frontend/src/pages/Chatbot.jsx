import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef(null); // Reference for the chat container

  const toggleChat = () => {
    if (!isOpen) {
      // Add a default message when the chat is opened
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Hello! How can I assist you today?' },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: inputMessage },
    ]);
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: data.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    }
  };

  // Scroll to the bottom of the chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen ? (
        <div className="bg-[#1e90ff] to-purple-600 shadow-2xl rounded-2xl w-96 h-[32rem] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-white">GuidelineX Chatbot⚡ </h2>
            <button onClick={toggleChat} className="text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="flex-1 p-4 overflow-y-auto bg-white rounded-none"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'min-w-24 text-center bg-blue-200 text-black rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl rounded-br-none'
                      : 'bg-green-200 text-gray-700 rounded-bl-3xl rounded-tl-none rounded-tr-3xl rounded-br-3xl'
                  }`}
                >
                  {<ReactMarkdown>{msg.text}</ReactMarkdown>}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-100 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-[#1e90ff] text-white rounded-full p-5 shadow-2xl hover:opacity-90 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;