import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
// Import your page components
import LoginPage from './Login';
import Dashboard from './Dashboard';
import AboutUs from './pages/AboutUs';
 import ContactUs from './pages/ContactUs';
 import Discussion from './pages/Discussion';
 import Messages from './pages/Message';
 import NewDiscussion from './pages/NewDiscussion';
 import Profile from './pages/profesinalProfile';
 import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import ProfessionalLoginPage from './Professionallogin';
import Usersignuppage from './usersignup';
import Professionsignuppage from './Proffesionsignup';
import { FaRegFileCode } from 'react-icons/fa';
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
             <Route path="/profile" element={<Profile/>} />
             <Route path="/home" element={<Home/>} />
 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;