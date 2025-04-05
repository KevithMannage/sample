import React from 'react';
import '../ProfessionalProfile.css';
import profilePic from '../assets/developer1.jpg'; // Replace with the correct path to the image
import Navbar from '../navbar';

const ProfessionalProfile = () => {
  return (
    <div className="profile-wrapper">
      <div><Navbar/></div>
      <div className="profile-header">
        <div className="profile-left">
          <img src={profilePic} alt="Jake Harper" className="profile-photo" />
          <div className="profile-info">
            <h1>Jake Harper</h1>
            <p className="role-badge">Resource person</p>
            <p className="email">jake@gmail.com</p>
          </div>
        </div>

      <div className="profile-meta">
        <p><strong>Involvements</strong> </p>
        <p>CEO of Bug and Fix</p>
        <p><strong>Specialisation</strong></p>
        <p> PHD in Data Science</p>
      </div>
    </div>


      <div className="profile-tabs">
        <button className="active">About me</button>
        <button>Quection</button>
        <button>Answer given</button>
      </div>

      <div className="profile-card">
        <h3>Academic Qualification</h3>
        <p>BSc Engineering Computer Science and Engineering.</p>
        <p>MSc in Moratuwa University, Sri Lanka.</p>
        <p>152 researcher papers are published.</p>
      </div>

      <div className="profile-card">
        <h3>About</h3>
        <p>
          The Department of Computer Science and Engineering at the University of Moratuwa, Sri Lanka,
          continues to make strides in academic excellence and research innovation. Offering both
          BSc in Engineering (Computer Science and Engineering) and MSc programs, the department
          empowers students with advanced technical knowledge and practical skills. Notably, it has
          achieved an impressive milestone with the publication of 152 research papers, showcasing
          groundbreaking work in areas such as AI, data science, robotics, and cybersecurity.
        </p>
      </div>

      <div className="profile-skills">
        <div>
          <h4>Skills</h4>
          <div className="tag-group">
            <span className="tag">Lecture</span>
            <span className="tag">Leader</span>
            <span className="tag">Java</span>
            <span className="tag">React Js</span>
          </div>
        </div>

        <div>
          <h4>Specialized Area</h4>
          <div className="tag-group">
            <span className="tag">Full Stack Development</span>
            <span className="tag">Machine Learning</span>
            <span className="tag">Data Science</span>
            <span className="tag">Generative AI</span>
          </div>
        </div>
      </div>
   
      <div className="edit-button-container">
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
