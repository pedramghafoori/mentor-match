import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// helper to attach Authorization header when a JWT is present
client.interceptors.request.use(cfg => {
  const token = localStorage.getItem('mm_token');
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default client;