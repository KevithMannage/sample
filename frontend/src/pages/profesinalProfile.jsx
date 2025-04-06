import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../ProfessionalProfile.css';
import profilePic from '../assets/developer1.jpg'; // Replace with the correct path to the image
import Navbar from '../navbar';


const ProfessionalProfile = () => {
  // Define state to store profile data
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data when the component mounts
  useEffect(() => {
    // Make GET request to your backend
    axios.get('../backend/Routes/profileRoute/profile') // Adjust this path if needed
      .then((response) => {
        setProfileData(response.data); // Set the profile data
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []); // Empty dependency array means it runs only once when the component mounts

  if (!profileData) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="profile-wrapper">
      <div><Navbar /></div>
      <div className="profile-header">
        <div className="profile-left">
          {/* Use dynamic image and data */}
          <img
            src={profileData.profilePicture || profilePic} // Use fallback image if not available
            alt={profileData.name || 'Profile Picture'}
            className="profile-photo"
          />
          <div className="profile-info">
            <h1>{profileData.name}</h1> {/* Dynamic name */}
            <p className="role-badge">{profileData.role}</p> {/* Dynamic role */}
            <p className="email">{profileData.email}</p> {/* Dynamic email */}
          </div>
        </div>

        <div className="profile-meta">
          <p><strong>Involvements</strong></p>
          <p>{profileData.involvements}</p> {/* Dynamic involvement */}
          <p><strong>Specialisation</strong></p>
          <p>{profileData.specialisation}</p> {/* Dynamic specialisation */}
        </div>
      </div>

      <div className="profile-tabs">
        <button className="active">About me</button>
        <button>Question</button>
        <button>Answer given</button>
      </div>

      <div className="profile-card">
        <h3>Academic Qualification</h3>
        <p>{profileData.academicQualification}</p> {/* Dynamic academic qualification */}
      </div>

      <div className="profile-card">
        <h3>About</h3>
        <p>{profileData.about}</p> {/* Dynamic about */}
      </div>

      <div className="profile-skills">
        <div>
          <h4>Skills</h4>
          <div className="tag-group">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="tag">{skill}</span> // Dynamically render skills
            ))}
          </div>
        </div>

        <div>
          <h4>Specialized Area</h4>
          <div className="tag-group">
            {profileData.specializedArea.map((area, index) => (
              <span key={index} className="tag">{area}</span> // Dynamically render specialized areas
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
