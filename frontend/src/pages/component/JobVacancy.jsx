import React from 'react';
import './JobVacancy.css'; // Assuming you'll add the CSS in a separate file

const JobVacancy = ({ companyName, jobPosition, description, link }) => {
  return (
    <div className="job-vacancy-card">
      <h2>{jobPosition}</h2>
      <h3>{companyName}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="details-link">
        More Details
      </a>
    </div>
  );
};

export default JobVacancy;