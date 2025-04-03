// src/components/AboutUs.js
import React from 'react';
import Navbar from '../Navbar'; // Import Navbar component
import logo from '../assets/logo.jpg'; // Import the missing logo image
import developer1 from '../assets/developer1.jpg';
import developer2 from '../assets/developer1.jpg'; // Use correct images
import developer3 from '../assets/developer1.jpg';
import developer4 from '../assets/developer1.jpg';
import developer5 from '../assets/developer1.jpg';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <Navbar /> {/* Reusing Navbar */}

      {/* Main Content */}
      <div style={styles.card}>
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.content}>
          {/* Logo Section */}
          <div style={styles.logoContainer}>
            <img src={logo} alt="Company Logo" style={styles.logo} />
          </div>

          {/* Text Section */}
          <div style={styles.textContainer}>
            <p style={styles.text}>
              Welcome to <strong>GuidelineX Chat</strong>, your personal companion on the journey to success! 
              We believe that the right career course can be chosen through a simple and friendly chat app, 
              helping students, job seekers, and professionals discover the best paths for their future.
            </p>
            <p style={styles.text}>
              At GuidelineX Chat, we provide personalized career course options and opportunities for everyone. 
              Whether you’re exploring career paths, seeking advice, or preparing for your dream job, we’re here to guide you every step of the way.
            </p>
          </div>
        </div>

        {/* Developers Section */}
        <h2 style={styles.subHeading}>Developers</h2>
        <div style={styles.developersContainer}>
          {[developer1, developer2, developer3, developer4, developer5].map((dev, index) => (
            <div key={index} style={styles.developer}>
              <img src={dev} alt={`Developer ${index + 1}`} style={styles.developerImage} />
              <p style={styles.developerName}>{["Karthik Morthage", "Indukuri Vinayaga", "Nithin Nethaji", "Karthik Indukuri", "Sumanth Jayadev"][index]}</p>
              <p style={styles.developerRole}>Senior Software Engineer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4ff',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#e6eaff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1a3c8d',
    textAlign: 'center',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logoContainer: {
    flex: '1',
  },
  logo: {
    width: '150px',
    height: 'auto',
  },
  textContainer: {
    flex: '2',
  },
  text: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  subHeading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a3c8d',
    margin: '30px 0 20px',
    textAlign: 'center',
  },
  developersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  developer: {
    textAlign: 'center',
  },
  developerImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  developerName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '5px 0',
  },
  developerRole: {
    fontSize: '14px',
    color: '#666',
  },
};

export default AboutUs;
