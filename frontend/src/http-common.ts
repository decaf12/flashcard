// Use axios to send HTTP requests
import axios from 'axios';

// Export the new instance of axios from axios.create()
export const flashcardHttpRequestBase = () => {
  const userString = localStorage.getItem('user');
  const user = userString === null ? { token: '' } : JSON.parse(userString);

  return axios.create({
    /* Root URL of all requests. Any further URLs are appended. */
    baseURL: 'http://localhost:5000/api/flashcards',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    },
  });
};

export const authHttpRequestBase = axios.create({
    /* Root URL of all requests. Any further URLs are appended. */
    baseURL: 'http://localhost:5000/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});
