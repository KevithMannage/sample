// import React, { useState, useEffect } from 'react';
// import JobVacancy from './component/JobVacancy';
// import Navbar from '../Navbar';
// import ImageSlider from './component/ImageSlider';

// const HomePage = () => {
//   const [jobVacancies, setJobVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//  const handleClick=()=>{
//   window.location.href = "https://cv-x-latex.vercel.app/";
//  }
//   useEffect(() => {
//     const fetchJobVacancies = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/job/getvancies');
//         if (!response.ok) {
//           throw new Error('Failed to fetch job vacancies');
//         }
//         const data = await response.json();
//         console.log("API Response:", data); // Add this to inspect the response
//         setJobVacancies(data.vacancy);
//         console.log(jobVacancies);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobVacancies();
//   }, []);


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Loading job vacancies...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-[#ebf8ff] p-4 mt-12">
//         <ImageSlider />
//         <button onClick={handleClick}>Make your CV</button>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//           {jobVacancies.map((job, index) => (
//             <JobVacancy
//               key={index}
//               companyName={job.companyName}
//               jobPosition={job.jobPosition}
//               description={job.description}
//               link={job.link}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import JobVacancy from './component/JobVacancy';
import Navbar from '../Navbar';
import ImageSlider from './component/ImageSlider';
const backendUrl="https://devthonbackend-production.up.railway.app"
const HomePage = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    // Open in new tab with better security
    window.open("https://cv-x-latex.vercel.app/", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${backendUrl}/job/getvancies`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // More robust data validation
        if (!data || !Array.isArray(data.vacancy)) {
          throw new Error('Invalid data format received from server');
        }
        
        setJobVacancies(data.vacancy);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || 'Failed to load job vacancies');
      } finally {
        setLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#ebf8ff] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <ImageSlider />
        
        <div className="text-center my-8">
          <button 
            onClick={handleClick}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Make your CV
          </button>
        </div>

        {jobVacancies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No job vacancies available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobVacancies.map((job, index) => (
              <JobVacancy
                key={`${job.id || job._id || index}`}
                companyName={job.companyName}
                jobPosition={job.jobPosition}
                description={job.description}
                link={job.link}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;