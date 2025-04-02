import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
// Import your page components
import LoginPage from './Login';
import Dashboard from './Dashboard';
const App = () => {
  return (
    <Router>
      <div className="app">
      
        <main className="main-content">
          <Routes>
          <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
           
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;