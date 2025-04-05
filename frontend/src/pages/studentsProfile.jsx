import React from 'react';
import '../ProfessionalProfile.css';
import profilePic from '../assets/developer1.jpg'; // Replace with the correct path to the image
import Navbar from '../Navbar';

const ProfessionalProfile = () => {
  return (
    <div className="profile-wrapper">
      <div><Navbar/></div>
      <div className="profile-header">
        <div className="profile-left">
          <img src={profilePic} alt="Jake Harper" className="profile-photo" />
          <div className="profile-info">
            <h1>Mannage Kevith</h1>
            <p className="role-badge">Student</p>
            <p className="email">mannagekevith@gmail.com</p>
          </div>
        </div>

      <div className="profile-meta">
        <p><strong>Involvements</strong> </p>
        <p>University of ABC</p>
        <p><strong>Specialisation</strong></p>
        <p>Bachelor of IT</p>
      </div>
    </div>


      <div className="profile-tabs">
        <button className="active">About me</button>
        <button>My Questions</button>
        <button> My Answer</button>
      </div>

     

      <div className="profile-card">
        <h3>About</h3>
        <p>
            Excited to share that 12 teams have made it to the finals in the highly competitive event 
            organized by the BSc in IT program at the University of Moratuwa! This milestone reflects 
            the incredible talent, innovation, and teamwork of all participants. Stay tuned for more 
            updates as these exceptional teams prepare to showcase their skills in the grand finals!
        </p>
      </div>

      <div className="profile-skills">
        <div>
          <h4>Skills</h4>
          <div className="tag-group">
            <span className="tag">Figma</span>
            <span className="tag">Javascript</span>
            <span className="tag">Java</span>
            <span className="tag">React Js</span>
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
