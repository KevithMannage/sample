import React, { useState } from "react";
import Navbar from '../Navbar';
import axios from 'axios';
import ChatBot from "./Chatbot";

export default function CreatePostForm() {
 const username= localStorage.getItem("username");
  const [formData, setFormData] = useState({
    title: "",
    related_area: [""],
    content: "",
    author_name: "",
    reference_links: [""],
    replies: ["", ""], // Sample replies, adjust as needed
    username: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({ ...formData, [name]: updatedArray });
  };

  const addArrayItem = (name) => {
    setFormData({ ...formData, [name]: [...formData[name], ""] });
  };

  const removeArrayItem = (name, index) => {
    const updatedArray = formData[name].filter((_, i) => i !== index);
    setFormData({ ...formData, [name]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: formData.title,
      related_area: formData.related_area, // Assuming one related area for simplicity
      content: formData.content,
      author_name: formData.author_name,
      reference_links: formData.reference_links, // Assuming one reference link
      replies: formData.replies,
      username: username
    };
  

    try {
      // Make the POST request to the server
      const response = await axios.post("http://localhost:3000/post/createpost", postData);
      console.log("Post created successfully:", response.data);
     
      if (response.data.status==="ok"){
        console.log(response.data.status);
        setFormData({
          title: "",
          related_area: [""],
          content: "",
          author_name: "",
          reference_links: [""],
          replies: ["", ""], // Sample replies, adjust as needed
          username: ""
        });
      
        
    }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20 p-6 border rounded-2xl shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block font-medium mb-1">Related Areas</label>
            {formData.related_area.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <select
                  value={item}
                  onChange={(e) => handleArrayChange("related_area", index, e.target.value)}
                  className="w-full mt-1 border p-2 rounded"
                >
                  <option value="">-- Select an Area --</option>
                  <option value="Frontend">Web Development</option>
                  <option value="Backend">Data Base</option>
                  <option value="DevOps">DevOps</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Security">Security</option>
                  <option value="Testing">Testing</option>
                  <option value="Networking">Networking</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="AI">AI</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Game Development">Game Development</option>
                  <option value="AR/VR">AR/VR</option>
                  <option value="Robotics">Robotics</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeArrayItem("related_area", index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("related_area")}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              + Add Area
            </button>
          </div>

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            style={{ height: "200px" }}
            className="w-full border p-2 rounded"
          />

          <input
            name="author_name"
            placeholder="Author Name"
            value={formData.author_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block font-medium">Reference Links</label>
            {formData.reference_links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  value={link}
                  onChange={(e) => handleArrayChange("reference_links", index, e.target.value)}
                  placeholder={`Link #${index + 1}`}
                  className="w-full mt-1 border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("reference_links", index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("reference_links")}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              + Add Link
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded mt-4"
          >
            Submit Post
          </button>
        </form>
      </div>
      <ChatBot />
    </div>
  );
}
