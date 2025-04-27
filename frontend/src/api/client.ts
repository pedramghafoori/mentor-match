import axios from 'axios';

const client = axios.create({
  // In dev mode CRA rewrites `/api` to the proxy target (frontend/package.json).
  // In production the built assets are usually served by the same host,
  // so a relative path still works.
  baseURL: '/api',
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