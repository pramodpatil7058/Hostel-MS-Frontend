import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8084',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Add authorization token to headers before the request is sent
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Handle the error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        // Handle the error
        console.error('API call error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;