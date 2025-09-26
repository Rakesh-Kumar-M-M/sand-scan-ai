import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type User = { email: string; name?: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  login: (user: { email: string; name?: string }, token: string) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem('cw_token');
      const u = localStorage.getItem('cw_user');
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  const login = useCallback((u: { email: string; name?: string }, t: string) => {
    setUser(u);
    setToken(t);
    try {
      localStorage.setItem('cw_token', t);
      localStorage.setItem('cw_user', JSON.stringify(u));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('cw_token');
      localStorage.removeItem('cw_user');
    } catch {}
  }, []);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
      const res = await fetch(API_BASE + '/api/auth/refresh', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(user as any, data.token);
      }
    } catch {}
  }, [token, login, user]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


