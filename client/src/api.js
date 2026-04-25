import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV ? 'http://localhost:5000' : '/api');

const api = axios.create({ baseURL });

export default api;
