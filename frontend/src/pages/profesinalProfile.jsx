import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ProfessionalProfile.css';
import profilePic from '../assets/developer1.jpg';
import Navbar from '../navbar';

const ProfessionalProfile = () => {
  const [profileData, setProfileData] = useState(null);

  // Uncomment this to fetch from backend later
  // useEffect(() => {
  //   axios.get('/api/users/profile') // Make sure this path matches your Express route
  //     .then((response) => setProfileData(response.data))
  //     .catch((error) => console.error('Error fetching profile data:', error));
  // }, []);

  // Temporary dummy data
  useEffect(() => {
    const dummyData = {
      user_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      contact_number: '+1234567890',
      role: 'Full Stack Developer',
      about_me: 'Passionate developer with experience in building scalable web applications using MERN stack.',
      interest_area: ['Web Development', 'AI', 'UI/UX Design'],
      university: 'Tech Valley University',
      degree: 'Bachelor of Science in Computer Science',
      job: 'Software Engineer at DevCorp',
      Skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express']
    };
    setProfileData(dummyData);
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="profile-wrapper">
      <Navbar />
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={profileData.profilePicture || profilePic}
            alt={profileData.user_name}
            className="profile-photo"
          />
          <div className="profile-info">
            <h1>{profileData.user_name}</h1>
            <p className="role-badge">{profileData.role}</p>
            <p className="email">{profileData.email}</p>
          </div>
        </div>

        <div className="profile-meta">
          <p><strong>Job</strong></p>
          <p>{profileData.job}</p>
          <p><strong>University</strong></p>
          <p>{profileData.university}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="active">About me</button>
        <button>Question</button>
        <button>Answer given</button>
      </div>

      <div className="profile-card">
        <h3>Academic Qualification</h3>
        <p>{profileData.degree}</p>
      </div>

      <div className="profile-card">
        <h3>About</h3>
        <p>{profileData.about_me}</p>
      </div>

      <div className="profile-skills">
        <div>
          <h4>Skills</h4>
          <div className="tag-group">
            {profileData.Skills.map((skill, index) => (
              <span key={index} className="tag">{skill}</span>
            ))}
          </div>
        </div>

        <div>
          <h4>Specialized Area</h4>
          <div className="tag-group">
            {profileData.interest_area.map((area, index) => (
              <span key={index} className="tag">{area}</span>
            ))}
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
