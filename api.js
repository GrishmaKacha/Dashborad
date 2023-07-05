import axios from 'axios';

const api = axios.create({
  baseURL: 'your-api-url',
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Modify the request config if needed
    // e.g., add headers, modify URL, etc.
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Handle successful response
    return response.data;
  },
  error => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;
