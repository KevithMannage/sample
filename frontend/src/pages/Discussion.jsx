import React, { useState, useEffect } from 'react';
import JobVacancy from './component/JobVacancy';
import Navbar from '../Navbar';
import ImageSlider from './component/ImageSlider';

const HomePage = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const response = await fetch('http://localhost:3000/job/getvancies');
        if (!response.ok) {
          throw new Error('Failed to fetch job vacancies');
        }
        const data = await response.json();
        console.log("API Response:", data); // Add this to inspect the response
        setJobVacancies(data.vacancy);
        console.log(jobVacancies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobVacancies();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading job vacancies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-12">
        <ImageSlider />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {jobVacancies.map((job, index) => (
            <JobVacancy
              key={index}
              companyName={job.companyName}
              jobPosition={job.jobPosition}
              description={job.description}
              link={job.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;