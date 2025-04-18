import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent duplicate execution
    if (localStorage.getItem('userid')) {
      console.log('User already logged in, skipping redirect handler');
      navigate('/dashboard');
      return;
    }

    // Extract query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const userid = params.get('userid');
    const role = params.get('role');
    const username = params.get('username');
    const profileImage = params.get('profileimage');

if (userid && role && username && profileImage) {
  // Store user data in localStorage
  localStorage.setItem('userid', userid);
  localStorage.setItem('role', role);
  localStorage.setItem('username', username);
  localStorage.setItem('profileimage', profileImage);

  navigate('/dashboard');
} else {
  console.error('Missing user data in query parameters');
  navigate('/login'); 
}
}, [navigate]);

return <div>Loading...</div>;
};

export default GoogleRedirectHandler;