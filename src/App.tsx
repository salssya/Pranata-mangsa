import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import LocationSelectPage from './pages/LocationSelectPage';
import DashboardPage from './pages/DashboardPage';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading saat startup
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
        {/* Redirect default ke /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Halaman login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman welcome setelah login */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Halaman untuk memilih lokasi */}
        <Route
          path="/select-location"
          element={<LocationSelectPage onLocationSelect={() => {}} />}
        />

        {/* Halaman utama dashboard */}
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
