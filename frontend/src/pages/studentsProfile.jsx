

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
  const [activeTab, setActiveTab] = useState('About me');
  const [discussions, setDiscussions] = useState([]);
  const [posts, setPosts] = useState([]); // New state for posts
  const [discussionLoading, setDiscussionLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false); // New state for post loading
  const backendUrl = "https://devthonbackend-production.up.railway.app";
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
  const [photoPreview, setPhotoPreview] = useState(null);

  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username"); // Retrieve username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError("No user ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile for userId:', userId);
        const response = await axios.get(
          `${backendUrl}/profile/grtprofile?userId=${userId}`
        );
        console.log('Profile response:', response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          setError("Empty profile data received from server");
        } else {
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
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const fetchUserDiscussions = async () => {
    try {
      setDiscussionLoading(true);
      const response = await axios.post(
        `${backendUrl}/discussion/getuserdiscussion`,
        { username }
      );
      setDiscussions(response.data.discussions || []);
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError(err.message || 'Failed to fetch discussions');
    } finally {
      setDiscussionLoading(false);
    }
  };

  // New function to fetch user posts
  const fetchUserPosts = async () => {
    if (!username) {
      setError("No username found in localStorage");
      return;
    }

    try {
      setPostLoading(true);
      const response = await axios.post(
        'http://localhost:3000/post/getuserpost', // Using localhost as specified
        { username }
      );
      console.log('Posts response:', response.data);
      setPosts(response.data.posts || []); // Assuming the response has a 'posts' field
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
    } finally {
      setPostLoading(false);
    }
  };

  

  const handleDeleteposts = async (postId) => {
    try {
      await axios.post(`${backendUrl}/post/deletepost`, { id: postId });
      fetchUserDiscussions();
    } catch (err) {
      console.error('Error deleting discussion:', err);
      setError(err.message || 'Failed to delete discussion');
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    try {
      await axios.post(`${backendUrl}/discussion/delete`, { id: discussionId });
      fetchUserDiscussions();
    } catch (err) {
      console.error('Error deleting discussion:', err);
      setError(err.message || 'Failed to delete discussion');
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handlesave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/user/updateuser`,
        { userId, ...editFormData }
      );
      setProfileData(response.data.user);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setPhotoPreview(null);
    setEditFormData({
      userName: profileData?.userName || '',
      email: profileData?.email || '',
      mobile: profileData?.mobile || '',
      role: profileData?.role || '',
      aboutme: profileData?.aboutme || '',
      skills: profileData?.skills || [],
      interestArea: profileData?.interestArea || [],
      university: profileData?.university || '',
      degree: profileData?.degree || '',
      job: profileData?.job || '',
      profilePicture: profileData?.profilePicture || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !editFormData.skills.includes(newSkill.trim())) {
      setEditFormData({ ...editFormData, skills: [...editFormData.skills, newSkill.trim()] });
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
      setPhotoPreview(URL.createObjectURL(file));
      uploadProfilePhoto(file);
    }
  };

  const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post(`${backendUrl}/photo/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newPhotoUrl = response.data.photo.path;
      localStorage.setItem("profileimage", newPhotoUrl);
      setEditFormData({ ...editFormData, profilePicture: newPhotoUrl });
      setProfileData({ ...profileData, profilePicture: newPhotoUrl });
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'Failed to upload photo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlesave();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Questions') {
      fetchUserDiscussions();
    } else if (tab === 'Answers') {
      fetchUserPosts(); // Fetch posts when "Other" tab is selected
    }
  };

  const handleExploreClick = (discussionId) => {
    navigate(`/discussion/${discussionId}`);
  };

  const handleExploreClickposts = (postId) => {
    navigate(`/post/${postId}`);
  };


  

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return (
    <div className="error-message">
      Error: {error}
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
  if (!profileData) return (
    <div className="no-data">
      No profile data found
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );

  return (
    <div className="profile-wrapper">
      <Navbar />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="profile-header">
            <div className="profile-left">
              <div className="profile-photo-edit">
                <img
                  src={photoPreview || editFormData.profilePicture || profilePic}
                  alt={editFormData.userName}
                  className="profile-photo"
                  onError={(e) => { e.target.onerror = null; e.target.src = profilePic; }}
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
                <input type="text" name="userName" value={editFormData.userName} onChange={handleInputChange} className="edit-input" placeholder="Full Name" required />
                <select name="role" value={editFormData.role} onChange={handleInputChange} className="edit-select" required>
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Academic">Academic</option>
                </select>
                <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} className="edit-input" placeholder="Email" required />
                <input type="tel" name="mobile" value={editFormData.mobile} onChange={handleInputChange} className="edit-input" placeholder="Contact Number" />
              </div>
            </div>
            <div className="profile-meta">
              <div className="meta-item">
                <strong>Job</strong>
                <input type="text" name="job" value={editFormData.job} onChange={handleInputChange} className="edit-input" placeholder="Job Title" />
              </div>
              <div className="meta-item">
                <strong>University</strong>
                <input type="text" name="university" value={editFormData.university} onChange={handleInputChange} className="edit-input" placeholder="University" />
              </div>
            </div>
          </div>
          <div className="profile-section">
            <div className="profile-card">
              <h3>Academic Qualification</h3>
              <input type="text" name="degree" value={editFormData.degree} onChange={handleInputChange} className="edit-input" placeholder="Degree" />
            </div>
            <div className="profile-card">
              <h3>About</h3>
              <textarea name="aboutme" value={editFormData.aboutme} onChange={handleInputChange} className="edit-textarea" placeholder="Tell us about yourself" rows="4" />
            </div>
          </div>
          <div className="profile-skills">
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="tag-input-group">
                <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="tag-input" placeholder="Add skill" />
                <button type="button" onClick={handleSkillAdd} className="tag-add-button">Add</button>
              </div>
              <div className="tag-group">
                {editFormData.skills.map((skill, index) => (
                  <span key={index} className="tag">{skill} <button type="button" onClick={() => handleSkillRemove(skill)} className="tag-remove">×</button></span>
                ))}
              </div>
            </div>
            <div className="skills-section">
              <h4>Specialized Area</h4>
              <div className="tag-input-group">
                <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="tag-input" placeholder="Add interest area" />
                <button type="button" onClick={handleInterestAdd} className="tag-add-button">Add</button>
              </div>
              <div className="tag-group">
                {editFormData.interestArea.map((area, index) => (
                  <span key={index} className="tag">{area} <button type="button" onClick={() => handleInterestRemove(area)} className="tag-remove">×</button></span>
                ))}
              </div>
            </div>
          </div>
          <div className="edit-button-container">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-left">
              <img
                src={`${backendUrl}/${localStorage.getItem("profileimage")}` || profilePic}
                alt={profileData.userName}
                className="profile-photo"
                onError={(e) => { e.target.onerror = null; e.target.src = profilePic; }}
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
            <button
              className={activeTab === 'About me' ? 'active' : ''}
              onClick={() => handleTabChange('About me')}
            >
              About me
            </button>
            <button
              className={activeTab === 'Questions' ? 'active' : ''}
              onClick={() => handleTabChange('Questions')}
            >
              MyDiscussions
            </button>
            <button
              className={activeTab === 'Answers' ? 'active' : ''}
              onClick={() => handleTabChange('Answers')}
            >
              Posts
            </button>
          </div>

          {activeTab === 'About me' && (
            <div className="profile-content">
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
                             <div className="button-container-center">
            <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Questions' && (
            <div className="profile-content">
              <h3>My Discussions</h3>
              {discussionLoading ? (
                <div>Loading discussions...</div>
              ) : discussions.length > 0 ? (
                <div className="discussions-list">
                  {discussions.map((discussion) => (
                    <div key={discussion._id} className="discussion-item">
                      <h4>{discussion.topic}</h4>
                      <div className="discussion-buttons">
                        <button
                          onClick={() => handleExploreClick(discussion._id)}
                          className="explore-button"
                        >
                          Explore
                        </button>
                        <button
                          onClick={() => handleDeleteDiscussion(discussion._id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No discussions found</p>
              )}
            </div>
          )}
          {activeTab === 'Answers' && (
            <div className="profile-content">
              <h3>My Posts</h3>
              {postLoading ? (
                <div>Loading posts...</div>
              ) : posts.length > 0 ? (
                <div className="discussions-list">
                  {posts.map((post) => (
                    <div key={post._id} className="discussion-item">
                      <h4>{post.title || 'Untitled Post'}</h4>
                      <div className="discussion-buttons">
                      <button
                          onClick={() => handleExploreClickposts(post._id)}
                          className="explore-button"
                        >
                          Explore
                        </button>
                        <button
                          onClick={() => handleDeleteposts(post._id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                    </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No posts found</p>
              )}
            </div>
          )}

          {/* <div className="button-container-center">
            <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div> */}
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