// // import React from 'react';
// // import { FaSearch, FaHome, FaEnvelope, FaUsers, FaBell, FaUserCircle } from 'react-icons/fa';
// // import Navbar from '../Navbar';

// // const SearchPage = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Navbar/>
      
// //       {/* Main Content */}
// //       <div className="flex flex-col items-center p-8">
// //         {/* Search Section */}
// //         <div className="text-center mb-8">
// //           <h2 className="text-3xl font-bold text-gray-800 mb-2">
// //             Search Here Anything You Need To Explore
// //           </h2>
// //           <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
// //           <div className="relative w-full max-w-xl mx-auto">
// //             <input
// //               type="text"
// //               placeholder="Search"
// //               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
// //             />
// //             <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //           </div>
// //         </div>

// //         {/* Search Results */}
// //         <div className="w-full max-w-4xl">
// //           <h3 className="text-lg text-gray-700 mb-4">
// //             Search results for <span className="font-semibold">"WSO2 Internships"</span>
// //           </h3>
// //           <div className="flex space-x-4 mb-4">
// //             <button className="text-blue-600 border-b-2 border-blue-600 pb-1">ALL</button>
// //             <button className="text-gray-600 hover:text-blue-600">Conversations</button>
// //             <button className="text-gray-600 hover:text-blue-600">Articles</button>
// //           </div>

// //           {/* Result Cards */}
// //           <div className="space-y-4">
// //             {/* Card 1: Discussion */}
// //             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
// //               <div className="flex items-center space-x-4">
// //                 <div className="bg-blue-100 p-3 rounded-full">
// //                   <FaUsers className="text-blue-600 text-xl" />
// //                 </div>
// //                 <div>
// //                   <h4 className="text-gray-800 font-semibold">
// //                     What are the main skills to find a learning in WSO2 as a SE intern
// //                   </h4>
// //                   <p className="text-gray-600 text-sm">Molith Sathmina (Student) • 5hr</p>
// //                 </div>
// //               </div>
// //               <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
// //                 Explore
// //               </button>
// //             </div>

// //             {/* Card 2: Article */}
// //             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
// //               <div className="flex items-center space-x-4">
// //                 <div className="bg-gray-200 p-3 rounded-lg">
// //                   <img src="https://via.placeholder.com/40" alt="WSO2 Logo" className="w-10 h-10" />
// //                 </div>
// //                 <div>
// //                   <h4 className="text-gray-800 font-semibold">Internship Recruitment</h4>
// //                   <p className="text-gray-600 text-sm">WSO2</p>
// //                 </div>
// //               </div>
// //               <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
// //                 Explore
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchPage;

// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaHome, FaEnvelope, FaUsers, FaBell, FaUserCircle } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState(''); // State for search input
//   const [results, setResults] = useState([]); // State for search results
//   const [loading, setLoading] = useState(false); // State for loading status

//   // Function to fetch data from API
//   const fetchSearchResults = async (query) => {
//     setLoading(true);
//     try {
//       // Example API endpoints based on your URLs
//       const response = await fetch(`http://localhost:3000/search/searchpost?title=${query}`);
//       const response2 = await fetch(`http://localhost:3000/search/searchpost?topic=${query}`);
//       const data = await response.json();
//       setResults(data); // Update results with fetched data
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setResults([]); // Reset results on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       fetchSearchResults(query); // Fetch data when query changes
//     } else {
//       setResults([]); // Clear results if query is empty
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex flex-col items-center p-8">
//         {/* Search Section */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Search Here Anything You Need To Explore
//           </h2>
//           <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
//           <div className="relative w-full max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Search Results */}
//         <div className="w-full max-w-4xl">
//           {searchQuery && (
//             <h3 className="text-lg text-gray-700 mb-4">
//               Search results for <span className="font-semibold">"{searchQuery}"</span>
//             </h3>
//           )}
//           <div className="flex space-x-4 mb-4">
//             <button className="text-blue-600 border-b-2 border-blue-600 pb-1">ALL</button>
//             <button className="text-gray-600 hover:text-blue-600">Conversations</button>
//             <button className="text-gray-600 hover:text-blue-600">Articles</button>
//           </div>

//           {/* Result Cards */}
//           <div className="space-y-4">
//             {loading ? (
//               <p className="text-gray-600">Loading...</p>
//             ) : results.length > 0 ? (
//               results.map((result, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <FaUsers className="text-blue-600 text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="text-gray-800 font-semibold">{result.title}</h4>
//                       <p className="text-gray-600 text-sm">{result.author} • {result.time}</p>
//                     </div>
//                   </div>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                     Explore
//                   </button>
//                 </div>
//               ))
//             ) : (
//               searchQuery && <p className="text-gray-600">No results found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// import React, { useState } from 'react';
// import { FaSearch, FaUsers } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // State for error messages

//   const fetchSearchResults = async (query) => {
//     setLoading(true);
//     setError(null); // Reset error state
//     try {
//       const [response1, response2] = await Promise.all([
//         fetch(`http://localhost:3000/search/searchevent?topic=${query}`),
//         fetch(`http://localhost:3000/search/searchpost?title=${query}`)

        
//       ]);

//       const data1 = await response1.json();
//       const data2 = await response2.json();

//       console.log('Response from title:', data1);
//       console.log('Response from topic:', data2);

//       // Check if responses are arrays; if not, treat as errors
//       const results1 = Array.isArray(data1) ? data1 : [];
//       const results2 = Array.isArray(data2) ? data2 : [];

//       // Combine results and remove duplicates
//       const combinedResults = [...results1, ...results2].reduce((unique, item) => {
//         return unique.some((result) => result.title === item.title)
//           ? unique
//           : [...unique, item];
//       }, []);

//       console.log('Combined results:', combinedResults);

//       if (combinedResults.length === 0) {
//         // If no results, check for error messages
//         const errorMsg =
//           data1.message || data2.error || 'No results found for this query.';
//         setError(errorMsg);
//       }

//       setResults(combinedResults);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setError('Something went wrong while fetching results.');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       fetchSearchResults(query);
//     } else {
//       setResults([]);
//       setError(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex flex-col items-center p-8">
//         {/* Search Section */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Search Here Anything You Need To Explore
//           </h2>
//           <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
//           <div className="relative w-full max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Search Results */}
//         <div className="w-full max-w-4xl">
//           {searchQuery && (
//             <h3 className="text-lg text-gray-700 mb-4">
//               Search results for <span className="font-semibold">"{searchQuery}"</span>
//             </h3>
//           )}
//           <div className="flex space-x-4 mb-4">
//             <button className="text-blue-600 border-b-2 border-blue-600 pb-1">ALL</button>
//             <button className="text-gray-600 hover:text-blue-600">Conversations</button>
//             <button className="text-gray-600 hover:text-blue-600">Articles</button>
//           </div>

//           {/* Result Cards */}
//           <div className="space-y-4">
//             {loading ? (
//               <p className="text-gray-600">Loading...</p>
//             ) : error ? (
//               <p className="text-red-600">{error}</p>
//             ) : results.length > 0 ? (
//               results.map((result, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <FaUsers className="text-blue-600 text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="text-gray-800 font-semibold">
//                         {result.title || 'No title available'}
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         {result.author || 'Unknown author'} • {result.time || 'Unknown time'}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                     Explore
//                   </button>
//                 </div>
//               ))
//             ) : (
//               searchQuery && <p className="text-gray-600">No results found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;



// import React, { useState } from 'react';
// import { FaSearch, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [allResults, setAllResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [activeTab, setActiveTab] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchSearchResults = async (query) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch both endpoints in parallel
//       const [postsResponse, eventsResponse] = await Promise.all([
//         fetch(`http://localhost:3000/search/searchpost?title=${query}`),
//         fetch(`http://localhost:3000/search/searchevent?topic=${query}`),
//       ]);

//       if (!postsResponse.ok || !eventsResponse.ok) {
//         throw new Error('One or more search requests failed');
//       }

//       const postsData = await postsResponse.json();
//       const eventsData = await eventsResponse.json();

//       // Normalize the data
//       const normalizedPosts = Array.isArray(postsData)
//         ? postsData.map(post => ({
//             id: post._id,
//             type: 'article',
//             title: post.title,
//             description: post.content,
//             author: post.author_name,
//             date: post.createdAt,
//             icon: <FaNewspaper className="text-blue-600 text-xl" />,
//           }))
//         : [];

//       const normalizedEvents = Array.isArray(eventsData)
//         ? eventsData.map(event => ({
//             id: event._id,
//             type: 'conversation',
//             title: event.topic,
//             description: event.description,
//             author: event.organizer,
//             date: event.date,
//             icon: <FaUsers className="text-green-600 text-xl" />,
//           }))
//         : [];

//       const combinedResults = [...normalizedPosts, ...normalizedEvents];

//       if (combinedResults.length === 0) {
//         setError('No results found for this query.');
//       }

//       setAllResults(combinedResults);
//       filterResults(activeTab, combinedResults);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setError('Something went wrong while fetching results.');
//       setAllResults([]);
//       setFilteredResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterResults = (tab, results = allResults) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case 'conversation':
//         setFilteredResults(results.filter(result => result.type === 'conversation'));
//         break;
//       case 'article':
//         setFilteredResults(results.filter(result => result.type === 'article'));
//         break;
//       default:
//         setFilteredResults(results);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       fetchSearchResults(query);
//     } else {
//       setAllResults([]);
//       setFilteredResults([]);
//       setError(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex flex-col items-center p-8">
//         {/* Search Section */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Search Here Anything You Need To Explore
//           </h2>
//           <p className="text-gray-600 mb-4">Search. Explore. Take Knowledge</p>
//           <div className="relative w-full max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Search Results */}
//         <div className="w-full max-w-4xl">
//           {searchQuery && (
//             <h3 className="text-lg text-gray-700 mb-4">
//               Search results for <span className="font-semibold">"{searchQuery}"</span>
//             </h3>
//           )}
          
//           <div className="flex space-x-4 mb-4">
//             <button 
//               className={`pb-1 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('all')}
//             >
//               ALL
//             </button>
//             <button 
//               className={`pb-1 ${activeTab === 'conversation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('conversation')}
//             >
//               Conversations
//             </button>
//             <button 
//               className={`pb-1 ${activeTab === 'article' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
//               onClick={() => filterResults('article')}
//             >
//               Articles
//             </button>
//           </div>

//           {/* Result Cards */}
//           <div className="space-y-4">
//             {loading ? (
//               <p className="text-gray-600">Loading...</p>
//             ) : error ? (
//               <p className="text-red-600">{error}</p>
//             ) : filteredResults.length > 0 ? (
//               filteredResults.map((result) => (
//                 <div
//                   key={`${result.type}-${result.id}`}
//                   className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       {result.icon}
//                     </div>
//                     <div>
//                       <h4 className="text-gray-800 font-semibold">
//                         {result.title || 'No title available'}
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         {result.description && `${result.description.substring(0, 60)}...`}
//                       </p>
//                       <p className="text-gray-500 text-xs mt-1">
//                         {result.author || 'Unknown'} • {result.date ? new Date(result.date).toLocaleDateString() : 'Unknown date'}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                     Explore
//                   </button>
//                 </div>
//               ))
//             ) : (
//               searchQuery && !loading && <p className="text-gray-600">No results found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;



// import React, { useState } from 'react';
// import { FaSearch, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [allResults, setAllResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [activeTab, setActiveTab] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchAttempted, setSearchAttempted] = useState(false);

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
//       const [postsResponse, eventsResponse] = await Promise.all([
//         fetch(`http://localhost:3000/search/searchpost?title=${encodeURIComponent(query)}`),
//         fetch(`http://localhost:3000/search/searchevent?topic=${encodeURIComponent(query)}`),
//       ]);

//       // Check if responses are OK
//       if (!postsResponse.ok) {
//         const errorData = await postsResponse.json().catch(() => ({}));
//         throw new Error(
//           `Posts search failed: ${postsResponse.status} ${postsResponse.statusText} - ${errorData.message || 'No error details'}`
//         );
//       }
//       if (!eventsResponse.ok) {
//         const errorData = await eventsResponse.json().catch(() => ({}));
//         throw new Error(
//           `Events search failed: ${eventsResponse.status} ${eventsResponse.statusText} - ${errorData.message || 'No error details'}`
//         );
//       }

//       const postsData = await postsResponse.json();
//       const eventsData = await eventsResponse.json();

//       // Normalize the API responses
//       const normalizeResults = (data, type) => {
//         if (!data) return [];
//         if (Array.isArray(data)) return data;
//         if (data.error || data.message) {
//           console.warn(`${type} search warning:`, data.error || data.message);
//           return [];
//         }
//         if (typeof data === 'object' && data !== null) {
//           return [data];
//         }
//         return [];
//       };

//       const normalizedPosts = normalizeResults(postsData, 'posts').map(post => ({
//         id: post._id || Math.random().toString(36).substr(2, 9),
//         type: 'article',
//         title: post.title || 'Untitled Post',
//         description: post.content || 'No description available',
//         author: post.author_name || 'Unknown author',
//         date: post.createdAt || new Date().toISOString(),
//         icon: <FaNewspaper className="text-blue-600 text-xl" />,
//       }));

//       const normalizedEvents = normalizeResults(eventsData, 'events').map(event => ({
//         id: event._id || Math.random().toString(36).substr(2, 9),
//         type: 'conversation',
//         title: event.topic || 'Untitled Event',
//         description: event.description || 'No description available',
//         author: event.organizer || 'Unknown organizer',
//         date: event.date || new Date().toISOString(),
//         icon: <FaUsers className="text-green-600 text-xl" />,
//       }));

//       const combinedResults = [...normalizedPosts, ...normalizedEvents];
//       console.log(combinedResults);
//       setAllResults(combinedResults);
//       filterResults(activeTab, combinedResults);

//       if (combinedResults.length === 0) {
//         setError('No results found. Try different search terms.');
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Search failed: ${error.message}`);
//       setAllResults([]);
//       setFilteredResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterResults = (tab, results = allResults) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case 'conversation':
//         setFilteredResults(results.filter(result => result.type === 'conversation'));
//         break;
//       case 'article':
//         setFilteredResults(results.filter(result => result.type === 'article'));
//         break;
//       default:
//         setFilteredResults(results);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     fetchSearchResults(query);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex flex-col items-center p-8">
//         {/* Search Section */}
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

//         {/* Search Results */}
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

//           {/* Result Cards */}
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
//                     onClick={() => console.log('Explore clicked:', result)}
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



// import React, { useState } from 'react';
// import { FaSearch, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
// import Navbar from '../Navbar';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [allResults, setAllResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [activeTab, setActiveTab] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchAttempted, setSearchAttempted] = useState(false);

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
//       const [postsResponse, eventsResponse] = await Promise.all([
//         fetch(`http://localhost:3000/search/searchpost?title=${encodeURIComponent(query)}`),
//         fetch(`http://localhost:3000/search/searchevent?topic=${encodeURIComponent(query)}`),
//       ]);

//       // Check if responses are OK
//       if (!postsResponse.ok) {
//         const errorData = await postsResponse.json().catch(() => ({}));
//         throw new Error(
//           `Posts search failed: ${postsResponse.status} ${postsResponse.statusText} - ${errorData.message || 'No error details'}`
//         );
//       }
//       if (!eventsResponse.ok) {
//         const errorData = await eventsResponse.json().catch(() => ({}));
//         throw new Error(
//           `Events search failed: ${eventsResponse.status} ${eventsResponse.statusText} - ${errorData.message || 'No error details'}`
//         );
//       }

//       const postsData = await postsResponse.json();
//       const eventsData = await eventsResponse.json();

//       // Normalize the API responses
//       const normalizeResults = (data, type) => {
//         if (!data) return [];
//         if (Array.isArray(data)) return data;
//         if (data.error || data.message) {
//           console.warn(`${type} search warning:`, data.error || data.message);
//           return [];
//         }
//         if (typeof data === 'object' && data !== null) {
//           return [data];
//         }
//         return [];
//       };

//       const normalizedPosts = normalizeResults(postsData, 'posts').map(post => ({
//         id: post._id || Math.random().toString(36).substr(2, 9),
//         type: 'article',
//         title: post.title || 'Untitled Post',
//         description: post.content || 'No description available',
//         author: post.author_name || 'Unknown author',
//         date: post.createdAt || new Date().toISOString(),
//         icon: <FaNewspaper className="text-blue-600 text-xl" />,
//       }));

//       const normalizedEvents = normalizeResults(eventsData, 'events').map(event => ({
//         id: event._id || Math.random().toString(36).substr(2, 9),
//         type: 'conversation',
//         title: event.topic || 'Untitled Event',
//         description: event.description || 'No description available',
//         author: event.organizer || 'Unknown organizer',
//         date: event.date || new Date().toISOString(),
//         icon: <FaUsers className="text-green-600 text-xl" />,
//       }));

//       const combinedResults = [...normalizedPosts, ...normalizedEvents];

//       setAllResults(combinedResults);
//       filterResults(activeTab, combinedResults);

//       if (combinedResults.length === 0) {
//         setError('No results found. Try different search terms.');
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(`Search failed: ${error.message}`);
//       setAllResults([]);
//       setFilteredResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterResults = (tab, results = allResults) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case 'conversation':
//         setFilteredResults(results.filter(result => result.type === 'conversation'));
//         break;
//       case 'article':
//         setFilteredResults(results.filter(result => result.type === 'article'));
//         break;
//       default:
//         setFilteredResults(results);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     fetchSearchResults(query);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex flex-col items-center p-8">
//         {/* Search Section */}
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

//         {/* Search Results */}
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

//           {/* Result Cards */}
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
//                     onClick={() => console.log('Explore clicked:', result)}
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
import { FaSearch, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
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
        fetch(`http://localhost:3000/search/searchpost?title=${encodeURIComponent(query)}`),
        fetch(`http://localhost:3000/search/searchevent?topic=${encodeURIComponent(query)}`),
      ]);

      // Check if responses are OK
      if (!postsResponse.ok) {
        const errorData = await postsResponse.json().catch(() => ({}));
        throw new Error(
          `Posts search failed: ${postsResponse.status} ${postsResponse.statusText} - ${errorData.message || 'No error details'}`
        );
      }
      if (!eventsResponse.ok) {
        const errorData = await eventsResponse.json().catch(() => ({}));
        throw new Error(
          `Events search failed: ${eventsResponse.status} ${eventsResponse.statusText} - ${errorData.message || 'No error details'}`
        );
      }

      const postsData = await postsResponse.json();
      console.log('Posts Response:', postsData);
      const eventsData = await eventsResponse.json();
      console.log('Events Response:', eventsData);

      // Normalize the API responses
      const normalizeResults = (data, type) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (data.error || data.message) {
          console.warn(`${type} search warning:`, data.error || data.message);
          return [];
        }
        if (typeof data === 'object' && data !== null) {
          return [data];
        }
        return [];
      };

      const normalizedPosts = normalizeResults(postsData, 'posts').map(post => ({
        id: post._id || Math.random().toString(36).substr(2, 9),
        type: 'article',
        title: post.title || 'Untitled Post',
        description: post.content || 'No description available',
        author: post.author_name || 'Unknown author',
        date: post.createdAt || new Date().toISOString(),
        icon: <FaNewspaper className="text-blue-600 text-xl" />,
        originalType: 'post'
      }));

      const normalizedEvents = normalizeResults(eventsData, 'events').map(event => ({
        id: event._id || Math.random().toString(36).substr(2, 9),
        type: 'conversation',
        title: event.topic || 'Untitled Event',
        description: event.description || 'No description available',
        author: event.organizer || 'Unknown organizer',
        date: event.date || new Date().toISOString(),
        icon: <FaUsers className="text-green-600 text-xl" />,
        originalType: 'discussion'
      }));

      const combinedResults = [...normalizedPosts, ...normalizedEvents];
      console.log(combinedResults);
      setAllResults(combinedResults);
      filterResults(activeTab, combinedResults);

      if (combinedResults.length === 0) {
        setError('No results found. Try different search terms.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(`Search failed: ${error.message}`);
      setAllResults([]);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = (tab, results = allResults) => {
    setActiveTab(tab);
    switch (tab) {
      case 'conversation':
        setFilteredResults(results.filter(result => result.type === 'conversation'));
        break;
      case 'article':
        setFilteredResults(results.filter(result => result.type === 'article'));
        break;
      default:
        setFilteredResults(results);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const handleExplore = async (result) => {
    try {
      if (result.originalType === 'post') {
        // Fetch post details and navigate to post page
        const response = await axios.get(`http://localhost:3000/post/${result.id}`);
        localStorage.setItem("postid",result.id);
        navigate(`/post/${result.id}`, { state: { post: response.data } });
      } else if (result.originalType === 'discussion') {
        // Fetch discussion details and navigate to discussion page
        const response = await axios.get(`http://localhost:3000/discussion/${result.id}`);
        localStorage.setItem("discussionid",result.id);
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
        {/* Search Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
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

        {/* Search Results */}
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

          {/* Result Cards */}
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
                      <p className="text-gray-600 text-sm mt-1">
                        {result.description.substring(0, 100)}{result.description.length > 100 ? '...' : ''}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>By {result.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                      </div>
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

