import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Fixed login credentials for petani
  const login = async (username: string, password: string): Promise<boolean> => {
    // Check fixed credentials
    if (username === 'petani' && password === 'petani123') {
      setUser({
        id: '1',
        name: 'Petani Indonesia',
        username: 'petani',
        role: 'farmer'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}