

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../ProfessionalProfile.css';
import profilePic from '../assets/developer1.jpg';
import Navbar from '../Navbar';

const ProfessionalProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    userName: '',
    email: '',
    mobile: '',
    role: '',
    aboutme: '',
    skills: [],
    interestArea: [],
    university: '',
    degree: '',
    job: '',
    profilePicture: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/grtprofile?userId=${userId}`
        );
        setProfileData(response.data);
        setEditFormData({
          userName: response.data.userName || '',
          email: response.data.email || '',
          mobile: response.data.mobile || '',
          role: response.data.role || '',
          aboutme: response.data.aboutme || '',
          skills: response.data.skills || [],
          interestArea: response.data.interestArea || [],
          university: response.data.university || '',
          degree: response.data.degree || '',
          job: response.data.job || '',
          profilePicture: response.data.profilePicture || ''
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userid");
    navigate('/login');
  };

  const handlesave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/user/updateuser',
        { userId, ...editFormData }
      );
      setProfileData(response.data.user);
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to update profile'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditFormData({
      userName: profileData.userName || '',
      email: profileData.email || '',
      mobile: profileData.mobile || '',
      role: profileData.role || '',
      aboutme: profileData.aboutme || '',
      skills: profileData.skills || [],
      interestArea: profileData.interestArea || [],
      university: profileData.university || '',
      degree: profileData.degree || '',
      job: profileData.job || '',
      profilePicture: profileData.profilePicture || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !editFormData.skills.includes(newSkill.trim())) {
      setEditFormData({
        ...editFormData,
        skills: [...editFormData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditFormData({
      ...editFormData,
      skills: editFormData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleInterestAdd = () => {
    if (newInterest.trim() && !editFormData.interestArea.includes(newInterest.trim())) {
      setEditFormData({
        ...editFormData,
        interestArea: [...editFormData.interestArea, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const handleInterestRemove = (interestToRemove) => {
    setEditFormData({
      ...editFormData,
      interestArea: editFormData.interestArea.filter(interest => interest !== interestToRemove)
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({
          ...editFormData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/profile/updateprofile?userId=${userId}`,
        editFormData
      );
      setProfileData(response.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!profileData) return <div className="no-data">No profile data found</div>;

  return (
    <div className="profile-wrapper">
      <Navbar />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="profile-header">
            <div className="profile-left">
              <div className="profile-photo-edit">
                <img
                  src={editFormData.profilePicture || profilePic}
                  alt={editFormData.userName}
                  className="profile-photo"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = profilePic;
                  }}
                />
                <input
                  type="file"
                  id="profile-picture-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-picture-upload" className="upload-button">
                  Change Photo
                </label>
              </div>
              <div className="profile-info">
                <input
                  type="text"
                  name="userName"
                  value={editFormData.userName}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Full Name"
                  required
                />
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={handleInputChange}
                  className="edit-select"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Academic">Academic</option>
                </select>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Email"
                  required
                />
                <input
                  type="tel"
                  name="contactNumber"
                  value={editFormData.mobile}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Contact Number"
                />
              </div>
            </div>

            <div className="profile-meta">
              <div className="meta-item">
                <strong>Job</strong>
                <input
                  type="text"
                  name="job"
                  value={editFormData.job}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Job Title"
                />
              </div>
              <div className="meta-item">
                <strong>University</strong>
                <input
                  type="text"
                  name="university"
                  value={editFormData.university}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="University"
                />
              </div>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-card">
              <h3>Academic Qualification</h3>
              <input
                type="text"
                name="degree"
                value={editFormData.degree}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Degree"
              />
            </div>

            <div className="profile-card">
              <h3>About</h3>
              <textarea
                name="aboutme"
                value={editFormData.aboutme}
                onChange={handleInputChange}
                className="edit-textarea"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
          </div>

          <div className="profile-skills">
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="tag-input-group">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="tag-input"
                  placeholder="Add skill"
                />
                <button type="button" onClick={handleSkillAdd} className="tag-add-button">
                  Add
                </button>
              </div>
              <div className="tag-group">
                {editFormData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleSkillRemove(skill)} 
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h4>Specialized Area</h4>
              <div className="tag-input-group">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="tag-input"
                  placeholder="Add interest area"
                />
                <button type="button" onClick={handleInterestAdd} className="tag-add-button">
                  Add
                </button>
              </div>
              <div className="tag-group">
                {editFormData.interestArea.map((area, index) => (
                  <span key={index} className="tag">
                    {area}
                    <button 
                      type="button" 
                      onClick={() => handleInterestRemove(area)} 
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="edit-button-container">
            <button type="submit" onClick={handlesave} className="save-button">Save Changes</button>
            <button type="button" onClick={handleCancelClick} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-left">
              <img
                src={profileData.profilePicture || profilePic}
                alt={profileData.userName}
                className="profile-photo"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = profilePic;
                }}
              />
              <div className="profile-info">
                <h1>{profileData.userName}</h1>
                <p className="role-badge">{profileData.role}</p>
                <p className="email">{profileData.email}</p>
                <p className="contact">{profileData.mobile}</p>
              </div>
            </div>

            <div className="profile-meta">
              <div className="meta-item">
                <strong>Job</strong>
                <p>{profileData.job || 'Not specified'}</p>
              </div>
              <div className="meta-item">
                <strong>University</strong>
                <p>{profileData.university || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <button className="active">About me</button>
            <button>Questions</button>
            <button>Answers</button>
          </div>

          <div className="profile-section">
            <div className="profile-card">
              <h3>Academic Qualification</h3>
              <p>{profileData.degree || 'Not specified'}</p>
            </div>

            <div className="profile-card">
              <h3>About</h3>
              <p>{profileData.aboutme || 'No description provided'}</p>
            </div>
          </div>

          <div className="profile-skills">
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="tag-group">
                {profileData.skills?.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <span key={index} className="tag">{skill}</span>
                  ))
                ) : (
                  <p>No skills listed</p>
                )}
              </div>
            </div>

            <div className="skills-section">
              <h4>Specialized Area</h4>
              <div className="tag-group">
                {profileData.interestArea?.length > 0 ? (
                  profileData.interestArea.map((area, index) => (
                    <span key={index} className="tag">{area}</span>
                  ))
                ) : (
                  <p>No specialized areas listed</p>
                )}
              </div>
            </div>
          </div>

          <div className="edit-button-container">
            <button onClick={handleEditClick} className="edit-button">
              Edit Profile
            </button>
          </div>
          <div style={{ textAlign: 'right', margin: '10px 0' }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#A31D1D',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

ProfessionalProfile.propTypes = {
  profileData: PropTypes.shape({
    userName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    role: PropTypes.string,
    aboutme: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    interestArea: PropTypes.arrayOf(PropTypes.string),
    university: PropTypes.string,
    degree: PropTypes.string,
    job: PropTypes.string,
    profilePicture: PropTypes.string
  })
};

export default ProfessionalProfile;