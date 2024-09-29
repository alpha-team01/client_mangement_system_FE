import axios, { AxiosInstance } from 'axios';
import { baseURL } from './data';



// Base configuration for axios
const api: AxiosInstance = axios.create({
    baseURL: baseURL,
});

// Function to get the auth token from storage
// const getAuthToken = (): string | null => sessionStorage.getItem('accessToken');

// Interceptor to add token to headers of every request
api.interceptors.request.use(
    config => {
        // const token = getAuthToken();
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }

        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

        return config;
    },
    error => Promise.reject(error)
);



api.interceptors.response.use(
    response => response, // Handle successful responses
    error => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.log('Unauthorized access - redirecting to login.');
                // Perform logout or redirect to login
                // window.location.href = '/login'; // Example redirect
            } else if (status === 403) {
                // Handle forbidden access (e.g., show a message)
                console.log('Forbidden access - you do not have permission.');
            } else if (status === 500) {
                // Handle server error (e.g., show a message)
                console.log('Server error - please try again later.');
            } else {
                // Handle other status codes
                console.log(`Error: ${status} - ${error.response.statusText}`);
            }
        } else {
            console.log('Error:', error.message);
        }

        return Promise.reject(error);
    }
);



export default api;

