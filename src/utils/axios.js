import axios from 'axios';
// config
import { HOST_API_KEY } from '../config';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: 'https://api.quickerepair.technolitics.com/api/v1' });

console.log("axiosInstance",axiosInstance)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
