import axios from 'axios';

const checkNotification = async () => {
  const user_id = localStorage.getItem('userid'); // Get user_id from local storage
  const backendUrl= "https://devthonbackend-production.up.railway.app";
  if (!user_id) {
    console.warn('User ID not found in local storage.');
    return;
  }

  try {
    // Call the backend API to get subscribed discussion IDs
    const response = await axios.get(`${backendUrl}/notifications/${user_id}`);

    if (response.status === 200) {
      const { discussionIds } = response.data;

      // Store the discussion IDs in session storage
      sessionStorage.setItem('discussionIds', JSON.stringify(discussionIds));

      console.log('Subscribed discussion IDs:', discussionIds);
    } else {
      console.error('Failed to fetch subscribed discussions:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching subscribed discussions:', error);
  }
};

export default checkNotification;