import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your page components
import LoginPage from './Login';
import Dashboard from './Dashboard';
import AboutUs from './pages/AboutUs';
 import ContactUs from './pages/ContactUs';
 import Discussion from './pages/Discussion';
 import Messages from './pages/Message';
 import NewDiscussion from './pages/NewDiscussion';
 import ProfesinalProfile from './pages/profesinalProfile';
 import StudentlProfile from './pages/studentsProfile';
 import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import ProfessionalLoginPage from './Professionallogin';
import Usersignuppage from './Usersignup';
import Professionsignuppage from './Proffesionsignup';
import Chat from './pages/chat';
import CreatePostForm from './pages/CreatePostForm';
import DiscussionDetail from './pages/discussiondetails';
import PostDetails from './pages/postdetails';

import { FaRegFileCode } from 'react-icons/fa';
import Search from './pages/search';
const App = () => {
  return (
    <Router>
      <div className="app">
      
        <main className="main-content">
          <Routes>
          <Route path="/" element={<LoginPage/>} />
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/dashboard" element={<Dashboard/>} />
             <Route path="/chatbot" element={<Chatbot/>} />
             <Route path="/professional_login" element={<ProfessionalLoginPage/>} />
             <Route path="/usersignup" element={<Usersignuppage/>} />
             <Route path="/professionsignup" element={<Professionsignuppage/>} />
             <Route path="/aboutus" element={<AboutUs/>} />
             <Route path="/contactus" element={<ContactUs/>} /> 
             <Route path="/discussion" element={<Discussion/>} />
             <Route path="/messages" element={<Messages/>} />
             <Route path="/newdiscussion" element={<NewDiscussion/>} />
             <Route path="/profesinalProfile" element={<ProfesinalProfile/>} />
             <Route path="/chat" element={<Chat/>} />
             <Route path="/createpostforum" element={<CreatePostForm/>} />
             <Route path="/studentProfile" element={<StudentlProfile/>} />
             <Route path="/discussion/:id" element={<DiscussionDetail />} />
             <Route path="/post/:id" element={<PostDetails />} />
             <Route path="/home" element={<Home/>} />
             <Route path="/search" element={<Search/>} />
             

 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;