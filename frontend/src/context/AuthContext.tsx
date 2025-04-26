import React, { createContext, useState, useEffect } from 'react';
import client from '../api/client';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterPayload {
  lssId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  heardAbout?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(null as never);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // auto‑load current user if token exists
    (async () => {
      const token = localStorage.getItem('mm_token');
      if (!token) return setLoading(false);
      try {
        const { data } = await client.get<User>('/auth/me');
        setUser(data);
      } catch (_) {
        localStorage.removeItem('mm_token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await client.post<{ token: string; user: User }>('/auth/login', { email, password });
    localStorage.setItem('mm_token', data.token);
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    const { data } = await client.post<{ token: string; user: User }>('/auth/register', payload);
    localStorage.setItem('mm_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('mm_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
