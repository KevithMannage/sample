// App.js
import React from 'react';
import './Discussion.css';
import Navbar from '../Navbar'

const App = () => {
  return (
    <div className="discussion-page">
      <Navbar />
    <div className="container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>How to Find a Job that Matches Your Qualifications</h2>
          <div className="admin-info">
            <span className="admin-name">Admin: Christopher Walker</span>
            <div className="admin-stats">
              <span className="stat">💬 123 new messages</span>
              <span className="stat">👀 126,234</span>
            </div>
          </div>
          <p className="started-date">Started at | Nov 2nd, 2023</p>
          <button className="close-discussion-btn">Close the Discussion</button>
        </div>

        <ul>
          <li>Job Search Strategies - Best methods for job openings that match your skills</li>
          <li>Online Job Portals - How to use LinkedIn, Indeed, and other job sites effectively</li>
          <li className="active">Interview Preparation - Common questions and how to answer them</li>
          <li>Career Planning & Goal Setting - Aligning job searches with long-term career goals</li>
          <li>How to Find a Job that Matches Your Qualifications</li>
        </ul>

        <button className="close-discussion-btn bottom">SUBSCRIBE Selected Discussion</button>    
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="avatar"
            />
            <div>
              <h3>Resume Writing Tips</h3>
              <p>HOW TO CRAFT A RESUME THAT HIGHLIGHTS YOUR QUALIFICATIONS, START BY...</p>
            </div>
          </div>
        
        </div>

        {/* Job Description Section */}
        <div className="section">
          <h3>Daniel Reynolds - Software Engineer</h3>
          <p>
            <strong>The High-Five Hiring Co.</strong> is seeking a talented Software Engineer to join our innovative team. In this role, you will design, develop, and maintain high-quality software solutions that drive our business forward. You will collaborate with cross-functional teams to define, design, and ship new features while ensuring the performance, quality, and responsiveness of applications.
          </p>
          <p>
            Key responsibilities include writing clean, scalable code using languages such as Java, Python, or C++; debugging and resolving technical issues; and participating in code reviews to maintain high standards. The ideal candidate should have a Bachelor’s degree in Computer Science or a related field, 3+ years of experience in software development, and strong problem-solving skills. Familiarity with Agile methodologies and tools like Git, Docker, or Kubernetes is a plus.
          </p>
          <p>
            We offer a competitive salary, comprehensive benefits, and opportunities for growth in a supportive, dynamic environment. If you’re passionate about technology and eager to make an impact, apply today!
          </p>
        </div>

        {/* User Query Section */}
        <div className="section">
          <h3>Emily Dawson - Marketing Manager</h3>
          <p>
            <strong>Applicant Tracking Systems (ATS)</strong> are software used by employers to filter and rank job applications based on keywords, skills, and experience. To optimize your resume for ATS, ensure it includes relevant keywords from the job description, uses a clean and simple format, and avoids graphics or tables that might confuse the system. Use standard section headings like "Work Experience" and "Education" to ensure readability. At ATS fine-tuning, submitting your resume to a Word or PDF document improves readability.
          </p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-6 rounded-l-lg">
        <span className="transform rotate-90 block text-lg font-semibold">Chat</span>
      </div>
    </div>
    </div>
  );
};

export default App;

