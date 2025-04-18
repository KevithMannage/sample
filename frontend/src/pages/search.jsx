
// import React, { useState } from 'react';
// import { FaSearch, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
// import Navbar from '../Navbar';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [allResults, setAllResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [activeTab, setActiveTab] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchAttempted, setSearchAttempted] = useState(false);
//   const navigate = useNavigate();

//   const fetchSearchResults = async (query) => {
//     if (!query.trim()) {
//       setAllResults([]);
//       setFilteredResults([]);
//       setError(null);
//       setSearchAttempted(false);
//       return;
//     }
  
//     setLoading(true);
//     setError(null);
//     setSearchAttempted(true);
    
//     try {
//       // Fetch both posts and events concurrently, handle each independently
//       const [postsResponse, eventsResponse] = await Promise.all([
//         axios.get(`http://localhost:3000/search/searchpost?title=${query}`).catch(err => ({
//           status: err.response?.status || 500,
//           data: err.response?.data || { error: 'Failed to fetch posts' }
//         })),
//         axios.get(`http://localhost:3000/search/searchevent?topic=${query}`).catch(err => ({
//           status: err.response?.status || 500,
//           data: err.response?.data || { error: 'Failed to fetch events' }
//         }))
//       ]);
  
//       // Log raw responses
//       console.log('Posts Response Status:', postsResponse.status);
//       console.log('Raw Posts Data:', postsResponse.data);
//       console.log('Events Response Status:', eventsResponse.status);
//       console.log('Raw Events Data:', eventsResponse.data);
  
//       const normalizeResults = (data, type) => {
//         // Handle 404 or error responses explicitly
//         if (!data || data.error || data.message) {
//           console.warn(`${type} search returned no results or error:`, data?.error || data?.message || 'No data');
//           return [];
//         }
//         if (Array.isArray(data)) return data;
//         if (typeof data === 'object' && data !== null) return [data];
//         return [];
//       };
  
//       const normalizedPosts = normalizeResults(postsResponse.data, 'posts').map(post => {
//         const normalized = {
//           id: post._id || Math.random().toString(36).substr(2, 9),
//           type: 'article',
//           title: post.title || 'Untitled Post',
//           description: post.content || 'No description available',
//           author: post.author_name || 'Unknown author',
//           date: post.createdAt || new Date().toISOString(),
//           icon: <FaNewspaper className="text-blue-600 text-xl" />,
//           originalType: 'post'
//         };
//         console.log('Normalized Post:', normalized);
//         return normalized;
//       });
  
//       const normalizedEvents = normalizeResults(eventsResponse.data, 'events').map(event => {
//         const normalized = {
//           id: event._id || Math.random().toString(36).substr(2, 9),
//           type: 'conversation',
//           title: event.topic || 'Untitled Event',
//           description: event.participants || 'No description available',
//           author: event.username || 'Unknown organizer',
//           date: event.date || new Date().toISOString(),
//           icon: <FaUsers className="text-green-600 text-xl" />,
//           originalType: 'event'
//         };
//         console.log('Normalized Event:', normalized);
//         return normalized;
//       });
  
//       const combinedResults = [...normalizedPosts, ...normalizedEvents];
//       console.log('All Combined Results:', combinedResults);
//       setAllResults(combinedResults);
//       filterResults(activeTab, combinedResults);
  
//       if (combinedResults.length === 0) {
//         setError('No results found for posts or events. Try different search terms.');
//       }
//     } catch (error) {
//       console.error('Unexpected search error:', error);
//       setError(`Search failed: ${error.message}`);
//       setAllResults([]);
//       setFilteredResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };


  
//   const filterResults = (tab, results = allResults) => {
//     setActiveTab(tab);
//     let filtered;
//     switch (tab) {
//       case 'conversation':
//         filtered = results.filter(result => result.type === 'conversation');
//         break;
//       case 'article':
//         filtered = results.filter(result => result.type === 'article');
//         break;
//       default:
//         filtered = results;
//     }
//     console.log(`Filtered results for ${tab}:`, filtered);
//     setFilteredResults(filtered);
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     fetchSearchResults(query);
//   };

//   const handleExplore = async (result) => {
//     try {
//       if (result.originalType === 'post') {
//         const response = await axios.get(`http://localhost:3000/post/${result.id}`);
//         localStorage.setItem("postid", result.id);
//         navigate(`/post/${result.id}`, { state: { post: response.data } });
//       } else if (result.originalType === 'event') {  // Changed from 'discussion' to 'event'
//         const response = await axios.get(`http://localhost:3000/discussion/${result.id}`);
//         localStorage.setItem("discussionid", result.id);
//         navigate(`/discussion/${result.id}`, { state: { discussion: response.data } });
//       }
//     } catch (error) {
//       console.error('Error fetching details:', error);
//       setError(`Failed to load ${result.originalType} details. Please try again.`);
//     }
//   };

//   // Rest of the JSX remains the same
//   return (
//     <div className="min-h-screen bg-gray-100 pt-20">
//       <Navbar />
//       <div className="flex flex-col items-center p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Search Here Anything You Need To Explore
//           </h2>
//           <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
//           <div className="relative w-full max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search posts or events..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>
//         <div className="w-full max-w-4xl">
//           {searchAttempted && (
//             <h3 className="text-lg text-gray-700 mb-4">
//               Search results for <span className="font-semibold">"{searchQuery}"</span>
//             </h3>
//           )}
//           <div className="flex space-x-4 mb-4">
//             <button 
//               className={`pb-1 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('all')}
//             >
//               ALL ({allResults.length})
//             </button>
//             <button 
//               className={`pb-1 ${activeTab === 'conversation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('conversation')}
//             >
//               Conversations ({allResults.filter(r => r.type === 'conversation').length})
//             </button>
//             <button 
//               className={`pb-1 ${activeTab === 'article' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('article')}
//             >
//               Articles ({allResults.filter(r => r.type === 'article').length})
//             </button>
//           </div>
//           <div className="space-y-4">
//             {loading ? (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : error ? (
//               <div className="bg-red-50 border-l-4 border-red-500 p-4">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-red-700">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             ) : filteredResults.length > 0 ? (
//               filteredResults.map((result) => (
//                 <div
//                   key={result.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <div className="flex items-center space-x-4 flex-grow">
//                     <div className={`p-3 rounded-full ${result.type === 'article' ? 'bg-blue-100' : 'bg-green-100'}`}>
//                       {result.icon}
//                     </div>
//                     <div className="flex-grow">
//                       <h4 className="text-gray-800 font-semibold">
//                         {result.title}
//                         <span className="ml-2 text-xs font-normal px-2 py-1 rounded-full bg-gray-100 text-gray-600">
//                           {result.type === 'article' ? 'Article' : 'Conversation'}
//                         </span>
//                       </h4>
//                       <p className="text-gray-600 text-sm mt-1">
//                         {result.description.substring(0, 100)}{result.description.length > 100 ? '...' : ''}
//                       </p>
//                       <div className="flex items-center mt-2 text-xs text-gray-500">
//                         <span>By {result.author}</span>
//                         <span className="mx-2">•</span>
//                         <span>{new Date(result.date).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button 
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ml-4"
//                     onClick={() => handleExplore(result)}
//                   >
//                     Explore
//                   </button>
//                 </div>
//               ))
//             ) : (
//               searchAttempted && (
//                 <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-blue-700">
//                         No results found for "{searchQuery}". Try different search terms.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState } from 'react';
import { FaSearch, FaUsers, FaNewspaper } from 'react-icons/fa';
import Navbar from '../Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const navigate = useNavigate();
  const backendUrl="https://devthonbackend-production.up.railway.app"

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setAllResults([]);
      setFilteredResults([]);
      setError(null);
      setSearchAttempted(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchAttempted(true);
    
    try {
      const [postsResponse, eventsResponse] = await Promise.all([
        axios.get(`${backendUrl}/search/searchpost?title=${query}`).catch(err => ({
          status: err.response?.status || 500,
          data: err.response?.data || { error: 'Failed to fetch posts' }
        })),
        axios.get(`${backendUrl}/search/searchevent?topic=${query}`).catch(err => ({
          status: err.response?.status || 500,
          data: err.response?.data || { error: 'Failed to fetch events' }
        }))
      ]);

      console.log('Posts Response Status:', postsResponse.status);
      console.log('Raw Posts Data:', postsResponse.data);
      console.log('Events Response Status:', eventsResponse.status);
      console.log('Raw Events Data:', eventsResponse.data);

      const normalizeResults = (data, type) => {
        if (!data || data.error || data.message) {
          console.warn(`${type} search returned no results or error:`, data?.error || data?.message || 'No data');
          return [];
        }
        if (Array.isArray(data)) return data;
        if (typeof data === 'object' && data !== null) return [data];
        return [];
      };

      const normalizedPosts = normalizeResults(postsResponse.data, 'posts').map(post => {
        const normalized = {
          id: post._id || Math.random().toString(36).substr(2, 9),
          type: 'article',
          title: post.title || 'Untitled Post',
          // No author or description for posts
          date: post.createdAt || new Date().toISOString(),
          icon: <FaNewspaper className="text-blue-600 text-xl" />,
          originalType: 'post'
        };
        console.log('Normalized Post:', normalized);
        return normalized;
      });

      const normalizedEvents = normalizeResults(eventsResponse.data, 'events').map(event => {
        const normalized = {
          id: event._id || Math.random().toString(36).substr(2, 9), // Fixed syntax here
          type: 'conversation',
          title: event.topic || 'Untitled Event',
          description: event.description || 'No description available',
          author: event.organizer || 'Unknown Organizer',
          date: event.date || new Date().toISOString(),
          icon: <FaUsers className="text-green-600 text-xl" />,
          originalType: 'event'
        };
        console.log('Normalized Event:', normalized);
        return normalized;
      });

      const combinedResults = [...normalizedPosts, ...normalizedEvents];
      console.log('All Combined Results:', combinedResults);
      setAllResults(combinedResults);
      filterResults(activeTab, combinedResults);

      if (combinedResults.length === 0) {
        setError('No results found for posts or events. Try different search terms.');
      }
    } catch (error) {
      console.error('Unexpected search error:', error);
      setError(`Search failed: ${error.message}`);
      setAllResults([]);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = (tab, results = allResults) => {
    setActiveTab(tab);
    let filtered;
    switch (tab) {
      case 'conversation':
        filtered = results.filter(result => result.type === 'conversation');
        break;
      case 'article':
        filtered = results.filter(result => result.type === 'article');
        break;
      default:
        filtered = results;
    }
    console.log(`Filtered results for ${tab}:`, filtered);
    setFilteredResults(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const handleExplore = async (result) => {
    try {
      if (result.originalType === 'post') {
        const response = await axios.get(`${backendUrl}/post/${result.id}`);
        localStorage.setItem("postid", result.id);
        navigate(`/post/${result.id}`, { state: { post: response.data } });
      } else if (result.originalType === 'event') {
        const response = await axios.get(`${backendUrl}/discussion/${result.id}`);
        localStorage.setItem("discussionid", result.id);
        navigate(`/discussion/${result.id}`, { state: { discussion: response.data } });
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setError(`Failed to load ${result.originalType} details. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Navbar />
      <div className="flex flex-col items-center p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">
            Search Here Anything You Need To Explore
          </h2>
          <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search posts or events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="w-full max-w-4xl">
          {searchAttempted && (
            <h3 className="text-lg text-gray-700 mb-4">
              Search results for <span className="font-semibold">"{searchQuery}"</span>
            </h3>
          )}
          <div className="flex space-x-4 mb-4">
            <button 
              className={`pb-1 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => filterResults('all')}
            >
              ALL ({allResults.length})
            </button>
            <button 
              className={`pb-1 ${activeTab === 'conversation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => filterResults('conversation')}
            >
              Conversations ({allResults.filter(r => r.type === 'conversation').length})
            </button>
            <button 
              className={`pb-1 ${activeTab === 'article' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => filterResults('article')}
            >
              Articles ({allResults.filter(r => r.type === 'article').length})
            </button>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className={`p-3 rounded-full ${result.type === 'article' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {result.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-gray-800 font-semibold">
                        {result.title}
                        <span className="ml-2 text-xs font-normal px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {result.type === 'article' ? 'Article' : 'Conversation'}
                        </span>
                      </h4>
                      {result.type === 'conversation' && (
                        <>
                          
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            
                           
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          </div>
                        </>
                      )}
                      {result.type === 'article' && (
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ml-4"
                    onClick={() => handleExplore(result)}
                  >
                    Explore
                  </button>
                </div>
              ))
            ) : (
              searchAttempted && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        No results found for "{searchQuery}". Try different search terms.
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;