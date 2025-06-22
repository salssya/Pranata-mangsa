import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial authentication check
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-50">
        <div className="animate-pulse text-primary-500 text-2xl font-display">
          Memuat Pranata Mangsa...
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/" element={<Navigate to="/login\" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;